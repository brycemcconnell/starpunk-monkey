import { grid, speed, bullets, enemies, background, allies } from './Model.js';
import * as fr from './fr.js';
// import { ship } from './ship.js';
import { shoot, getNewBullet, bulletSpeed, stats, recycleBullet, player } from './player.js';
import * as UI from './UI.js'
import * as Gs from './Globals.js';
let timer = 0;
export function gameLoop(delta){
  background.forEach(layer => {
    layer.y = layer.y < 0 ? layer.y + (layer.vy * delta) : -Gs.CANVAS_SIZEY;
  });

  player.handleMovement(delta);
  enemies.activePool.forEach(enemy => {
    enemy.handleMove(delta);
  });
  // If you have multiple allies, make the fleet move at the same speed?
  // Sort by lowest speed first, eg allies[0] is slowest. Change the speed of your fleet based on this
  // allies[1] = {speed: 2};
  
  // ship.x += ship.vx;
  // ship.y += ship.vy;
  bulletLoop:
  for(let b = bullets.length - 1; b >= 0; b--){
    bullets[b].position.x += (Math.cos(bullets[b].rotation)*bulletSpeed)*delta;
    bullets[b].position.y += (Math.sin(bullets[b].rotation)*bulletSpeed)*delta;
    for (let x = enemies.activePool.length - 1; x >= 0; x--) {
      if (bullets[b].position.y < enemies.activePool[x].sprite.position.y + 12 &&
          bullets[b].position.y > enemies.activePool[x].sprite.position.y - 12 &&
          bullets[b].position.x > enemies.activePool[x].sprite.position.x - 12 &&
          bullets[b].position.x < enemies.activePool[x].sprite.position.x + 12 &&
          enemies.activePool[x].sprite.visible) {
        // console.log('hit', enemies);
        enemies.recycle(enemies.activePool[x]);
        stats.hits.update();
        
        PIXI.sound.play('explode');
        recycleBullet(bullets[b]);
        if (Gs.RESPAWN.value) { enemies.getNew(fr.randAngle4(), fr.random(224), fr.random(256)); }
        stats.enemyCounter.update();
        break bulletLoop;
      }
    }

    if (bullets[b].position.y < 0) {
      recycleBullet(bullets[b]);
    }
  }

  timer += 1;
  if (timer % 60 == 0) {
    UI.FPS.innerHTML = parseFloat(60 / delta).toFixed(1);
  }
 

}
