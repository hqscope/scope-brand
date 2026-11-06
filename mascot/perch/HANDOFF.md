# Handoff: Perch mascot and Scope Mesh logo (source notes)

Copied from the "Scope mascot design" Claude Design project
(`design_handoff_perch_and_scope_mesh/README.md`). The rig (`perch.js`) and keyframes
(`perch-keyframes.css`) here are the project's files; `logo/scope-mesh/` is generated from
the spec below by `tools/build-mesh-logo.mjs`.

## Scope Mesh logo (option "2b Network")
The Scope mark (three pills, 32 : 46 : 58, red on top) redrawn as a mesh of nodes and links.

- Grid: same 58 × 56 units as the Scope mark. Rows sit on the pill centerlines y = 7, 28, 49;
  each row runs cap center to cap center of its pill, so row lengths stay 32 : 46 : 58.
- Nodes: a, b (7,7), (25,7) r 7 Scope red #C42B26. c, d, e (7,28), (23,28), (39,28) r 7, 5.4, 7 ink #241E18.
  f, g, k, i (7,49), (21.67,49), (36.33,49), (51,49) r 7, 5.4, 5.4, 7 ink.
- Row links width 5, round caps: a–b (red), c–d, d–e, f–g, g–k, k–i (ink).
- Cross links width 2.6, round caps, ink: a–c, a–d, b–d, b–e, c–f, c–g, d–g, d–k, e–k, e–i.
- Draw order: cross links, row links, nodes.
- Small version (≤ 32 px): inner nodes r 6.2, row links 6, cross links 3.6 (`scope-mesh-favicon.svg`).
- Dark grounds: bright red #E5484D and cream #F6F1E7 (`-reverse`).
- Icon: 100 × 100 tile, radius 22, mark at x 21, y 22. Tile cream #F6F1E7 or Deep #14100C.
- Lockup: mark height 1.15 × font size, gap 0.33 em, then "Scope Mesh" in Schibsted Grotesk Bold,
  tracking −0.03 em, ink (cream on Deep). Inline SVG mark + text.
- Where it goes: hero badge in `MeshHero.tsx` (replace the red dot before "Scope Mesh · early preview",
  mark at 13 × 12.5 px); `MeshStatus.tsx` header (replace the two small pills next to "mesh 7f31",
  16 × 15.5 px); favicon and MCP connector icon (`scope-mesh-favicon.svg` / `scope-mesh-icon.svg`).

## Perch, the mascot (concept "1a Puff")
A round bird built only from Scope pills and circles. Every agent in a mesh is a Perch: the viewer's
own Perch is Scope red, other people's use the scope-brand haze colors. It never speaks. One pose per
state and per task, and the interface always shows the status word next to it. The round-bird
`PerchMark` stays the Perch logo and app icon; the mascot is a separate character.

### Component
`renderPerch(React.createElement, { pose, tint, bar, animate, crop, detail, sticker, crew, crewPoses })`
- pose: see table (default idle). tint: red (yours), blue, gold, orange, rose (other people).
- bar: ink perch bar under the feet (default true). animate: run the loop; false under prefers-reduced-motion.
- crop: full (0 0 200 200), tight (16 20 168 168), bust (36 30 128 128).
- detail: low drops brows, cheeks, highlights, props, effects, enlarges eyes 1.25×; use at ≤ 32 px.
- sticker: white die-cut outline + soft shadow (viewBox −10 −8 220 220).
- crew / crewPoses: comma lists; several Perches on one bar, 128 units apart.
The SVG fills its container and carries role="img" and an aria-label ("Perch, checking dates").
Load `perch-keyframes.css` once.

### Colors
| Tint | Body | Wings + crest | Belly | Cheek | Beak |
|---|---|---|---|---|---|
| red (yours) | #C42B26 | #A3221E | #F2C9BC | #F28B82 | #E8A33D |
| blue | oklch(0.78 0.09 255) | oklch(0.64 0.11 255) | oklch(0.94 0.025 255) | #F28B82 | #E8A33D |
| gold | oklch(0.84 0.12 80) | oklch(0.7 0.13 70) | oklch(0.96 0.035 85) | #F28B82 | #D9822B |
| orange | oklch(0.72 0.17 35) | oklch(0.6 0.17 35) | oklch(0.93 0.04 55) | #F2C9BC | #F2C14E |
| rose | oklch(0.66 0.19 18) | oklch(0.54 0.18 18) | oklch(0.93 0.035 18) | #F9B8B0 | #E8A33D |
| teal | oklch(0.74 0.1 185) | oklch(0.6 0.1 190) | oklch(0.94 0.03 185) | #F28B82 | #E8A33D |
Ink #241E18, paper #FBF7EE, ok green #1F6B45.

