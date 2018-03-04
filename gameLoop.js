import { grid, speed, allyBullets, enemies, enemyBullets, background, allies } from './Model.js';
import * as fr from './lib/fr.js';
import { shoot, bulletSpeed, statsOld, player } from './player.js';
import * as UI from './UI.js'
import * as Gs from './Globals.js';
import {gameTime, trueTime, entitiesTotalCount, gameRelevantStats} from './stats.js';
import Wave from './Wave.js';
import {resetGame} from './resetGame.js';


let timer = 0;
let lastTime = Date.now();

export function gameLoop(delta){
  if (Gs.RENDER_STATE.value) {
    trueTime.update(trueTime.active += Date.now() - lastTime,
                  trueTime.inactive = Math.floor(trueTime.active / 1000));
    lastTime = Date.now();

    timer += 1;
    if (timer % 60 == 0) {
      gameTime.update(gameTime.active += 1);
      UI.FPS.innerHTML = parseFloat(60 / delta).toFixed(1);
    }
    // console.log(timer)

    background.forEach(layer => {
      layer.y = layer.y * 2 < 0 ? layer.y + (layer.vy * delta) : -Gs.CANVAS_SIZEY;
    });

    player.handleMovement(delta);
    enemies.activePool.forEach(enemy => {
      enemy.handleMove(delta);
      enemy.handleAttack(delta);
    });


    // If you have multiple allies, make the fleet move at the same speed?
    // Sort by lowest speed first, eg allies[0] is slowest. Change the speed of your fleet based on this
    // allies[1] = {speed: 2};
    
    // ship.x += ship.vx;
    // ship.y += ship.vy;
    AllyBulletLoop:
    for(let b = allyBullets.activePool.length - 1; b >= 0; b--){
      allyBullets.activePool[b].sprite.position.x += (Math.cos(allyBullets.activePool[b].sprite.rotation)*allyBullets.activePool[b].speed)*delta;
      allyBullets.activePool[b].sprite.position.y += (Math.sin(allyBullets.activePool[b].sprite.rotation)*allyBullets.activePool[b].speed)*delta;
      for (let x = enemies.activePool.length - 1; x >= 0; x--) {
        if (allyBullets.activePool[b].sprite.position.y < enemies.activePool[x].sprite.position.y + (enemies.activePool[x].sprite.width / 2) &&
            allyBullets.activePool[b].sprite.position.y > enemies.activePool[x].sprite.position.y - (enemies.activePool[x].sprite.width / 2) &&
            allyBullets.activePool[b].sprite.position.x > enemies.activePool[x].sprite.position.x - (enemies.activePool[x].sprite.width / 2) &&
            allyBullets.activePool[b].sprite.position.x < enemies.activePool[x].sprite.position.x + (enemies.activePool[x].sprite.width / 2) &&
            enemies.activePool[x].sprite.visible) {
          // console.log('hit', enemies);
          if (allyBullets.activePool[b].type == "aoe") {
            allyBullets.activePool[b].explode();
          } else {
            enemies.activePool[x].handleHit(allyBullets.activePool[b]);
          }
          statsOld.hits.update();
          PIXI.sound.play('explode');
          allyBullets.recycle(allyBullets.activePool[b]);
          if (Gs.RESPAWN.value) { enemies.getNew(fr.randAngle4(), fr.random(224), fr.random(256)); }
          statsOld.enemyCounter.update();
          break AllyBulletLoop;
        }
      }

    
      if (allyBullets.activePool[b].sprite.position.y > Gs.CANVAS_SIZEY ||
          allyBullets.activePool[b].sprite.position.x > Gs.CANVAS_SIZEX ||
          allyBullets.activePool[b].sprite.position.y < 0 ||
          allyBullets.activePool[b].sprite.position.x < 0) {
        allyBullets.recycle(allyBullets.activePool[b]);
      }
    }
    // Check if enemy bullets are hitting player ships
    EnemyBulletLoop:
    for(let b = enemyBullets.activePool.length - 1; b >= 0; b--){
      enemyBullets.activePool[b].sprite.position.x += (Math.cos(enemyBullets.activePool[b].sprite.rotation)*enemyBullets.activePool[b].speed)*delta;
      enemyBullets.activePool[b].sprite.position.y += (Math.sin(enemyBullets.activePool[b].sprite.rotation)*enemyBullets.activePool[b].speed)*delta;
      for (let x = allies.activePool.length - 1; x >= 0; x--) {
        if (enemyBullets.activePool[b].sprite.position.y < allies.activePool[x].sprite.position.y + (allies.activePool[x].sprite.width / 2) &&
            enemyBullets.activePool[b].sprite.position.y > allies.activePool[x].sprite.position.y - (allies.activePool[x].sprite.width / 2) &&
            enemyBullets.activePool[b].sprite.position.x > allies.activePool[x].sprite.position.x - (allies.activePool[x].sprite.width / 2) &&
            enemyBullets.activePool[b].sprite.position.x < allies.activePool[x].sprite.position.x + (allies.activePool[x].sprite.width / 2) &&
            allies.activePool[x].sprite.visible) {
          if (Gs.PLAYER_HIT_DETECTION.value) { allies.activePool[x].handleHit(enemyBullets.activePool[b]); }
          if (allies.activePool.length < 1) {
            resetGame();
            break EnemyBulletLoop;
          }
          PIXI.sound.play('explode');
          enemyBullets.recycle(enemyBullets.activePool[b]);
          if (Gs.RESPAWN.value) { allies.getNew(fr.randAngle4(), fr.random(224), fr.random(256)); }
          break EnemyBulletLoop;
        }
      }

      if (enemyBullets.activePool[b].sprite.position.y > Gs.CANVAS_SIZEY ||
          enemyBullets.activePool[b].sprite.position.x > Gs.CANVAS_SIZEX ||
          enemyBullets.activePool[b].sprite.position.y < 0 ||
          enemyBullets.activePool[b].sprite.position.x < 0) {
        enemyBullets.recycle(enemyBullets.activePool[b]);
      }
    }

    function collisionDetector(a, b, hitbox = false) {
      let result = false;
      
      // Perhaps move all of this into the Graphics objects themselves, only update on rotation (or even better, on the likely hood of detection?)
      // Define verticies





      // console.log(aV, oA);
      // let ax1 = a.getBounds().x;
      // let ay1 = a.getBounds().y;
      // let ax2 = a.getBounds().x + a.getBounds().width;
      // let ay2 = a.getBounds().y + a.getBounds().height;
      // let ac = {x: a.getBounds().x + (a.getBounds().width / 2),
      //           y: a.getBounds().y + (a.getBounds().height / 2)};
      let ax1 = a.getBounds().x;
      let ay1 = a.getBounds().y;
      let ax2 = a.getBounds().x + a.getBounds().width;
      let ay2 = a.getBounds().y + a.getBounds().height;
      // let ac = getCentrePoint(aV);
      // console.log(a.getLocalBounds())

      let bx1 = b.getBounds().x;
      let by1 = b.getBounds().y;
      let bx2 = b.getBounds().x + b.getBounds().width;
      let by2 = b.getBounds().y + b.getBounds().height;
      // let bx1 = b.getBounds().x;
      // let by1 = b.getBounds().y;
      // let bx2 = b.getBounds().x + b.getBounds().width;
      // let by2 = b.getBounds().y + b.getBounds().height;
      // let bc = {x: b.getBounds().x + (b.getBounds().width / 2),
      //           y: b.getBounds().y + (b.getBounds().height / 2)};


      if (ax1 < bx2 &&
          ax2 > bx1 &&
          ay1 < by2 &&
          ay2 > by1
          ) {

        result = true;
      }
      return result;
    }
    // reset detection color
    enemies.activePool.forEach(enemy => {
      enemy.sizeBox.tint = 0xffffff;
      enemy.hitBox.children.forEach(child => {
        child.tint = 0xffffff;
      });
    });

    allies.activePool.forEach(ally => {
      ally.sizeBox.tint = 0xffffff;
      ally.hitBox.children.forEach(child => {
        child.tint = 0xffffff;
      });
    });
    if (allies.activePool.length > 0) { // If you haven't already been destroyed by bullets
       checkShipCollisions:
      for (let h = allies.activePool.length - 1; h >= 0; h--) {      
      // allies.activePool.forEach(ally => {
        checkPerAlly:
        for (let i = enemies.activePool.length - 1; i >= 0; i--) {      
          if (collisionDetector(allies.activePool[h].sizeBox, enemies.activePool[i].sizeBox)) {
            allies.activePool[h].sizeBox.tint = 0xff0000;
            enemies.activePool[i].sizeBox.tint = 0xff0000;
            if (Gs.PLAYER_HIT_DETECTION.value) { allies.activePool[h].handleHit({damage: 1}); }
            if (allies.activePool.length < 1) {
              resetGame();
              break checkShipCollisions;
            }
            
            let allyHitbox = allies.activePool[h].hitBox;
            let enemyHitbox = enemies.activePool[i].hitBox;
            for (let ai = allyHitbox.children.length - 1; ai >= 0; ai--) {
              for (let ei = enemyHitbox.children.length - 1; ei >= 0; ei--) {
                // enemies.activePool[i].handleHit();
                // if (collisionDetector(enemyHitbox.children[ei], allyHitbox.children[ai], true)) {
                  // allyHitbox.children[ai].tint = 0xff0000;
                  // enemyHitbox.children[ei].tint = 0xff0000;
                // }
              }
            }
          }
        }
      }
    }
   

    
   
    if (!Gs.SHOW_HITBOXES.value) {
      enemies.activePool.concat(allies.activePool).forEach(ship => {
        ship.hitBox.visible = false;
      });
    } else {
      enemies.activePool.concat(allies.activePool).forEach(ship => {
        ship.hitBox.visible = true;
      });
    }
    if (!Gs.SHOW_SIZEBOXES.value) {
      enemies.activePool.concat(allies.activePool).forEach(ship => {
        ship.sizeBox.visible = false;
      });
    } else {
      enemies.activePool.concat(allies.activePool).forEach(ship => {
        ship.sizeBox.visible = true;
      });
    }
    window.testme = allies.activePool[0];
    getHitBoxVerticies();
  }

  function getHitBoxVerticies() {
    let a = allies.activePool[0];
    let aV = fr.convertXYPairs(a.sprite.vertexData);

    UI.playerShipDebug.style.transform = `translate(-50%, -50%) rotate(${allies.activePool[0].sprite.rotation * 180/Math.PI}deg)`;
    // Get centrepoints
    let aC = fr.getCentrePoint(aV);
    UI.playerShipDebugOverview.forEach((item, index) => {
      switch (index) {
        case 0:
        case 1:
        case 2:
        case 3:
          item.innerHTML = "x: " + (aV[index].x).toFixed(2) + 
                           " / y: " + (aV[index].y).toFixed(2);
          break;
        case 4:
          item.innerHTML = "x: " + aC.x.toFixed(2) + 
                           " / y: " + aC.y.toFixed(2);
          break;
        case 5:
          item.innerHTML = "r: " + (a.sprite.rotation).toFixed(2) + "c / " + 
                           "d: " + (a.sprite.rotation * 180/Math.PI).toFixed(2) + "°";
      }
    });
    // note this is also equal to the anchor point of the sprite, maybe optimize later?
    // Convert to original coordinates (before sprite rotation)
    let aO = [];
    aV.forEach(pair => {
      aO.push(fr.transformRotate(pair.x, pair.y, aC, -45 * Math.PI/180));
    });

    // Calculate the hitbox original locations
    let aTest = a.hitBox.children[0].userData;

    let hitBoxCoords = [
      {x: aTest.x1, y: aTest.y1},
      {x: aTest.x1, y: aTest.y2},
      {x: aTest.x2, y: aTest.y2},
      {x: aTest.x2, y: aTest.y1}
    ];
    // Define the offset from 0,0 of the original parent box
    let offset = aO[0];
    let testBoxLocal = [];
    // Rotate each of the hitbox points @ origin by center point @ origin
    hitBoxCoords.forEach(pair => {
      testBoxLocal.push(fr.transformRotate(pair.x, pair.y, {x: aC.x - offset.x, y:aC.y - offset.y}, 45 * Math.PI/180));
    });
    // Remove the offset
    testBoxLocal.forEach(pair => {
      pair.x = pair.x + offset.x;
      pair.y = pair.y + offset.y
    });
  }
}

