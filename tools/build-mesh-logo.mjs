// Builds the Scope Mesh logo files in logo/scope-mesh/ from the spec in the
// "Scope mascot design" Claude Design handoff (option "2b Network").
// Run: node tools/build-mesh-logo.mjs [--png]
//   --png also renders png/ with headless Chrome (needs Google Chrome).
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { svgToPng } from './svg-to-png.mjs';

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'logo', 'scope-mesh');
mkdirSync(out, { recursive: true });

const RED = '#C42B26', INK = '#241E18', RED_BRIGHT = '#E5484D', CREAM = '#F6F1E7', DEEP = '#14100C';
const N = {
  a: [7, 7, 7], b: [25, 7, 7],
  c: [7, 28, 7], d: [23, 28, 5.4], e: [39, 28, 7],
  f: [7, 49, 7], g: [21.67, 49, 5.4], k: [36.33, 49, 5.4], i: [51, 49, 7],
};
const ROW = [['a', 'b', 'top'], ['c', 'd'], ['d', 'e'], ['f', 'g'], ['g', 'k'], ['k', 'i']];
const CROSS = [['a', 'c'], ['a', 'd'], ['b', 'd'], ['b', 'e'], ['c', 'f'], ['c', 'g'], ['d', 'g'], ['d', 'k'], ['e', 'k'], ['e', 'i']];
const TOP = new Set(['a', 'b']);

function mark({ top, rest, small = false }) {
  const row = small ? 6 : 5, cross = small ? 3.6 : 2.6, inner = small ? 6.2 : 5.4;
  const line = ([p, q], w, c) => `<line x1="${N[p][0]}" y1="${N[p][1]}" x2="${N[q][0]}" y2="${N[q][1]}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
  return [
    ...CROSS.map((l) => line(l, cross, rest)),
    ...ROW.map((l) => line(l, row, l[2] ? top : rest)),
    ...Object.entries(N).map(([id, [x, y, r]]) => `<circle cx="${x}" cy="${y}" r="${r === 5.4 ? inner : r}" fill="${TOP.has(id) ? top : rest}"/>`),
  ].join('');
}
const svg = (vb, w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${w}" height="${h}" role="img" aria-label="Scope Mesh">${body}</svg>\n`;
const tile = (fill, body) => `<rect width="100" height="100" rx="22" fill="${fill}"/><g transform="translate(21 22)">${body}</g>`;

const files = {
  'scope-mesh-mark.svg': svg('-1 -1 60 58', 240, 232, mark({ top: RED, rest: INK })),
  'scope-mesh-mark-reverse.svg': svg('-1 -1 60 58', 240, 232, mark({ top: RED_BRIGHT, rest: CREAM })),
  'scope-mesh-mark-ink.svg': svg('-1 -1 60 58', 240, 232, mark({ top: INK, rest: INK })),
  'scope-mesh-mark-cream.svg': svg('-1 -1 60 58', 240, 232, mark({ top: CREAM, rest: CREAM })),
  'scope-mesh-icon.svg': svg('0 0 100 100', 512, 512, tile(CREAM, mark({ top: RED, rest: INK }))),
  'scope-mesh-icon-deep.svg': svg('0 0 100 100', 512, 512, tile(DEEP, mark({ top: RED_BRIGHT, rest: CREAM }))),
  'scope-mesh-favicon.svg': svg('0 0 100 100', 32, 32, tile(CREAM, mark({ top: RED, rest: INK, small: true }))),
};
for (const [name, body] of Object.entries(files)) writeFileSync(join(out, name), body);
console.log(`Wrote ${Object.keys(files).length} files to ${out}`);

if (process.argv.includes('--png')) {
  const pngs = [
    ['scope-mesh-icon.svg', 'scope-mesh-icon-512.png', 512, 512],
    ['scope-mesh-icon-deep.svg', 'scope-mesh-icon-deep-512.png', 512, 512],
    ['scope-mesh-mark.svg', 'scope-mesh-mark-480.png', 480, 464],
    ['scope-mesh-favicon.svg', 'scope-mesh-favicon-32.png', 32, 32],
  ];
  for (const [svg, png, w, h] of pngs) svgToPng(join(out, svg), join(out, 'png', png), w, h);
  console.log(`Rendered ${pngs.length} PNGs to ${join(out, 'png')}`);
}
