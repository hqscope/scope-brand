// Render SVG files to transparent PNGs at an exact pixel size with headless Chrome.
// render.mjs captures pages on an opaque background; logo marks and stickers need alpha, so they use this.
//   import { svgToPng } from './svg-to-png.mjs';
//   svgToPng('in.svg', 'out.png', 512, 512);
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

export function svgToPng(svgPath, pngPath, width, height) {
  const dir = mkdtempSync(join(process.env.TMPDIR || tmpdir(), 'svg-png-'));
  try {
    const page = join(dir, 'page.html');
    writeFileSync(page, `<!doctype html><html><body style="margin:0;background:transparent">` +
      `<img src="${pathToFileURL(resolve(svgPath)).href}" style="display:block;width:${width}px;height:${height}px"></body></html>`);
    mkdirSync(dirname(resolve(pngPath)), { recursive: true });
    execFileSync(CHROME, [
      '--headless=new', `--user-data-dir=${join(dir, 'profile')}`, '--no-first-run', '--hide-scrollbars',
      '--allow-file-access-from-files', '--force-device-scale-factor=1', '--default-background-color=00000000',
      `--window-size=${width},${height}`, `--screenshot=${resolve(pngPath)}`, pathToFileURL(page).href,
    ], { stdio: 'ignore' });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}
