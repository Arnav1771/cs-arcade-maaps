# 🎮 CS Arcade — Maharaja Aggarsain Adarsh Public School

Ten browser-based **computer-science learning games** for the school science
exhibition. Everything runs client-side — no server, no build step, no installs.
Open the hub, pick a game, play. Works on phones, laptops and projectors, and works
offline once the page has loaded.

**▶ Live site:** _enabled via GitHub Pages (see below)._

## The 15 games

| # | Game | What it teaches |
|---|------|-----------------|
| 1 | 🔢 **Binary Blitz** | Binary numbers — flip bits to match a decimal number |
| 2 | 💡 **Logic Lab** | Logic gates (AND / OR / NOT / XOR…) — light the bulb |
| 3 | 🤖 **Robot Runner** | Algorithms & sequencing — program a robot through a maze |
| 4 | ⌨️ **Type Rush** | Keyboard skills + computer vocabulary |
| 5 | 🧠 **Memory Matrix** | Memory/recall — match tech-gadget pairs |
| 6 | 2️⃣ **2048** | Powers of two (2·4·8·16…) — the maths behind binary |
| 7 | 📊 **Sort It Out** | Sorting — arrange the bars in order |
| 8 | ❓ **CS Quiz Quest** | Computer-basics trivia (reshuffled per student) |
| 9 | 🔐 **Cipher Crack** | Encryption — crack the Caesar cipher |
| 10 | 🎵 **Simon Signals** | Patterns & memory — watch and repeat |
| 11 | 🥷 **Number Ninja** | Fast mental maths |
| 12 | 🧙 **Word Wizard** | Spelling & science/computer vocabulary |
| 13 | 🐛 **Bug Squash** | A playful intro to debugging |
| 14 | 🗼 **Tower Master** | Tower of Hanoi — planning & problem solving |
| 15 | 🔷 **Pattern Quest** | Pattern recognition & logic |

Every game has **20 levels** of rising difficulty and its own theme.

## Exhibition mode — fair scoring & leaderboard

- On arrival each student **enters their name** and **picks any 4 games** for their session.
- Every game runs on an equal **90-second timer** and is scored **out of 1000** by how far the student climbs — so no game is "worth more". A student's session total is their **4 games = /4000**.
- A **How-to-Play tutorial** pops up when each game opens; the **Leaderboard** page ranks every student (podium + per-game breakdown, export to CSV, reset at day's end). Stored on the booth device — no internet needed.

## How it's built

```
index.html                 ← the arcade hub (game picker)
assets/
  js/audio.js              ← shared sound engine (WebAudio synth + samples)
  js/arcade.js             ← shared top bar, high-scores, confetti
  sfx/*.wav                ← downloaded CC0 sound clips
games/<slug>/index.html    ← one self-contained game each
```

- **Vanilla HTML/CSS/JS** — zero dependencies, zero external requests.
- **Sound:** synthesized WebAudio tones for instant UI feedback **plus** real 8-bit
  `.wav` samples for the big moments. A global mute toggle persists across games.
- Each game has its **own theme, layout and colour palette**.

## Sound credits / license

Sound samples in `assets/sfx/` are from **“The Essential Retro Video Game Sound
Effects Collection [512 sounds]” by Juhani Junkala (SubspaceAudio)**, released under
**CC0 1.0 (public domain)** via OpenGameArt.org — free to use for any purpose. All
other sounds are generated in-browser with the WebAudio API.

## Run locally

```bash
# from the repo root
python3 -m http.server 8000
# then open http://localhost:8000
```

Built with the **Arnav1771** identity for Maharaja Aggarsain Adarsh Public School. 🏫
