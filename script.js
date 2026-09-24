/* ============================================================
   系统式自画像
   替换素材：只改下面 CONTENT。
   图片放在 assets/images/ ，视频放在 assets/videos/ 。
   路径相对于 index.html，方便直接部署到 GitHub Pages。

   新增平台：在 PLATFORMS 末尾追加一项。
   新增镜头：在 CAMERA_CLIPS 末尾追加一项。
   新增脸部碎片：在 MEMORY_FRAGMENTS 末尾追加一项。
   换眼睛照片：改 EYE.src。若构图变了，同时改 aspect / pupilX / pupilY / pupilSize。
   ============================================================ */

/* ============================================================
   CONTENT
   ============================================================ */

// 拼到这个比例就进入下一部分。故意不是 100%，脸不会被拼完整。
const ASSEMBLE_RATIO = 0.7;
// 戳破这么多个泡泡之后，剩下的会先排成一个人，再一起碎掉。
const POPS_TO_CONTINUE = 4;

// fx / fy：脸部区域内的位置（0–1），不是屏幕百分比。
// sx / sy：一开始散落时的屏幕百分比。
// jitter / rotate / scale / filter：拼上之后仍然错位、色差、比例不同。
// 出生于 2006。每张碎片是不同年份的脸，拼上之后仍然对不齐。
const MEMORY_FRAGMENTS = [
  {
    id: "forehead",
    src: "assets/images/memory/fragment-2022.jpg",
    year: "2022",
    age: "16",
    memoryText: "My first serious relationship.",
    sx: 8, sy: 14,
    fx: 0.12, fy: 0.0,
    w: 26, h: 16,
    rotate: -2.4,
    scale: 1.04,
    jitterX: 8, jitterY: -6,
    z: 2,
    filter: "contrast(1.06) saturate(0.88) brightness(1.06)",
    clip: "polygon(7% 2%, 84% 0%, 100% 22%, 93% 78%, 70% 100%, 18% 90%, 0% 62%, 4% 24%)",
  },
  {
    id: "eye-left",
    src: "assets/images/memory/fragment-2021.jpg",
    year: "2021",
    age: "15",
    memoryText: "Preparing for an important exam.",
    sx: 72, sy: 9,
    fx: 0.02, fy: 0.22,
    w: 20, h: 15,
    rotate: -4.2,
    scale: 1.06,
    jitterX: -9, jitterY: 6,
    z: 5,
    filter: "contrast(1.08) saturate(0.92) brightness(0.96)",
    clip: "polygon(4% 18%, 28% 0%, 92% 6%, 100% 48%, 78% 100%, 10% 86%, 0% 40%)",
  },
  {
    id: "eye-right",
    src: "assets/images/memory/fragment-2025.jpg",
    year: "2025",
    age: "19",
    memoryText: "I am here now.",
    sx: 78, sy: 58,
    fx: 0.50, fy: 0.20,
    w: 20, h: 16,
    rotate: 3.4,
    scale: 0.96,
    jitterX: 10, jitterY: 5,
    z: 5,
    filter: "contrast(1.1) saturate(0.86) brightness(0.94)",
    clip: "polygon(12% 0%, 88% 8%, 100% 40%, 80% 100%, 16% 92%, 0% 58%, 8% 16%)",
  },
  {
    id: "nose",
    src: "assets/images/memory/fragment-2009.jpg",
    year: "2009",
    age: "3",
    memoryText: "Cartoons, and a long time in front of a screen.",
    sx: 6, sy: 40,
    fx: 0.30, fy: 0.34,
    w: 18, h: 18,
    rotate: 2.2,
    scale: 1.03,
    jitterX: 4, jitterY: 9,
    z: 4,
    filter: "contrast(1.04) saturate(0.9) brightness(1.08)",
    clip: "polygon(18% 0%, 82% 4%, 100% 28%, 86% 100%, 22% 94%, 0% 70%, 8% 18%)",
  },
  {
    id: "mouth",
    src: "assets/images/memory/fragment-2008.jpg",
    year: "2008",
    age: "2",
    memoryText: "My first birthday portrait.",
    sx: 16, sy: 76,
    fx: 0.20, fy: 0.60,
    w: 22, h: 13,
    rotate: -1.8,
    scale: 1.05,
    jitterX: -6, jitterY: 8,
    z: 4,
    filter: "sepia(0.15) contrast(1.05) saturate(0.92) brightness(1.06)",
    clip: "polygon(6% 14%, 40% 0%, 100% 10%, 92% 72%, 60% 100%, 0% 80%, 0% 36%)",
  },
  {
    id: "chin",
    src: "assets/images/memory/fragment-2024.jpg",
    year: "2024",
    age: "18",
    memoryText: "I arrived in America.",
    sx: 58, sy: 80,
    fx: 0.22, fy: 0.76,
    w: 22, h: 14,
    rotate: 2.6,
    scale: 0.98,
    jitterX: 6, jitterY: -6,
    z: 3,
    filter: "sepia(0.18) contrast(1.04) saturate(0.95) brightness(1.04)",
    clip: "polygon(10% 0%, 78% 6%, 100% 30%, 88% 100%, 24% 92%, 0% 64%, 4% 18%)",
  },
];

