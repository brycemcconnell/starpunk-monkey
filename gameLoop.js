import { app, speed, allyBullets, enemies, enemyBullets, background, dynamicBackground, allies, movingObjects } from './Model.js';
import * as fr from './lib/fr.js';
import { shoot, bulletSpeed, statsOld, player } from './player.js';
import * as UI from './UI.js'
import * as Gs from './Globals.js';
import {gameTime, trueTime, entitiesTotalCount, gameRelevantStats} from './stats.js';
import Wave from './Wave.js';
import {resetGame} from './resetGame.js';
import CollisionDetection from './CollisionDetection.js';
import AnimatedObject from './AnimatedObject.js';


let timer = 0;
let lastTime = 0;
let updateSpeed = 500;
function handleGameTime() {
  lastTime = timer;
  timer += app.ticker.elapsedMS;
  trueTime.update(trueTime.active = Math.floor(app.ticker.lastTime));
  if (Math.floor(lastTime/updateSpeed) < Math.floor(timer/updateSpeed)) {
   gameTime.update(gameTime.active = Math.floor(app.ticker.lastTime/1000));
    UI.FPS.innerHTML = Math.floor(app.ticker.FPS);
  }
}
export function gameLoop(delta){
  if (Gs.RENDER_STATE.value) {
    handleGameTime();


    let debris = movingObjects.activePool.filter(obj => obj.type == "Debris");
    let pickups = movingObjects.activePool.filter(obj => obj.type == "Pickup");
    if (player.moveMode.value == "combat") { 
      player.handleCombatMovement(delta); 
      background.forEach(layer => {
        if (layer.y > 0) layer.y = -Gs.CANVAS_SIZEY;
        layer.y += (layer.speed * delta);
      });
      dynamicBackground.forEach(layer => {
        if (layer.x > Gs.CANVAS_SIZEX) layer.x = -layer.width;
        layer.x += (layer.speed * delta);
      });
    } else {
      player.handleTravelMovement(delta, background);
      
    }
    enemies.activePool.forEach(enemy => {
      enemy.handleMove(delta);
      enemy.handleAttack(delta);
    });


    for(let i = movingObjects.activePool.length - 1; i >= 0; i--){
      let obj = movingObjects.activePool;
      obj[i].handleMove(delta);
      if (CollisionDetection.OffCanvas(
        obj[i].sprite.position,
        obj[i].sprite.width,
        obj[i].sprite.height)) {
          movingObjects.recycle(movingObjects.activePool[i]);
      }
    }
    let player1 = allies.activePool[0];
    PickupLoop:
    for (let x = pickups.length - 1; x >= 0; x--) {
      let collider = CollisionDetection.PointInCircle({
        x: player1.sprite.x,
        y: player1.sprite.y,
      },
      {
        x: pickups[x].sprite.x,
        y: pickups[x].sprite.y,
        radius:  pickups[x].pickupRange
      }) && pickups[x].sprite.visible;
      if (collider) {
        PIXI.sound.play('SFX_get',  { volume: Gs.VOLUME_SOUND.value });
        // let explosion = new AnimatedObject({
        //   sprite: player1.hitAnimation,
        //   frames: player1.hitAnimationFrames, 
        //   x: player1.sprite.position.x, 
        //   y: player1.sprite.position.y,
        //   height: player1.splashRadius,
        //   width: player1.splashRadius
        // });
        pickups[x].handleDeath();
        movingObjects.recycle(pickups[x]);
        break PickupLoop;
      }
    }

    // If you have multiple allies, make the fleet move at the same speed?
    // Sort by lowest speed first, eg allies[0] is slowest. Change the speed of your fleet based on this
    // allies[1] = {speed: 2};
    
    // ship.x += ship.vx;
    // ship.y += ship.vy;
    AllyBulletLoop:
    
    for(let b = allyBullets.activePool.length - 1; b >= 0; b--){
      allyBullets.activePool[b].handleMove(delta);

      // Check collisions with debris
      for (let x = debris.length - 1; x >= 0; x--) {
        let collider = CollisionDetection.PointInCircle({
          x: allyBullets.activePool[b].sprite.x,
          y: allyBullets.activePool[b].sprite.y,
        },
        {
          x: debris[x].sprite.x,
          y: debris[x].sprite.y,
          radius:  debris[x].sprite.width/2
        }) && debris[x].sprite.visible;
        if (collider) {
          let explosion = new AnimatedObject({
            sprite: allyBullets.activePool[b].hitAnimation,
            frames: allyBullets.activePool[b].hitAnimationFrames, 
            x: allyBullets.activePool[b].sprite.position.x, 
            y: allyBullets.activePool[b].sprite.position.y,
            height: allyBullets.activePool[b].splashRadius,
            width: allyBullets.activePool[b].splashRadius
          });
          
          debris[x].handleHit(allyBullets.activePool[b]);
          allyBullets.recycle(allyBullets.activePool[b]);
          break AllyBulletLoop;
        }
      }

      for (let x = enemies.activePool.length - 1; x >= 0; x--) {
        if (allyBullets.activePool[b].sprite.position.y < enemies.activePool[x].sprite.position.y + (enemies.activePool[x].sprite.width / 2) &&
            allyBullets.activePool[b].sprite.position.y > enemies.activePool[x].sprite.position.y - (enemies.activePool[x].sprite.width / 2) &&
            allyBullets.activePool[b].sprite.position.x > enemies.activePool[x].sprite.position.x - (enemies.activePool[x].sprite.width / 2) &&
            allyBullets.activePool[b].sprite.position.x < enemies.activePool[x].sprite.position.x + (enemies.activePool[x].sprite.width / 2) &&
            enemies.activePool[x].sprite.alpha == 1) {
          // console.log('hit', enemies);
          let explosion = new AnimatedObject({
            sprite: allyBullets.activePool[b].hitAnimation,
            frames: allyBullets.activePool[b].hitAnimationFrames,
            x: allyBullets.activePool[b].sprite.position.x, 
            y: allyBullets.activePool[b].sprite.position.y,
            height: allyBullets.activePool[b].splashRadius,
            width: allyBullets.activePool[b].splashRadius
          });
          if (allyBullets.activePool[b].type == "aoe") {
            allyBullets.activePool[b].explode();
            let radius = allyBullets.activePool[b].splashRadius;
            let explodeX = allyBullets.activePool[b].sprite.position.x;
            let explodeY = allyBullets.activePool[b].sprite.position.y;
            for (let i = enemies.activePool.length - 1; i >= 0; i--) {
              let collider = CollisionDetection.PointInCircle({
                x: enemies.activePool[i].sprite.x,
                y: enemies.activePool[i].sprite.y,
              },
              {
                x: explodeX,
                y: explodeY,
                radius: radius
              });
              if (collider) {
                enemies.activePool[i].handleHit(allyBullets.activePool[b]);
              }
            }
          } else {
            enemies.activePool[x].handleHit(allyBullets.activePool[b]);
          }
          statsOld.hits.update();
          
          // Damage animation?
          // let explosion = new AnimatedObject("explode", 7, {
          //   x: allyBullets.activePool[b].sprite.position.x, 
          //   y: allyBullets.activePool[b].sprite.position.y
          // });
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
      enemyBullets.activePool[b].handleMove(delta);
      for (let x = allies.activePool.length - 1; x >= 0; x--) {
        if (enemyBullets.activePool[b].sprite.position.y < allies.activePool[x].sprite.position.y + (allies.activePool[x].sprite.width / 2) &&
            enemyBullets.activePool[b].sprite.position.y > allies.activePool[x].sprite.position.y - (allies.activePool[x].sprite.width / 2) &&
            enemyBullets.activePool[b].sprite.position.x > allies.activePool[x].sprite.position.x - (allies.activePool[x].sprite.width / 2) &&
            enemyBullets.activePool[b].sprite.position.x < allies.activePool[x].sprite.position.x + (allies.activePool[x].sprite.width / 2) &&
            allies.activePool[x].sprite.alpha == 1) {
          if (Gs.PLAYER_HIT_DETECTION.value) { allies.activePool[x].handleHit(enemyBullets.activePool[b]); }
          if (allies.activePool.length < 1) {
            resetGame();
            break EnemyBulletLoop;
          }
          PIXI.sound.play('SFX_explode', { volume: Gs.VOLUME_SOUND.value });

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
      // let ai = a.getBounds().x + a.getBounds().width;
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

