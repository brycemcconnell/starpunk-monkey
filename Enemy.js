import * as AI from './ai/index.js';
import Ship from './Ship.js';
import {statsOld} from './player.js';
import * as Gs from './Globals.js';
import * as fr from './lib/fr.js';
import {enemyBullets} from './Model.js';
import {playerScore, playerKills} from "./stats.js";
import {ShipPaths} from "./data/ShipPaths.js";
function collisionDetection() {

}
function moveForward(obj, delta) {
	obj.vx = (Math.cos(obj.sprite.rotation)*obj.speed) * delta;
	obj.vy = (Math.sin(obj.sprite.rotation)*obj.speed) * delta;
}
export default class Enemy extends Ship {
	constructor(pos, type, ai = {type: "verticalSnake", config: {loop: true}}) {
		// Sprite Construction
		super(pos);
		this.AI = AI[ai.type];
		this.AIconfig = ai.config;
		// this.sprite.rotation = Math.PI/180 * 90;
		// this.shadow.rotation = Math.PI/180 * 90;
		// this.handleMove();
	    // Type construction
	    this.speed = 1.0;
	    this.rotateSpeed = .05;
	    this.destination;
	    this.path;
	    this.setPath()
	    this.pathCurrent = 0;
	    this.targetAngle = 0;
	    // AI Construction
	    this.shooting = true;
	    this.fireRate = 90;
	    this.coolDown = 0;
	    
	}
	setPath() {
		let path1 = ShipPaths["MoveCurrentCenter"].map(point => {
			return {x: point.x || null, y: point.y || null}
		});
		let path2 = ShipPaths["ExitLeft"].map(point => {
			return {x: point.x || null, y: point.y || null}
		});
		this.path = path1.concat(path2);
	}
	handleMove(delta) {
		// console.log(this.sprite.rotation * 180/Math.PI);
		// reset
		this.destination = this.path[this.pathCurrent];
		// If a path Vector does not have x or y, replace it with current
		this.destination.x = this.destination.x ? this.destination.x : this.sprite.position.x;
		this.destination.y = this.destination.y ? this.destination.y : this.sprite.position.y;
		this.vy = 0;
		this.vx = 0;
		this.vr = 0;
		
		if (this.sprite.position.x - 12< this.destination.x &&
			this.sprite.position.y - 12< this.destination.y &&
			this.sprite.position.x + 12 > this.destination.x &&
			this.sprite.position.y + 12 > this.destination.y ) {
			this.pathCurrent = this.pathCurrent < this.path.length -1 ? this.pathCurrent + 1 : 0;
		// console.log(this.destination);
		} else {
			this.targetAngle = this.angleToDestination();
			this.targetAngle = fr.roundFraction(this.targetAngle, 2)
			if (fr.deltaAngle(this.targetAngle, this.sprite.rotation) < 0) {
				this.vr = -this.rotateSpeed;
			} else {
				this.vr = this.rotateSpeed;
			}
			const distance = Math.floor(this.distanceToDestination());
			this.vr = fr.round(this.vr * (distance/100), 2);
			moveForward(this, delta);
			// this.vx = fr.round(this.vx * (distance/100), 2);
			// this.vy = fr.round(this.vy * (distance/100), 2);
			// console.log(this.vx + this.vy);
		}

		// move everything
		this.sprite.rotation += this.vr;
		this.shadow.rotation += this.vr;
		this.sprite.position.x += this.vx;
		this.sprite.position.y += this.vy;
		this.shadow.position.x += this.vx;
		this.shadow.position.y += this.vy;
		
		if (this.pathCurrent == this.path.length - 1) {
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
	  if (this.coolDown > 0) {
	    this.coolDown -= 1 * delta;
	  }
	  if (this.shooting && this.coolDown <= 0) {
	    let pos = {x: this.sprite.x + Gs.TILE_SIZE / 2 - 4, y: this.sprite.y + Gs.TILE_SIZE / 2 - 4};
	    let bullet = enemyBullets.getNew(this.sprite.rotation, this.sprite.x, this.sprite.y, "Basic");
		PIXI.sound.play('laser');
	    this.coolDown = this.fireRate;
	  }
	}
	handleDeath() {
		super.handleDeath();
		playerScore.update(playerScore.active + this.score);
		playerKills.update(playerKills.active + 1);
	}
}