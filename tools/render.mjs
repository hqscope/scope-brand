// Render elements of a local HTML page to PNG with headless Chrome over CDP.
// Usage: node render.mjs <page.html> <outDir> <scale> [selector...]
//   selector "#id=name" writes outDir/name.png; "page" captures the full page.
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const [pagePath, outDir, scaleArg, ...targets] = process.argv.slice(2);
const scale = Number(scaleArg || 1);
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const port = 9300 + Math.floor(Math.random() * 500);
const profile = mkdtempSync(path.join(process.env.TMPDIR || tmpdir(), "render-chrome-"));
const chrome = spawn(CHROME, [
  "--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  "--no-first-run", "--hide-scrollbars", "--allow-file-access-from-files", "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let wsUrl;
for (let i = 0; i < 50 && !wsUrl; i++) {
  await sleep(200);
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    wsUrl = list.find((t) => t.type === "page")?.webSocketDebuggerUrl;
  } catch {}
}
if (!wsUrl) throw new Error("Chrome did not start");

const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let nextId = 1;
const pending = new Map();
const listeners = [];
ws.addEventListener("message", (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
  } else if (msg.method) listeners.forEach((l) => l(msg));
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = nextId++;
  pending.set(id, { resolve, reject });
  ws.send(JSON.stringify({ id, method, params }));
});
const evaluate = async (expression) =>
  (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result.value;

try {
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 3600, height: 2000, deviceScaleFactor: scale, mobile: false });
  const loaded = new Promise((r) => listeners.push((m) => m.method === "Page.loadEventFired" && r()));
  await send("Page.navigate", { url: pathToFileURL(path.resolve(pagePath)).href });
  await loaded;
  await evaluate("document.fonts.ready.then(() => new Promise(r => setTimeout(r, 1500)))");
  await evaluate("Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })))");
  mkdirSync(outDir, { recursive: true });

  for (const target of targets) {
    const cut = target.lastIndexOf("=");
    const [selector, name] = cut > target.lastIndexOf("]") ? [target.slice(0, cut), target.slice(cut + 1)] : [target, ""];
    let clip;
    if (selector === "page") {
      const size = await evaluate("({ w: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight })");
      clip = { x: 0, y: 0, width: size.w, height: size.h, scale: 1 };
    } else {
      const box = await evaluate(`(() => { const el = document.querySelector(${JSON.stringify(selector)}); if (!el) return null; el.scrollIntoView(); const r = el.getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height }; })()`);
      if (!box) { console.error(`missing ${selector}`); continue; }
      clip = { x: box.x, y: box.y, width: box.w, height: box.h, scale: 1 };
    }
    const shot = await send("Page.captureScreenshot", { format: "png", clip, captureBeyondViewport: true, fromSurface: true });
    const file = path.join(outDir, `${name || selector.replace(/\W+/g, "")}.png`);
    writeFileSync(file, Buffer.from(shot.data, "base64"));
    console.log(`${file}  ${Math.round(clip.width * scale)}x${Math.round(clip.height * scale)}`);
  }
} finally {
  ws.close();
  chrome.kill();
  await sleep(300);
  rmSync(profile, { recursive: true, force: true });
}
