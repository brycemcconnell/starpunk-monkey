import {allies} from './Model.js';

export function initKeyboard() {
  let player = allies.activePool.filter(a => a.moveType == "manual");
  // console.log(player);
  window.addEventListener('keydown', (e) => {
  if (e.key == "w" || e.key == "W" || e.key == "ArrowUp") {
    player.forEach(manualShip => manualShip.moveDirection.up = true);
  }
  if (e.key == "s" || e.key == "S" || e.key == "ArrowDown") {
    player.forEach(manualShip => manualShip.moveDirection.down = true);
  }
  if (e.key == "a" || e.key == "A" || e.key == "ArrowLeft") {
    player.forEach(manualShip => manualShip.moveDirection.left = true);
  }
  if (e.key == "d" || e.key == "D" || e.key == "ArrowRight") {
    player.forEach(manualShip => manualShip.moveDirection.right = true);
  }
  if (e.key == "Shift") {
    player.forEach(manualShip => manualShip.booster = true);
  }
  if (e.key == " ") {
    player.forEach(manualShip => manualShip.shooting = true);
    e.preventDefault();
  }
});
window.addEventListener('keyup', (e) => {
  if (e.key == "w" || e.key == "W" || e.key == "ArrowUp") {
    player.forEach(manualShip => manualShip.moveDirection.up = false);
  }
  if (e.key == "s" || e.key == "S" || e.key == "ArrowDown") {
    player.forEach(manualShip => manualShip.moveDirection.down = false);
  }
  if (e.key == "a" || e.key == "A" || e.key == "ArrowLeft") {
    player.forEach(manualShip => manualShip.moveDirection.left = false);
  }
  if (e.key == "d" || e.key == "D" || e.key == "ArrowRight") {
    player.forEach(manualShip => manualShip.moveDirection.right = false);
  }
  if (e.key == "Shift") {
    player.forEach(manualShip => manualShip.booster = false);
  }
  if (e.key == " ") {
    player.forEach(manualShip => manualShip.shooting = false);
  }
});
window.addEventListener('mousedown', (e) => {
  player.forEach(manualShip => manualShip.shooting = true);
});
window.addEventListener('mouseup', (e) => {
  player.forEach(manualShip => manualShip.shooting = false);
});
}
