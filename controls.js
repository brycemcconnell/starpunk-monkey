import {ship} from './ship.js';
export function initKeyboard() {
  window.addEventListener('keydown', (e) => {
  // console.log(e.key)
  if (e.key == "w" || e.key == "W") {
    ship.moveDirection.up = true;
  }
  if (e.key == "s" || e.key == "S") {
    ship.moveDirection.down = true;
  }
  if (e.key == "a" || e.key == "A") {
    ship.moveDirection.left = true;
  }
  if (e.key == "d" || e.key == "D") {
    ship.moveDirection.right = true;
  }
  if (e.key == "Shift") {
    ship.booster = true;
  }
  if (e.key == " ") {
    // ship.booster = true;
    ship.shooting = true;
  }
});
window.addEventListener('keyup', (e) => {
  if (e.key == "w" || e.key == "W") {
    ship.moveDirection.up = false;
  }
  if (e.key == "s" || e.key == "S") {
    ship.moveDirection.down = false;
  }
  if (e.key == "a" || e.key == "A") {
    ship.moveDirection.left = false;
  }
  if (e.key == "d" || e.key == "D") {
    ship.moveDirection.right = false;
  }
  if (e.key == "Shift") {
    ship.booster = false;
  }
  if (e.key == " ") {
    // ship.booster = true;
    ship.shooting = false;
  }
});
}
