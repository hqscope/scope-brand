#!/usr/bin/env bash
# Regenerate every PNG export from the pages in source/.
# Needs Google Chrome, Node 22+ (global WebSocket and fetch), and ImageMagick.
# Usage: tools/render-all.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
RENDER="node $ROOT/tools/render.mjs"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# Artboard <id> on a kit page is the second child of the element with that id.
ab() { echo "[id=\"$1\"] > div:nth-child(2)=$2"; }

cd "$ROOT/source"

$RENDER "Scope Social Kit.dc.html" "$TMP/x1" 1 \
  "$(ab 1g scope-x-header-1500x500)" \
  "$(ab 1h scope-post-tip-1600x900)" "$(ab 1i scope-post-haze-1080)" \
  "$(ab 1j scope-post-apps-1080x1350)" "$(ab 1k scope-story-night-1080x1920)" \
  "$(ab 1l canvascope-link-preview-1200x630)" "$(ab 1m docs-link-preview-1200x630)" \
  "$(ab 1n polya-link-preview-1200x630)" \
  "$(ab 1o scope-cws-small-tile-440x280)" "$(ab 1p scope-cws-marquee-1400x560)" \
  "$(ab 1q scope-cws-icon-128)"

$RENDER "Scope Social Kit.dc.html" "$TMP/x2" 2 \
  "$(ab 1a scope-profile-haze-800)" "$(ab 1b scope-profile-deep-800)" \
  "$(ab 1c scope-profile-cream-800)" "$(ab 1d scope-profile-red-800)" \
  "$(ab 1e lectra-profile-800)" "$(ab 1f polya-profile-800)" \
  "$(ab 2a scope-linkedin-post-landscape-2400x1254)" "$(ab 2b scope-linkedin-post-square-2400x2400)" \
  "$(ab 2c scope-linkedin-banner-haze-3168x792)"

# Glow set (3a–3l): already drawn at full size, so 1×.
$RENDER "Scope Social Kit.dc.html" "$TMP/glow" 1 \
  "$(ab 3a scope-profile-glow-800)" "$(ab 3b scope-post-glow-1080)" \
  "$(ab 3c scope-story-glow-1080x1920)" "$(ab 3d scope-x-header-glow-1500x500)" \
  "$(ab 3e scope-link-preview-glow-1200x630)" "$(ab 3f scope-zoom-background-glow-1920x1080)" \
  "$(ab 3g scope-wallpaper-desktop-glow-2560x1600)" "$(ab 3h scope-wallpaper-phone-glow-1170x2532)" \
  "$(ab 3i scope-cws-marquee-glow-1400x560)" "$(ab 3j scope-cws-small-tile-glow-440x280)" \
  "$(ab 3k scope-youtube-channel-glow-2560x1440)" "$(ab 3l scope-slide-background-glow-1920x1080)"

$RENDER "Scope LinkedIn Kit.dc.html" "$TMP/x2" 2 \
  "$(ab 5a scope-linkedin-banner-light-3168x792)" "$(ab 5b scope-linkedin-banner-dark-3168x792)"

$RENDER "Lectra App Store Screens.html" "$TMP/x1" 1 \
  "#header=lectra-appstore-header-screens-3840x1646" \
  "#search=lectra-appstore-search-screens-3840x2560"

# Background for the per-page link preview cards scope-web draws (src/lib/og-card.tsx).
$RENDER "Web Card Background.html" "$TMP/x1" 1 "#card=link-preview-background-1200x630"
magick "$TMP/x1/link-preview-background-1200x630.png" -alpha off -quality 90 "$ROOT/web/link-preview-background-1200x630.jpg"

# Stores reject images with an alpha channel, so flatten everything except the icon.
place() { # place <file> <dest dir>
  local src="$TMP/$1"
  mkdir -p "$ROOT/$2"
  if [[ "$1" == *icon-128* ]]; then cp "$src" "$ROOT/$2/"; return; fi
  magick "$src" -background '#14100C' -alpha remove -alpha off "PNG24:$ROOT/$2/$(basename "$1")"
}

for f in x2/scope-profile-{haze,deep,cream,red}-800.png x2/lectra-profile-800.png x2/polya-profile-800.png; do place "$f" social/profile; done
place x1/scope-x-header-1500x500.png social/x
for f in x1/scope-post-tip-1600x900.png x1/scope-post-haze-1080.png x1/scope-post-apps-1080x1350.png; do place "$f" social/posts; done
place x1/scope-story-night-1080x1920.png social/story
for f in x2/scope-linkedin-banner-{light,dark,haze}-3168x792.png x2/scope-linkedin-post-landscape-2400x1254.png x2/scope-linkedin-post-square-2400x2400.png; do place "$f" linkedin; done
for f in x1/{canvascope,docs,polya}-link-preview-1200x630.png; do place "$f" web/link-previews; done
for f in x1/scope-cws-{small-tile-440x280,marquee-1400x560,icon-128}.png; do place "$f" store/chrome-web-store; done
for f in x1/lectra-appstore-{header-screens-3840x1646,search-screens-3840x2560}.png; do place "$f" store/app-store/lectra; done

place glow/scope-profile-glow-800.png social/profile
place glow/scope-post-glow-1080.png social/posts
place glow/scope-story-glow-1080x1920.png social/story
place glow/scope-x-header-glow-1500x500.png social/x
place glow/scope-youtube-channel-glow-2560x1440.png social/youtube
place glow/scope-link-preview-glow-1200x630.png web/link-previews
for f in glow/scope-cws-{marquee-glow-1400x560,small-tile-glow-440x280}.png; do place "$f" store/chrome-web-store; done
for f in glow/scope-{zoom-background-glow-1920x1080,wallpaper-desktop-glow-2560x1600,wallpaper-phone-glow-1170x2532,slide-background-glow-1920x1080}.png; do place "$f" backgrounds; done

echo "Done. Check sizes with: magick identify -format '%f %wx%h %[channels]\n' */*.png */*/*.png"
