// —— 

// ── Stars ──────────────────────────────────────
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

const starColor = () => {
  const r = Math.random();
  if (r < 0.33) return [215, 205, 255]; // white-blue
  if (r < 0.66) return [150 + Math.random() * 100, 180 + Math.random() * 75, 255]; // blue
  return [255, 180 + Math.random() * 75, 150 + Math.random() * 100]; // red/pink
};

const stars = Array.from({length: 5000}, function() {
  return {
    x: Math.random(), y: Math.random(),
    r: Math.random() * 2 + 0.15,
    a: Math.random() * 0.5 + 0.25,
    speed: Math.random() * 0.00015 + 0.003,
    offset: Math.random() * Math.PI * 2,
    color: starColor()
  };
});



const gaussianLine = () => {
  const g = () => Math.random() + Math.random() + Math.random() -1.7;
  const angle = Math.PI / 2.6;
  const x = 0.2 + g() * 0.2;
  return {
    x: x + 0.3,
    y: x * Math.tan(angle) + g() * 0.2,
    r: Math.random() * 1.5 + 0.1,
    a: Math.random() * 0.5 + 0.25,
    speed: Math.random() * 0.00015 + 0.003,
    offset: Math.random() * Math.PI * 2,
    color: starColor()
  };
};

const galaxy = () => {
  const g = () => Math.random() + Math.random() + Math.random() - 1;
  const angle = Math.PI / 12;
  let x = 0.2 + g() * 0.05;
  let y = x * Math.tan(angle) + g() * 0.02;
  x = Math.max(0, Math.min(1, x));
  y = Math.max(0, Math.min(1, y));
  return {
    x: x + 0.1,
    y: y + 0.6,
    r: Math.random() * 1 + 0.1,
    a: Math.random() * 0.5 + 0.25,
    speed: Math.random() * 0.00015 + 0.003,
    offset: Math.random() * Math.PI * 2,
    color: starColor()
  };
};

const galaxy2 = () => {
  const g = () => Math.random() + Math.random() + Math.random() - 2.6;
  const angle = Math.PI / 3.4;
  let x = 0.3 + g() * 0.09;
  let y = x * Math.tan(angle) + g() * 0.07;
  x = Math.max(0, Math.min(1, x));
  y = Math.max(0, Math.min(1, y));
  return {
    x: x + 0.48,
    y: y + 0.63,
    r: Math.random() * 1 + 0.1,
    a: Math.random() * 0.5 + 0.25,
    speed: Math.random() * 0.00015 + 0.003,
    offset: Math.random() * Math.PI * 2,
    color: starColor()
  };
};

const galaxyLine = Array.from({length: 1300}, galaxy);
const milkyWay = Array.from({length: 5500}, gaussianLine);
const galaxyLine2 = Array.from({length: 2500}, galaxy2);

const allStars = [...stars, ...milkyWay, ...galaxyLine, ...galaxyLine2];

let tick = 0;
function drawStars() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  allStars.forEach(function(s) {
    const alpha = s.a * (0.65 + 0.35 * Math.sin(tick * s.speed * 50 + s.offset));
    ctx.beginPath();
    ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(" + s.color[0] + "," + s.color[1] + "," + s.color[2] + "," + alpha + ")";
    ctx.fill();
  });
  tick++;
  requestAnimationFrame(drawStars);
}
drawStars();

// ── Google Sheets ────────────────────────────────
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbygfIwEDpV2gcF1nzIEClkvMwU9Bvh3PFPIeB7Qho8CPRpKIGzlgG8VXUK-OjqYLAQ7/exec';

const sendButton = document.getElementById('send');
const messageInput = document.getElementById('message');
const nameInput = document.getElementById('enter-name');


sendButton.addEventListener('click', async () => {
  const text = messageInput.value.trim();
  const Name = nameInput.value.trim();
  console.log('Sending:', { name: Name, text: text }); 

  if (!text) return;
  if (!Name) return;

  try {
    await fetch(WEB_APP_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },  // was 'text/plain'
    body: JSON.stringify({
        name: Name || 'Anonymous',
        text: text
    })
    });
    messageInput.value = '';
    nameInput.value = '';
  } catch (err) {
    console.error('Failed to send:', err);
  }
});

messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendButton.click();
});