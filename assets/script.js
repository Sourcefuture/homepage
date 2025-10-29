
// ====== Canvas 背景动画 ======
const canvas = document.getElementById('bg');
let ctx = canvas.getContext('2d', { alpha: true });
let DPR = Math.max(1, window.devicePixelRatio || 1);
let W = innerWidth, H = innerHeight;
let stars = [], meteors = [], clouds = [];
let isLight = false;
let last = performance.now();

function onResize() {
    DPR = Math.max(1, window.devicePixelRatio || 1);
    W = innerWidth; H = innerHeight;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(DPR, DPR);
    initStars();
    clouds = [];
}
window.addEventListener('resize', onResize);
onResize();

function initStars() {
    const areaFactor = (W * H) / (1920 * 1080);
    const count = Math.round(160 * areaFactor);
    stars = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        size: Math.random() * 1.4 + 0.3,
        speed: Math.random() * 0.18 + 0.02,
        alpha: 0.35 + Math.random() * 0.65,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
        twinkleSpeed: 0.004 + Math.random() * 0.02
    }));
}

function drawBackground() {
    if (!isLight) {
        const g = ctx.createRadialGradient(W * 0.5, H * 0.8, Math.max(W, H) * 0.05, W * 0.5, H * 0.8, Math.max(W, H));
        g.addColorStop(0, '#0d1b2a');
        g.addColorStop(0.6, '#03060a');
        g.addColorStop(1, '#000000');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
    } else {
        const g = ctx.createLinearGradient(0, 0, 0, H);
        g.addColorStop(0, '#fbfcff');
        g.addColorStop(0.6, '#eaf2fb');
        g.addColorStop(1, '#dfeffb');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
    }
}

function drawStars(delta) {
    stars.forEach(s => {
        ctx.save();
        s.alpha += s.twinkleDir * s.twinkleSpeed * (delta / 16.67);
        if (s.alpha > 1) { s.alpha = 1; s.twinkleDir = -1; }
        if (s.alpha < 0.18) { s.alpha = 0.18; s.twinkleDir = 1; }
        ctx.globalAlpha = s.alpha * 0.95;
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        s.y += s.speed * (delta / 16.67);
        if (s.y > H + 4) { s.y = -4; s.x = Math.random() * W; }
    });
}

function maybeSpawnMeteor() {
    if (Math.random() < 0.01) {
        const startX = Math.random() * W * 0.9;
        const startY = Math.random() * (H * 0.25);
        meteors.push({
            x: startX,
            y: startY,
            length: 100 + Math.random() * 160,
            speed: 4 + Math.random() * 6,
            angle: Math.PI * (0.25 + (Math.random() * 0.06 - 0.03)),
            opacity: 1,
            fade: 0.02 + Math.random() * 0.03
        });
    }
}

function drawMeteors(delta) {
    if (!meteors.length) return;
    for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        ctx.save();
        const tailLength = m.length * Math.max(0.2, m.opacity);
        const xEnd = m.x - Math.cos(m.angle) * tailLength;
        const yEnd = m.y - Math.sin(m.angle) * tailLength;
        const grad = ctx.createLinearGradient(m.x, m.y, xEnd, yEnd);
        grad.addColorStop(0, `rgba(255,255,255,1)`);
        grad.addColorStop(0.6, `rgba(255,240,200,${0.6 * m.opacity})`);
        grad.addColorStop(1, `rgba(255,240,200,0)`);
        ctx.lineWidth = 2.2;
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(xEnd, yEnd);
        ctx.stroke();
        ctx.beginPath();
        ctx.globalAlpha = Math.min(1, m.opacity * 1.2);
        ctx.fillStyle = 'rgba(255,255,255,1)';
        ctx.arc(m.x, m.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        const factor = delta / 16.67;
        m.x += Math.cos(m.angle) * m.speed * factor;
        m.y += Math.sin(m.angle) * m.speed * factor;
        m.opacity -= m.fade * factor;
        if (m.opacity <= 0 || m.y - tailLength > H || m.x - tailLength > W) {
            meteors.splice(i, 1);
        }
    }
}

function initClouds() {
    const count = Math.max(3, Math.round(W / 500));
    clouds = Array.from({ length: count }, (_, i) => {
        const numCircles = 5 + Math.floor(Math.random() * 3);
        const parts = Array.from({ length: numCircles }, () => ({
            offsetX: (Math.random() - 0.5) * 200,
            offsetY: (Math.random() - 0.5) * 80,
            radius: 80 + Math.random() * 60
        }));
        return {
            x: (i / count) * W + Math.random() * 80,
            y: Math.random() * (H * 1.00),
            speed: 0.12 + Math.random() * 0.28,
            alpha: 0.5,
            parts
        };
    });
}

function drawClouds(delta) {
    if (!clouds.length) initClouds();
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    clouds.forEach(c => {
        ctx.save();
        ctx.globalAlpha = c.alpha;
        c.parts.forEach(p => {
            const g = ctx.createRadialGradient(c.x + p.offsetX, c.y + p.offsetY, p.radius * 0.3, c.x + p.offsetX, c.y + p.offsetY, p.radius);
            g.addColorStop(0, 'rgba(255,255,255,0.9)');
            g.addColorStop(0.5, 'rgba(255,255,255,0.3)');
            g.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(c.x + p.offsetX, c.y + p.offsetY, p.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.restore();
        c.x += c.speed * (delta / 16.67);
        if (c.x - 200 > W) c.x = -200;
    });
    ctx.restore();
    ctx.globalCompositeOperation = 'source-over';
}

function loop(now) {
    const delta = Math.min(60, now - last);
    last = now;
    drawBackground();
    if (!isLight) {
        drawStars(delta);
        maybeSpawnMeteor();
        drawMeteors(delta);
    } else {
        drawClouds(delta);
    }
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

// ====== 句子加载 ======
async function loadQuote() {
    try {
        const res = await fetch('https://v1.hitokoto.cn');
        const data = await res.json();
        document.getElementById('quote-text').innerText = data.hitokoto || '（空）';
        document.getElementById('quote-author').innerText = data.from ? `—— ${data.from}` : '';
    } catch (e) {
        document.getElementById('quote-text').innerText = '加载语录失败。';
        document.getElementById('quote-author').innerText = '';
    }
}
loadQuote();

// ====== 主题切换 ======
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
    isLight = !isLight;
    document.body.classList.toggle('light', isLight);
    toggle.textContent = isLight ? '☀' : '☾';
    if (isLight) initClouds();
    else meteors = [];
});

window.addEventListener('orientationchange', onResize);
window.addEventListener('load', onResize);

