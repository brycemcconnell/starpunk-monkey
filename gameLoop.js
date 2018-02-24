import { grid, speed, bullets, enemies } from './Model.js';
import { ship } from './ship.js';
import { shoot, getNewBullet, bulletSpeed, player, recycleBullet } from './player.js';
import { wallpaper, stars, clouds } from './Setup.js';
import * as UI from './UI.js'
import * as Gs from './Globals.js';
export function gameLoop(delta){
  wallpaper.y = wallpaper.y < 0 ? wallpaper.y + .1 : -320;
  stars.y = stars.y < 0 ? stars.y + .5 : -320;
  clouds.y = clouds.y < 0 ? clouds.y + .3 : -320;
  //Move the grid 1 pixel 
  // for (let i = grid.length - 1; i >= 0; i--) {
  //   for (let j = grid[i].length - 1; j >= 0; j--) {
  //     grid[i][j].y += 1;
  //     if (grid[i][j].y >= Gs.CANVAS_SIZEY) grid[i][j].y = -Gs.TILE_SIZE + 1/* For some reason this looks better*/;
  //   }
  // }
  
  let currentSpeed = speed;
  if ((ship.moveDirection.up || ship.moveDirection.down) &&
      (ship.moveDirection.left || ship.moveDirection.right)) {
    currentSpeed = 1.3;
  }
  if (ship.booster && ship.fuel > 0) {
    currentSpeed += 1;
    ship.fuel -= .5;
  } else {
    ship.fuel += ship.fuel < ship.maxFuel ? 0.1 : 0;
  }
  UI.FuelGuage.style.height =  (ship.fuel * 100) / ship.maxFuel + "%";
  if (ship.moveDirection.up && ship.y > 0) {
    ship.y -= currentSpeed;
    ship.shadow.y -= currentSpeed;
  }
  if (ship.moveDirection.down && ship.y < Gs.CANVAS_SIZEY - Gs.TILE_SIZE) {
    ship.y += currentSpeed;
    ship.shadow.y += currentSpeed;
  }
  if (ship.moveDirection.left && ship.x > 0) {
    ship.x -= currentSpeed;
    ship.shadow.x -= currentSpeed;
  }
  if (ship.moveDirection.right && ship.x < Gs.CANVAS_SIZEX - Gs.TILE_SIZE) {
    ship.x += currentSpeed;
    ship.shadow.x += currentSpeed;
  }
  // ship.coolDown += ship.coolDown > 0 ? -1 : ship.coolDown == 0 ? ship.fireRate : -1;
  if (ship.coolDown > 0) {
    ship.coolDown -= 1;
  }
  if (ship.shooting && ship.coolDown == 0) {
    let pos = {x: ship.x + Gs.TILE_SIZE / 2 - 4, y: ship.y + Gs.TILE_SIZE / 2 - 4};
    shoot(Math.PI/180 * -90, pos);
    ship.coolDown = ship.fireRate;
  }
  UI.CoolDownGuage.style.opacity = (100 - (ship.coolDown * 100) / ship.fireRate) / 100;
  // ship.x += ship.vx;
  // ship.y += ship.vy;
  bulletLoop:
  for(let b = bullets.length - 1; b >= 0; b--){
    bullets[b].position.x += Math.cos(bullets[b].rotation)*bulletSpeed;
    bullets[b].position.y += Math.sin(bullets[b].rotation)*bulletSpeed;
    for (let x = enemies.activePool.length - 1; x >= 0; x--) {
      if (bullets[b].position.y < enemies.activePool[x].sprite.position.y + 24 &&
          bullets[b].position.y > enemies.activePool[x].sprite.position.y &&
          bullets[b].position.x > enemies.activePool[x].sprite.position.x &&
          bullets[b].position.x < enemies.activePool[x].sprite.position.x + 24 &&
          enemies.activePool[x].sprite.visible) {
        // console.log('hit', enemies);
        enemies.recycle(enemies.activePool[x]);
        player.hits.update();
        PIXI.sound.play('explode');
        recycleBullet(bullets[b]);
        break bulletLoop;
      }
    }

    if (bullets[b].position.y < 0) {
      recycleBullet(bullets[b]);
    }
  }
}