// x / y：平台入口在屏幕上的百分比。
// 每个平台里的 images / lines 都是占位，直接改文字和路径。
const PLATFORMS = [
  {
    id: "instagram",
    name: "Instagram",
    x: 18,
    y: 34,
    avatar: "assets/images/platforms/avatar-instagram.jpg",
    avatarPos: { x: 4, y: 2.5 },
    frame: null,
    images: [
      { src: "assets/images/platforms/ig-pictures-01.jpg", x: 4, y: 16, w: 21, h: 23 },
      { src: "assets/images/platforms/ig-pictures-02.jpg", x: 26.5, y: 16, w: 21, h: 23 },
      { src: "assets/images/platforms/ig-pictures-03.jpg", x: 49, y: 16, w: 21, h: 23 },
      { src: "assets/images/platforms/ig-aesthetic-01.jpg", x: 4, y: 47, w: 21, h: 23 },
      { src: "assets/images/platforms/ig-aesthetic-02.jpg", x: 26.5, y: 47, w: 21, h: 23 },
      { src: "assets/images/platforms/ig-aesthetic-03.jpg", x: 49, y: 47, w: 21, h: 23 },
      { src: "assets/images/platforms/ig-saved.jpg", x: 74, y: 16, w: 22, h: 17 },
      { src: "assets/images/platforms/ig-following.jpg", x: 74, y: 43, w: 22, h: 21 },
    ],
    lines: [
      { text: "pictures", x: 4, y: 13, size: 12 },
      { text: "aesthetic", x: 4, y: 43.5, size: 12 },
      { text: "saved", x: 74, y: 13, size: 12 },
      { text: "following", x: 74, y: 40, size: 12 },
      { text: "visual preference", x: 4, y: 75, size: 12 },
      {
        text: "dark / archive / human face / city at night / monochrome / body / fashion / surveillance / nostalgia",
        x: 4,
        y: 79,
        size: 18,
        maxWidth: "92vw",
      },
    ],
  },
  {
    id: "tiktok",
    name: "TikTok",
    x: 80,
    y: 32,
    avatar: "assets/images/platforms/avatar-tiktok.svg",
    avatarPos: { x: 8, y: 10 },
    frame: { x: 14, y: 8, w: 26, h: 68 },
    images: [
      { src: "assets/images/platforms/tiktok-01.svg", caption: "recommended", x: 16, y: 12, w: 20, h: 60 },
      { src: "assets/images/platforms/tiktok-02.svg", caption: "watched", x: 44, y: 16, w: 18, h: 52 },
      { src: "assets/images/platforms/tiktok-03.svg", caption: "interest", x: 68, y: 24, w: 18, h: 46 },
    ],
    lines: [
      { text: "stayed", x: 42, y: 80, size: 18 },
    ],
    opens: false,
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    x: 50,
    y: 76,
    avatar: "assets/images/platforms/avatar-chatgpt.svg",
    avatarPos: { x: 72, y: 16 },
    frame: null,
    images: [],
    lines: [
      { text: "a question", x: 14, y: 30, size: 32 },
      { text: "a habit of language", x: 18, y: 46, size: 20 },
      { text: "a way of thinking", x: 14, y: 60, size: 28 },
      { text: "a subject that returns", x: 20, y: 76, size: 18 },
    ],
    opens: false,
  },
];

const EYE = {
  src: "assets/images/eye/eye.svg",
  aspect: "1200 / 760",
  pupilX: 50,
  pupilY: 50,
  pupilSize: 10.4,
};

// 点开瞳孔后播放的画面。再点右侧，或按右方向键，像闭眼一样进入结尾。
const CAMERA_CLIPS = [
  {
    type: "video",
    src: "assets/videos/eye.mp4",
    timestamp: "00:00:00",
  },
];

const ICONS = {
  instagram: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.2"/><circle cx="17.2" cy="6.8" r="0.7" fill="currentColor" stroke="none"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 9.5v5.2l4.2-2.6z" fill="currentColor" stroke="none"/></svg>',
  chatgpt: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M5 7.5h14v8H10l-3.5 3v-3H5z"/></svg>',
  default: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><circle cx="12" cy="12" r="6"/></svg>',
};

/* ============================================================
   state
   ============================================================ */

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const ms = (n) => (REDUCED ? Math.min(220, n * 0.2) : n);

const opening = document.getElementById("opening");
const memory = document.getElementById("memory-section");
const platform = document.getElementById("platform-section");
const collapse = document.getElementById("collapse-section");
const eye = document.getElementById("eye-section");
const camera = document.getElementById("camera-section");
const ending = document.getElementById("ending-section");
const eyeWrap = document.getElementById("eye-wrap");
const eyePhoto = document.getElementById("eye-photo");
const pupil = document.getElementById("pupil");
const bubbleField = document.getElementById("bubble-field");
const memoryLine = document.getElementById("memory-line");
const bodyGuide = document.getElementById("body-guide");
const worldArc = document.getElementById("world-arc");

const state = {
  phase: "opening",
  leavingQuestion: false,
  assembled: false,
  assembleTimer: null,
  viewed: new Set(),
  collapseQueued: false,
  collapseTimer: null,
  eyeComing: false,
  eyeReady: false,
  eyeOpening: false,
  cameraIndex: 0,
  cameraClosing: false,
  typing: false,
  typedDone: false,
  typeTimer: null,
  lens: { cx: 50, cy: 50 },
  bubbles: [],
  remaining: 0,
  pops: 0,
  chainStarted: false,
  forming: false,
  unstable: false,
  bubbleHinted: false,
  hinted: false,
  bubbleTimer: 0,
  worldTimer: 0,
  worldReadyAt: 0,
};

const pointer = { x: 0, y: 0, inside: false };
let dragEl = null;
let zTop = 20;

/* ============================================================
   audio
   文件放在 assets/audio/。缺失时静默跳过，不打断页面。
   ============================================================ */

const SOUND = {
  typeKey: "assets/audio/type-key.wav",
  typeEnd: "assets/audio/type-end.wav",
  paperPick: "assets/audio/paper-pick.wav",
  paperDrop: "assets/audio/paper-drop.wav",
  pop: [
    "assets/audio/pop-01.wav",
    "assets/audio/pop-02.wav",
    "assets/audio/pop-03.wav",
  ],
};

const sound = {
  unlocked: false,
  last: {},
};

function unlockSound() {
  sound.unlocked = true;
}

document.addEventListener("pointerdown", unlockSound, { capture: true });

function playSound(src, volume = 0.18, gap = 70) {
  if (!sound.unlocked || !src) return;
  const now = performance.now();
  const key = src.startsWith("assets/audio/pop-") ? "pop" : src;
  if (sound.last[key] && now - sound.last[key] < gap) return;
  sound.last[key] = now;
  try {
    const audio = new Audio(src);
    audio.preload = "auto";
    audio.volume = Math.max(0, Math.min(1, volume));
    audio.addEventListener("error", () => {}, { once: true });
    const pending = audio.play();
    if (pending && typeof pending.catch === "function") pending.catch(() => {});
  } catch (err) {
    /* missing file or autoplay block */
  }
}

function playPop() {
  const list = SOUND.pop;
  playSound(list[Math.floor(Math.random() * list.length)], 0.14, 110);
}

function setPhase(name) {
  state.phase = name;
  document.body.dataset.phase = name;
}

function iconFor(id) {
  return ICONS[id] || ICONS.default;
}

/* ============================================================
   sections — 切换
   ============================================================ */

