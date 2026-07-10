# Handoff — CS Arcade (MAAPS)

_Last updated: 2026-07-10 · after prompt #6 (v3.2, docs synced)_

## What this is
A browser arcade of **15 educational computer-science games** for the **Maharaja
Aggarsain Adarsh Public School** science exhibition. Pure static site (HTML/CSS/JS),
no build step, no backend, works offline once loaded.

- **Live:** https://arnav1771.github.io/cs-arcade-maaps/
- **Repo:** https://github.com/Arnav1771/cs-arcade-maaps (public)
- **Local working copy:** `C:\Users\arnav.bhargava\cs-arcade-maaps`
  (= WSL `/mnt/c/Users/arnav.bhargava/cs-arcade-maaps`)

## Current state (v3.2) — all shipped & live
- 15 games, each with **20 levels** and its own theme.
- **Exhibition flow:** enter name → **pick any 4 games** → those 4 are your session.
  Non-chosen games are **locked** (🔒). "Change my 4" re-opens the picker.
- **Fair scoring:** every game scored **0–1000** by level reached; session total = the
  4 chosen games (**/4000**). Equal max for every game.
- **90-second timer** on every game (central, in `arcade.js`).
- **How-to-Play tutorial** auto-shows when a game opens (replay with the **?** button).
- **Leaderboard** page: podium, per-game /1000 breakdown (★ = chosen), CSV export, reset.

## How to work on it (IMPORTANT: git identity)
Edit files with normal tools on the Windows path. **Run git from WSL** so commits carry
the **Arnav1771** identity (WSL global git user = Arnav1771 <arnav.bhargava3@gmail.com>;
Windows identity is different). Example:
```bash
wsl bash -lc "cd /mnt/c/Users/arnav.bhargava/cs-arcade-maaps && git add -A && git commit -m '...' && git push origin main"
```
`gh` is authenticated as Arnav1771 in WSL (login shell). GitHub Pages is enabled on
`main` / root and auto-rebuilds on push (usually <60s).

## Run locally
```bash
cd /mnt/c/Users/arnav.bhargava/cs-arcade-maaps
python3 -m http.server 8000   # open http://localhost:8000
```

## Verify before shipping (test harnesses live in the job tmp, NOT the repo)
- **Structure/syntax:** `node <jobtmp>/validate.js` — checks all 15 games for the shared
  includes, `Arcade.mount`, ≥ SFX usage, and parses every inline `<script>`.
- **DOM smoke (catches load/start crashes):** `node <jobtmp>/domtest/harness.js` — loads
  each real page in jsdom, dismisses the tutorial, clicks start. This caught real bugs
  that syntax checks missed. (jsdom doesn't implement `prompt()`, so the leaderboard's
  "Change Player" click is a known false positive.)
- Browser click-through can't be automated here (WSL chromium can't reach loopback) —
  do a manual pass on the live link for anything gameplay-visual.

## Where things are
- `index.html` — hub (name gate, pick-4, locked cards, sound toggle, leaderboard link)
- `leaderboard.html` — rankings
- `assets/js/audio.js` — sound engine (WebAudio synth + CC0 samples)
- `assets/js/arcade.js` — top bar, timer, tutorials, scoring, leaderboard, confetti
- `assets/js/games.js` — the 15-game catalogue (shared by hub + leaderboard)
- `assets/sfx/*.wav` — CC0 sound clips (Juhani Junkala / SubspaceAudio)
- `games/<slug>/index.html` — one self-contained game each

## Continue from here
See `TODOs.md` for open items and `tech-spec.md` for the architecture. Follow
`game-design-rules.md` when adding or changing a game. Update every doc in this folder
after each prompt (see `prompt_trail.md`).
