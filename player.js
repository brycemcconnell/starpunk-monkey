import * as UI from './UI.js';
import { allyBullets, app, allies, enemies } from './Model.js';
import * as Gs from './Globals.js';
import {playerSpeed} from './stats.js';
export const bulletSpeed = 3;
// Turning system
const turnFactor = 30; // Max turn in degrees
const turningEnabled = true;
const turnSpeed = 2;
let currentTurn = 0;

function turn(ship) {
	ship.sprite.rotation = Math.PI/180 * (Gs.DEFAULT_ROTATION + currentTurn);
	ship.shadow.rotation = Math.PI/180 * (Gs.DEFAULT_ROTATION + currentTurn);
}
export const player = {
	handleMovement: function(delta) {		
		let moveRightOk = 0;
		let moveLeftOk = 0;
		let moveDownOk = 0;
		let moveUpOk = 0;
	  allies.activePool.filter(a => a.moveType == "manual").forEach(ship => {
		  UI.FuelGuage.style.height =  (ship.fuel * 100) / ship.maxFuel + "%";

		  if (ship.moveDirection.up && ship.sprite.y > ship.sprite.width / 2) {
		    moveUpOk += 1;
		  }
		  if (ship.moveDirection.down && ship.sprite.y < Gs.CANVAS_SIZEY - ship.sprite.width / 2) {
		    moveDownOk += 1;
		  }
		  if (ship.moveDirection.left && ship.sprite.x > ship.sprite.width / 2) {
		  	moveLeftOk += 1;
		  }
		  if (ship.moveDirection.right && ship.sprite.x < Gs.CANVAS_SIZEX - ship.sprite.width / 2) {
		  	moveRightOk += 1;
		  }
		  // Handle guns
		  if (ship.coolDown > 0) {
		    ship.coolDown -= 1 * delta;
		  }
		  if (ship.shooting && ship.coolDown <= 0) {
		    let pos = {x: ship.sprite.x + Gs.TILE_SIZE / 2 - 4, y: ship.sprite.y + Gs.TILE_SIZE / 2 - 4};
		    shoot(((Math.PI * 2) / 4) * 3, pos);
		    ship.coolDown = ship.fireRate;
		  }
		  UI.CoolDownGuage.style.opacity = (100 - (ship.coolDown * 100) / ship.fireRate) / 100;
		});
		allies.activePool.filter(a => a.moveType == "manual").forEach(ship => {
			let currentSpeed = allies.activePool.sort((a, b) => a.speed - b.speed)[0].speed;
	  	let currentTurnSpeed = turnSpeed;
	  	let turning = false;
	  	let moveDirectionCount = 0;
      // Calculate boosting
	    if (ship.booster && ship.fuel > 0) {
	   		currentSpeed += 1;
	    	ship.fuel -= .5;
	  	} else {
	    	ship.fuel += ship.fuel < ship.maxFuel ? 0.1 : 0;
	  	}
			if ((ship.moveDirection.up || ship.moveDirection.down) &&
		      (ship.moveDirection.left || ship.moveDirection.right)) {
		    currentSpeed /= 1.33;
		  }
		  currentSpeed *= delta;
		  if (moveUpOk == allies.activePool.length) {
		  	moveDirectionCount += 1;
		  	ship.sprite.y -= currentSpeed;
		    ship.shadow.y -= currentSpeed;
		  }
		  if (moveDownOk == allies.activePool.length) {
		  	moveDirectionCount += 1;
		  	ship.sprite.y += currentSpeed;
		    ship.shadow.y += currentSpeed;
		  }

			if (moveLeftOk == allies.activePool.length) {
				moveDirectionCount += 1;
				ship.sprite.x -= currentSpeed;
		    ship.shadow.x -= currentSpeed;
		    currentTurn = currentTurn > -turnFactor ? currentTurn - currentTurnSpeed : currentTurn;
		    turningEnabled && turn(ship);
		    turning = true;
			}
			if (moveRightOk == allies.activePool.length) {
				moveDirectionCount += 1;
				ship.sprite.x += currentSpeed;
		    ship.shadow.x += currentSpeed;
				currentTurn = currentTurn < turnFactor ? currentTurn + currentTurnSpeed : currentTurn;
		    turningEnabled && turn(ship);
		    turning = true;
			}
			if (!turning) {
		  	// Reset Turning
			  currentTurn = currentTurn < 0 ? currentTurn + currentTurnSpeed :
			                currentTurn > 0 ? currentTurn - currentTurnSpeed : currentTurn;
			  turningEnabled && turn(ship);
		  }
		  if (moveDirectionCount == 0) currentSpeed = 0;
		  playerSpeed.update(currentSpeed.toFixed(2));
		});
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
  let bullet = allyBullets.getNew(rotation, startPosition.x, startPosition.y, "Basic2");
  statsOld.shots.update();
  statsOld.accuracy.update();
  PIXI.sound.play('laser'); 
  // console.log(bullets.length, bulletPool.length);
}