function activate(id, { cut = false, hold = [] } = {}) {
  document.querySelectorAll(".section").forEach((sec) => {
    if (cut) sec.classList.add("is-cut");
    const on = sec.id === id;
    sec.classList.toggle("is-active", on);
    sec.classList.toggle("is-hold", hold.includes(sec.id));
    sec.inert = !on;
  });
  if (cut) {
    setTimeout(() => {
      document.querySelectorAll(".section.is-cut").forEach((sec) => sec.classList.remove("is-cut"));
    }, 40);
  }
}

function faceOrigin() {
  const vmin = Math.min(window.innerWidth, window.innerHeight) / 100;
  const fw = 48 * vmin;
  const fh = 64 * vmin;
  return {
    vmin,
    left: (window.innerWidth - fw) / 2,
    top: (window.innerHeight - fh) / 2 - vmin * 2,
  };
}

function targetFor(f, origin) {
  const o = origin || faceOrigin();
  return {
    x: o.left + f.fx * (48 * o.vmin) + f.jitterX,
    y: o.top + f.fy * (64 * o.vmin) + f.jitterY,
  };
}

/* ============================================================
   opening / ending-section
   ============================================================ */

const TYPE_LINE = "WHO AM I?";

function onQuestion(event) {
  if (state.leavingQuestion) return;
  if (state.phase !== "opening" && state.phase !== "ending") return;
  const root = event.currentTarget;
  if (!state.typedDone) {
    if (!state.typing) typeQuestion(root);
    return;
  }
  state.leavingQuestion = true;
  stopTyping();
  prepareCycle();
  activate("memory-section");
  setPhase("memory");
  restartScrapEntrance();
  setTimeout(() => hintScrap(), ms(1900));
  setTimeout(() => {
    state.leavingQuestion = false;
  }, ms(1800));
}

function stopTyping() {
  clearTimeout(state.typeTimer);
  state.typeTimer = null;
  state.typing = false;
}

function placeCaret(root, where) {
  const caret = root.querySelector(".caret");
  const host = root.querySelector(where === "line" ? ".question-line" : ".question-mark");
  host.appendChild(caret);
}

function resetTypewriter(root) {
  stopTyping();
  state.typedDone = false;
  root.querySelector(".question-mark .typed").textContent = "";
  root.querySelector(".question-line .typed").textContent = "";
  placeCaret(root, "mark");
}

function typeQuestion(root) {
  stopTyping();
  state.typing = true;
  state.typedDone = false;
  const mark = root.querySelector(".question-mark .typed");
  const line = root.querySelector(".question-line .typed");
  mark.textContent = "";
  line.textContent = "";
  placeCaret(root, "mark");

  if (REDUCED) {
    mark.textContent = "?";
    line.textContent = TYPE_LINE;
    placeCaret(root, "line");
    state.typing = false;
    state.typedDone = true;
    return;
  }

  const later = (fn, delay) => {
    state.typeTimer = setTimeout(fn, delay);
  };

  later(() => {
    mark.textContent = "?";
    playSound(SOUND.typeKey, 0.16, 30);
    placeCaret(root, "line");
    let index = 0;
    const step = () => {
      if (!state.typing) return;
      if (index < TYPE_LINE.length) {
        const ch = TYPE_LINE[index];
        line.textContent += ch;
        const last = index === TYPE_LINE.length - 1;
        if (ch !== " ") playSound(last ? SOUND.typeEnd : SOUND.typeKey, last ? 0.2 : 0.15, 30);
        index += 1;
        later(step, ms(165));
        return;
      }
      state.typing = false;
      state.typedDone = true;
    };
    later(step, ms(640));
  }, ms(220));
}

function playEndingQuestion() {
  const q = ending.querySelector(".question");
  typeQuestion(q);
}

function trackQuestion(e) {
  if (state.phase !== "opening" && state.phase !== "ending") return;
  const nx = e.clientX / window.innerWidth - 0.5;
  const ny = e.clientY / window.innerHeight - 0.5;
  const q = state.phase === "ending"
    ? ending.querySelector(".question")
    : opening.querySelector(".question");
  q.style.transform = `translate(${nx * 16}px, ${ny * 10}px)`;
}

document.getElementById("opening-question").addEventListener("click", onQuestion);
document.getElementById("ending-question").addEventListener("click", onQuestion);

/* ============================================================
   memory-section
   ============================================================ */

function buildScraps() {
  const stage = document.getElementById("memory-stage");
  stage.innerHTML = "";
  MEMORY_FRAGMENTS.forEach((f, i) => {
    const el = document.createElement("div");
    el.className = "scrap";
    el.dataset.id = f.id;
    el._frag = f;
    el.style.zIndex = String(f.z);
    el.style.animationDelay = `${i * 0.07}s`;
    el.style.setProperty("--rot", `${f.rotate}deg`);
    el.style.setProperty("--scale", String(f.scale));
    el.style.setProperty("--clip", f.clip);
    el.innerHTML = `
      <div class="scrap-inner">
        <div class="scrap-photo">
          <img alt="" draggable="false" />
          <span class="year"></span>
        </div>
      </div>
    `;
    const img = el.querySelector("img");
    const year = el.querySelector(".year");
    img.src = f.src;
    img.style.filter = f.filter;
    year.textContent = f.year;
    img.addEventListener("error", () => {
      img.style.visibility = "hidden";
    });
    el.addEventListener("pointerdown", onScrapDown);
    el.addEventListener("pointermove", onScrapMove);
    el.addEventListener("pointerup", onScrapUp);
    el.addEventListener("pointercancel", onScrapUp);
    stage.appendChild(el);
    layoutScrap(el);
  });
  layoutGuide();
}

function layoutGuide() {
  const guide = document.getElementById("body-guide");
  if (!guide) return;
  const o = faceOrigin();
  const faceW = 48 * o.vmin;
  const faceH = 64 * o.vmin;
  const w = faceW * 1.72;
  const h = faceH * 1.48;
  guide.style.width = `${w}px`;
  guide.style.height = `${h}px`;
  guide.style.left = `${o.left + faceW / 2 - w / 2}px`;
  guide.style.top = `${o.top - faceH * 0.08}px`;
}

function layoutScrap(el) {
  const f = el._frag;
  const o = faceOrigin();
  const w = f.w * o.vmin;
  const h = f.h * o.vmin;
  el.style.width = `${w}px`;
  el.style.height = `${h}px`;
  if (el.classList.contains("is-dragging")) return;
  if (el.classList.contains("is-placed")) {
    const t = targetFor(f, o);
    el.style.left = `${t.x}px`;
    el.style.top = `${t.y}px`;
    return;
  }
  let x = (f.sx / 100) * window.innerWidth;
  let y = (f.sy / 100) * window.innerHeight;
  x = Math.max(16, Math.min(x, window.innerWidth - w - 16));
  y = Math.max(16, Math.min(y, window.innerHeight - h - 16));
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
}