### Poses
| id | Name | Status word | When | Loop |
|---|---|---|---|---|
| idle | Idle | Joined | In the mesh, nothing asked yet | bob 2.8 s, blink 4.6 s |
| wave | Hello | Joined | Arrives in a mesh or a group chat | wing wave 0.9 s |
| think | Thinking | Answering | Works out a private answer | sway 3.2 s, crest pulse, thought dots |
| await | Asks first | Needs your OK | Holds the exact plan until the person approves | card rock 2.6 s, foot tap 1.4 s |
| approved | Approved | Approved | The person said yes | bob, sparkles 1.9 s |
| celebrate | Everyone's in | It's a plan | Every person approved | hop 1.15 s, flap 0.5 s, confetti |
| shrug | Passed | Not this time | The person passed | shrug 1.6 s |
| sleep | Asleep | Expired | A mesh expires after 7 days | breathe 3.8 s, z's 3 s |
| confused | Confused | Something went wrong | Errors, 404, 503 | wobble 1.9 s, scratch 0.5 s, orbit 2.4 s |
| secret | Keeps it private | Answering | Shares a yes or no, never the data behind it | glance 3.6 s |
| dates | Checks dates | Checking dates | "Free Mar 12–18?" | day highlight 3.6 s |
| budget | Checks budgets | Checking budgets | "Tokyo at $1,280 within budget?" | coin hops 1.8 s |
| compare | Compares | Comparing choices | "Rank Tokyo and Seoul" | wings alternate 1.8 s |
| flights | Checks flights | Checking flights | "Prefer nonstop?" | plane floats 2.4 s |
| mail | Checks mail | Checking mail | Reads the thread and Sent mail first | unread dot pings 1.4 s |
| doc | Reads | Checking Canvas | Assignments, syllabi, Drive comments | reading glance 2.4 s |
| typing | Talks in the group | Typing | Speaks for a person in a group chat | bubble dots 1.2 s |
| receipt | Done | Added to your calendar | Reports a receipt after it acts | sparkles |
In a crew, each bird's loops are offset by 0.43 s.

### Placement
- Hero network (`MeshNetwork.tsx`, `MeshNode.tsx`): a 70 px Perch (bar off) on the top edge of each agent's
  dashed boundary, 4 px in from a corner, on the side away from the answer pill. Noel red, Maya blue,
  Daniel gold, Priya teal. Node state → pose: idle → idle; querying → the round's task pose
  (dates / budget / compare / flights); responded → idle; reviewing → await (76 px); approved → approved;
  complete → receipt.
- Trip demo (`TripDemo.tsx`): Priya's Perch, 104 px, `await`, on the proposal card's top edge 18 px from the
  right (right column gets 96 px top padding). Approval rows get a 24 px bust avatar (low detail) in each
  person's tint before the name.
- Perch app demo (`PerchDemo.tsx`): while Perch checks something, the typing row becomes the task pose
  (84 px, tight crop) plus a status chip (Spline Sans Mono 12 px, red 8 px dot). Perch's 32 px avatar is the
  bust at low detail on #F3EAD9. On an approval card, a 64 px `await` (tight crop) inside the top-right
  corner. In group chats, agent avatars become busts in the person's tint (dashed outline kept, plus a
  16 px initial badge); people keep initials. Empty chat: 168 px `wave` above "Perch will text you here."
- 404: 220 px `confused` beside the text. 503: same layout, 220 px `sleep`; proposed copy "Scope Mesh can't
  be reached right now." / "Try again in a few minutes." (needs review).
- Docs: 150 px `doc` to the right of the page title.
- Status chips: 40 px tight-crop pose + the status word, pill with a 1 px #E7E3DD border.

### Rules
- Always show the status word next to a pose; the bird never stands in for words.
- Perch never approves for anyone. Approve stays a button the person taps.
- The viewer's Perch is Scope red; everyone else's uses a haze color.
- No words inside the art. At 32 px and below use detail low and no props or effects.
- Under prefers-reduced-motion, render animate false.
