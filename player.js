import * as UI from './UI.js';
import { allyBullets, app, allies, enemies } from './Model.js';
import * as Gs from './Globals.js';
export const bulletSpeed = 3;
// Turning system
const turnFactor = 30; // Max turn in degrees
const turningEnabled = true;
const turnSpeed = 2;
let currentTurn = 0;

function turn() {
	allies[0].sprite.rotation = Math.PI/180 * (Gs.DEFAULT_ROTATION + currentTurn);
	allies[0].shadow.rotation = Math.PI/180 * (Gs.DEFAULT_ROTATION + currentTurn);
}
export const player = {
	handleMovement: function(delta) {
		allies.sort((a, b) => a.speed - b.speed);
		  // console.log(allies)
		  // break;
		  // Set inital speed
		  let currentSpeed = allies[0].speed;
		  let currentTurnSpeed = turnSpeed;
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
		  if (allies[0].moveDirection.up && allies[0].sprite.y > allies[0].sprite.width / 2) {
		    allies[0].sprite.y -= currentSpeed;
		    allies[0].shadow.y -= currentSpeed;
		  }
		  if (allies[0].moveDirection.down && allies[0].sprite.y < Gs.CANVAS_SIZEY - allies[0].sprite.width / 2) {
		    allies[0].sprite.y += currentSpeed;
		    allies[0].shadow.y += currentSpeed;
		  }
		  if (allies[0].moveDirection.left && allies[0].sprite.x > allies[0].sprite.width / 2) {
		    allies[0].sprite.x -= currentSpeed;
		    allies[0].shadow.x -= currentSpeed;

		    currentTurn = currentTurn > -turnFactor ? currentTurn - currentTurnSpeed : currentTurn;
		    turningEnabled && turn();
		    turning = true;
		  }
		  if (allies[0].moveDirection.right && allies[0].sprite.x < Gs.CANVAS_SIZEX - allies[0].sprite.width / 2) {
		    allies[0].sprite.x += currentSpeed;
		    allies[0].shadow.x += currentSpeed;

				currentTurn = currentTurn < turnFactor ? currentTurn + currentTurnSpeed : currentTurn;
		    turningEnabled && turn();
		    turning = true;
		  }
		  if (!turning) {
		  	// Reset Turning
			  currentTurn = currentTurn < 0 ? currentTurn + currentTurnSpeed :
			                currentTurn > 0 ? currentTurn - currentTurnSpeed : currentTurn;
			  turningEnabled && turn();
		  }
		  // allies[0].coolDown += allies[0].coolDown > 0 ? -1 : allies[0].coolDown == 0 ? allies[0].fireRate : -1;
		  if (allies[0].coolDown > 0) {
		    allies[0].coolDown -= 1 * delta;
		  }
		  if (allies[0].shooting && allies[0].coolDown <= 0) {
		    let pos = {x: allies[0].sprite.x + Gs.TILE_SIZE / 2 - 4, y: allies[0].sprite.y + Gs.TILE_SIZE / 2 - 4};
		    shoot(allies[0].sprite.rotation, pos);
		    allies[0].coolDown = allies[0].fireRate;
		  }
		  UI.CoolDownGuage.style.opacity = (100 - (allies[0].coolDown * 100) / allies[0].fireRate) / 100;
	}
};
export const statsOld = {
  shots: {
    count: 0,
    ui: UI.PlayerShots,
    update: function() {
      this.count += 1;
      this.ui.innerHTML = this.count;
    }
  },
  hits: {
    count: 0,
    ui: UI.PlayerHits,
    update: function() {
      this.count += 1;
      this.ui.innerHTML = this.count;
    }
  },
  accuracy: {
    count: 0,
    ui: UI.PlayerAccuracy,
    update: function() {
      this.count = parseFloat(((statsOld.hits.count / statsOld.shots.count) * 100).toFixed(2)) + "%";
      this.ui.innerHTML = this.count;
    }
  },
  score: {
    count: 0,
    ui: UI.PlayerScore,
    update: function(score) {
      this.count += score * this;
      this.ui.innerHTML = this.count;
    }
  },
  multipler: {
	count: 0,
    ui: UI.PlayerMultiplier,
    update: function(score) {
      this.ui.innerHTML = this.count;
    }
  },
  combo: {
  	count: 0,
    ui: UI.PlayerCombo,
    update: function(score) {
      this.ui.innerHTML = this.count;
    }
  },
  enemyCounter: {
  	count: 0,
    ui: UI.EnemyCount,
    update: function(score) {
      this.ui.innerHTML = enemies.activePool.length;
    }
  },
  kills: {
  	count: 0,
    ui: UI.kills,
    update: function(score) {
    	this.count += 1;
      this.ui.innerHTML = this.count;
    }
  }
};


export function shoot(rotation, startPosition){  
  let bullet = allyBullets.getNew(rotation, startPosition.x, startPosition.y);
  statsOld.shots.update();
  statsOld.accuracy.update();
  PIXI.sound.play('laser'); 
  // console.log(bullets.length, bulletPool.length);
}


