/* Shared catalogue of all games. Used by the hub and the leaderboard page so
 * the list never drifts. Add a game here and it appears in both places. */
window.CS_GAMES = [
  { slug: 'binary-blitz',  icon: '🔢', title: 'Binary Blitz',   desc: 'Flip the bits to match the number before time runs out.', tag: 'Binary Numbers', glow: '#38bdf8' },
  { slug: 'logic-lab',     icon: '💡', title: 'Logic Lab',      desc: 'Wire up AND / OR / NOT gates to light the bulb.',        tag: 'Logic Gates',   glow: '#a3e635' },
  { slug: 'robot-runner',  icon: '🤖', title: 'Robot Runner',   desc: 'Stack commands to walk the robot to the goal.',          tag: 'Algorithms',    glow: '#f59e0b' },
  { slug: 'type-rush',     icon: '⌨️', title: 'Type Rush',      desc: 'Type the falling words before they hit the ground.',     tag: 'Typing Skills', glow: '#22d3ee' },
  { slug: 'memory-matrix', icon: '🧠', title: 'Memory Matrix',  desc: 'Flip cards and match the tech-term pairs.',              tag: 'Memory',        glow: '#a855f7' },
  { slug: 'power-2048',    icon: '2️⃣', title: '2048',           desc: 'Slide & merge tiles — the powers of two (2,4,8,16…).',   tag: 'Powers of Two', glow: '#f2b179' },
  { slug: 'sort-it-out',   icon: '📊', title: 'Sort It Out',    desc: 'Drag the bars into order — think like a sorter.',        tag: 'Sorting',       glow: '#34d399' },
  { slug: 'cs-quiz',       icon: '❓', title: 'CS Quiz Quest',  desc: 'Beat the clock on computer-basics trivia.',              tag: 'Quiz',          glow: '#fbbf24' },
  { slug: 'cipher-crack',  icon: '🔐', title: 'Cipher Crack',   desc: 'Shift the wheel to decode the secret message.',          tag: 'Encryption',    glow: '#60a5fa' },
  { slug: 'simon-signals', icon: '🎵', title: 'Simon Signals',  desc: 'Watch, remember and repeat the glowing pattern.',        tag: 'Patterns',      glow: '#ec4899' },
  { slug: 'number-ninja',  icon: '🥷', title: 'Number Ninja',   desc: 'Slice the correct answer to the maths problem.',         tag: 'Mental Maths',  glow: '#f97316' },
  { slug: 'word-wizard',   icon: '🧙', title: 'Word Wizard',    desc: 'Unscramble the science & tech words.',                   tag: 'Spelling',      glow: '#8b5cf6' },
  { slug: 'bug-squash',    icon: '🐛', title: 'Bug Squash',     desc: 'Squash the bugs before they multiply!',                  tag: 'Debugging',     glow: '#ef4444' },
  { slug: 'tower-master',  icon: '🗼', title: 'Tower Master',   desc: 'Move the whole stack, one disk at a time.',              tag: 'Problem Solving', glow: '#14b8a6' },
  { slug: 'pattern-quest', icon: '🔷', title: 'Pattern Quest',  desc: 'Spot what comes next in the pattern.',                   tag: 'Logic',         glow: '#06b6d4' }
];
