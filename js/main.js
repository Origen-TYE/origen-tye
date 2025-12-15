// js/main.js
import { initCamera } from "./camera.js";
import {
  initHandTracker,
  processHand,
  getHandCursor
} from "./handTracker.js";
import {
  initFaceTracker,
  processFace,
  getFaceCursor
} from "./faceTracker.js";
import { drawUI } from "./uiOverlay.js";
import { updateGestures } from "./gestureLogic.js";
import { config } from "./config.js";

const canvas = document.getElementById("overlay");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let video = null;

async function start() {
  console.log("✅ main.js iniciado");

  video = await initCamera();
  initHandTracker();
  initFaceTracker();

  requestAnimationFrame(loop);
}

async function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let cursor = null;

  if (video && video.readyState >= 2) {
    if (config.mode === "hand") {
      await processHand(video);
      cursor = getHandCursor(canvas);
    } else {
      await processFace(video);
      cursor = getFaceCursor(canvas);
    }

    updateGestures(cursor);
    drawUI(ctx, cursor);
  }

  requestAnimationFrame(loop);
}

// Cambio de modo MANO / NARIZ
const modeBtn = document.getElementById("modeBtn");
if (modeBtn) {
  modeBtn.onclick = () => {
    config.mode = config.mode === "hand" ? "nose" : "hand";
    modeBtn.innerText = `Modo: ${config.mode.toUpperCase()}`;
  };
}

start();
