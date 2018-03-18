import Ship from './Ship.js';
import {statsOld} from './player.js';
import * as Gs from './Globals.js';
import * as fr from './lib/fr.js';
import {enemyBullets} from './Model.js';
import {playerScore, playerKills} from "./stats.js";
import {ShipPaths} from "./data/ShipPaths.js";
import {BulletSprites} from "./data/BulletSprites.js";
import Gun from "./Gun.js";

function collisionDetection() {

}
function moveForward(obj) {
	obj.vx = (Math.cos(obj.sprite.rotation)*obj.speed);
	obj.vy = (Math.sin(obj.sprite.rotation)*obj.speed);
}
export default class Enemy extends Ship {
	constructor(pos, type) {
		// Sprite Construction
		super(pos);
	    // Type construction
	    this.rotateSpeed = .05;
	    this.destination;
	    this.path;
	    this.setPath()
	    this.pathCurrent = 0;
	    this.targetAngle = 0;
	    this.shooting = true;
	    this.fireRate = 90;
	    this.coolDown = 0;

	    this.vxpull = 0;
		this.vypull = 0;
		this.vxpush = 0;
		this.vypush = 0;

		let gun = new Gun({
	      parent: this.sprite,
	      slot: this.gunSlots["main-left"],
	      type: "Slow Laser",
	      movement: "Straight",
		});
		this.guns.push(gun);
 	    this.sprite.addChild(gun.sprite);
	    
	}
	setPath() {
		let paths = ["MoveCurrentCenter", "StrafeSquare", "MoveCenterCenter", "StrafeExitLeft"];
		let result = [];
		paths.forEach(path => {
			ShipPaths[path].path.forEach(item => {
				let newPath = Object.assign({}, item);
				newPath.type = ShipPaths[path].type;
				newPath.rotate = ShipPaths[path].rotate || null;
				// newPath.rotateSpeedModifier = ShipPaths[path].rotateSpeedModifier || 0;
				result.push(newPath);
			});
		});
		this.path = result;
	}
	handleMove(delta) {
		if (this.vxpull > 0) this.vxpull -= .01;
		if (this.vypull > 0) this.vypull -= .01;
		if (this.vxpush > 0) this.vxpush -= .01;
		if (this.vypush > 0) this.vypush -= .01;
		if (this.vxpull < 0) this.vxpull += .01;
		if (this.vypull < 0) this.vypull += .01;
		if (this.vxpush < 0) this.vxpush += .01;
		if (this.vypush < 0) this.vypush += .01;
		this.vxpush = Math.abs(this.vxpush) < .01 ? 0 : this.vxpush;
		this.vypush = Math.abs(this.vypush) < .01 ? 0 : this.vypush;
		this.vxpull = Math.abs(this.vxpull) < .01 ? 0 : this.vxpull;
		this.vypull = Math.abs(this.vypull) < .01 ? 0 : this.vypull;
		// reset
		this.destination = this.path[this.pathCurrent];
		// If a path Vector does not have x or y, replace it with current
		this.destination.x = this.destination.x ? this.destination.x :
		                                            this.sprite.position.x;
		this.destination.y = this.destination.y ? this.destination.y :
		                                            this.sprite.position.y;


		this.vy = 0;
		this.vx = 0;
		this.vr = 0;

		if (this.destination.type !== "timer") {
			if (this.sprite.position.x - 12< this.destination.x &&
				this.sprite.position.y - 12< this.destination.y &&
				this.sprite.position.x + 12 > this.destination.x &&
				this.sprite.position.y + 12 > this.destination.y ) {
				this.pathCurrent = this.pathCurrent < this.path.length -1 ? this.pathCurrent + 1 : 0;
			// console.log(this.destination);
			} else {
				if (this.destination.type == "move") {
					this.targetAngle = this.angleToDestination();
					this.targetAngle = fr.roundFraction(this.targetAngle, 2)
					if (fr.deltaAngle(this.targetAngle, this.sprite.rotation) < 0) {
						this.vr = -this.rotateSpeed;
					} else {
						this.vr = this.rotateSpeed;
					}
					const distance = Math.floor(this.distanceToDestination());
					this.vr = fr.round(this.vr * (distance/100), 2);
					moveForward(this);
				} else if (this.destination.type == "strafe") {
					if (this.destination.y
						) {
						this.vy = Math.sign(this.destination.y - this.sprite.position.y) * this.speed;
					}
					if (this.destination.x
						) {
						this.vx = Math.sign(this.destination.x - this.sprite.position.x) * this.speed;
					}
					// console.log()

					// Lower rotation jiggling when hit
					if (fr.deltaAngle(Math.PI / 2, this.sprite.rotation) > 0.01 ||
						fr.deltaAngle(Math.PI / 2, this.sprite.rotation) < -0.01) {
						// Move angle towards x
						if (fr.deltaAngle(Math.PI / 2, this.sprite.rotation) < 0) {
								this.vr = -this.rotateSpeed;
						} else {
							this.vr = this.rotateSpeed;
						}
					}
				}
			}
		} else {
			this.vr = (this.rotateSpeed + this.destination.rotateSpeedModifier) * this.destination.rotate;
		}
		
		// move evrything
		this.sprite.rotation += this.vr * delta;
		this.shadow.rotation += this.vr * delta;
		this.sprite.position.x += (this.vx + this.vxpull + this.vxpush) * delta;
		this.sprite.position.y += (this.vy + this.vypull + this.vypush) * delta;
		this.shadow.position.x += (this.vx + this.vxpull + this.vxpush) * delta;
		this.shadow.position.y += (this.vy + this.vypull + this.vypush) * delta;

		if (this.pathCurrent == this.path.length - 1 && this.path.length > 1) {
			if (this.sprite.position.y > Gs.CANVAS_SIZEY + (this.sprite.height) ||
	            this.sprite.position.x > Gs.CANVAS_SIZEX + (this.sprite.width) ||
	            this.sprite.position.y < -(this.sprite.height) ||
	            this.sprite.position.x < -(this.sprite.width)) {
				super.handleDeath();
			}
		}
		
	}
	angleToDestination() {
		const x1 = this.sprite.position.x;
		const y1 = this.sprite.position.y;
		const x2 = this.destination.x;
		const y2 = this.destination.y;
		const result = Math.atan2(y2 - y1, x2 - x1)
		return result > 0 ? result : Math.PI - result*-1 + Math.PI;
	}
	distanceToDestination() {
		const x1 = this.sprite.position.x;
		const y1 = this.sprite.position.y;
		const x2 = this.destination.x;
		const y2 = this.destination.y;
		const result = Math.hypot(x2 - x1, y2 - y1);
		return result;
	}
	handleAttack(delta) {
		this.guns.forEach(gun => {
	  		if (this.shooting) {
	  			gun.shooting = true;
	  		} else {
	  			gun.shooting = false;
	  		}
	  		
	  		gun.handleMovement();
	  		if (gun.coolDown > 0) {
			    gun.coolDown -= 1 * delta;
			  } 
	  		if (gun.coolDown <= 0 && this.shooting) {
	  			// gun.accuracy -> max offset, 1 being 90 degrees either way (180 chance)
	  			// Thus 0.5 would be a 90 degree range
	  			// 0.01 is 99% chance being straight
	  			// 0.9 is 10% chance being straight, 90% chance of being within 81 degrees either way from target (range of 162)
	  			let offsetChance = 180 * gun.accuracy;
	  			let offset = fr.random(offsetChance) - (offsetChance / 2);
	  			let offsetRadians = offset * Math.PI/180;
	  			let rot = this.sprite.rotation + gun.sprite.rotation + offsetRadians;
	  			gun.turrets.forEach(turret => {
	  				let pos = {x: gun.sprite.worldTransform.tx + turret.x, y: gun.sprite.worldTransform.ty + turret.y};
	  				if (gun.type !== "Beam") {
	  					shoot(rot, pos, gun.ammo);
	  				} else {
	  					if (gun.shooting == true) {
		  					turret.beam.container.visible = true;
		  					turret.beam.end.position.x = turret.beam.start.width + turret.beam.mid.width;
	  					}
	  				}
	  			});
	  			gun.coolDown = gun.fireRate;
	  		} else if (!this.shooting){
	  			gun.turrets.forEach(turret => {
	  				turret.beam.container.visible = false;
	  			});
	  		}
	  	});
		
	 //  if (this.coolDown > 0) {
	 //    this.coolDown -= 1 * delta;
	 //  }
	 //  if (this.shooting && this.coolDown <= 0) {
	 //    let pos = {x: this.sprite.x + Gs.TILE_SIZE / 2 - 4, y: this.sprite.y + Gs.TILE_SIZE / 2 - 4};
	 //    let bullet = enemyBullets.getNew(this.sprite.rotation, this.sprite.x, this.sprite.y, BulletSprites["Laser"]);
		// PIXI.sound.play('SFX_Laser1', { volume: Gs.VOLUME_SOUND.value });
	 //    this.coolDown = this.fireRate;
	 //  }
	}
	handleDeath(scoring = true) {
		super.handleDeath();
		
		if (scoring) {
			playerScore.update(playerScore.active + this.score);
			playerKills.update(playerKills.active + 1);
		}	
	}
}

function shoot(rotation, startPosition, ammo){  
  let bullet = enemyBullets.getNew(rotation, startPosition.x, startPosition.y, ammo);
  // statsOld.shots.update();
  // statsOld.accuracy.update();
  PIXI.sound.play(bullet.sound, {volume: Gs.VOLUME_SOUND.value}); 
  // console.log(bullets.length, bulletPool.length);
}