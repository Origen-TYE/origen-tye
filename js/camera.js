// js/camera.js

const video = document.getElementById("camera");

export async function initCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false
    });

    video.srcObject = stream;

    return new Promise(resolve => {
      video.onloadedmetadata = () => {
        video.play();
        resolve();
      };
    });

  } catch (error) {
    alert("No se pudo acceder a la cámara");
    console.error(error);
  }
}
