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
		Object.assign(config, DebrisList[config.associate]);

		this.name = config.name;
		this.value = config.value;
		this.type = config.type;
		if (config.animated) {
			this.sprite = new PIXI.Container();
			let animation = new AnimatedObject({
				sprite: config.sprite,
				frames: config.frames,
				loop: config.loop,
				animationSpeed: config.animationSpeed,
				startAt: fr.random(config.frames)
			});
			this.sprite.addChild(animation.animation);
		} else {
			this.sprite = new PIXI.Sprite(PIXI.loader.resources[config.sprite].texture);
			this.sprite.anchor.set(.5, .5);
		}
		this.sprite.position.x = config.x;
		this.sprite.position.y = config.y;
		this.sprite.rotation = config.rotation;
		
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
		this.hasDrops = true;
		this.dropList = [
			{
				name: "Metal",
				chance: 50
			},{
				name: "Metal2",
				chance: 50
			},{
				name: "Credit",
				chance: 100,
				value: [5, 10]
			},
		];
		this.vx = 0;
		this.vy = 0;
		this.vr = config.spin;

		this.vxpull = 0;
		this.vypull = 0;
		this.vxpush = 0;
		this.vypush = 0;
	}

	handleMove(delta) {
		if (this.vxpull > 0) this.vxpull -= .01;
		if (this.vypull > 0) this.vypull -= .01;
		if (this.vxpush > 0) this.vxpush -= .01;
		if (this.vypush > 0) this.vypush -= .01;
		this.vx = (Math.cos(this.moveAngle)*this.speed);
		this.vy = (Math.sin(this.moveAngle)*this.speed);

		this.sprite.position.x += (this.vx + this.vxpull + this.vxpush) * delta;
		this.sprite.position.y += (this.vy + this.vypull + this.vypush) * delta;
		this.sprite.rotation += this.vr * delta;

		this.vx = 0;
		this.vy = 0;
	}

	handleHit(bullet) {
		if (bullet.type == "pull") {
			this.vxpull = (Math.cos(bullet.sprite.rotation + Math.PI)*bullet.strength);
			this.vypull = (Math.sin(bullet.sprite.rotation + Math.PI)*bullet.strength);
		}
		if (bullet.type == "push") {
			this.vxpush = (Math.cos(bullet.sprite.rotation)*bullet.strength);
			this.vypush = (Math.sin(bullet.sprite.rotation)*bullet.strength);
		}

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
		let explosion = new AnimatedObject({
		  sprite: "explodebw",
		  frames: 7, 
		  x: this.sprite.position.x, 
		  y: this.sprite.position.y
		});
		if (this.spawnOnDeath.enabled) {
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
		if (this.hasDrops) {
			let loot = generateLootFrom(this.dropList);
			for (let i = 0; i < loot.length; i++) {
				movingObjects.getNew({
				  	associate: loot[i].name,
				    x: this.sprite.position.x,
				    y: this.sprite.position.y,
				    rotation: fr.random(Math.PI * 2),
				    spin: -fr.random(.01, .001),
				    moveAngle: fr.random(Math.PI * 2),
				    dropList: null,
				    hasDrops: false,
				    name: loot[i].name,
				    value: loot[i].value || 1
				});
			}
		}
	}
}

function generateLootFrom(dropList) {
	let lootList = [];
	dropList.forEach(drop => {
		if (fr.random(100) < drop.chance) {
			let result = {
				name: drop.name
			};
			if (drop.name == "Credit") {
				result.value = fr.random(drop.value[0], drop.value[1]);
			}
			lootList.push(result);
		}
	});
	return lootList;
}