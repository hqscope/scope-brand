# Scope brand

Logos, colors, type, and ready-to-upload images for Scope, Lectra Notes, and Polya.
Everything here is the final version. Explorations stay in the Claude Design
project ("Scope LinkedIn Banner Toolkit"), not in this folder.

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
| `color/` | `tokens.css` and `tokens.json`. The two files hold the same values |
| `type/` | Scope Stack, the custom display face (TTF) |
| `texture/` | Film grain: `grain.svg` for light grounds, `grain-light.svg` for dark |
| `social/profile/` | 800 × 800 profile photos: Scope haze (default), Deep, Cream, Red, plus Lectra and Polya |
| `social/x/` | X header, 1500 × 500 |
| `social/posts/`, `social/story/` | Post and story templates (1600 × 900, 1080 × 1080, 1080 × 1350, 1080 × 1920) |
| `social/youtube/` | YouTube channel art, 2560 × 1440 (Glow) |
| `backgrounds/` | Glow backgrounds: Zoom and Meet 1920 × 1080, desktop wallpaper 2560 × 1600, phone wallpaper 1170 × 2532, slide 1920 × 1080 |
| `linkedin/` | Banners at 3168 × 792, which is 2× LinkedIn's 1584 × 396: light (5a), dark (5b), and haze (2c), a personal profile banner with a small mark top-right so the profile photo doesn't cover it. The "Agentic learning is here" banners come in dark (3a) and light (3b). Post images at 2×: landscape 2400 × 1254 (for 1200 × 627) and square 2400 × 2400 (for 1200 × 1200). Pair the post images with a plain-text post |
| `web/link-previews/` | 1200 × 630 share images for canvascope.org, docs.canvascope.org, and askpolya.com |
| `web/link-preview-background-1200x630.jpg` | Haze with a cream center. scope-web puts each page's title on it for that page's link preview |
| `web/favicon.svg` | Site favicon |
| `store/chrome-web-store/` | Small promo tile 440 × 280, marquee 1400 × 560, store icon 128 × 128 |
| `store/app-store/lectra/` | Lectra Notes product page header (21:9, 3840 × 1646) and search results image (3:2, 3840 × 2560), with app screens. `backgrounds/` has the same two sizes as plain haze, light and night |
| `source/` | Editable pages that every PNG above is rendered from |
| `tools/` | `render-all.sh` regenerates every PNG from `source/` |

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