function restartScrapEntrance() {
  document.querySelectorAll("#memory-stage .scrap").forEach((el, i) => {
    el.style.animation = "none";
    el.style.animationDelay = `${i * 0.08}s`;
    void el.offsetWidth;
    el.style.animation = "";
  });
}

function hintScrap() {
  if (state.phase !== "memory" || state.hinted || REDUCED) return;
  state.hinted = true;
  const scraps = document.querySelectorAll("#memory-stage .scrap");
  const el = scraps[4] || scraps[0];
  if (!el || el.classList.contains("is-dragging") || el.classList.contains("is-placed")) return;
  el.animate(
    [
      { translate: "0 0" },
      { translate: "24px -16px", offset: 0.42 },
      { translate: "0 0" },
    ],
    { duration: 1700, easing: "ease" }
  );
}

function showMemory(f) {
  if (!f || !memoryLine) return;
  memoryLine.querySelector(".memory-age").textContent = f.age ? `AGE ${f.age}` : "";
  memoryLine.querySelector(".memory-text").textContent = f.memoryText || "";
  memoryLine.classList.remove("is-residue");
  memoryLine.classList.add("is-on");
}

function hideMemory() {
  if (!memoryLine) return;
  memoryLine.classList.remove("is-on");
  memoryLine.classList.add("is-residue");
  setTimeout(() => {
    if (!memoryLine.classList.contains("is-on")) memoryLine.classList.remove("is-residue");
  }, ms(1600));
}

function onScrapDown(e) {
  if (state.phase !== "memory" || state.assembled) return;
  if (e.button !== undefined && e.button !== 0) return;
  const el = e.currentTarget;
  dragEl = el;
  el.setPointerCapture(e.pointerId);
  const rect = el.getBoundingClientRect();
  el._dx = e.clientX - rect.left;
  el._dy = e.clientY - rect.top;
  el.classList.add("is-dragging");
  el.classList.remove("is-placed");
  el.style.transition = "none";
  el.style.animation = "none";
  el.style.opacity = "1";
  el.style.zIndex = String(++zTop);
  playSound(SOUND.paperPick, 0.13, 80);
  showMemory(el._frag);
  evaluateAssembly();
}

function onScrapMove(e) {
  if (dragEl !== e.currentTarget) return;
  const el = dragEl;
  const w = el.offsetWidth;
  const h = el.offsetHeight;
  let x = e.clientX - el._dx;
  let y = e.clientY - el._dy;
  x = Math.max(-w * 0.25, Math.min(x, window.innerWidth - w * 0.75));
  y = Math.max(-h * 0.25, Math.min(y, window.innerHeight - h * 0.75));
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  const f = el._frag;
  if (!f || !bodyGuide) return;
  const t = targetFor(f, faceOrigin());
  const dist = Math.hypot((x + w / 2) - (t.x + w / 2), (y + h / 2) - (t.y + h / 2));
  bodyGuide.classList.toggle("is-near", dist < Math.min(window.innerWidth, window.innerHeight) * 0.22);
}

function onScrapUp(e) {
  const el = e.currentTarget;
  if (dragEl !== el) return;
  dragEl = null;
  el.classList.remove("is-dragging");
  if (bodyGuide) bodyGuide.classList.remove("is-near");
  hideMemory();
  const f = el._frag;
  const o = faceOrigin();
  const t = targetFor(f, o);
  const cx = el.offsetLeft + el.offsetWidth / 2;
  const cy = el.offsetTop + el.offsetHeight / 2;
  const tx = t.x + el.offsetWidth / 2;
  const ty = t.y + el.offsetHeight / 2;
  const dist = Math.hypot(cx - tx, cy - ty);
  const threshold = Math.min(window.innerWidth, window.innerHeight) * 0.18;
  if (dist < threshold) {
    el.classList.add("is-placed");
    el.style.zIndex = String(f.z);
    el.style.transition = "left 1.05s cubic-bezier(.16,.8,.2,1), top 1.05s cubic-bezier(.16,.8,.2,1)";
    el.style.left = `${t.x}px`;
    el.style.top = `${t.y}px`;
    playSound(SOUND.paperDrop, 0.08, 40);
  } else {
    el.style.zIndex = String(f.z);
    playSound(SOUND.paperDrop, 0.12, 40);
  }
  evaluateAssembly();
}

function evaluateAssembly() {
  if (state.phase !== "memory" || state.assembled) return;
  const placed = document.querySelectorAll("#memory-stage .scrap.is-placed").length;
  const need = Math.ceil(MEMORY_FRAGMENTS.length * ASSEMBLE_RATIO);
  if (placed >= need) {
    if (bodyGuide) bodyGuide.classList.add("is-assembled");
    if (state.assembleTimer) return;
    state.assembleTimer = setTimeout(() => {
      state.assembleTimer = null;
      const still = document.querySelectorAll("#memory-stage .scrap.is-placed").length;
      if (still >= need && state.phase === "memory") {
        state.assembled = true;
        enterPlatform();
      }
    }, ms(3200));
    return;
  }
  if (bodyGuide) bodyGuide.classList.remove("is-assembled");
  if (state.assembleTimer) {
    clearTimeout(state.assembleTimer);
    state.assembleTimer = null;
  }
}

window.addEventListener("resize", () => {
  if (state.phase !== "memory" && state.phase !== "platform") return;
  document.querySelectorAll("#memory-stage .scrap").forEach((el) => {
    el.style.transition = "none";
    layoutScrap(el);
  });
  layoutGuide();
});

/* ============================================================
   platform-section
   ============================================================ */

