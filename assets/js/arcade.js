/*
 * CS Arcade — shared game chrome & helpers
 * ----------------------------------------
 * Injects a consistent, theme-neutral top bar (back-to-hub + mute toggle) into
 * any game page, and offers small helpers for high scores and a win confetti.
 *
 *   <script src="<relative>/assets/js/audio.js"></script>
 *   <script src="<relative>/assets/js/arcade.js"></script>
 *   Arcade.mount({ title: 'Binary Blitz', accent: '#38bdf8' });
 *   var best = Arcade.best('binary-blitz');          // read high score
 *   Arcade.best('binary-blitz', 120);                // save if higher
 *   Arcade.confetti();                                // celebrate a win
 */
(function (global) {
  'use strict';

  var me = document.currentScript;
  var src = me ? me.src : '';
  var ROOT = src.replace(/assets\/js\/arcade\.js.*$/, ''); // repo root (relative)
  var HUB = ROOT + 'index.html';

  function el(tag, css, text) {
    var e = document.createElement(tag);
    if (css) e.setAttribute('style', css);
    if (text != null) e.textContent = text;
    return e;
  }

  var Arcade = {
    hubUrl: HUB,

    mount: function (opts) {
      opts = opts || {};
      var accent = opts.accent || '#22d3ee';
      var bar = el('div',
        'position:fixed;top:0;left:0;right:0;height:52px;z-index:9999;' +
        'display:flex;align-items:center;justify-content:space-between;' +
        'padding:0 14px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;' +
        'pointer-events:none;');

      var back = el('a',
        'pointer-events:auto;text-decoration:none;display:inline-flex;align-items:center;' +
        'gap:6px;font-weight:700;font-size:14px;color:#fff;background:rgba(15,23,42,.72);' +
        'border:1px solid ' + accent + ';border-radius:999px;padding:8px 14px;' +
        'backdrop-filter:blur(6px);box-shadow:0 4px 14px rgba(0,0,0,.3);cursor:pointer;',
        '← All Games');
      back.href = HUB;
      back.addEventListener('mouseenter', function () { if (global.SFX) SFX.play('hover'); });
      back.addEventListener('click', function () { if (global.SFX) SFX.play('select'); });

      var right = el('div', 'pointer-events:auto;display:flex;gap:8px;align-items:center;');

      if (opts.title) {
        var badge = el('span',
          'font-weight:800;font-size:13px;letter-spacing:.5px;color:' + accent + ';' +
          'background:rgba(15,23,42,.72);border-radius:999px;padding:8px 14px;' +
          'border:1px solid rgba(255,255,255,.15);text-transform:uppercase;',
          opts.title);
        right.appendChild(badge);
      }

      var mute = el('button',
        'pointer-events:auto;cursor:pointer;font-size:16px;width:40px;height:40px;' +
        'border-radius:50%;border:1px solid ' + accent + ';background:rgba(15,23,42,.72);' +
        'color:#fff;backdrop-filter:blur(6px);box-shadow:0 4px 14px rgba(0,0,0,.3);');
      function paint() { mute.textContent = (global.SFX && SFX.isMuted()) ? '🔇' : '🔊'; }
      paint();
      mute.title = 'Toggle sound';
      mute.addEventListener('click', function () {
        if (global.SFX) { SFX.toggleMute(); if (!SFX.isMuted()) SFX.play('button'); }
        paint();
      });
      global.addEventListener('sfxmutechange', paint);
      right.appendChild(mute);

      bar.appendChild(back);
      bar.appendChild(right);
      document.body.appendChild(bar);
    },

    // high score per game key (localStorage). Call with value to save-if-higher.
    best: function (key, value) {
      var k = 'csArcade.best.' + key;
      if (value === undefined) {
        var v = 0;
        try { v = parseInt(localStorage.getItem(k) || '0', 10) || 0; } catch (e) {}
        return v;
      }
      var cur = this.best(key);
      if (value > cur) { try { localStorage.setItem(k, String(value)); } catch (e) {} return true; }
      return false;
    },

    confetti: function (durationMs) {
      durationMs = durationMs || 1600;
      var cv = el('canvas',
        'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:10000;');
      document.body.appendChild(cv);
      var ctx = cv.getContext('2d');
      function size() { cv.width = innerWidth; cv.height = innerHeight; }
      size();
      var colors = ['#f43f5e', '#f59e0b', '#22d3ee', '#a3e635', '#a855f7', '#38bdf8'];
      var bits = [];
      for (var i = 0; i < 140; i++) {
        bits.push({
          x: Math.random() * cv.width,
          y: -20 - Math.random() * cv.height * 0.4,
          r: 4 + Math.random() * 6,
          c: colors[(Math.random() * colors.length) | 0],
          vy: 2 + Math.random() * 4,
          vx: -2 + Math.random() * 4,
          rot: Math.random() * 6.28,
          vr: -0.2 + Math.random() * 0.4
        });
      }
      var start = performance.now();
      function frame(now) {
        var t = now - start;
        ctx.clearRect(0, 0, cv.width, cv.height);
        bits.forEach(function (b) {
          b.x += b.vx; b.y += b.vy; b.rot += b.vr;
          ctx.save();
          ctx.translate(b.x, b.y);
          ctx.rotate(b.rot);
          ctx.fillStyle = b.c;
          ctx.fillRect(-b.r / 2, -b.r / 2, b.r, b.r * 0.6);
          ctx.restore();
        });
        if (t < durationMs) requestAnimationFrame(frame);
        else cv.remove();
      }
      requestAnimationFrame(frame);
    }
  };

  global.Arcade = Arcade;
})(window);
