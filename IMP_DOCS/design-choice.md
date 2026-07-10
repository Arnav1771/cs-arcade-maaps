# Design Choices & Rationale — CS Arcade

_Last updated: 2026-07-10 · v3.2_

Each entry: **decision — why — alternatives rejected.**

### Static site, vanilla JS, no framework/deps
Exhibition needs it to "just work" offline on a school laptop/tablet with flaky Wi-Fi.
No build step, no CDN, no npm at runtime. Rejected React/Vite (build + weight for no gain).

### Audience = Indian Class 8–10, fun down to ~10 yrs
Confirmed with the teacher. Keep jargon light; no Big-O/heavy algorithms. Concepts are
named in plain language in each tutorial. Games ramp gently early.

### Leaderboard = per-device localStorage (NOT a cloud backend)
Booth reality: one/few devices, possibly no reliable internet, and storing kids' names
in a cloud is a privacy concern. localStorage is zero-config, offline, private.
Trade-off (documented to user): multiple devices keep separate boards. Cloud sync
(Firebase/Supabase) was offered and can be added later if truly needed.

### Fair scoring = normalize level-reached to 0–1000 (equal max per game)
User wanted "each game gives equal points / fair no matter which 4 are chosen." Raw
scores are incomparable across games. Normalizing by **fraction of the 20 levels reached**
is equal-by-construction and still rewards skill. Rejected: (a) flat completion points
(ignores skill), (b) raw-score with per-game max constants (brittle; hard to tune fairly).
Report at **every level-up** (not just at end) so partial progress counts within the timer.

### Pick-4 "mission" per session
User: "students choose any 4 games per session, fair contest." Leaderboard sums exactly
those 4 (/4000). Simple, structured for a booth, and fair regardless of which 4.

### Non-selected games are LOCKED in play mode (v3.1)
Enforces "your session = these 4" and keeps the contest fair (no padding with extras that
wouldn't count anyway). Not a dead-end: a locked card nudges the student to "Change my 4".
(This resolved the prompt-#4 report about non-selected games.)

### Equal 90-second timer on every game (central)
User: "add a timer in all games for a fair game." Same time budget everywhere ⇒ the
normalized score compares like-with-like. Implemented once in `Arcade.mount` so all 15
games behave identically (rather than editing 15 games). Timer starts when the tutorial
is dismissed, so reading the how-to is free.

### Randomize level order per player — but tiered (v3.2)
User wanted level-wise games to randomize levels per student (anti-copying, like the
quiz). A full shuffle would break the easy→hard ramp (a beginner could get the hardest
puzzle first). So authored-level games (logic-lab, robot-runner, cipher-crack,
tower-master) use `Arcade.shuffleTiered(arr, 5)` — shuffle **within bands of 5** so
difficulty still climbs while the exact order differs every load. Procedurally-generated
games already vary per play, so they were left as-is. Rejected: full random shuffle (bad
ramp); per-user seeded-but-stable order (needless complexity for a booth).

### Central tutorials (content in arcade.js, keyed by slug)
User wanted a tutorial per game. Centralizing avoids rewriting 15 games and guarantees a
consistent "How to Play" card + a replay **?** button. Each game keeps its own start
screen too (minor double-intro; flagged in TODOs).

### Hex Hunter → 2048 (prompt #3)
Teacher felt hex/colour codes were too niche for students. Researched well-known
educational browser games; chose **2048** — universally recognised, instantly playable,
and genuinely educational (powers of two → binary/doubling). Rejected Tetris (heavier to
build well), Minesweeper (frustrates young kids), Snake (less educational).

### SFX = generated WebAudio + downloaded CC0 samples ("both", per user)
Synth for instant UI feedback; real CC0 clips (Juhani Junkala / SubspaceAudio, public
domain) for wins/coins. Zero licensing risk, small footprint.

### Build method = orchestrated subagents against a shared spec
15 games is large; built/updated in parallel by subagents following `game-design-rules`.
Verified centrally with a Node syntax check + a jsdom DOM smoke harness (which caught real
"partial-edit" bugs, e.g. a game claiming 20 levels while logic still had 10).

### Git identity split
Commits made from **WSL** (Arnav1771) even though files live on the Windows path, because
the WSL global git identity is the intended author. Repo made **public** so Pages is
viewable on the free tier.