function buildPlatforms() {
  const marks = document.getElementById("platform-marks");
  const views = document.getElementById("platform-views");
  marks.innerHTML = "";
  views.innerHTML = "";

  PLATFORMS.forEach((p, i) => {
    const mark = document.createElement("button");
    mark.type = "button";
    mark.className = "mark";
    mark.dataset.id = p.id;
    mark.style.left = `${p.x}%`;
    mark.style.top = `${p.y}%`;
    mark.style.transitionDelay = `${0.15 + i * 0.45}s`;
    mark.innerHTML = `
      <img class="mark-avatar" alt="" draggable="false" />
      <span class="mark-icon">${iconFor(p.id)}</span>
      <span class="mark-name"></span>
    `;
    mark.querySelector("img").src = p.avatar;
    mark.querySelector(".mark-name").textContent = p.name;
    if (p.opens === false) {
      mark.classList.add("is-still");
      mark.tabIndex = -1;
    }
    marks.appendChild(mark);

    const view = document.createElement("div");
    view.className = "platform-view";
    view.dataset.id = p.id;
    view.setAttribute("aria-hidden", "true");

    if (p.frame) {
      const frame = document.createElement("div");
      frame.className = "platform-frame bubble-source";
      frame.dataset.kind = "frame";
      frame.style.left = `${p.frame.x}%`;
      frame.style.top = `${p.frame.y}%`;
      frame.style.width = `${p.frame.w}%`;
      frame.style.height = `${p.frame.h}%`;
      view.appendChild(frame);
    }

    const avatar = document.createElement("img");
    avatar.className = "view-avatar bubble-source";
    avatar.dataset.kind = "image";
    avatar.src = p.avatar;
    avatar.alt = "";
    avatar.draggable = false;
    avatar.style.left = `${p.avatarPos.x}%`;
    avatar.style.top = `${p.avatarPos.y}%`;
    view.appendChild(avatar);

    const name = document.createElement("div");
    name.className = "view-name bubble-source";
    name.dataset.kind = "word";
    name.textContent = p.name;
    name.style.left = `calc(${p.avatarPos.x}% + 88px)`;
    name.style.top = `calc(${p.avatarPos.y}% + 26px)`;
    view.appendChild(name);

    p.images.forEach((item) => {
      const fig = document.createElement("figure");
      fig.className = "shot";
      fig.style.left = `${item.x}%`;
      fig.style.top = `${item.y}%`;
      fig.style.width = `${item.w}%`;
      fig.style.height = `${item.h}%`;
      const image = document.createElement("img");
      image.className = "bubble-source";
      image.dataset.kind = "image";
      image.src = item.src;
      image.alt = "";
      image.draggable = false;
      fig.appendChild(image);
      if (item.caption) {
        const cap = document.createElement("figcaption");
        cap.className = "bubble-source";
        cap.dataset.kind = "word";
        cap.textContent = item.caption;
        fig.appendChild(cap);
      }
      view.appendChild(fig);
    });

    p.lines.forEach((line) => {
      const el = document.createElement("p");
      el.className = "trace bubble-source";
      el.dataset.kind = "word";
      el.textContent = line.text;
      el.style.left = `${line.x}%`;
      el.style.top = `${line.y}%`;
      el.style.fontSize = `${line.size}px`;
      if (line.maxWidth) el.style.maxWidth = line.maxWidth;
      view.appendChild(el);
    });

    views.appendChild(view);
  });

  setTimeout(() => {
    marks.querySelectorAll(".mark").forEach((m) => m.classList.add("is-in"));
  }, 40);
}

function enterPlatform() {
  if (state.phase === "platform") return;
  document.querySelectorAll("#memory-stage .scrap").forEach((el) => {
    el.style.animation = "none";
    el.style.opacity = el.classList.contains("is-placed") ? "1" : "0.22";
  });
  buildPlatforms();
  activate("platform-section", { hold: ["memory-section"] });
  setPhase("platform");
}

function openPlatform(id) {
  if (state.phase !== "platform" || state.collapseQueued) return;
  const platformData = PLATFORMS.find((item) => item.id === id);
  if (!platformData || platformData.opens === false) return;
  document.querySelectorAll(".platform-view").forEach((view) => {
    const on = view.dataset.id === id;
    view.classList.toggle("is-open", on);
    view.setAttribute("aria-hidden", on ? "false" : "true");
  });
  state.viewed.add(id);
}

function closePlatformView() {
  if (state.phase !== "platform" || state.collapseQueued) return;
  const opened = document.querySelector(".platform-view.is-open");
  const openedId = opened ? opened.dataset.id : "";
  document.querySelectorAll(".platform-view").forEach((view) => {
    view.classList.remove("is-open");
    view.setAttribute("aria-hidden", "true");
  });
  if (openedId !== "instagram") return;
  state.collapseQueued = true;
  state.collapseTimer = setTimeout(() => {
    if (state.phase === "platform") beginCollapse();
  }, ms(600));
}

platform.addEventListener("click", (e) => {
  if (state.phase !== "platform") return;
  const mark = e.target.closest(".mark");
  if (mark) {
    openPlatform(mark.dataset.id);
    return;
  }
  if (e.target.closest(".platform-view.is-open")) closePlatformView();
});

/* ============================================================
   collapse-section
   ============================================================ */

function computeSize(kind, rect, text) {
  if (kind === "word") {
    const len = (text || "").length;
    return Math.max(96, Math.min(180, 78 + len * 4));
  }
  if (kind === "frame") {
    return Math.max(110, Math.min(180, Math.max(rect.width, rect.height) * 0.26));
  }
  return Math.max(100, Math.min(220, Math.max(rect.width, rect.height) * 0.82));
}

function spawnBubbles() {
  bubbleField.innerHTML = "";
  state.bubbles = [];
  const fieldRect = bubbleField.getBoundingClientRect();
  const sources = platform.querySelectorAll('.platform-view[data-id="instagram"] .bubble-source');
  sources.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;
    const kind = el.dataset.kind || "image";
    const text = kind === "word" ? el.textContent.trim() : "";
    const size = computeSize(kind, rect, text);
    const jx = (Math.random() - 0.5) * 28;
    const jy = (Math.random() - 0.5) * 22;
    const destX = rect.left - fieldRect.left + rect.width / 2 - size / 2 + jx;
    const destY = rect.top - fieldRect.top + rect.height / 2 - size / 2 + jy;
    const view = el.closest(".platform-view");
    const visible = !!(view && view.classList.contains("is-open"));

    const bubble = document.createElement("button");
    bubble.type = "button";
    bubble.className = `bubble ${kind}`;
    bubble.dataset.kind = kind;
    bubble.style.left = `${rect.left - fieldRect.left}px`;
    bubble.style.top = `${rect.top - fieldRect.top}px`;
    bubble.style.width = `${rect.width}px`;
    bubble.style.height = `${rect.height}px`;
    bubble.style.borderRadius = el.classList.contains("view-avatar") ? "50%" : "2px";
    bubble.style.opacity = visible ? "1" : "0";
    if (kind === "frame") bubble.style.background = "transparent";

    if (kind === "word") {
      bubble.textContent = text;
    } else if (kind === "image") {
      const img = document.createElement("img");
      img.alt = "";
      img.draggable = false;
      img.src = el.src || "";
      bubble.appendChild(img);
    }

    bubbleField.appendChild(bubble);
    state.bubbles.push({
      el: bubble,
      x: destX,
      y: destY,
      w: size,
      h: size,
      size,
      ox: 0,
      oy: 0,
      amp: 12 + Math.random() * 16,
      speed: 0.18 + Math.random() * 0.22,
      phase: Math.random() * Math.PI * 2,
      popped: false,
    });
  });
  separateBubbles(state.bubbles);
  state.remaining = state.bubbles.length;
  state.chainStarted = false;
}

