// –– Ship Name Input ———————————————————————————————
const shipshipNameDisplay = document.getElementById('log-ship').querySelector('input');
const shipNameButton = document.getElementById('log-ship').querySelector('button');
const shipNameDisplay = document.getElementById('ship-name');

shipNameButton.addEventListener('click', () => {
  const shipName = shipshipNameDisplay.value.trim();
  if (shipName) {
    shipNameDisplay.textContent = shipName;
    document.getElementById('log-ship').style.display = 'none';
  }
});

// —— Time ———————————————————————————————————————
function displayTime() {
  const date = new Date();
  const timeDisplay = document.getElementById("time");
  const content = document.getElementById("content");
  const notFound = document.getElementById("not-found");
  

  // 12-hour format time
  let hour = date.getHours();
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");

  timeDisplay.textContent = `${hour}:${minute}:${second} ${ampm}`;
  
  const h = date.getHours();
  // if (h < 23 || h >= 4) {
  //   notFound.style.display = "flex";
  //   content.style.display = "none";
  // } else {
  // }
  // if (h >= 23 || h < 4) {
  //   notFound.style.display = "none";
  //   content.style.display = "flex";
  // }
};

displayTime();
setInterval(displayTime, 1000);



// ── Stars ──────────────────────────────────────
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

const starColor = () => {
  const r = Math.random();
  if (r < 0.33) return [215, 205, 255]; // white-blue
  if (r < 0.66) return [150 + Math.random() * 100, 180 + Math.random() * 75, 255];
  return [255, 180 + Math.random() * 75, 150 + Math.random() * 100];
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
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxjPeZEi3qNPsuKwh4sD7rtIR1YDZJpHcnz8lIe9tZzYjpdTPKLj8S5MPydR7T2_qAv/exec';

const sendButton = document.getElementById('transmit');
const messageInput = document.getElementById('message');

sendButton.addEventListener('click', async () => {
  const text = messageInput.value.trim();
  const Name = shipNameDisplay.textContent.trim();

  if (!text || !Name) return;

  try {
    await fetch(WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: Name, message: text })
    });

    messageInput.value = '';
    setTimeout(fetchMessages, 1000);

  } catch (err) {
    console.error('Failed to send:', err);
  }
});

messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendButton.click();
});

// ── Fetch Messages from Google Sheets ────────────────────────────────
const fetchMessages = async () => {
  try {
    const response = await fetch(WEB_APP_URL, {
      method: 'GET',
      mode: 'cors',
    });

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const data = await response.json();

    if (data.status === 'ok') {
      displayMessages(data.messages);
    } else {
      console.error('Server error:', data.error);
    }

  } catch (err) {
    console.error('Failed to fetch messages:', err);
  }
};

const starPositions = new Map();

const displayMessages = (messages) => {
  const container = document.getElementById('content');

  container.querySelectorAll('.message-star').forEach(el => el.remove());

  const tooltip = document.getElementById('star-tooltip');
  const closeBtn = document.getElementById('close');

  closeBtn.addEventListener('click', () => {
    hoverCount--;
    if (hoverCount === 0) startMessagePolling();
    tooltip.classList.remove('visible');
  });

  messages.forEach(({ timestamp, name, messages }) => {

    if (!starPositions.has(name)) {
      starPositions.set(name, {
        x: Math.random() * 60 + 20,
        y: Math.random() * 60 + 20,
        assetNum: Math.floor(Math.random() *8) + 1,
        assetSize: Math.floor(Math.random() * 51) + 30,
      });
    }

    const { x, y, assetNum, assetSize } = starPositions.get(name);

    const star = document.createElement('div');
    star.className = 'message-star';
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;

    star.innerHTML = `
      <div class="bracket tl"></div><div class="bracket tr"></div>
      <div class="bracket bl"></div><div class="bracket br"></div>
      <img src="./images/slice${assetNum}.webp" class="star-asset" alt="★" style="width: ${assetSize}px;">
    `;

    const messageLines = (messages || [])
      .map((msg, index) => {
        const isLast = index === (messages.length - 1);
        return `
        <div class="message-entry">
          <p class="star-message">${escapeHTML(msg)}</p>
          ${isLast ? `<p class="star-time">${new Date(timestamp).toLocaleString()}</p>` : ''}
        </div>
      `;
      })
      .join('');

    star.addEventListener('click', () => {
      hoverCount++;
      stopMessagePolling();
      const starNameElement = tooltip.querySelector('.star-name');
      const starDetails = tooltip.querySelector('.star-details');
      if (starNameElement) starNameElement.textContent = escapeHTML(name);
      if (starDetails) starDetails.innerHTML = messageLines;
      tooltip.classList.add('visible');
    });

    container.appendChild(star);
  });
};

const escapeHTML = (str) => {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

// ── Poll for new messages every 10 seconds ────────────────────────────────
let messagePollInterval = null;
let hoverCount = 0;

const startMessagePolling = () => {
  if (!messagePollInterval) {
    messagePollInterval = setInterval(fetchMessages, 10000);
  }
};

const stopMessagePolling = () => {
  if (messagePollInterval) {
    clearInterval(messagePollInterval);
    messagePollInterval = null;
  }
};

fetchMessages();
startMessagePolling();