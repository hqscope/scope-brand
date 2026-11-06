# Scope brand

Logos, colors, type, and ready-to-upload images for Scope, Lectra Notes, Polya, and Scope Mesh,
plus Perch, the Scope Mesh mascot.
Everything here is the final version. Explorations stay in the Claude Design
projects ("Scope LinkedIn Banner Toolkit", and "Scope mascot design" for Perch and the
Scope Mesh logo), not in this folder.

## The look

The brand runs on one pair of looks, light and dark, set by LinkedIn banners 5a and 5b:

- **Haze.** Large blurred pills of red, blue, orange, and gold under film grain.
  Light haze sits on a warm peach ground (`--haze-ground`); night haze sits on
  Deep (`#14100C`). Keep the grain. Don't use a smooth gradient.
- **Lockup.** *Study with* in Newsreader italic, then the Scope mark, then **Scope**
  in Schibsted Grotesk Bold. The mark sits at 0.7 em, between the words.
- **Supporting line.** "Free study tools for every student." in Schibsted Grotesk
  Medium. Set the URL (`canvascope.org`) in Spline Sans Mono.

A third look, **Glow**, is for places where one quiet image beats a message: a wide,
grainy red glow on Deep with the Ink mark in the middle, and no text. Glow files end
in `-glow`. Use them for wallpapers, call backgrounds, slide backgrounds, and
channel art, or as an alternate profile, header, or post image.

## Folders

