# Game Design Rules — CS Arcade

_The contract EVERY game must follow. Read before adding or editing a game._
_Last updated: 2026-07-10 · v3.1_

## Audience
Indian Class 8–10, but fun and winnable for kids ~10+. Light jargon, no heavy
algorithms. Name the concept in plain language. Early levels genuinely easy; ramp gently.

## File & structure
1. ONE self-contained file: `games/<slug>/index.html`. `<!DOCTYPE html>`, viewport meta,
   all CSS in one `<style>`, all JS in one `<script>` at end of `<body>`.
2. **Vanilla JS only.** No libraries, CDNs, web fonts, or remote images. System fonts +
   emoji only. Must work offline.
3. The ONLY external refs allowed (exact relative paths):
   ```html
   <script src="../../assets/js/audio.js"></script>
   <script src="../../assets/js/arcade.js"></script>
   ```
   audio.js first. **Never edit anything in `assets/`** from a game.
4. Call once on load: `Arcade.mount({ title:'<Title>', accent:'<#hex>' });` and leave
   `padding-top:64px` so content clears the fixed top bar. Do NOT build your own back
   button, mute button, timer, or tutorial — the shared engine provides them.

## 20 levels
Every game has a visible **Level N/20** climb of rising difficulty. Reaching Level 20 is a
win (victory screen + `Arcade.confetti()`). Endless bonus past 20 is fine. Keep every
level completable and verify it.

## Sound (use meaningfully, ≥5 effects)
`SFX.play(name)` — UI: hover/click/select/button/tick/blip/move/flip/step/swap/type/
whoosh/start. Feedback: correct/coin (right), wrong/error (mistake), win/fanfare (win),
lose (game over), powerup/portal. Custom tones via `SFX.tone/chord/noise`. Never create
your own AudioContext — always go through `SFX`.

## Scoring (REQUIRED — powers the fair leaderboard)
- At **each level-up** call: `Arcade.report('<slug>', levelReached, 20);` so partial
  progress counts even under the timer.
- At **game over / win** call: `Arcade.best('<slug>', rawScore, levelReached [,20]);`
  (also keeps the local raw "Best" for display).
- `levelReached` is 0..20 (levels cleared / rounds survived / correct answers). Higher is
  always better. The engine normalizes to 0..1000 for the leaderboard — do NOT roll your
  own leaderboard, name prompt, or point scaling.

## Timer (provided centrally — do not add your own session timer)
Every game gets an equal 90-second session timer from `Arcade.mount`. A game MAY keep its
own per-round timer for pacing, but must not add a second full-session timer.

## Tutorial (provided centrally)
`Arcade.mount` auto-shows a "How to Play" card from the `TUTORIALS` map in `arcade.js`
(keyed by slug). **When you add a new game, add its tutorial entry to that map**
(emoji, title, 2–3 short steps, one-line learning goal). Do not add your own tutorial
popup. A short one-line on-board hint is fine.

## Look & feel
Distinct, polished theme per game (own gradient/palette around the accent). Rounded cards,
nice spacing, tasteful animation/juice. Fully responsive (phone portrait → projector);
big tap targets; no horizontal scroll; no hover-only interactions on touch.

## Quality bar
Clear start → play → win/lose → restart loop; no dead ends; no console errors; keep the
file focused (< ~650 lines). Verify: `node --check` the inline script (or the repo
validator), balanced tags, mount called, scoring calls present, levels winnable.

## When adding a game, also:
- Add it to `assets/js/games.js` (slug, icon, title, desc, tag, glow) — the hub &
  leaderboard read from there.
- Add its tutorial to `TUTORIALS` in `arcade.js`.
- Run the validator and the jsdom DOM smoke harness; update all `IMP_DOCS/`.
