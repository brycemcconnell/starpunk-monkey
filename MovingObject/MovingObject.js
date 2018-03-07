import {app, movingObjects} from './../Model.js';
import * as Gs from './../Globals.js';
import * as fr from './../lib/fr.js';
import AnimatedObject from './../AnimatedObject.js';
import {DebrisList} from './../data/DebrisList.js';
/*
Moving Object
Base class for any object that simply moves in space
*/
export default class MovingObject {
	constructor(config) {
		this.sprite = new PIXI.Sprite(PIXI.loader.resources[config.sprite].texture);
		this.sprite.position.x = config.x;
		this.sprite.position.y = config.y;
		this.sprite.rotation = config.rotation;
		this.sprite.anchor.set(.5, .5);
		app.stage.addChild(this.sprite);
		this.speed = config.speed || .5;
		this.moveAngle = config.moveAngle;
		this.maxHealth = config.maxHealth || 1;
		this.currentHealth = this.maxHealth;
		this.immune = false;
		this.spawnOnDeath = {
			enabled: config.spawnOnDeathEnabled || false,
			child: config.spawnOnDeathChild || null,
			min: config.spawnOnDeathMin || 1,
			max: config.spawnOnDeathMax || 1
		};
		this.vx = 0;
		this.vy = 0;
		this.vr = config.spin;
	}

	handleMove() {
		this.vx = (Math.cos(this.moveAngle)*this.speed);
		this.vy = (Math.sin(this.moveAngle)*this.speed);

		this.sprite.position.x += this.vx;
		this.sprite.position.y += this.vy;
		this.sprite.rotation += this.vr;

		this.vx = 0;
		this.vy = 0;
	}

	handleHit(bullet) {

		if (!this.immune) {
			this.currentHealth -= bullet.damage;
			this.sprite.tint = 0xff7777;
			setTimeout(() => {
				this.sprite.tint = 0xffffff;
			}, 100);
			if (this.currentHealth < 1) {
				PIXI.sound.play('SFX_explode3', { volume: Gs.VOLUME_SOUND.value });
				this.handleDeath();
			} else {
				PIXI.sound.play('SFX_explode', { volume: Gs.VOLUME_SOUND.value });
			}
		}
	}

	handleDeath() {
		this.sprite.visible = false;
		// this.team.recycle(this);
		let explosion = new AnimatedObject("explode", 7, {
		  x: this.sprite.position.x, 
		  y: this.sprite.position.y
		});
		if (this.spawnOnDeath.enabled) {
			console.log(this.spawnOnDeath)
			let offspringCount = fr.random(this.spawnOnDeath.max, this.spawnOnDeath.min);
			for (let i = 0; i < offspringCount; i++) {
				movingObjects.getNew({
					associate: this.spawnOnDeath.child,
				    x: this.sprite.position.x,
				    y: this.sprite.position.y,
				    rotation: fr.random(Math.PI * 2),
				    spin: -fr.random(.01, .001),
				    moveAngle: fr.random(Math.PI * 2)
				});
			}
		} 
	}
}
