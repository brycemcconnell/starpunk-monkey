import {allies, app} from './Model.js';
import {player} from './player.js';

export function initKeyboard() {
  let playerShips = allies.activePool.filter(a => a.moveType == "manual");
  // console.log(playerShips);
  window.addEventListener('keydown', (e) => {
  if (e.key == "w" || e.key == "W" || e.key == "ArrowUp") {
    playerShips.forEach(manualShip => manualShip.moveDirection.up = true);
  }
  if (e.key == "s" || e.key == "S" || e.key == "ArrowDown") {
    playerShips.forEach(manualShip => manualShip.moveDirection.down = true);
  }
  if (e.key == "a" || e.key == "A" || e.key == "ArrowLeft") {
    playerShips.forEach(manualShip => manualShip.moveDirection.left = true);
  }
  if (e.key == "d" || e.key == "D" || e.key == "ArrowRight") {
    playerShips.forEach(manualShip => manualShip.moveDirection.right = true);
  }
  if (e.key == "Shift") {
    playerShips.forEach(manualShip => manualShip.booster = true);
  }
  if (e.key == " ") {
    playerShips.forEach(manualShip => manualShip.shooting = true);
    e.preventDefault();
  }
});
window.addEventListener('keyup', (e) => {
  if (e.key == "w" || e.key == "W" || e.key == "ArrowUp") {
    playerShips.forEach(manualShip => manualShip.moveDirection.up = false);
  }
  if (e.key == "s" || e.key == "S" || e.key == "ArrowDown") {
    playerShips.forEach(manualShip => manualShip.moveDirection.down = false);
  }
  if (e.key == "a" || e.key == "A" || e.key == "ArrowLeft") {
    playerShips.forEach(manualShip => manualShip.moveDirection.left = false);
  }
  if (e.key == "d" || e.key == "D" || e.key == "ArrowRight") {
    playerShips.forEach(manualShip => manualShip.moveDirection.right = false);
  }
  if (e.key == "Shift") {
    playerShips.forEach(manualShip => manualShip.booster = false);
  }
  if (e.key == " ") {
    playerShips.forEach(manualShip => manualShip.shooting = false);
  }
  if (e.key == "x") {
    player.moveMode.toggle();
  }
});
app.view.addEventListener('mousedown', (e) => {
  playerShips.forEach(manualShip => manualShip.shooting = true);
});
window.addEventListener('mouseup', (e) => {
  playerShips.forEach(manualShip => manualShip.shooting = false);
});
}
