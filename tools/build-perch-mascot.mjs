// Builds the Perch mascot files in mascot/perch/ from the rig (mascot/perch/perch.js), rendered still
// (animate: false) with React's renderToStaticMarkup.
//
// Run: node tools/build-perch-mascot.mjs [--png]
//   --png also renders stickers/png/ with headless Chrome (needs Google Chrome).
// React comes from a sibling app's node_modules, ../scope-mesh by default; set PERCH_REACT_FROM to another
// folder that has react and react-dom installed.
//
// The exported files use hex colors: the rig's oklch() tints are converted to sRGB here, because most design
// tools can't read oklch() in an SVG. The rig and the sites keep oklch().
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { svgToPng } from './svg-to-png.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'mascot', 'perch');
const reactFrom = resolve(process.env.PERCH_REACT_FROM || join(root, '..', 'scope-mesh'));
const require = createRequire(join(reactFrom, 'package.json'));
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

// perch.js is an ES module, but scope-brand has no package.json, so load it from source.
const rigSource = readFileSync(join(out, 'perch.js'), 'utf8');
const { PerchRig, PERCH_POSES, PERCH_TINTS } = await import('data:text/javascript;base64,' + Buffer.from(rigSource).toString('base64'));

// ── oklch() → hex ───────────────────────────────────────────────────────────
function oklchToHex(L, C, H) {
  const a = C * Math.cos((H * Math.PI) / 180), b = C * Math.sin((H * Math.PI) / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const lin = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  return '#' + lin.map((v) => {
    if (v < -0.002 || v > 1.002) throw new Error(`oklch(${L} ${C} ${H}) is outside sRGB`);
    const c = Math.min(1, Math.max(0, v));
    const e = c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
    return Math.round(e * 255).toString(16).padStart(2, '0').toUpperCase();
  }).join('');
}
const hexColors = (svg) => svg.replace(/oklch\(([\d.]+) ([\d.]+) ([\d.]+)\)/g, (_, L, C, H) => oklchToHex(+L, +C, +H));

// ── Rendering ───────────────────────────────────────────────────────────────
/** Render one still SVG file at the given pixel size. */
function render(props, width, height) {
  const rig = new PerchRig(React.createElement, { concept: 'puff', animate: false, ...props });
  rig.uid = 'perch'; // the rig picks a random id for the sticker filter; keep files reproducible
  const markup = renderToStaticMarkup(rig.renderVals().art)
    .replace(/^<svg /, '<svg xmlns="http://www.w3.org/2000/svg" ')
    .replace(/ width="100%" height="100%"/, ` width="${width}" height="${height}"`)
    .replace(/ style="[^"]*"/, ''); // display/overflow only matter inline in a page
  return hexColors(markup) + '\n';
}

const written = [];
function write(rel, svg) {
  const file = join(out, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, svg);
  written.push(rel);
}

// Start clean so a renamed pose never leaves a stale file behind.
for (const dir of ['svg', 'stickers']) rmSync(join(out, dir), { recursive: true, force: true });

for (const pose of PERCH_POSES) {
  write(`svg/poses/perch-${pose}.svg`, render({ pose }, 400, 400));
  write(`svg/poses-no-perch/perch-${pose}-no-perch.svg`, render({ pose, bar: false }, 400, 400));
}
for (const tint of PERCH_TINTS) {
  write(`svg/avatars/perch-avatar-${tint}.svg`, render({ pose: 'idle', tint, crop: 'bust' }, 128, 128));
  write(`svg/avatars/perch-avatar-${tint}-small.svg`, render({ pose: 'idle', tint, crop: 'bust', detail: 'low' }, 32, 32));
}

// The crew: the viewer's own Perch in red, then the three haze tints the Mesh site uses (Maya, Daniel, Priya).
const crew = { crew: 'red,blue,gold,orange', crewPoses: 'wave,idle,approved,celebrate' };
write('svg/perch-crew.svg', render(crew, 1168, 336));

const stickers = [];
for (const pose of PERCH_POSES) {
  const rel = `stickers/svg/perch-sticker-${pose}.svg`;
  write(rel, render({ pose, sticker: true }, 440, 440));
  stickers.push([rel, `stickers/png/perch-sticker-${pose}.png`, 1024, 1024]);
}
write('stickers/svg/perch-sticker-crew.svg', render({ ...crew, sticker: true }, 1208, 420));
stickers.push(['stickers/svg/perch-sticker-crew.svg', 'stickers/png/perch-sticker-crew.png', 2416, 840]);

if (process.argv.includes('--png')) {
  for (const [svg, png, w, h] of stickers) {
    svgToPng(join(out, svg), join(out, png), w, h);
    written.push(png);
  }
}
console.log(`Wrote ${written.length} files to ${out}`);
