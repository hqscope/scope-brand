// Perch, the Scope Mesh mascot. Framework-free rig, exported from Perch.dc.html.
// Pass any createElement-style function as h: React.createElement, Preact's h, or a string builder.
//
//   import { renderPerch } from './perch.js';
//   renderPerch(React.createElement, { pose: 'dates', tint: 'red', bar: true });
//
// Props: concept ('puff'), pose (see PERCH_POSES), tint ('red' | 'blue' | 'gold' | 'orange' | 'rose' | 'teal'),
// bar (bool, default true), animate (bool, default true), crop ('full' | 'tight' | 'bust'),
// detail ('high' | 'low'), sticker (bool), crew ('red,blue,…'), crewPoses ('dates,await,…').
// Animations need the keyframes in perch-keyframes.css (or call new PerchRig(h).injectKeyframes()).


class PerchRig {
  constructor(h, props) {
    this.h = h;
    this.props = props || {};
  }

  injectKeyframes() {
    if (typeof document === 'undefined' || document.getElementById('perch-kf')) return;
    const s = document.createElement('style');
    s.id = 'perch-kf';
    s.textContent = [
      '@keyframes pc-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-2.4px)}}',
      '@keyframes pc-blink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}',
      '@keyframes pc-wave{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-26deg)}}',
      '@keyframes pc-flap{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-18deg)}}',
      '@keyframes pc-hop{0%,100%{transform:translateY(0) scale(1,1)}12%{transform:translateY(0) scale(1.06,.92)}36%{transform:translateY(-18px) scale(.97,1.04)}58%{transform:translateY(0) scale(1.05,.94)}70%{transform:translateY(0) scale(1,1)}}',
      '@keyframes pc-sway{0%,100%{transform:rotate(-2.5deg)}50%{transform:rotate(2.5deg)}}',
      '@keyframes pc-breathe{0%,100%{transform:scale(1,1)}50%{transform:scale(1.03,.965)}}',
      '@keyframes pc-shrug{0%,100%{transform:translateY(0)}50%{transform:translateY(3px)}}',
      '@keyframes pc-shrugw{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-14deg)}}',
      '@keyframes pc-wobble{0%,100%{transform:rotate(-4.5deg)}50%{transform:rotate(4.5deg)}}',
      '@keyframes pc-scratch{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-10deg)}}',
      '@keyframes pc-alt{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-12deg)}}',
      '@keyframes pc-pulse{0%,70%,100%{transform:scaleY(1)}35%{transform:scaleY(1.3)}}',
      '@keyframes pc-dot{0%,60%,100%{transform:translateY(0);opacity:.35}30%{transform:translateY(-3px);opacity:1}}',
      '@keyframes pc-think{0%,100%{opacity:.2;transform:scale(.7)}40%{opacity:1;transform:scale(1)}}',
      '@keyframes pc-z{0%{transform:translate(0,0) scale(.5);opacity:0}20%{opacity:1}100%{transform:translate(18px,-34px) scale(1.1);opacity:0}}',
      '@keyframes pc-fall{0%{transform:translate(0,0) rotate(0deg);opacity:0}10%{opacity:1}100%{transform:translate(var(--dx),84px) rotate(var(--r));opacity:0}}',
      '@keyframes pc-orbit{to{transform:rotate(360deg)}}',
      '@keyframes pc-look{0%,40%{transform:translateX(-2.4px)}50%,90%{transform:translateX(2.4px)}100%{transform:translateX(-2.4px)}}',
      '@keyframes pc-read{0%,100%{transform:translateX(-2px)}50%{transform:translateX(2px)}}',
      '@keyframes pc-tap{0%,55%,100%{transform:translateY(0)}70%{transform:translateY(-3px)}}',
      '@keyframes pc-rock{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}',
      '@keyframes pc-float{0%,100%{transform:translate(0,0) rotate(-6deg)}50%{transform:translate(5px,-6px) rotate(5deg)}}',
      '@keyframes pc-coin{0%,50%,100%{transform:translateY(0)}68%{transform:translateY(-7px)}84%{transform:translateY(0)}}',
      '@keyframes pc-ping{0%,100%{transform:scale(1)}50%{transform:scale(1.3)}}',
      '@keyframes pc-spark{0%,100%{transform:scale(.3) rotate(0deg);opacity:0}50%{transform:scale(1) rotate(45deg);opacity:1}}',
      '@keyframes pc-day{0%,30%{transform:translateX(0)}33%,63%{transform:translateX(11px)}66%,96%{transform:translateX(22px)}100%{transform:translateX(0)}}',
    ].join('\n');
    document.head.appendChild(s);
  }