| Folder | What's in it |
|---|---|
| `logo/scope/` | Mark, logo, wordmark, stacked logo, app icons, and the Docs logo, as SVG |
| `logo/lectra/`, `logo/polya/` | Each app's mark, icon, and 1024 px app icon. Polya also has its wordmark |
| `logo/scope-mesh/` | Scope Mesh mark (default, `-reverse`, `-ink`, `-cream`), icon (cream and `-deep`), and favicon, as SVG. `png/` has the 512 px icons, the 480 px mark, and the 32 px favicon. See [Scope Mesh logo](#scope-mesh-logo) |
| `mascot/perch/` | Perch, the Scope Mesh mascot: the rig (`perch.js`) and its keyframes (`perch-keyframes.css`), `svg/poses/` and `svg/poses-no-perch/` (18 poses each, with and without the bar), `svg/avatars/` (5 tints, regular and `-small`), `svg/perch-crew.svg`, and `stickers/` (SVG and PNG). `HANDOFF.md` is the design handoff. See [Perch](#perch-the-scope-mesh-mascot) |
| `color/` | `tokens.css` and `tokens.json`. The two files hold the same values |
| `type/` | Scope Stack, the custom display face (TTF) |
| `texture/` | Film grain: `grain.svg` for light grounds, `grain-light.svg` for dark |
| `social/profile/` | 800 × 800 profile photos: Scope haze (default), Deep, Cream, Red, plus Lectra and Polya |
| `social/x/` | X header, 1500 × 500 |
| `social/posts/`, `social/story/` | Post and story templates (1600 × 900, 1080 × 1080, 1080 × 1350, 1080 × 1920) |
| `social/youtube/` | YouTube channel art, 2560 × 1440 (Glow) |
| `backgrounds/` | Glow backgrounds: Zoom and Meet 1920 × 1080, desktop wallpaper 2560 × 1600, phone wallpaper 1170 × 2532, slide 1920 × 1080 |
| `linkedin/` | Banners at 3168 × 792, which is 2× LinkedIn's 1584 × 396: light (5a), dark (5b), and haze (2c). The "Agentic learning is here" banners come in dark (3a) and light (3b). Post images at 2×: landscape 2400 × 1254 (for 1200 × 627) and square 2400 × 2400 (for 1200 × 1200). Pair the post images with a plain-text post |
| `web/link-previews/` | 1200 × 630 share images for canvascope.org, docs.canvascope.org, and askpolya.com |
| `web/link-preview-background-1200x630.jpg` | Haze with a cream center. scope-web puts each page's title on it for that page's link preview |
| `web/favicon.svg` | Site favicon |
| `store/chrome-web-store/` | Small promo tile 440 × 280, marquee 1400 × 560, store icon 128 × 128 |
| `store/app-store/lectra/` | Lectra Notes product page header (21:9, 3840 × 1646) and search results image (3:2, 3840 × 2560), with app screens. `backgrounds/` has the same two sizes as plain haze, light and night |
| `source/` | Editable pages that every PNG above is rendered from |
| `tools/` | `render-all.sh` regenerates every PNG from `source/`. `build-mesh-logo.mjs` and `build-perch-mascot.mjs` rebuild `logo/scope-mesh/` and `mascot/perch/` (add `--png` for the PNGs) |

## Naming

`<product>-<thing>[-<variant>][-<size>].<ext>`, all lowercase.

Logo color variants:

| Suffix | Use it on |
|---|---|
| none | Light backgrounds. Ink pills with a red top pill |
| `-reverse` | Dark backgrounds. Cream pills with a bright red top pill |
| `-ink`, `-cream` | Single-color use: ink on light, cream on dark |
| `-on-red` | Scope Red backgrounds |

## Colors

| Token | Hex | Use |
|---|---|---|
| Scope Red | `#C42B26` | Accent on light backgrounds |
| Scope Red, bright | `#E5484D` | Accent on dark backgrounds |
| Ink | `#241E18` | Text and pills on light backgrounds |
| Deep | `#14100C` | Dark backgrounds |
| Cream | `#F6F1E7` | Logo on dark, cards, light surfaces |
| Paper | `#FBF7EE` | Page background |

Red is the accent, never the background of a whole page, except for the `-on-red`
profile photo. Lectra uses Scope Red and Ink on `#F3EDE4`. Polya uses Plum
`#5A2147` and Blush `#FBEFF5`. Haze colors and warm neutrals are in `color/tokens.css`.

## Type

| Face | Role | Where to get it |
|---|---|---|
| Schibsted Grotesk | Everything: headlines, body, the word "Scope" | Google Fonts |
| Newsreader Italic | The *Study with* lead-in, and short serif accents | Google Fonts |
| Spline Sans Mono | URLs, labels, keyboard shortcuts | Google Fonts |
| Scope Stack | Display only, sparingly | `type/ScopeStack-Regular.ttf` |

All four are free under the SIL Open Font License.

## Scope Mesh logo

The Scope mark redrawn as a mesh: nine nodes on the mark's three pill rows, joined by links.
The rows keep the mark's 32 : 46 : 58 lengths, and the top row stays red.

| File | Use it on |
|---|---|
| `scope-mesh-mark.svg` | Light backgrounds. Ink nodes, Scope Red top row |
| `scope-mesh-mark-reverse.svg` | Dark backgrounds. Cream nodes, bright red top row |
| `scope-mesh-mark-ink.svg`, `-cream.svg` | Single-color use |
| `scope-mesh-icon.svg`, `scope-mesh-icon-deep.svg` | App and connector icons: the mark on a Cream or Deep tile, radius 22 of 100 |
| `scope-mesh-favicon.svg` | 32 px and smaller |

- **Small sizes.** At 32 px and below, use the favicon geometry: thicker links and larger inner
  nodes, so the mesh doesn't fill in. The sites use it for the 13 px and 16 px marks too.
- **Lockup.** The mark at 1.15 × the font size, a 0.33 em gap, then "Scope Mesh" in Schibsted
  Grotesk Bold with −0.03 em tracking. Ink on light, Cream on Deep. mesh.canvascope.org builds it
  as inline SVG plus text.
- **Rebuild.** `node tools/build-mesh-logo.mjs --png`. The geometry lives in that script.

## Perch, the Scope Mesh mascot

A round bird built only from Scope pills and circles. Every agent in a mesh is a Perch. The
round-bird `PerchMark` stays the Perch app's logo and icon; the mascot is a separate character.

### Rules

- **Always show the status word next to a pose.** The bird never stands in for words.
- **Perch never approves for anyone.** Approving stays a button the person taps.
- The viewer's own Perch is Scope Red. Everyone else's uses a haze tint.
- No words inside the art. At 32 px and below, use the `-small` avatars (low detail: no brows,
  cheeks, highlights, props, or effects, and larger eyes).
- Under reduced motion, show Perch still.

### Colors

| Tint | Body | Wings and crest | Belly | Cheek | Beak |
|---|---|---|---|---|---|
| red (yours) | `#C42B26` | `#A3221E` | `#F2C9BC` | `#F28B82` | `#E8A33D` |
| blue | `#90BAF1` | `#5D8ECE` | `#E0ECFC` | `#F28B82` | `#E8A33D` |
| gold | `#F4C26A` | `#D18E35` | `#FDF1D8` | `#F28B82` | `#D9822B` |
| orange | `#FC7756` | `#D25030` | `#FEE2CF` | `#F2C9BC` | `#F2C14E` |
| rose | `#F05465` | `#C13045` | `#FFDFDF` | `#F9B8B0` | `#E8A33D` |

Ink `#241E18`, Paper `#FBF7EE`, ok green `#1F6B45`. The haze tints are defined in `oklch()`
(see `HANDOFF.md`), and the rig and the sites use those values. The hex values above, and the
colors in the SVG and PNG files, are their sRGB equivalents, because most design tools can't
read `oklch()`.

### Poses

| Pose | Status word | When |
|---|---|---|
| `idle` | Joined | In the mesh, nothing asked yet |
| `wave` | Joined | Arrives in a mesh or a group chat |
| `think` | Answering | Works out a private answer |
| `await` | Needs your OK | Holds the exact plan until the person approves |
| `approved` | Approved | The person said yes |
| `celebrate` | It's a plan | Every person approved |
| `shrug` | Not this time | The person passed |
| `sleep` | Expired | A mesh expires after 7 days |
| `confused` | Something went wrong | Errors, 404, 503 |
| `secret` | Answering | Shares a yes or no, never the data behind it |
| `dates` | Checking dates | "Free Mar 12–18?" |
| `budget` | Checking budgets | "Tokyo at $1,280 within budget?" |
| `compare` | Comparing choices | "Rank Tokyo and Seoul" |
| `flights` | Checking flights | "Prefer nonstop?" |
| `mail` | Checking mail | Reads the thread and Sent mail first |
| `doc` | Checking Canvas | Assignments, syllabi, Drive comments |
| `typing` | Typing | Speaks for a person in a group chat |
| `receipt` | Added to your calendar | Reports a receipt after it acts |

### Sizes

| Where | Size |
|---|---|
| Status chip | 40 px tight-crop pose plus the status word |
| Avatar | 32 px bust, low detail. 24 px in dense lists |
| Hero network node | 70 px, no bar (76 px while it waits for an OK) |
| Card corner (`await`) | 64 to 104 px |
| Empty state, 404, 503 | 168 to 220 px |

### Files and code

- `svg/poses/perch-<pose>.svg` sits on the ink bar; `svg/poses-no-perch/` has no bar, for
  placing Perch on the edge of a card.
- `svg/avatars/perch-avatar-<tint>.svg` is the 128 px bust; `-small` is the 32 px low-detail bust.
- `stickers/` has every pose as a die-cut sticker (1024 px PNG) and the crew (2416 × 840).
- In code, use the rig: `renderPerch(React.createElement, { pose, tint, bar, animate, crop, detail, sticker, crew, crewPoses })`,
  and load `perch-keyframes.css` once. mesh.canvascope.org and perch.canvascope.org use a typed
  React port of it (`src/components/mascot/Perch.tsx`).
- **Rebuild.** `node tools/build-perch-mascot.mjs --png`. It renders the rig still with React
  from `../scope-mesh/node_modules` (set `PERCH_REACT_FROM` to use another app).

## Rules for store and preview images

- Upload PNGs with no alpha channel, or JPEGs. The Chrome Web Store and App Store
  Connect both reject transparency. `render-all.sh` flattens every image except
  the 128 px store icon.
- The largest Glow files are the desktop wallpaper (about 4 MB) and the YouTube art
  (about 3.7 MB). If a site rejects one for size, upload a JPEG copy instead.
- Keep text out of the App Store header and search results images. The App Store
  crops them differently on every device, and text near the edges gets cut off.
  Keep the focal point centered.
- Screens in store images are real app UI with sample courses. Never use a
  screenshot that shows a real student's data.

## Regenerate the images

You need Google Chrome, Node 22 or later, and ImageMagick.

```bash
tools/render-all.sh
```

To change an artboard, edit its page in `source/`, then run the script. The
`.dc.html` pages come from the Claude Design project. They need `support.js` and
`image-slot.js` next to them, and they open in any browser.

## Not redone in the final look yet

These still use the older pill-stripe and Scope Stack styles, so they aren't here:

- The brand guidelines page
- LinkedIn team, hiring, and launch banners, and the older LinkedIn post templates
  (announcement, release, tip, carousel). The haze post images in `linkedin/` replace them for now
- Print templates (never built)
