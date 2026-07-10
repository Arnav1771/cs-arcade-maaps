# Prompt Trail — CS Arcade

A chronological log of what the user asked and what changed. Append a new entry every prompt.

---

## Prompt #1 — Build the arcade (→ v1)
**Ask:** 10 study-based HTML games for a school exhibition, one GitHub Pages link with a
picker, SFX included (download them), each its own theme; not an FPS/violent game; built
in WSL under the Arnav1771 identity. (Clarified: Indian Class 8–10, fun for younger;
repo `cs-arcade-maaps`; school = MAAPS; SFX = both synth + downloaded.)
**Done:** Shared audio engine (WebAudio + downloaded CC0 clips), arcade chrome, MAAPS hub,
10 games (binary-blitz, logic-lab, robot-runner, type-rush, memory-matrix, hex-hunter,
sort-it-out, cs-quiz, cipher-crack, simon-signals). Repo made public, Pages enabled, live.

## Prompt #2 — More games + leaderboard + 20 levels (→ v2)
**Ask:** add a few more kid-friendly games; a leaderboard that asks the student's name at
start and shows who's on top; ~20 levels per game (not 5–10); research more game ideas.
**Done:** +5 games (number-ninja, word-wizard, bug-squash, tower-master, pattern-quest) =
15; every game expanded to 20 levels; player name-gate + leaderboard page; shared
`games.js` catalogue. Committed & deployed. (Session-limit interruption mid-build was
recovered; partial upgrades detected & fixed via the DOM harness.)

## Prompt #3 — Fair scoring, tutorials, replace Hex, juice games (→ v3)
**Ask:** quiz order reshuffled per student; replace Hex Hunter (too niche — research more);
each student picks any 4 games with equal points so it's fair; a tutorial per game; make
Logic Lab & Type Rush more interesting/epic; then also: "add a timer in all games for a
fair game, instruct students to choose any 4 per session, equal point distribution."
**Decisions:** normalize each game to 0–1000 (equal max); pick-4 mission (/4000);
Hex Hunter → **2048** (powers of two).
**Done:** fair level-based normalization + per-level-up reporting across all 15 games;
hub pick-4 flow; central **90s timer**; central **tutorials**; **2048** built (replaced
hex-hunter, folder removed); Logic Lab juiced (flowing current, reactive bulb) and Type
Rush juiced (particle zaps, screen-shake, neon trails, combos); cs-quiz already reshuffles
per play. Verified (node syntax + jsdom smoke) and deployed live.

## Prompt #4 — IMP_DOCS + lock non-selected + smoother selection (→ v3.1)
**Ask:** create an `IMP_DOCS` folder (handoff, tech-spec, design-choice, prompt_trail,
game-design-rules, TODOs) and keep it updated after every prompt; fix the bug so
non-selected games can't be opened after picking 4; make the highlight/selection process
smoother and more epic.
**Done:** created this `IMP_DOCS/` set. **Non-chosen games locked** in play mode (🔒,
greyed, not navigable; tapping shakes + toasts "Change my 4"). Selection polished:
spring-pop on pick, glowing animated ✓ check, dim-on-full, and a "ready" pulse on the
confirm button at 4/4. Docs will be updated each subsequent prompt.

---
_Template for the next entry:_
## Prompt #N — <short title> (→ vX)
**Ask:** …  **Decisions:** …  **Done:** …  **Verified:** …
