const countdown = document.getElementById("countdown");

// Mốc thời gian: 17/02/2026 00:00:00
const targetTime = new Date(2026, 1, 17, 0, 0, 0).getTime();
// Lưu ý: tháng trong JS bắt đầu từ 0
// 0 = Jan, 1 = Feb

const timer = setInterval(() => {
  const now = new Date().getTime();
  const distance = targetTime - now;

  if (distance <= 0) {
    clearInterval(timer); // dừng hẳn
    countdown.innerHTML = "🎉 ĐÃ TỚI NGÀY 17/02/2026 🎉";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  countdown.innerHTML =
    days + " ngày " + hours + " giờ " + minutes + " phút " + seconds + " giây";
}, 1000);

// Lời chúc random
function showWish() {
  const wishes = [
    "Chúc bạn năm mới thành công rực rỡ!",
    "Tiền vào như nước, sức khỏe dồi dào!",
    "Học tập thăng hoa, đạt mọi mục tiêu!",
    "Một năm bùng nổ và đầy hạnh phúc!",
  ];

  const randomIndex = Math.floor(Math.random() * wishes.length);
  document.getElementById("wish").innerText = wishes[randomIndex];
}

// ===== PHÁO HOA NÂNG CẤP =====
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let rockets = [];
let particles = [];

class Rocket {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.speedY = Math.random() * -3 - 7;
    this.color = `hsl(${Math.random() * 360},100%,60%)`;
  }

  update() {
    this.y += this.speedY;

    // khi bay đủ cao thì nổ
    if (this.speedY >= -1) {
      this.explode();
      return false;
    }

    this.speedY += 0.05; // gravity nhẹ khi bay lên
    return true;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  explode() {
    for (let i = 0; i < 120; i++) {
      particles.push(new Particle(this.x, this.y, this.color));
    }
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.speedX = (Math.random() - 0.5) * 8;
    this.speedY = (Math.random() - 0.5) * 8;
    this.gravity = 0.05;
    this.friction = 0.98;
    this.alpha = 1;
    this.color = color;
  }

  update() {
    this.speedX *= this.friction;
    this.speedY *= this.friction;
    this.speedY += this.gravity;

    this.x += this.speedX;
    this.y += this.speedY;

    this.alpha -= 0.01;

    return this.alpha > 0;
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function animate() {
  requestAnimationFrame(animate);

  // tạo hiệu ứng trail mờ
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // thỉnh thoảng bắn rocket mới
  if (Math.random() < 0.03) {
    rockets.push(new Rocket());
  }

  rockets = rockets.filter((rocket) => {
    rocket.draw();
    return rocket.update();
  });

  particles = particles.filter((particle) => {
    particle.draw();
    return particle.update();
  });
}

animate();