  renderVals() {
    const p = this.props;
    const flag = (v, d) => (v === undefined || v === null || v === '' ? d : v === true || v === 'true');
    const list = (v) => (v ? String(v).split(',').map((s) => s.trim()).filter(Boolean) : null);
    const reduce = typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!this.uid) this.uid = 'pf' + Math.random().toString(36).slice(2, 8);
    const o = {
      concept: p.concept || 'puff',
      pose: p.pose || 'idle',
      tint: p.tint || 'red',
      bar: flag(p.bar, true),
      animate: flag(p.animate, true) && !reduce,
      crop: p.crop || 'full',
      detail: p.detail || 'high',
      crew: list(p.crew),
      crewPoses: list(p.crewPoses),
      sticker: flag(p.sticker, false),
      construct: flag(p.construct, false),
    };
    return { art: this.scene(o) };
  }

  scene(o) {
    const h = this.h;
    const k = this.kit(o);
    const cid = k.GEO[o.concept] ? o.concept : 'puff';
    const G = k.GEO[cid];
    const kids = [];
    let vb;
    if (o.crew) {
      const n = o.crew.length, step = 128;
      vb = o.sticker ? `-10 2 ${220 + (n - 1) * step} 210` : `0 22 ${200 + (n - 1) * step} 168`;
      if (o.bar) kids.push(k.rr(26, 170, 148 + (n - 1) * step, 13, 6.5, k.INK));
      o.crew.forEach((t, i) => kids.push(h('g', { transform: `translate(${i * step} 0)` }, ...this.bird(k, G, cid, (o.crewPoses && o.crewPoses[i]) || o.pose, t, o, i))));
    } else {
      vb = o.crop === 'bust' ? G.bust : o.crop === 'tight' ? '16 20 168 168' : o.sticker ? '-10 -8 220 220' : '0 0 200 200';
      if (o.bar && o.crop !== 'bust') kids.push(k.rr(28, 170, 144, 13, 6.5, k.INK));
      else if (o.crop !== 'bust') kids.push(h('ellipse', { cx: 100, cy: 174, rx: 36, ry: 4.5, fill: k.INK, opacity: 0.08 }));
      kids.push(...this.bird(k, G, cid, o.pose, o.tint, o, 0));
    }
    let defs = null, content = kids;
    if (o.sticker) {
      const fid = this.uid + 'st';
      defs = h('defs', null, h('filter', { id: fid, x: '-30%', y: '-30%', width: '160%', height: '160%' },
        h('feMorphology', { in: 'SourceAlpha', operator: 'dilate', radius: 7, result: 'dil' }),
        h('feFlood', { floodColor: '#FFFFFF', result: 'w' }),
        h('feComposite', { in: 'w', in2: 'dil', operator: 'in', result: 'ol' }),
        h('feGaussianBlur', { in: 'dil', stdDeviation: 4, result: 'bl' }),
        h('feOffset', { in: 'bl', dy: 4, result: 'off' }),
        h('feFlood', { floodColor: '#241E18', floodOpacity: 0.22, result: 'sc' }),
        h('feComposite', { in: 'sc', in2: 'off', operator: 'in', result: 'sh' }),
        h('feMerge', null, h('feMergeNode', { in: 'sh' }), h('feMergeNode', { in: 'ol' }), h('feMergeNode', { in: 'SourceGraphic' }))));
      content = [h('g', { filter: `url(#${fid})` }, ...kids)];
    }
    return h('svg', { viewBox: vb, width: '100%', height: '100%', role: 'img', 'aria-label': 'Perch, ' + (k.NAMES[o.pose] || o.pose), style: { display: 'block', overflow: o.crop === 'bust' ? 'hidden' : 'visible' } }, defs, ...content);
  }

  kit(o) {
    const h = this.h;
    const INK = '#241E18', PAPER = '#FBF7EE', RED = '#C42B26', OKG = '#1F6B45';
    const cs = o.construct ? { fillOpacity: 0.12, stroke: INK, strokeWidth: 0.8 } : null;
    const rr = (x, y, w, hh, r, fill, extra) => h('rect', Object.assign({ x, y, width: w, height: hh, rx: r, fill }, fill === 'none' ? null : cs, extra));
    const circ = (cx, cy, r, fill, extra) => h('circle', Object.assign({ cx, cy, r, fill }, cs, extra));
    const ell = (cx, cy, rx, ry, fill, extra) => h('ellipse', Object.assign({ cx, cy, rx, ry, fill }, cs, extra));
    const anim = (name, dur, delay, ease) => (o.animate ? { animation: `${name} ${dur}s ${ease || 'ease-in-out'} ${(delay || 0).toFixed(2)}s infinite both`, transformBox: 'view-box', transformOrigin: '0px 0px' } : undefined);
    const piv = (x, y, style, ...kids) => (style ? h('g', { transform: `translate(${x} ${y})` }, h('g', { style }, h('g', { transform: `translate(${-x} ${-y})` }, ...kids))) : h('g', null, ...kids));
    const spark = (x, y, s, c) => h('g', null, rr(x - s * 0.22, y - s, s * 0.44, s * 2, s * 0.22, c), rr(x - s, y - s * 0.22, s * 2, s * 0.44, s * 0.22, c));
    return { h, INK, PAPER, RED, OKG, rr, circ, ell, anim, piv, spark, o, GEO: this.geo(), TINTS: this.tints(), POSES: this.poses(), NAMES: this.names() };
  }

  geo() {
    return {
      puff: {
        bust: '36 30 128 128',
        feet: [[88, 154, 5.5, 18], [112, 154, 5.5, 18]],
        wing: { w: 16, top: 7, L: 25, piv: [56, 104], deep: true },
        eyes: { y: 99, dx: 16, r: 6.4, white: false },
        beak: [100, 110, 10.5],
        cheek: { y: 112, dx: 28, rx: 7, ry: 4.2 },
        brow: { y: 87, w: 11, h: 3.2 },
        an: { chin: [10, 124], head: [36, 70], beak: [2, 111], grip: [14, 134], lap: [0, 136] },
        fx: { think: [136, 64], bubble: [150, 52], zzz: [124, 60], orbit: [100, 30], spark: [[60, 64], [146, 58], [154, 96]] },
      },
      stack: {
        bust: '34 26 132 132',
        feet: [[86, 152, 5.5, 20], [114, 152, 5.5, 20]],
        wing: { w: 14, top: 6, L: 21, piv: [57, 99], deep: false },
        eyes: { y: 63, dx: 13, r: 6.2, white: true },
        beak: [100, 76, 8.5],
        cheek: { y: 74, dx: 23, rx: 5, ry: 3 },
        brow: { y: 52.5, w: 10, h: 3 },
        an: { chin: [14, 86], head: [32, 52], beak: [3, 79], grip: [16, 104], lap: [0, 108] },
        fx: { think: [134, 46], bubble: [150, 40], zzz: [122, 46], orbit: [100, 26], spark: [[58, 50], [144, 44], [156, 84]] },
      },
      courier: {
        bust: '36 28 128 128',
        feet: [[89, 158, 5.5, 14], [111, 158, 5.5, 14]],
        wing: { w: 15, top: 6, L: 24, piv: [60, 102], deep: true },
        eyes: { y: 86, dx: 13.5, r: 6, white: false },
        beak: [100, 97, 9.5],
        cheek: { y: 97, dx: 25, rx: 6, ry: 3.6 },
        brow: { y: 75, w: 10, h: 3 },
        an: { chin: [14, 108], head: [32, 62], beak: [3, 100], grip: [14, 124], lap: [0, 132] },
        fx: { think: [134, 52], bubble: [150, 44], zzz: [124, 50], orbit: [100, 26], spark: [[62, 56], [142, 48], [152, 90]] },
      },
    };
  }

  tints() {
    return {
      red: { body: '#C42B26', deep: '#A3221E', belly: '#F2C9BC', cheek: '#F28B82', beak: '#E8A33D' },
      blue: { body: 'oklch(0.78 0.09 255)', deep: 'oklch(0.64 0.11 255)', belly: 'oklch(0.94 0.025 255)', cheek: '#F28B82', beak: '#E8A33D' },
      gold: { body: 'oklch(0.84 0.12 80)', deep: 'oklch(0.7 0.13 70)', belly: 'oklch(0.96 0.035 85)', cheek: '#F28B82', beak: '#D9822B' },
      orange: { body: 'oklch(0.72 0.17 35)', deep: 'oklch(0.6 0.17 35)', belly: 'oklch(0.93 0.04 55)', cheek: '#F2C9BC', beak: '#F2C14E' },
      rose: { body: 'oklch(0.66 0.19 18)', deep: 'oklch(0.54 0.18 18)', belly: 'oklch(0.93 0.035 18)', cheek: '#F9B8B0', beak: '#E8A33D' },
      teal: { body: 'oklch(0.74 0.1 185)', deep: 'oklch(0.6 0.1 190)', belly: 'oklch(0.94 0.03 185)', cheek: '#F28B82', beak: '#E8A33D' },
    };
  }

  poses() {
    return {
      idle: { wl: 14, wr: 14 },
      wave: { wl: 14, wr: 148, wrA: 'wave', eyes: 'happy', tilt: 3 },
      think: { wl: 14, wr: 'chin', look: [-2.2, -2.6], brows: 'focused', fx: 'think', anim: 'sway' },
      await: { wl: 'grip', wr: 'grip', prop: 'plan', propA: 'rock', eyes: 'wide', brows: 'raised', tap: true },
      approved: { wl: 26, wr: 26, eyes: 'happy', fx: 'sparkle' },
      celebrate: { wl: 158, wr: 158, wlA: 'flap', wrA: 'flap', eyes: 'happy', fx: 'confetti', anim: 'hop' },
      shrug: { wl: 78, wr: 78, wlA: 'shrug', wrA: 'shrug', eyes: 'closed', brows: 'worried', tilt: -5, anim: 'shrug' },
      sleep: { wl: 4, wr: 4, eyes: 'sleep', fx: 'zzz', anim: 'breathe', crest: 'droop' },
      confused: { wl: 14, wr: 'head', wrA: 'scratch', eyes: 'confused', brows: 'confused', tilt: 5, fx: 'orbit', anim: 'wobble' },
      secret: { wl: 'grip', wr: 'beak', prop: 'note', look: [-2.6, 0.4], lookA: 'look' },
      dates: { wl: 'grip', wr: 'grip', prop: 'calendar', look: [0, 2.4] },
      budget: { wl: 'grip', wr: 'grip', prop: 'coins', look: [0, 2.4] },
      compare: { wl: 70, wr: 70, wlA: 'alt', wrA: 'alt', propL: 'cardA', propR: 'cardB', lookA: 'look' },
      flights: { wl: 14, wr: 150, propR: 'plane', look: [2.4, -2.6] },
      mail: { wl: 'grip', wr: 'grip', prop: 'envelope', look: [0, 2.4] },
      doc: { wl: 'grip', wr: 'grip', prop: 'doc', look: [0, 2.2], lookA: 'read' },
      typing: { wl: 14, wr: 34, fx: 'bubble' },
      receipt: { wl: 14, wr: 150, propR: 'receipt', eyes: 'happy', fx: 'sparkle' },
    };
  }

  names() {
    return { idle: 'idle', wave: 'waving', think: 'thinking', await: 'waiting for your OK', approved: 'approved', celebrate: 'celebrating', shrug: 'passing on the plan', sleep: 'asleep', confused: 'confused', secret: 'keeping it private', dates: 'checking dates', budget: 'checking budgets', compare: 'comparing choices', flights: 'checking flights', mail: 'checking mail', doc: 'reading', typing: 'typing', receipt: 'done' };
  }

  confetti() {
    const C = ['#C42B26', 'oklch(0.78 0.09 255)', 'oklch(0.84 0.12 80)', 'oklch(0.72 0.17 35)', '#241E18', 'oklch(0.66 0.19 18)'];
    return [[46, 34, 0, 20, -10, 220, 1.9, 0], [62, 24, 1, -30, 8, -180, 2.2, 0.5], [78, 38, 2, 40, -6, 260, 1.7, 0.9], [94, 22, 3, -10, 12, 200, 2.1, 0.2], [108, 36, 4, 30, -12, -240, 1.8, 0.7], [122, 26, 5, -40, 6, 180, 2.3, 1.1], [138, 34, 0, 10, 10, -200, 2, 0.35], [154, 24, 1, 50, -8, 240, 1.9, 0.8], [70, 30, 3, 15, 14, 160, 2.2, 1.3], [130, 40, 2, -25, -14, -160, 1.75, 1.5]].map(([x, y, ci, rot, dx, r, dur, dl]) => [x, y, C[ci], rot, dx, r, dur, dl]);
  }

  propsFor(k, A) {
    const { h, INK, PAPER, RED, OKG, rr, circ } = k;
    const S = { stroke: INK, strokeWidth: 2.2, strokeLinejoin: 'round' };
    const card = (x, y, w, hh, r) => rr(x, y, w, hh, r, PAPER, S);
    const ln = (x, y, w, c, op) => rr(x, y, w, 3.4, 1.7, c, { opacity: op });
    const line = { fill: 'none', stroke: INK, strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' };
    return {
      plan: () => h('g', null, card(-25, -17, 50, 34, 8), rr(-14, -9.75, 13, 5.5, 2.75, RED), rr(-14, -2.75, 19, 5.5, 2.75, INK), rr(-14, 4.25, 24, 5.5, 2.75, INK)),
      calendar: () => h('g', null,
        rr(-20, -16, 40, 36, 6, RED), rr(-20, -6, 40, 26, 6, PAPER), h('rect', { x: -20, y: -6, width: 40, height: 8, fill: PAPER }),
        h('g', { style: A('pc-day', 3.6) }, circ(-11, 5, 5.2, RED, { opacity: 0.25 })),
        ...[-11, 0, 11].reduce((acc, x) => acc.concat([circ(x, 5, 1.9, INK, { opacity: 0.6 }), circ(x, 13.5, 1.9, INK, { opacity: 0.6 })]), []),
        rr(-20, -16, 40, 36, 6, 'none', S), h('path', { d: 'M-20 -6H20', stroke: INK, strokeWidth: 2.2 }),
        rr(-12.5, -21, 4.5, 10, 2.25, INK), rr(8, -21, 4.5, 10, 2.25, INK)),
      envelope: () => h('g', null, card(-22, -15, 44, 30, 5), h('path', Object.assign({ d: 'M-19 -11.5L0 2.5L19 -11.5' }, line)),
        h('g', { transform: 'translate(19 -14)' }, h('g', { style: A('pc-ping', 1.4) }, circ(0, 0, 5.5, RED, { stroke: PAPER, strokeWidth: 2 })))),
      note: () => h('g', null, card(-15, -18, 30, 36, 5), rr(-6.5, -3.5, 13, 10.5, 2.6, INK), h('path', { d: 'M-3.8 -3.5V-6.6a3.8 3.8 0 0 1 7.6 0V-3.5', fill: 'none', stroke: INK, strokeWidth: 2.2 }), ln(-8, 10, 16, INK, 0.35)),
      doc: () => h('g', null, card(-16, -20, 32, 40, 5), ln(-9, -12, 12, RED, 1), ln(-9, -5, 18, INK, 0.45), ln(-9, 1, 15, INK, 0.45), ln(-9, 7, 18, INK, 0.45), ln(-9, 13, 10, INK, 0.45)),
      coins: () => h('g', null, rr(-15, 7, 30, 10, 5, '#E8A33D', S), rr(-15, -1, 30, 10, 5, '#E8A33D', S), h('g', { style: A('pc-coin', 1.8) }, rr(-15, -9, 30, 10, 5, '#E8A33D', S))),
      cardA: () => h('g', null, card(-14, -11, 28, 22, 5), rr(-8, -5, 10, 5, 2.5, RED), ln(-8, 2, 16, INK, 0.4)),
      cardB: () => h('g', null, card(-14, -11, 28, 22, 5), rr(-8, -5, 10, 5, 2.5, 'oklch(0.66 0.11 255)'), ln(-8, 2, 16, INK, 0.4)),
      plane: () => h('g', { style: A('pc-float', 2.4) }, h('g', { transform: 'rotate(-10)' },
        rr(-16, 1, 26, 8, 4, PAPER, Object.assign({ transform: 'rotate(-24 -3 5)' }, S)),
        rr(-25, -19, 8, 20, 4, PAPER, Object.assign({ transform: 'rotate(-16 -21 0)' }, S)),
        rr(-27, -6.5, 56, 13, 6.5, PAPER, S),
        circ(-2, 0, 1.9, INK), circ(5, 0, 1.9, INK), circ(12, 0, 1.9, INK))),
      receipt: () => h('g', null, card(-15, -20, 30, 40, 4), ln(-9, -12, 14, INK, 0.5), ln(-9, -6, 18, INK, 0.5), ln(-9, 0, 11, INK, 0.5), circ(6, 11, 7.5, OKG), h('path', { d: 'M2.4 11.2l2.5 2.5l4.6-5', fill: 'none', stroke: '#FFFFFF', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' })),
      bubble: () => h('g', null, rr(-5, -5, 10, 10, 2, PAPER, Object.assign({ transform: 'translate(-12 12) rotate(45)' }, S)), rr(-22, -13, 44, 26, 13, PAPER, S), h('rect', { x: -17, y: 11.4, width: 10, height: 3.2, fill: PAPER }),
        ...[-9, 0, 9].map((x, i) => h('g', { style: A('pc-dot', 1.2, i * 0.15) }, circ(x, 0, 2.8, INK)))),
    };
  }

  bird(k, G, cid, poseId, tintId, o, idx) {
    const { h, INK, PAPER, RED, rr, circ, ell, piv, spark } = k;
    const P = k.POSES[poseId] || k.POSES.idle;
    const T = k.TINTS[tintId] || k.TINTS.red;
    const low = o.detail === 'low';
    const off = idx * 0.43;
    const A = (n, d, dl, e) => k.anim(n, d, (dl || 0) + off, e);
    const PR = this.propsFor(k, A);
    const W = G.wing, E = G.eyes;
    const pivX = (side) => (side < 0 ? W.piv[0] : 200 - W.piv[0]);

    const wingSpec = (side) => {
      const v = side < 0 ? P.wl : P.wr;
      if (typeof v === 'number') return { a: v, s: 1 };
      const t = G.an[v] || G.an.grip;
      const dx = 100 + side * t[0] - pivX(side), dy = t[1] - W.piv[1];
      return { a: (Math.atan2(side * dx, dy) * 180) / Math.PI, s: Math.max(0.9, Math.min(1.45, Math.hypot(dx, dy) / W.L)) };
    };
    const HELD = { plane: [8, -14], receipt: [4, -20], cardA: [-2, -14], cardB: [2, -14] };
    const WA = { wave: ['pc-wave', 0.9], flap: ['pc-flap', 0.5], shrug: ['pc-shrugw', 1.6], scratch: ['pc-scratch', 0.5], alt: ['pc-alt', 1.8] };
    const wing = (side) => {
      const { a, s } = wingSpec(side);
      const L = W.L * s;
      const wa = WA[side < 0 ? P.wlA : P.wrA];
      const hp = side < 0 ? P.propL : P.propR;
      const ho = HELD[hp] || [0, -14];
      const held = hp && PR[hp] && !low ? h('g', { transform: `translate(0 ${L.toFixed(2)}) rotate(${a.toFixed(2)}) scale(${side} 1) translate(${ho[0]} ${ho[1]})` }, PR[hp]()) : null;
      const st = wa ? A(wa[0], wa[1], wa[0] === 'pc-alt' && side > 0 ? 0.9 : 0) : undefined;
      return h('g', { transform: `translate(${pivX(side)} ${W.piv[1]}) scale(${side} 1) rotate(${(-a).toFixed(2)})` },
        h('g', { style: st }, held, rr(-W.w / 2, -W.top, W.w, W.top + L + W.w / 2, W.w / 2, W.deep ? T.deep : T.body)));
    };

    const ek = P.eyes || 'open';
    const er = E.r * (low ? 1.25 : 1);
    const lk = P.look || [0, 0];
    const blinkable = (ek === 'open' || ek === 'wide') && !low;
    const eye = (side) => {
      const cx = 100 + side * E.dx, cy = E.y;
      const stroke = (d) => h('path', { d, fill: 'none', stroke: INK, strokeWidth: er * 0.5, strokeLinecap: 'round' });
      if (ek === 'happy') return stroke(`M${cx - er} ${cy + er * 0.35}Q${cx} ${cy - er * 1.05} ${cx + er} ${cy + er * 0.35}`);
      if (ek === 'closed') return stroke(`M${cx - er} ${cy + er * 0.15}Q${cx} ${cy - er * 0.5} ${cx + er} ${cy + er * 0.15}`);
      if (ek === 'sleep') return stroke(`M${cx - er} ${cy - er * 0.1}Q${cx} ${cy + er * 0.8} ${cx + er} ${cy - er * 0.1}`);
      let r = er * (ek === 'wide' ? 1.14 : 1);
      if (ek === 'confused') r = side < 0 ? er * 1.22 : er * 0.74;
      let parts, bx = cx, by = cy;
      if (E.white) {
        const sr = r * 1.13;
        const px = cx + lk[0] * 0.8, py = cy + lk[1] * 0.8;
        parts = [circ(cx, cy, sr, PAPER), circ(px, py, sr * 0.56, INK), low ? null : circ(px + sr * 0.2, py - sr * 0.22, sr * 0.17, PAPER)];
      } else {
        bx = cx + lk[0];
        by = cy + lk[1];
        parts = [circ(bx, by, r, INK), low ? null : circ(bx + r * 0.34, by - r * 0.36, r * 0.33, PAPER)];
      }
      return blinkable ? piv(bx, by, A('pc-blink', 4.6, 1.3 + idx * 0.7), ...parts) : h('g', null, ...parts);
    };
    const eyes = P.lookA && !low
      ? h('g', { style: A(P.lookA === 'read' ? 'pc-read' : 'pc-look', P.lookA === 'read' ? 2.4 : 3.6) }, eye(-1), eye(1))
      : h('g', null, eye(-1), eye(1));

    const BR = { worried: [[-16, 0], [16, 0]], raised: [[-5, -3], [5, -3]], focused: [[12, 1.5], [-12, 1.5]], confused: [[-14, -3.5], [10, 1.5]] }[P.brows];
    const brows = BR && !low
      ? h('g', null, ...[-1, 1].map((side, i) => {
          const cx = 100 + side * E.dx, cy = G.brow.y + BR[i][1];
          return rr(cx - G.brow.w / 2, cy - G.brow.h / 2, G.brow.w, G.brow.h, G.brow.h / 2, INK, { transform: `rotate(${BR[i][0]} ${cx} ${cy})` });
        }))
      : null;
    const cheeks = low ? null : h('g', null, ...[-1, 1].map((side) => ell(100 + side * G.cheek.dx, G.cheek.y, G.cheek.rx, G.cheek.ry, T.cheek, { opacity: 0.9 })));
    const [bx0, by0, bs] = G.beak;
    const beak = rr(-bs / 2, -bs / 2, bs, bs, bs * 0.24, T.beak, { transform: `translate(${bx0} ${by0}) scale(1 1.08) rotate(45)` });
    const feet = h('g', null, ...G.feet.map(([x, y, w, hh], i) => {
      const el = rr(x - w / 2, y, w, hh, w / 2, INK);
      return P.tap && i === 1 ? piv(x, y + hh, A('pc-tap', 1.4), el) : el;
    }));
    const front = P.prop && PR[P.prop] && !low
      ? h('g', { transform: `translate(${100 + G.an.lap[0]} ${G.an.lap[1]})` }, P.propA === 'rock' ? piv(0, 0, A('pc-rock', 2.6), PR[P.prop]()) : PR[P.prop]())
      : null;

    const F = G.fx;
    const fx = [];
    if (!low) {
      if (P.fx === 'think') {
        const [x, y] = F.think;
        [[0, 0, 3], [8, -9, 4.4], [19, -21, 6]].forEach(([dx, dy, r], i) => fx.push(piv(x + dx, y + dy, A('pc-think', 1.6, i * 0.25), circ(x + dx, y + dy, r, INK))));
      }
      if (P.fx === 'zzz') {
        const [x, y] = F.zzz;
        [0, 1, 2].forEach((i) => {
          const zx = o.animate ? x : x + i * 10, zy = o.animate ? y : y - i * 12, s = o.animate ? 1 : 1 - i * 0.2;
          fx.push(piv(zx, zy, A('pc-z', 3, i), h('path', { d: `M${zx - 4 * s} ${zy - 4 * s}h${8 * s}l${-8 * s} ${8 * s}h${8 * s}`, fill: 'none', stroke: INK, strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' })));
        });
      }
      if (P.fx === 'orbit') {
        const [x, y] = F.orbit;
        fx.push(piv(x, y, A('pc-orbit', 2.4, 0, 'linear'), ...[0, 120, 240].map((d) => spark(x + 15 * Math.cos((d * Math.PI) / 180), y + 15 * Math.sin((d * Math.PI) / 180), 3.6, INK))));
      }
      if (P.fx === 'bubble') {
        const [x, y] = F.bubble;
        fx.push(h('g', { transform: `translate(${x} ${y})` }, PR.bubble()));
      }
      if (P.fx === 'sparkle') F.spark.forEach(([x, y], i) => fx.push(piv(x, y, A('pc-spark', 1.9, i * 0.6), spark(x, y, 5, i === 1 ? RED : INK))));
    }
    const confetti = P.fx === 'confetti' && !low
      ? h('g', null, ...this.confetti().map(([x, y, c, rot, dx, r, dur, dl]) =>
          piv(x, y, Object.assign({}, A('pc-fall', dur, dl, 'cubic-bezier(.25,.6,.4,1)'), { '--dx': dx + 'px', '--r': r + 'deg' }), rr(x - 1.9, y - 4.6, 3.8, 9.2, 1.9, c, { transform: `rotate(${rot} ${x} ${y})` }))))
      : null;
    const marks = o.construct
      ? h('g', null, ...[[pivX(-1), W.piv[1]], [pivX(1), W.piv[1]], [100 - E.dx, E.y], [100 + E.dx, E.y], [bx0, by0]].map(([x, y]) => h('circle', { cx: x, cy: y, r: 2.2, fill: RED })))
      : null;

    const BA = { bob: ['pc-bob', 2.8], sway: ['pc-sway', 3.2], hop: ['pc-hop', 1.15], shrug: ['pc-shrug', 1.6], breathe: ['pc-breathe', 3.8], wobble: ['pc-wobble', 1.9] }[P.anim || 'bob'];
    const bodyA = (dl) => (BA ? A(BA[0], BA[1], dl) : undefined);
    const stat = `rotate(${P.tilt || 0} 100 172)`;
    const face = [cheeks, beak, eyes, brows];
    const wl = wing(-1), wr = wing(1);

    if (cid === 'stack') {
      return [h('g', { transform: stat },
        piv(100, 172, bodyA(0), feet, rr(40, 128, 120, 30, 15, INK)),
        piv(100, 172, bodyA(0.08), rr(52, 91, 96, 30, 15, INK), front),
        piv(100, 172, bodyA(0.16), rr(66, 46, 68, 38, 19, T.body), ...face),
        piv(100, 172, bodyA(0.08), wl, wr),
        ...fx, marks), confetti];
    }
    let back, main;
    if (cid === 'puff') {
      const crest = [[88, 51.5], [100, 45], [112, 41.5]].map(([x, top], i) => {
        const el = rr(x - 4, top, 8, 78 - top, 4, T.deep);
        return P.fx === 'think' ? piv(x, 74, A('pc-pulse', 1.3, i * 0.18), el) : el;
      });
      back = h('g', { transform: P.crest === 'droop' ? 'rotate(24 100 70)' : undefined }, ...crest);
      main = [circ(100, 112, 50, T.body), ell(100, 130, 31, 26, T.belly)];
    } else {
      const crest = [[96, 38, -16, 22], [105, 43, 14, 17]].map(([x, top, rot, hh]) => rr(x - 3.5, top, 7, hh + 10, 3.5, T.deep, { transform: `rotate(${rot} ${x} ${top + hh + 5})` }));
      back = h('g', { transform: P.crest === 'droop' ? 'rotate(26 100 60)' : undefined }, ...crest);
      main = [rr(58, 54, 84, 112, 42, T.body), rr(74, 106, 52, 54, 26, T.belly),
        rr(-44.5, -3, 89, 6, 3, INK, { transform: 'translate(101 108) rotate(45.9)' }),
        rr(116, 128, 34, 26, 8, INK), rr(116, 128, 34, 13, 6.5, '#3A302A'), rr(128.5, 135, 9, 6, 3, RED)];
    }
    return [h('g', { transform: stat }, piv(100, 172, bodyA(0), feet, back, ...main, ...face, front, wl, wr, ...fx, marks)), confetti];
  }
}


export { PerchRig };
export const PERCH_POSES = ["idle","wave","think","await","approved","celebrate","shrug","sleep","confused","secret","dates","budget","compare","flights","mail","doc","typing","receipt"];
export const PERCH_TINTS = ["red","blue","gold","orange","rose","teal"];
export function renderPerch(h, props) {
  return new PerchRig(h, Object.assign({ concept: 'puff' }, props)).renderVals().art;
}