function separateBubbles(bubbles) {
  const pad = 16;
  for (let n = 0; n < 18; n += 1) {
    for (let i = 0; i < bubbles.length; i += 1) {
      for (let j = i + 1; j < bubbles.length; j += 1) {
        const a = bubbles[i];
        const b = bubbles[j];
        let dx = (b.x + b.size / 2) - (a.x + a.size / 2);
        let dy = (b.y + b.size / 2) - (a.y + a.size / 2);
        let dist = Math.hypot(dx, dy) || 0.01;
        const min = (a.size + b.size) / 2 + pad;
        if (dist >= min) continue;
        const push = (min - dist) / 2;
        dx /= dist;
        dy /= dist;
        a.x -= dx * push;
        a.y -= dy * push;
        b.x += dx * push;
        b.y += dy * push;
      }
    }
    bubbles.forEach((b) => {
      b.x = Math.max(20, Math.min(window.innerWidth - b.size - 20, b.x));
      b.y = Math.max(20, Math.min(window.innerHeight - b.size - 20, b.y));
    });
  }
}

function startBubbleMotion() {
  void bubbleField.offsetWidth;
  state.bubbles.forEach((b) => {
    b.el.style.transition = "width 1.8s ease, height 1.8s ease, left 1.8s ease, top 1.8s ease, border-radius 1.8s ease, opacity 1.6s ease, background 1.8s ease";
    b.el.style.width = `${b.size}px`;
    b.el.style.height = `${b.size}px`;
    b.el.style.left = `${b.x}px`;
    b.el.style.top = `${b.y}px`;
    b.el.style.borderRadius = "50%";
    b.el.style.opacity = "1";
    b.el.style.background = "";
  });
  clearTimeout(state.bubbleTimer);
  const hint = state.bubbles.find((b) => !b.popped);
  if (hint && !state.bubbleHinted) {
    state.bubbleHinted = true;
    hint.el.classList.add("is-hint");
    setTimeout(() => hint.el.classList.remove("is-hint"), ms(1400));
  }
  state.bubbleTimer = setTimeout(() => bubbleTick(performance.now()), ms(1500));
}

function bubbleTick(now) {
  if (state.phase !== "collapse" || state.forming) return;
  const t = now / 1000;
  const awake = state.pops > 0;
  state.bubbles.forEach((b) => {
    if (b.popped) return;
    const floatX = Math.sin(t * b.speed + b.phase) * b.amp;
    const floatY = Math.cos(t * b.speed * 0.8 + b.phase) * b.amp * 1.15;
    const cx = b.x + b.w / 2 + floatX;
    const cy = b.y + b.h / 2 + floatY;
    let rx = 0;
    let ry = 0;
    if (pointer.inside) {
      const dx = cx - pointer.x;
      const dy = cy - pointer.y;
      const dist = Math.hypot(dx, dy) || 1;
      const radius = awake ? 220 : 150;
      if (dist < radius) {
        const force = (radius - dist) / radius;
        const push = awake ? 78 : 46;
        rx = (dx / dist) * force * push;
        ry = (dy / dist) * force * (awake ? 64 : 40);
      }
    }
    b.ox += (rx - b.ox) * 0.06;
    b.oy += (ry - b.oy) * 0.06;
    const s = Math.min(0.1, Math.hypot(b.ox, b.oy) / 520);
    b.el.style.transform = `translate(${floatX + b.ox}px, ${floatY + b.oy}px) scale(${1 + s}, ${1 - s * 0.85})`;
  });
  state.bubbleTimer = setTimeout(() => bubbleTick(performance.now()), 32);
}

function spawnShards(el) {
  const rect = el.getBoundingClientRect();
  const fieldRect = bubbleField.getBoundingClientRect();
  const cx = rect.left - fieldRect.left + rect.width / 2;
  const cy = rect.top - fieldRect.top + rect.height / 2;
  for (let i = 0; i < 6; i += 1) {
    const shard = document.createElement("span");
    shard.className = "shard";
    const ang = (Math.PI * 2 * i) / 6 + Math.random() * 0.45;
    const dist = 34 + Math.random() * 78;
    shard.style.left = `${cx}px`;
    shard.style.top = `${cy}px`;
    shard.style.setProperty("--dx", `${Math.cos(ang) * dist}px`);
    shard.style.setProperty("--dy", `${Math.sin(ang) * dist}px`);
    if (i % 2 === 0) {
      shard.style.width = "6px";
      shard.style.height = "3px";
      shard.style.borderRadius = "1px";
    }
    bubbleField.appendChild(shard);
    setTimeout(() => shard.remove(), ms(800));
  }
}

function popBubble(el) {
  if (!el || el.dataset.popped === "1") return;
  const found = state.bubbles.find((item) => item.el === el);
  if (found) found.popped = true;
  el.dataset.popped = "1";
  el.style.transition = "none";
  el.style.transform = "";
  el.classList.add("is-popped");
  spawnShards(el);
  playPop();
  state.pops += 1;
  if (state.pops >= POPS_TO_CONTINUE && !state.chainStarted) {
    const left = state.bubbles.filter((b) => !b.popped);
    if (left.length < 3) {
      state.chainStarted = true;
      setTimeout(() => {
        if (state.phase === "collapse") finishCollapse();
      }, ms(900));
    } else {
      formPerson();
    }
  }
  setTimeout(() => {
    el.remove();
    state.remaining -= 1;
    if (state.remaining <= 0) finishCollapse();
  }, ms(780));
}

