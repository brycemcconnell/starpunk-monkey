import {allies} from './Model.js';
export function initKeyboard() {
  window.addEventListener('keydown', (e) => {
  if (e.key == "w" || e.key == "W") {
    allies[0].moveDirection.up = true;
  }
  if (e.key == "s" || e.key == "S") {
    allies[0].moveDirection.down = true;
  }
  if (e.key == "a" || e.key == "A") {
    allies[0].moveDirection.left = true;
  }
  if (e.key == "d" || e.key == "D") {
    allies[0].moveDirection.right = true;
  }
  if (e.key == "Shift") {
    allies[0].booster = true;
  }
  if (e.key == " ") {
    // allies[0].booster = true;
    allies[0].shooting = true;
  }
});
window.addEventListener('keyup', (e) => {
  if (e.key == "w" || e.key == "W") {
    allies[0].moveDirection.up = false;
  }
  if (e.key == "s" || e.key == "S") {
    allies[0].moveDirection.down = false;
  }
  if (e.key == "a" || e.key == "A") {
    allies[0].moveDirection.left = false;
  }
  if (e.key == "d" || e.key == "D") {
    allies[0].moveDirection.right = false;
  }
  if (e.key == "Shift") {
    allies[0].booster = false;
  }
  if (e.key == " ") {
    // allies[0].booster = true;
    allies[0].shooting = false;
  }
});
}
