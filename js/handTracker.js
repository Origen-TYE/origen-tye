// js/handTracker.js

let handLandmarks = null;
let hands = null;

export function initHandTracker() {
  hands = new Hands({
    locateFile: file =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
  });

  hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7
  });

hands.onResults(results => {
  console.log("🖐 results:", results);

  if (results.multiHandLandmarks?.length) {
    console.log("✅ MANO DETECTADA");
    handLandmarks = results.multiHandLandmarks[0];
  } else {
    console.log("❌ NO HAY MANO");
    handLandmarks = null;
  }
});

}

export async function processHand(video) {
  console.log("📸 processHand ejecutándose");

  if (!hands || !video) return;
  await hands.send({ image: video });
}

export function getHandCursor(canvas) {
  if (!handLandmarks) return null;

  const index = handLandmarks[8]; // dedo índice
  return {
    x: index.x * canvas.width,
    y: index.y * canvas.height,
    landmarks: handLandmarks
  };
}
