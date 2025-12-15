// js/faceTracker.js

let faceMesh;
let nose = null;

export function initFaceTracker() {
  faceMesh = new FaceMesh({
    locateFile: file =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
  });

  faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.6,
    minTrackingConfidence: 0.6
  });

  faceMesh.onResults(results => {
    if (results.multiFaceLandmarks?.length) {
      const n = results.multiFaceLandmarks[0][1]; // nariz
      nose = { x: n.x, y: n.y };
    }
  });
}

export async function processFace(video) {
  if (!faceMesh) return;
  await faceMesh.send({ image: video });
}

export function getFaceCursor(canvas) {
  if (!nose) return null;
  return {
    x: nose.x * canvas.width,
    y: nose.y * canvas.height
  };
}
