import * as UI from './UI.js';
import { background, allyBullets, app, allies, enemies } from './Model.js';
import * as Gs from './Globals.js';
import * as fr from './lib/fr.js';
import {playerSpeed, playerGalaxialAngle, playerGalaxialPosition} from './stats.js';
import {mapPosition} from './map.js';
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
	moveMode: {
		value: "combat",
		toggle: function() {
			this.value = this.value == "combat" ? "travel" : "combat";
			background.forEach(layer => {
	       layer.direction.set();
	      });
		}
	},
	handleTravelMovement: function(delta) {
		allies.activePool.filter(a => a.moveType == "manual").forEach(ship => {
			let currentSpeed = allies.activePool.sort((a, b) => a.speed - b.speed)[0].speed;
			let currentTurnSpeed = turnSpeed;
			if (ship.booster && ship.fuel > 0) {
	   		currentSpeed += 1;
	    	ship.fuel -= .5;
	  	} else {
	    	ship.fuel += ship.fuel < ship.maxFuel ? 0.1 : 0;
	  	}
	  	let realignX = 0;
	  	let realignY = 0;
	  	if (ship.sprite.position.x > Gs.CANVAS_SIZEX / 2) {
	  		ship.sprite.position.x -= currentSpeed/5;
	  		ship.shadow.position.x -= currentSpeed/5;
	  	}
	  	if (ship.sprite.position.x < Gs.CANVAS_SIZEX / 2) {
	  		ship.sprite.position.x += currentSpeed/5;
	  		ship.shadow.position.x += currentSpeed/5;
	  	}
	  	if (ship.sprite.position.y > Gs.CANVAS_SIZEX / 2) {
	  		ship.sprite.position.y -= currentSpeed/5;
	  		ship.shadow.position.y -= currentSpeed/5;
	  	}
	  	if (ship.sprite.position.y < Gs.CANVAS_SIZEX / 2) {
	  		ship.sprite.position.y += currentSpeed/5;
	  		ship.shadow.position.y += currentSpeed/5;
	  	}
			// console.log(ship.moveDirection)
			function wrapLayer(layer) {
				if (layer.x > 0) {
	       	layer.x = -Gs.CANVAS_SIZEX;
	       }
	       if (layer.x < -Gs.CANVAS_SIZEX) {
	       	layer.x = 0;
	       }
	       if (layer.y > 0) {
	       	layer.y = -Gs.CANVAS_SIZEY;
	       }
	       if (layer.y < -Gs.CANVAS_SIZEY) {
	       	layer.y = 0;
	       }
			}
			if (ship.moveDirection.up) {
				// @TODO add drift while in travel speed
				background.forEach(layer => {
	       if (Math.abs(layer.vx) > layer.speed + currentSpeed) {
			  		layer.vx = layer.vx;
			  	} else {
			  		layer.vx -= ((Math.cos(ship.sprite.rotation)*(layer.speed + currentSpeed))*delta) * .005;
			  	}
			  	if (Math.abs(layer.vy) > layer.speed + currentSpeed) {
			  		layer.vy = layer.vy;
			  	} else {
			  		layer.vy -= ((Math.sin(ship.sprite.rotation)*(layer.speed + currentSpeed))*delta) * .005;
			  	}
	      });
		  }
		  if (ship.moveDirection.down) {
		  	background.forEach(layer => {
	       if (Math.abs(layer.vx) > layer.speed + currentSpeed) {
			  		layer.vx = layer.vx
			  	} else {
			  		layer.vx += ((Math.cos(ship.sprite.rotation)*(layer.speed + currentSpeed))*delta) * .005;
			  	}
			  	if (Math.abs(layer.vy) > layer.speed + currentSpeed) {
			  		layer.vy = layer.vy
			  	} else {
			  		layer.vy += ((Math.sin(ship.sprite.rotation)*(layer.speed + currentSpeed))*delta) * .005;
			  	}
	      });
		  }
		  if (!ship.moveDirection.down && !ship.moveDirection.up) {
		  	background.forEach(layer => {
		  		if (Math.abs(layer.vx) > layer.speed) {
		  			layer.vx += layer.vx > 0 ? - 0.05: 0.05;
		  		}
			  	if (Math.abs(layer.vy) > layer.speed) {
				  	layer.vy += layer.vy > 0 ? - 0.05: 0.05;
				  }
		  	});
		  }
		  background.forEach(layer => {
		  	
		  	layer.x += layer.vx;
		  	layer.y += layer.vy;
		  	wrapLayer(layer);
		  });
		  if (ship.moveDirection.left) {
		  	// currentTurnSpeed *= -1;
		  	currentTurn = currentTurn - currentTurnSpeed;
		  	turn(ship);
		  }
		  if (ship.moveDirection.right) {
		  	currentTurn = currentTurn + currentTurnSpeed;
		  	turn(ship);
		  }
		  playerSpeed.update((Math.abs(background[0].vx) + Math.abs(background[0].vy)).toFixed(2));
		  playerGalaxialAngle.update((fr.angleToPoint({x: background[0].vx, y: background[0].vy}, {x: 0, y: 0}) * 180/Math.PI).toFixed(2));
		  playerGalaxialPosition.update(fr.round(((playerGalaxialPosition.active + background[0].vx * -1)), 0),
		  	                            fr.round(((playerGalaxialPosition.inactive + background[0].vy * -1)), 0)
		  	                            );
		  mapPosition.update(playerGalaxialPosition.active / 100, playerGalaxialPosition.inactive / 100);
		});
	},
	handleCombatMovement: function(delta) {
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
		  
	  	ship.guns.forEach(gun => {
	  		gun.handleMovement();
	  		if (gun.coolDown > 0) {
			    gun.coolDown -= 1 * delta;
			  }
	  		if (gun.coolDown <= 0 && ship.shooting) {
	  			// gun.accuracy -> max offset, 1 being 90 degrees either way (180 chance)
	  			// Thus 0.5 would be a 90 degree range
	  			// 0.01 is 99% chance being straight
	  			// 0.9 is 10% chance being straight, 90% chance of being within 81 degrees either way from target (range of 162)
	  			let offsetChance = 180 * gun.accuracy;
	  			let offset = fr.random(offsetChance) - (offsetChance / 2);
	  			let offsetRadians = offset * Math.PI/180;
	  			let rot = ship.sprite.rotation + gun.sprite.rotation + offsetRadians;
	  			gun.turrets.forEach(turret => {
	  				let pos = {x: gun.sprite.worldTransform.tx + turret.x, y: gun.sprite.worldTransform.ty + turret.y};
	  				shoot(rot, pos, gun.type);
	  			})
	  			gun.coolDown = gun.fireRate;
	  		}
	  	});
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


export function shoot(rotation, startPosition, type){  
  let bullet = allyBullets.getNew(rotation, startPosition.x, startPosition.y, type);
  statsOld.shots.update();
  statsOld.accuracy.update();
  PIXI.sound.play('laser'); 
  // console.log(bullets.length, bulletPool.length);
}


