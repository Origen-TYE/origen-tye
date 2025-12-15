// js/gestureLogic.js
import { config } from "./config.js";

let hoverStart = null;
let activeButton = null;

export const buttons = [
  { id: "A", x: 200, y: 300, w: 180, h: 70, label: "ACCION A" },
  { id: "B", x: 450, y: 300, w: 180, h: 70, label: "ACCION B" }
];

export function updateGestures(cursor) {
  if (!cursor) {
    hoverStart = null;
    activeButton = null;
    return;
  }

  for (const btn of buttons) {
    const inside =
      cursor.x > btn.x &&
      cursor.x < btn.x + btn.w &&
      cursor.y > btn.y &&
      cursor.y < btn.y + btn.h;

    if (inside) {
      if (activeButton !== btn.id) {
        activeButton = btn.id;
        hoverStart = Date.now();
      }

      if (Date.now() - hoverStart > config.activationTime) {
        executeAction(btn.id);
        hoverStart = null;
        activeButton = null;
      }
      return;
    }
  }

  hoverStart = null;
  activeButton = null;
}

function executeAction(id) {
  alert(`Acción ejecutada: ${id}`);
}
