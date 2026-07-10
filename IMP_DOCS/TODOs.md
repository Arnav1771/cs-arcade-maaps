# TODOs & Known Limitations — CS Arcade

_Last updated: 2026-07-10 · v3.1_

## Open / nice-to-have
- [ ] **Double intro:** the central "How to Play" tutorial shows on top of each game's own
      start screen. Consider collapsing each game's start screen into the shared tutorial
      for a single, cleaner intro.
- [ ] **Timer start vs game start:** the 90s timer starts when the tutorial is dismissed,
      but some games still show their own "Start" screen after — a few seconds can tick
      before actual play. Option: start the timer on the game's real start instead.
- [ ] **Timer length:** 90s is a guess. Confirm the right per-game time for the booth
      (and whether it should differ by game). Configurable via `Arcade.mount({time})`.
- [ ] **Level→score off-by-one:** a couple of games report `level` vs `level+1` at level-up;
      within ±1/20 (±50 pts) so cosmetically fine, but could be tightened per game.
- [ ] **Leaderboard scope:** per-device only. If the booth uses multiple devices and needs
      ONE shared board, add optional cloud sync (needs venue Wi-Fi + a free backend/keys).
- [ ] **Reset-for-the-day workflow:** confirm the teacher knows to use the Leaderboard
      "Reset" (and "Export CSV" first) between sessions/at day's end.
- [ ] Optional: a "session complete — here's your 4-game score" summary screen after a
      student finishes their 4th game.

## Verify manually (couldn't automate — WSL can't drive a browser to localhost)
- [ ] Play-test the full flow on the live link on a real device: name → pick 4 → locked
      cards → play each of the 4 → timer expiry → leaderboard updates & ranks correctly.
- [ ] Confirm 2048 swipe works on a touch device; confirm Type Rush on-screen keyboard.
- [ ] Spot-check a few games reach Level 20 and the victory screen fires.

## Done (recent)
- [x] Non-selected games locked in play mode (🔒 + nudge). _(v3.1)_
- [x] Smooth/epic selection (spring-pop, animated check, ready pulse). _(v3.1)_
- [x] IMP_DOCS folder created. _(v3.1)_
- [x] Fair 0–1000 normalized scoring + per-level-up reporting across all 15 games. _(v3)_
- [x] Pick-4 mission flow + /4000 leaderboard. _(v3)_
- [x] Central 90s timer + central tutorials. _(v3)_
- [x] Hex Hunter → 2048. _(v3)_
- [x] Logic Lab & Type Rush juiced. _(v3)_
- [x] All 15 games at 20 levels. _(v2)_
- [x] Name gate + leaderboard. _(v2)_
- [x] 10 games + hub + SFX + Pages deploy. _(v1)_
