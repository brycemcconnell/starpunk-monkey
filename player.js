import { bulletPool, bullets, app, allies, enemies } from './Model.js';
import * as Gs from './Globals.js';
import * as UI from './UI.js';
export const bulletSpeed = 3;

// Turning system
const turnFactor = 30; // Max turn in degrees
const turningEnabled = true;
const turnSpeed = 3;
let currentTurn = 0;

function turn() {
	allies[0].sprite.rotation = Math.PI/180 * (270 + currentTurn);
	allies[0].shadow.rotation = Math.PI/180 * (270 + currentTurn);
}
export const player = {
	handleMovement: function(delta) {
		allies.sort((a, b) => a.speed - b.speed);
		  // console.log(allies)
		  // break;
		  // Set inital speed
		  let currentSpeed = allies[0].speed;
		  let turning = false;
		  

		  // Calculate boosting
		  if (allies[0].booster && allies[0].fuel > 0) {
		    currentSpeed += 1;
		    allies[0].fuel -= .5;
		  } else {
		    allies[0].fuel += allies[0].fuel < allies[0].maxFuel ? 0.1 : 0;
		  }

		  // Modify for diagonal speed
		  if ((allies[0].moveDirection.up || allies[0].moveDirection.down) &&
		      (allies[0].moveDirection.left || allies[0].moveDirection.right)) {
		    currentSpeed /= 1.33;
		  }

		  currentSpeed *= delta;
		  
		  UI.FuelGuage.style.height =  (allies[0].fuel * 100) / allies[0].maxFuel + "%";
		  if (allies[0].moveDirection.up && allies[0].sprite.y > 16) {
		    allies[0].sprite.y -= currentSpeed;
		    allies[0].shadow.y -= currentSpeed;
		  }
		  if (allies[0].moveDirection.down && allies[0].sprite.y < Gs.CANVAS_SIZEY - 16) {
		    allies[0].sprite.y += currentSpeed;
		    allies[0].shadow.y += currentSpeed;
		  }
		  if (allies[0].moveDirection.left && allies[0].sprite.x > 16) {
		    allies[0].sprite.x -= currentSpeed;
		    allies[0].shadow.x -= currentSpeed;

		    currentTurn = currentTurn > -turnFactor ? currentTurn - turnSpeed : currentTurn;
		    turningEnabled && turn();
		    turning = true;
		  }
		  if (allies[0].moveDirection.right && allies[0].sprite.x < Gs.CANVAS_SIZEX - 16) {
		    allies[0].sprite.x += currentSpeed;
		    allies[0].shadow.x += currentSpeed;

				currentTurn = currentTurn < turnFactor ? currentTurn + turnSpeed : currentTurn;
		    turningEnabled && turn();
		    turning = true;
		  }
		  if (!turning) {
		  	// Reset Turning
			  currentTurn = currentTurn < 0 ? currentTurn + turnSpeed :
			                currentTurn > 0 ? currentTurn - turnSpeed : currentTurn;
			  turningEnabled && turn();
		  }
		  // allies[0].coolDown += allies[0].coolDown > 0 ? -1 : allies[0].coolDown == 0 ? allies[0].fireRate : -1;
		  if (allies[0].coolDown > 0) {
		    allies[0].coolDown -= 1 * delta;
		  }
		  if (allies[0].shooting && allies[0].coolDown <= 0) {
		    let pos = {x: allies[0].sprite.x + Gs.TILE_SIZE / 2 - 4, y: allies[0].sprite.y + Gs.TILE_SIZE / 2 - 4};
		    shoot(Math.PI/180 * -90, pos);
		    allies[0].coolDown = allies[0].fireRate;
		  }
		  UI.CoolDownGuage.style.opacity = (100 - (allies[0].coolDown * 100) / allies[0].fireRate) / 100;
	}
};
export const stats = {
  shots: {
    count: 0,
    ui: UI.PlayerShots,
    update: () => {
      stats.shots.count += 1;
      stats.shots.ui.innerHTML = stats.shots.count;
    }
  },
  hits: {
    count: 0,
    ui: UI.PlayerHits,
    update: () => {
      stats.hits.count += 1;
      stats.hits.ui.innerHTML = stats.hits.count;
    }
  },
  accuracy: {
    count: 0,
    ui: UI.PlayerAccuracy,
    update: () => {
      stats.accuracy.count = parseFloat(((stats.hits.count / stats.shots.count) * 100).toFixed(2)) + "%";
      stats.accuracy.ui.innerHTML = stats.accuracy.count;
    }
  },
  score: {
    count: 0,
    ui: UI.PlayerScore,
    update: (score) => {
      stats.score.count += score * stats.multiplier;
      stats.score.ui.innerHTML = stats.score.count;
    }
  },
  multipler: {
	count: 0,
    ui: UI.PlayerMultiplier,
    update: (score) => {
      stats.multipler.ui.innerHTML = stats.multipler.count;
    }
  },
  combo: {
  	count: 0,
    ui: UI.PlayerCombo,
    update: (score) => {
      stats.combo.ui.innerHTML = stats.combo.count;
    }
  },
  enemyCounter: {
  	count: 0,
    ui: UI.EnemyCount,
    update: (score) => {
      stats.enemyCounter.ui.innerHTML = enemies.activePool.length;
    }
  },
  kills: {
  	count: 0,
    ui: UI.kills,
    update: (score) => {
    	stats.kills.count += 1;
      stats.kills.ui.innerHTML = stats.kills.count;
    }
  }
};


export function shoot(rotation, startPosition){  
  let bullet = getNewBullet(rotation, startPosition.x, startPosition.y);
  app.stage.addChild(bullet);
  stats.shots.update();
  stats.accuracy.update();
  PIXI.sound.play('laser');
  // console.log(bullets.length, bulletPool.length);
}
export function getNewBullet(rotation, x, y) {
  let bullet;
  if (bulletPool.length > 0) {
    bullet = bulletPool.pop();
  } else {
    bullet = new PIXI.Sprite(PIXI.loader.resources["sprites/laser.png"].texture);
  }
  bullet.position.x = x - 12;
  bullet.position.y = y - 24;
  bullet.anchor.set(0.5);
  bullet.rotation = rotation;
  bullet.visible = true;
  bullets.push(bullet);
  return bullet;
}
export function recycleBullet(bullet) {
  bullet.visible = false;
  bullets.splice(bullets.indexOf(bullet), 1);
  bulletPool.push(bullet);
}




