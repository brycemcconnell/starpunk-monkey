import * as AI from './ai/index.js';
import Ship from './Ship.js';
import {statsOld} from './player.js';
import * as Gs from './Globals.js';
import * as fr from './lib/fr.js';
import {enemyBullets} from './Model.js';
import {playerScore, playerKills} from "./stats.js";
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
	    // this.destination = {x: 150,  y: 100};
	    this.angle = 0;
	    // AI Construction
	    this.shooting = true;
	    this.fireRate = 90;
	    this.coolDown = 0;
	    
	} 
	handleMove(delta) {
		// console.log(this.sprite.rotation * 180/Math.PI);

		
		/*if (this.sprite.position.x - 12< this.destination.x &&
			this.sprite.position.y - 12< this.destination.y &&
			this.sprite.position.x + 12 > this.destination.x &&
			this.sprite.position.y + 12 > this.destination.y ) {
			// this.destination = {x:fr.random(Gs.CANVAS_SIZEX - 12),y:fr.random(Gs.CANVAS_SIZEY - 12)};
		// console.log(this.destination);
		} else {
			this.angle = this.angleToDestination();
			if (this.angle < Math.abs(this.sprite.rotation)) {
				this.vr = -this.rotateSpeed;
			} else {
				this.vr = this.rotateSpeed;
			}
			// moveForward(this, delta);
		}*/

		// move everything
		this.sprite.rotation += this.vr;
		this.shadow.rotation += this.vr;
		this.sprite.position.x += this.vx;
		this.sprite.position.y += this.vy;
		this.shadow.position.x += this.vx;
		this.shadow.position.y += this.vy;
		// reset
		this.vy = 0;
		this.vx = 0;
		this.vr = 0;
	}
	angleToDestination() {
		const x1 = this.sprite.position.x;
		const y1 = this.sprite.position.y;
		const x2 = this.destination.x;
		const y2 = this.destination.y;
		let result = Math.atan2(y2 - y1, x2 - x1)
		return result > 0 ? result : Math.PI - result*-1 + Math.PI;
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
		playerScore.update(this.score);
		playerKills.update(playerKills.active + 1);
	}
}