// js/uiOverlay.js

export function drawUI(ctx, cursor) {
  if (!cursor || !cursor.landmarks) return;

  ctx.save();

  // Dibujar puntos de los dedos
  ctx.fillStyle = "#00aaff";

  cursor.landmarks.forEach(point => {
    ctx.beginPath();
    ctx.arc(
      point.x * ctx.canvas.width,
      point.y * ctx.canvas.height,
      6,
      0,
      Math.PI * 2
    );
    ctx.fill();
  });

  // Dibujar cursor principal (dedo índice)
  ctx.fillStyle = "#ff0000";
  ctx.beginPath();
  ctx.arc(cursor.x, cursor.y, 10, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
