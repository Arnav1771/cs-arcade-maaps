# Technical Spec — CS Arcade

_Last updated: 2026-07-10 · v3.1_

## Stack
Vanilla HTML/CSS/JS. Zero dependencies, zero external network requests (CSP-safe,
offline-capable). Hosted on GitHub Pages (static). `.nojekyll` disables Jekyll.

## File layout
```
index.html                 hub: name gate → pick 4 → locked/play grid
leaderboard.html           rankings (podium + table + CSV export + reset)
.nojekyll
README.md
assets/
  js/audio.js              SFX engine  (global: SFX)
  js/arcade.js             chrome/timer/tutorial/scoring/leaderboard (global: Arcade)
  js/games.js              catalogue   (global: CS_GAMES)
  sfx/*.wav                10 CC0 clips + ORIGINAL_INFO.txt
games/<slug>/index.html    15 self-contained games
IMP_DOCS/                  these docs
```

## Slugs (15)
binary-blitz, logic-lab, robot-runner, type-rush, memory-matrix, power-2048,
sort-it-out, cs-quiz, cipher-crack, simon-signals, number-ninja, word-wizard,
bug-squash, tower-master, pattern-quest.  (power-2048 replaced the retired hex-hunter.)

## SFX engine — `SFX` (audio.js)
- Hybrid: synthesized WebAudio tones for snappy UI + real CC0 `.wav` samples for big
  moments, with synth fallback if a sample fails to load. Base path self-resolves from
  the script's own `src`, so it works at any folder depth.
- `SFX.play(name)` — names: hover, click, select, button, tick, blip, move, flip, step,
  swap, type, whoosh, start (synth); correct, wrong, coin, powerup, win, fanfare, lose,
  error, portal (sample-first). `SFX.tone({freq,dur,type,gain,delay,freqTo})`,
  `SFX.chord(freqs,dur,type,gap)`, `SFX.noise(dur,gain)`.
- `SFX.isMuted() / setMuted / toggleMute` — mute persists in localStorage across games.

## Chrome/scoring engine — `Arcade` (arcade.js)
- `Arcade.mount({title, accent, slug?, time?=90, tutorial?})` — injects the fixed top bar
  (← All Games, title, **?** tutorial-replay, **⏱ timer**, 🔊 mute), auto-shows the
  game's tutorial, and starts the session timer when the tutorial is dismissed (or on
  first interaction if none). Games must leave `padding-top:64px`.
- **Timer:** equal `time` seconds (default 90) for every game. On expiry a "Time's Up"
  card freezes play (Play Again / Next Game). Score is already saved via reports below.
- **Tutorials:** `TUTORIALS` map keyed by slug (emoji, title, 2–3 steps, learning goal).
  `Arcade.showTutorial(slug, accent)` replays it.

### Fair scoring model (the key design)
Raw game scores are incomparable (Simon rounds vs Type Rush thousands), so the
leaderboard uses **level reached, normalized to 0–1000**: `norm = round(level/maxLevel*1000)`
(maxLevel = 20). Each game reports progress two ways:
- `Arcade.best(slug, rawScore, levelReached [, maxLevel=20])` — at game over; also keeps
  the local raw "Best" for display.
- `Arcade.report(slug, level [, maxLevel=20, raw])` — at **each level-up**, so partial
  progress counts even if the student runs out of time or leaves. Stored value is the
  **max** normalized per game (+ best raw for tiebreak).
- A student's **leaderboard total = sum of their 4 mission games** (each 0–1000 ⇒ /4000).
  With no mission set, falls back to the sum of their best 4 games.

### Player + mission + leaderboard
- `Arcade.getPlayer()/setPlayer(name)/clearPlayer()` — current student (localStorage).
- `Arcade.getMission()/setMission([slugs≤4])` — the 4 chosen games for the player.
- `Arcade.leaderboard()` → sorted rows `{name,total,rawTotal,games,raw,mission,plays}`.
- `Arcade.resetLeaderboard()`, `removePlayer(name)`, `Arcade.confetti(ms)`.

### Storage keys (localStorage, per booth device)
`csArcade.player`, `csArcade.mission` (`{player:[slugs]}`), `csArcade.leaderboard`
(`{player:{games:{slug:norm}, raw:{slug:raw}, plays, updated}}`), `csArcade.best.<slug>`
(raw), `csArcade.muted`.

## Hub flow (index.html)
`buildCards()` renders `<a>` cards from `CS_GAMES`. `mode` ∈ {select, play}.
- **select:** card click toggles selection (max 4, spring-pop + animated ✓); confirm bar
  shows count and a "ready" pulse at 4/4; confirm → `Arcade.setMission` → play.
- **play:** chosen 4 show a "★ In your 4" ribbon and open; **non-chosen are `.locked`**
  (🔒, greyed, not navigable) — clicking shakes the card + shows a toast pointing to
  "Change my 4".

## Games contract
See `game-design-rules.md`. Each game: single self-contained file; includes
`../../assets/js/audio.js` then `arcade.js`; calls `Arcade.mount(...)`; reports progress
via the scoring calls above; owns theme/layout; 20 levels; responsive; no external assets.
