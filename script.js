// Animasi bubble pastel
const canvas = document.getElementById('bubble-bg');
const ctx = canvas.getContext('2d');
let w, h;
function resizeCanvas() {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const bubbleColors = [
  'rgba(255,179,224,0.16)',
  'rgba(216,180,254,0.15)',
  'rgba(254,238,255,0.14)',
  'rgba(250,233,255,0.11)',
  'rgba(255,225,236,0.13)'
];
const bubbles = [];
for (let i = 0; i < 16; i++) {
  const clr = bubbleColors[Math.floor(Math.random()*bubbleColors.length)];
  bubbles.push({
    x: Math.random()*w,
    y: Math.random()*h,
    r: 22 + Math.random()*45,
    dx: 0.16 + Math.random()*0.13,
    clr: clr
  });
}
function drawBubbles() {
  ctx.clearRect(0,0,w,h);
  for (const b of bubbles) {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI*2);
    ctx.fillStyle = b.clr;
    ctx.fill();
    b.x += b.dx * (Math.random()>0.5?1:-1)*0.36;
    b.y += 0.06 + Math.sin(b.x/90)*0.4;
    if (b.x < -b.r) b.x = w+b.r;
    if (b.x > w+b.r) b.x = -b.r;
    if (b.y > h+b.r) b.y = -b.r;
  }
  requestAnimationFrame(drawBubbles);
}
drawBubbles();

// Typewriter Animation for Lyrics
const lines = [
  "Di setiap detik, aku jatuh cinta lagi padamu 💞",
  "Karena senyummu, hariku selalu lebih indah",
  "Engkaulah semangatku, alasanku tertawa",
  "Jika dunia tak adil, aku tetap punya kamu",
  "Dan semua lirik cinta, akhirnya jadi tentangmu 🎶",
  "Aku bersyukur Tuhan mempertemukan kita",
  "Love you more every single day 💗"
];
const box = document.getElementById('lyrics-box');
let currLine = 0;

function typeLine(line, callback) {
  let i = 0;
  const p = document.createElement('span');
  p.className = "lyric-line";
  box.appendChild(p);
  function typeChar() {
    if (i <= line.length) {
      p.textContent = line.slice(0, i);
      // Caret
      if (i !== line.length) {
        if (!p.querySelector('.caret')) {
          const caret = document.createElement('span');
          caret.className = 'caret';
          p.appendChild(caret);
        }
      } else {
        const c = p.querySelector('.caret');
        if (c) c.remove();
      }
      i++;
      setTimeout(typeChar, 37);
    } else {
      setTimeout(callback, 800);
    }
  }
  typeChar();
}

function showLyrics() {
  if (currLine < lines.length) {
    typeLine(lines[currLine++], showLyrics);
  }
}

window.onload = function() {
  showLyrics();
  // Musik auto-play, tapi di HP harus klik dulu (aturan browser)
  const bgm = document.getElementById('bgm');
  if (bgm) {
    bgm.volume = 0.65;
    bgm.play().catch(() => {});
    document.body.addEventListener('click', () => {
      bgm.play().catch(()=>{});
    }, {once:true});
  }
};
