/* ---------------------------------------------------
   RESIZE CANVASES TO FILL SIDE SPACE
--------------------------------------------------- */
const leftCanvas = document.getElementById("leftArt");
const rightCanvas = document.getElementById("rightArt");
const content = document.getElementById("content");

function resizeSideCanvases() {
  const totalWidth = window.innerWidth;
  const contentWidth = content.offsetWidth;

  const sideWidth = (totalWidth - contentWidth) / 2;

  leftCanvas.style.width = `${sideWidth + 40}px`;   // +40 for slight overlap
  rightCanvas.style.width = `${sideWidth + 40}px`;

  leftCanvas.width = sideWidth + 40;
  rightCanvas.width = sideWidth + 40;

  leftCanvas.height = window.innerHeight;
  rightCanvas.height = window.innerHeight;
}
resizeSideCanvases();
window.addEventListener("resize", resizeSideCanvases);



/* ---------------------------------------------------
   HERO MOUSE FOLLOW GLOW
--------------------------------------------------- */
const hero = document.getElementById('hero');
const heroLayer = document.getElementById('hero-layer');

hero.addEventListener("mousemove", (e) => {
  const rect = hero.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  heroLayer.style.background = 
    `radial-gradient(circle at ${x}px ${y}px, var(--accent) 0%, transparent 70%)`;
});



/* ---------------------------------------------------
   THEME CYCLER – also changes canvas colors now
--------------------------------------------------- */
const themes = [
  {
    accent: "#8b5cf6", soft: "#4c1d95",
    gen1: "#8b5cf6", gen2: "#d966ff", gen3: "#6a00ff"
  },
  {
    accent: "#3b82f6", soft: "#1e3a8a",
    gen1: "#3b82f6", gen2: "#80b3ff", gen3: "#0048ff"
  },
  {
    accent: "#22c55e", soft: "#14532d",
    gen1: "#22c55e", gen2: "#88ffb3", gen3: "#009933"
  },
  {
    accent: "#ef4444", soft: "#7f1d1d",
    gen1: "#ff5959", gen2: "#ff8a8a", gen3: "#cc0000"
  }
];

document.getElementById("learnMoreBtn").onclick = () => {
  const header = document.getElementById("#about");
  header.scrollIntoView();
}

let themeIndex = 0;

document.getElementById("themeToggle").onclick = () => {
  themeIndex = (themeIndex + 1) % themes.length;

  const t = themes[themeIndex];
  const root = document.documentElement;

  root.style.setProperty("--accent", t.accent);
  root.style.setProperty("--accent-soft", t.soft);

  root.style.setProperty("--gen1", t.gen1);
  root.style.setProperty("--gen2", t.gen2);
  root.style.setProperty("--gen3", t.gen3);

  redrawAllArt();
};



/* ---------------------------------------------------
   COMPLEX GENERATIVE ART ENGINE
--------------------------------------------------- */

function startGenerativeArt(canvas) {
  const ctx = canvas.getContext("2d");

  function draw() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const c1 = getComputedStyle(document.documentElement).getPropertyValue("--gen1");
    const c2 = getComputedStyle(document.documentElement).getPropertyValue("--gen2");
    const c3 = getComputedStyle(document.documentElement).getPropertyValue("--gen3");

    const palette = [c1, c2, c3];

    for (let i = 0; i < 70; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = Math.random() * 320 + 40;

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.strokeStyle = palette[Math.floor(Math.random() * palette.length)];
      ctx.lineWidth = Math.random() * 3 + 0.5;
      ctx.globalAlpha = Math.random() * 0.25 + 0.05;
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
  }

  draw();
  let interval = setInterval(draw, 5000);

  return () => {
    clearInterval(interval);
    draw();
  };
}

let redrawLeft = startGenerativeArt(leftCanvas);
let redrawRight = startGenerativeArt(rightCanvas);

function redrawAllArt() {
  redrawLeft();
  redrawRight();
}



/* ---------------------------------------------------
   SMOOTH SCROLL
--------------------------------------------------- */
document.getElementById("learnMoreBtn").onclick = () => {
  document.getElementById("about").scrollIntoView({ behavior: "smooth" });
};