const PERSON_SHAPE = [
  [0.50, 0.10], [0.44, 0.14], [0.56, 0.14], [0.50, 0.19], [0.40, 0.17], [0.60, 0.17],
  [0.34, 0.30], [0.66, 0.30], [0.42, 0.34], [0.58, 0.34], [0.50, 0.40],
  [0.50, 0.50], [0.45, 0.58], [0.55, 0.58], [0.50, 0.66],
  [0.26, 0.40], [0.74, 0.40], [0.18, 0.52], [0.82, 0.52], [0.14, 0.62], [0.86, 0.62],
  [0.43, 0.76], [0.57, 0.76], [0.41, 0.88], [0.59, 0.88],
];

function formPerson() {
  if (state.forming) return;
  state.forming = true;
  state.chainStarted = true;
  clearTimeout(state.bubbleTimer);
  const left = state.bubbles.filter((b) => !b.popped);
  const span = Math.min(window.innerWidth, window.innerHeight);
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const sx = span * 0.46;
  const sy = span * 0.52;
  collapse.classList.add("is-person");
  left.forEach((b, i) => {
    const p = PERSON_SHAPE[i % PERSON_SHAPE.length];
    const lap = Math.floor(i / PERSON_SHAPE.length);
    const x = cx + (p[0] - 0.5) * sx * 2 - b.size / 2 + lap * 8;
    const y = cy + (p[1] - 0.42) * sy * 2 - b.size / 2;
    b.x = x;
    b.y = y;
    b.el.style.transition = "left 2.6s cubic-bezier(.4,0,.2,1), top 2.6s cubic-bezier(.4,0,.2,1), transform 2.6s ease";
    b.el.style.transform = "none";
    b.el.style.left = `${x}px`;
    b.el.style.top = `${y}px`;
  });
  state.collapseTimer = setTimeout(() => destabilizePerson(), ms(4600));
}

function destabilizePerson() {
  if (state.phase !== "collapse" || state.unstable) return;
  state.unstable = true;
  collapse.classList.add("is-unstable");
  const left = state.bubbles.filter((b) => !b.popped);
  if (!left.length) {
    finishCollapse();
    return;
  }
  left.forEach((b, i) => {
    const drift = (i % 2 === 0 ? 1 : -1) * (22 + (i % 5) * 16);
    b.el.style.transition = "left 1.2s ease, top 1.2s ease";
    b.el.style.left = `${b.x + drift}px`;
    b.el.style.top = `${b.y + (i % 3) * 12 - 10}px`;
    setTimeout(() => {
      if (state.phase === "collapse") popBubble(b.el);
    }, ms(980 + i * 80));
  });
}

bubbleField.addEventListener("click", (e) => {
  const bubble = e.target.closest(".bubble");
  if (bubble) popBubble(bubble);
});

function beginCollapse() {
  if (state.phase === "collapse") return;
  spawnBubbles();
  collapse.classList.add("is-cut");
  platform.classList.add("is-cut");
  collapse.classList.add("is-active");
  collapse.inert = false;
  platform.classList.remove("is-active");
  platform.classList.add("is-gone");
  platform.inert = true;
  memory.classList.add("is-dissolving");
  setPhase("collapse");
  setTimeout(() => {
    collapse.classList.remove("is-cut");
    platform.classList.remove("is-cut");
    collapse.classList.add("is-dark");
    startBubbleMotion();
  }, 40);
}

function finishCollapse() {
  if (state.eyeComing) return;
  state.eyeComing = true;
  clearTimeout(state.bubbleTimer);
  setTimeout(revealEye, ms(1100));
}

/* ============================================================
   eye-section
   ============================================================ */

function initEye() {
  eyePhoto.src = EYE.src;
  eyeWrap.style.aspectRatio = EYE.aspect;
  pupil.style.left = `${EYE.pupilX}%`;
  pupil.style.top = `${EYE.pupilY}%`;
  pupil.style.width = `${EYE.pupilSize}%`;
}

function revealEye() {
  state.eyeReady = false;
  eyeWrap.classList.remove("is-in", "is-ready");
  collapse.classList.add("is-cut");
  collapse.classList.remove("is-active", "is-dark");
  collapse.inert = true;
  eye.classList.add("is-cut", "is-active");
  eye.inert = false;
  setPhase("eye");
  setTimeout(() => {
    collapse.classList.remove("is-cut");
    eye.classList.remove("is-cut");
    void eyeWrap.offsetWidth;
    eyeWrap.classList.add("is-in");
  }, 40);
  setTimeout(() => {
    if (state.phase !== "eye") return;
    state.eyeReady = true;
    eyeWrap.classList.add("is-ready");
  }, ms(2800));
}

function trackPupil(e) {
  if (state.phase !== "eye" || state.eyeOpening) return;
  const rect = eyeWrap.getBoundingClientRect();
  if (!rect.width) return;
  const cx = rect.left + rect.width * (EYE.pupilX / 100);
  const cy = rect.top + rect.height * (EYE.pupilY / 100);
  const dx = (e.clientX - cx) / rect.width;
  const dy = (e.clientY - cy) / rect.height;
  const max = 10;
  const x = Math.max(-1, Math.min(1, dx * 2.4)) * max;
  const y = Math.max(-1, Math.min(1, dy * 2.4)) * max;
  pupil.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(1)`;
}

function openPupil() {
  if (state.phase !== "eye" || !state.eyeReady || state.eyeOpening) return;
  state.eyeOpening = true;
  setPhase("eye-to-camera");
  eyeWrap.classList.add("is-receding");
  camera.classList.add("is-cut", "is-from-pupil", "is-active", "is-world");
  camera.inert = false;
  setTimeout(() => {
    if (state.phase !== "eye-to-camera") return;
    camera.classList.remove("is-cut");
    mountWorld();
    camera.classList.add("is-arriving");
  }, ms(1100));
  setTimeout(() => {
    if (state.phase !== "eye-to-camera") return;
    eye.classList.remove("is-active");
    eye.inert = true;
    eyeWrap.classList.remove("is-receding", "is-in", "is-ready", "is-lens");
    camera.classList.add("is-open");
    setPhase("camera");
    state.eyeOpening = false;
    state.worldReadyAt = performance.now();
    clearTimeout(state.worldTimer);
    state.worldTimer = setTimeout(() => closeWorld(), ms(16000));
  }, ms(3200));
}

eyeWrap.addEventListener("click", openPupil);

/* ============================================================
   camera-section
   ============================================================ */

function mountWorld() {
  const clip = CAMERA_CLIPS[0];
  if (!clip) return;
  const stamp = document.getElementById("timestamp");
  if (stamp) stamp.textContent = clip.timestamp || "";
  document.querySelectorAll(".world-pane").forEach((video, i) => {
    video.muted = i !== 1;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    if (video.getAttribute("src") !== clip.src) video.src = clip.src;
    const start = () => {
      try { video.currentTime = i * 5; } catch (err) { /* not ready yet */ }
      const attempt = video.play();
      if (attempt && typeof attempt.catch === "function") {
        attempt.catch(() => {
          video.muted = true;
          const retry = video.play();
          if (retry && typeof retry.catch === "function") retry.catch(() => {});
        });
      }
    };
    if (video.readyState >= 2) start();
    else video.addEventListener("loadeddata", start, { once: true });
  });
}

function stopCameraMedia() {
  document.querySelectorAll(".world-pane").forEach((video) => {
    video.pause();
    video.removeAttribute("src");
    video.load();
  });
}

function advanceCamera(dir) {
  if (state.phase !== "camera" || state.cameraClosing) return;
  if (dir > 0) closeWorld();
}

function closeCamera() {
  closeWorld();
}

function closeWorld() {
  if (state.cameraClosing) return;
  state.cameraClosing = true;
  clearTimeout(state.worldTimer);
  setPhase("closing");
  camera.classList.add("is-dimming");
  setTimeout(() => {
    if (!camera.classList.contains("is-dimming")) return;
    camera.classList.add("is-gone-person");
  }, ms(3600));
  setTimeout(arriveEnding, ms(7200));
}

function trackCamera(e) {
  if (state.phase !== "camera" && state.phase !== "eye-to-camera") return;
  const nx = e.clientX / window.innerWidth - 0.5;
  const ny = e.clientY / window.innerHeight - 0.5;
  const head = document.querySelector(".person-head");
  if (head) {
    head.style.transform = `translateX(-50%) rotate(${nx * 7}deg) translate(${nx * 6}px, ${ny * 3}px)`;
  }
  if (worldArc && state.phase === "camera") {
    worldArc.style.transform = `translate(calc(-50% + ${nx * -34}px), calc(-50% + ${ny * -16}px))`;
  }
}

camera.addEventListener("click", () => {
  if (state.phase !== "camera" || state.cameraClosing) return;
  if (performance.now() - state.worldReadyAt < 4500) return;
  closeWorld();
});

function arriveEnding() {
  clearTimeout(state.worldTimer);
  stopCameraMedia();
  camera.classList.add("is-cut");
  camera.classList.remove("is-active", "is-from-pupil", "is-open", "is-world", "is-arriving", "is-dimming", "is-gone-person");
  camera.inert = true;
  eye.classList.remove("is-active", "is-hold");
  eye.inert = true;
  eyeWrap.classList.remove("is-lens", "is-in", "is-ready", "is-receding");
  ending.classList.add("is-cut", "is-active");
  ending.inert = false;
  setPhase("ending");
  state.cameraClosing = false;
  playEndingQuestion();
  setTimeout(() => {
    camera.classList.remove("is-cut");
    camera.style.clipPath = "";
    camera.style.transition = "";
    ending.classList.remove("is-cut");
  }, 40);
}

/* ============================================================
   loop
   ============================================================ */

function prepareCycle() {
  clearTimeout(state.assembleTimer);
  clearTimeout(state.collapseTimer);
  clearTimeout(state.bubbleTimer);
  clearTimeout(state.worldTimer);
  stopTyping();
  state.typedDone = false;
  state.assembleTimer = null;
  state.collapseTimer = null;
  state.assembled = false;
  state.viewed = new Set();
  state.collapseQueued = false;
  state.eyeComing = false;
  state.eyeReady = false;
  state.eyeOpening = false;
  state.cameraIndex = 0;
  state.cameraClosing = false;
  state.bubbles = [];
  state.remaining = 0;
  state.pops = 0;
  state.chainStarted = false;
  state.forming = false;
  state.unstable = false;
  state.bubbleHinted = false;
  state.hinted = false;
  state.worldReadyAt = 0;
  state.lens = { cx: 50, cy: 50 };

  stopCameraMedia();
  if (memoryLine) memoryLine.classList.remove("is-on", "is-residue");
  if (bodyGuide) bodyGuide.classList.remove("is-near", "is-assembled");
  if (worldArc) worldArc.style.transform = "";
  const head = document.querySelector(".person-head");
  if (head) head.style.transform = "";
  bubbleField.innerHTML = "";

  memory.classList.remove("is-dissolving", "is-hold", "is-active");
  platform.classList.remove("is-gone", "is-active", "is-hold");
  platform.style.visibility = "";
  collapse.classList.remove("is-active", "is-dark", "is-hold", "is-person", "is-unstable");
  eye.classList.remove("is-active", "is-hold");
  eyeWrap.classList.remove("is-in", "is-ready", "is-opening", "is-lens", "is-receding");
  eyePhoto.style.opacity = "";
  eyePhoto.style.filter = "";
  eyePhoto.style.transition = "";
  pupil.style.opacity = "";
  pupil.style.transform = "";
  pupil.style.transition = "";
  camera.classList.remove("is-active", "is-from-pupil", "is-open", "is-hold", "is-world", "is-arriving", "is-dimming", "is-gone-person");
  camera.style.clipPath = "";
  camera.style.transition = "";

  opening.querySelector(".question").style.transform = "";
  ending.querySelector(".question").style.transform = "";

  buildScraps();
}

function preload() {
  const urls = [EYE.src];
  MEMORY_FRAGMENTS.forEach((f) => urls.push(f.src));
  PLATFORMS.forEach((p) => {
    urls.push(p.avatar);
    p.images.forEach((img) => urls.push(img.src));
  });
  CAMERA_CLIPS.forEach((clip) => {
    if (clip.type === "image") urls.push(clip.src);
    if (clip.poster) urls.push(clip.poster);
  });
  urls.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

/* ============================================================
   init
   ============================================================ */

window.addEventListener("pointermove", (e) => {
  pointer.x = e.clientX;
  pointer.y = e.clientY;
  pointer.inside = true;
  trackQuestion(e);
  trackPupil(e);
  trackCamera(e);
});

window.addEventListener("blur", () => {
  pointer.inside = false;
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePlatformView();
  if (state.phase !== "camera") return;
  if (e.key === "ArrowRight") advanceCamera(1);
  if (e.key === "ArrowLeft") advanceCamera(-1);
});

initEye();
preload();
setPhase("opening");
resetTypewriter(opening.querySelector(".question"));
