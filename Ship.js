import * as Gs from './Globals.js';
import {app, enemies, allies} from './Model.js';
import {ShipSprites} from './data/SpriteList.js';
import {shadowGroup, shipGroup} from './Setup.js';
import Gun from './Gun.js';
import AnimatedObject from "./AnimatedObject.js";

export default class Ship {
	constructor(config) {
		this.team = config.team == "enemy" ? enemies :
		            config.team == "ally" ? allies :
		            null;
		this.sprite = new PIXI.Sprite(PIXI.loader.resources[ShipSprites[config.sprite].sprite].texture);
		this.sprite.position.set(config.x, config.y);
		this.sprite.tint = config.tint || 0xFFFFFF;
		// this.sprite.pivot = {x: 20, y: 20}
		this.sprite.anchor.set(0.5);
		this.sprite.parentGroup = shipGroup;

		const trailLeft = new PIXI.Container();
		trailLeft.visible = false;
		trailLeft.pivot.set(1, 0);
		trailLeft.rotation = Math.PI / 2;
		trailLeft.position.set(-this.sprite.width / 2 - 3, -this.sprite.height / 2 + 1);
		const trailL = new AnimatedObject({
			sprite: "flight-trail",
			frames: 4,
			parent: trailLeft,
			loop: true,
			animationSpeed: .1
		});
		this.sprite.addChild(trailLeft);

		const trailRight = new PIXI.Container();
		trailRight.visible = false;
		trailRight.pivot.set(1, 0);
		trailRight.rotation = Math.PI / 2;
		trailRight.position.set(-this.sprite.width / 2 - 3, this.sprite.height / 2 + 1);
		const trailR = new AnimatedObject({
			sprite: "flight-trail",
			frames: 4,
			parent: trailRight,
			loop: true,
			animationSpeed: .1
		});
		this.trails = [trailRight, trailLeft];
		this.sprite.addChild(trailRight);

		this.shadow = new PIXI.Sprite(PIXI.loader.resources[ShipSprites[config.sprite].sprite].texture);
		this.shadow.tint = 0x000000;
		this.shadow.alpha = Gs.SHADOW_ALPHA;
		this.shadow.position.set(config.x, config.y + Gs.SHADOW_OFFSET);
		this.shadow.anchor.set(0.5);
		this.shadow.parentGroup = shadowGroup;

		this.sizeBox = new PIXI.Graphics();
		this.sizeBox.setTransform(-(this.sprite.width / 2), -(this.sprite.height / 2));
		this.sizeBox.lineStyle(1, 0xffffff);
		this.sizeBox.alpha = .3;
		this.sizeBox.drawRect(0, 0, this.sprite.width, this.sprite.height);
		this.sprite.addChild(this.sizeBox);

		this.hitBox = new PIXI.Container();
		// Compensate for anchor point when drawing hit boxes
		this.hitBox.setTransform(-this.sprite.width / 2, -this.sprite.width / 2);
		ShipSprites[config.sprite].hitBoxes.forEach(box => {
			let hitBoxGraphic = new PIXI.Graphics();
			hitBoxGraphic.userData = {
				x1: box.x,
				x2: box.x + box.w,
				y1: box.y,
				y2: box.y + box.h,
				w:  box.w,
				h:  box.h
			}
			hitBoxGraphic.lineStyle(1, 0xffffff);
			hitBoxGraphic.drawRect(box.x, box.y, box.w, box.h);
			this.hitBox.addChild(hitBoxGraphic)
		});
		this.sprite.addChild(this.hitBox);
		app.stage.addChild(this.sprite);
		app.stage.addChild(this.shadow);

		this.vx = 0;
		this.vy = 0;
		this.vr = 0;
		this.time = 0;
		this.speed = ShipSprites[config.sprite].speed;
		this.rotateSpeed = .05;
		this.immune = false;

		this.maxHealth = ShipSprites[config.sprite].maxHealth;
		this.currentHealth = this.maxHealth;
		this.maxShield = ShipSprites[config.sprite].maxShield;
		this.currentShield = this.maxShield;

		this.lastHit = 0;
		this.timeSinceLastHit = 0;

		this.score = ShipSprites[config.sprite].score;
		this.userData = {
			fadeOut: function(sprite) {
				if (sprite.alpha > 0) {
					sprite.alpha -= Gs.FADE_SPEED;
					setTimeout(() => {
						this.fadeOut(sprite)
					}, 100);
				} else {
					sprite.alpha = Gs.SHADOW_ALPHA;
					sprite.visible = false;
				}
			}
		};

  	this.gunSlots = ShipSprites[config.sprite].gunSlots;

  	this.guns = [];


  	// let gun = new PIXI.Sprite(PIXI.loader.resources["sprites/gun/gun-double.png"].texture);
  	// gun.moveType = "Circle";
  	// gun.position.x = 12;
  	// gun.pivot.set(2.5, gun.height/2);
  	// gun.handleMovement = () => { 
  	// 	if (gun.moveType == "StayStraight") {
  	// 		let rotation = this.sprite.rotation - (3 * (Math.PI / 2))
  	// 		gun.rotation = -rotation;
  	// 	}
  	// 	if (gun.moveType == "Circle") {
  	// 		gun.rotation -= 0.1;
  	// 	}
  	// 	if (gun.moveType == "WithShip") {

  	// 	}
  	// };
  	// gun.turrets = [
  	// 	{x: -4, y: 0},
  	// 	{x: 4, y: 0},
  	// ];
  	// gun.fireRate = 2;
  	// gun.coolDown = 0;
  	// this.guns.push(gun);


  // 	let gun2 = new PIXI.Sprite(PIXI.loader.resources["sprites/gun/gun.png"].texture);
  // 	gun2.position.x = 12;
  // 	gun2.pivot.set(2.5, gun2.height/2);
  // 	gun2.moveType = "Circle";
		// gun2.handleMovement = () => {
		// 	if (gun2.moveType == "StayStraight") {
  // 			let rotation = this.sprite.rotation - (3 * (Math.PI / 2))
  // 			gun2.rotation = -rotation;
  // 		}
  // 		if (gun2.moveType == "Circle") {
  // 			gun2.rotation += 0.1;
  // 		}
		// }
		// gun2.turrets = [
  // 		{x: 0, y: 0},
  // 	];
  // 	gun2.fireRate = 4;
  // 	gun2.coolDown = 0;
  // 	this.guns.push(gun2)
  	
	}

	setPath() {

	}

	handleHit(bullet) {

		this.lastHit = PIXI.ticker.shared.lastTime;
		if (bullet.type == "pull") {
			this.vxpull = (Math.cos(bullet.sprite.rotation + Math.PI)*bullet.strength);
			this.vypull = (Math.sin(bullet.sprite.rotation + Math.PI)*bullet.strength);
		}
		if (bullet.type == "push") {
			this.vxpush = (Math.cos(bullet.sprite.rotation)*bullet.strength);
			this.vypush = (Math.sin(bullet.sprite.rotation)*bullet.strength);
		}
		
		if (!this.immune) {
			if (this.currentShield == 0) {
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
			} else {
				this.currentShield -= bullet.damage;
				if (this.currentShield < 0) this.currentShield = 0;
				this.sprite.tint = 0x7777ff;
				setTimeout(() => {
					this.sprite.tint = 0xffffff;
				}, 100);
			}
			
		}
	}

	handleDeath() {
		this.sprite.visible = false;
		this.userData.fadeOut(this.shadow);
		this.team.recycle(this);
		let explosion = new AnimatedObject({
			sprite: "explode",
			frames: 7,
      x: this.sprite.position.x, 
      y: this.sprite.position.y
    });
   //  if (this.spawnOnDeath.enabled) {
			// let offspringCount = fr.random(this.spawnOnDeath.max, this.spawnOnDeath.min);
			// for (let i = 0; i < offspringCount; i++) {
			// 	movingObjects.getNew({
			// 		associate: this.spawnOnDeath.child,
			// 	    x: this.sprite.position.x,
			// 	    y: this.sprite.position.y,
			// 	    rotation: fr.random(Math.PI * 2),
			// 	    spin: -fr.random(.01, .001),
			// 	    moveAngle: fr.random(Math.PI * 2)
			// 	});
			// }
			if (this.drops) {
				let loot = generateLootFrom(this.ship);

				for (let i = 0; i < loot.length - 1; i++) {
				movingObjects.getNew({
				  	associate: loot[i].sprite,
				    x: this.sprite.position.x,
				    y: this.sprite.position.y,
				    rotation: fr.random(Math.PI * 2),
				    spin: -fr.random(.01, .001),
				    moveAngle: fr.random(Math.PI * 2)
				});
			}
		} 
	}

	handleShields() {
		this.timeSinceLastHit = PIXI.ticker.shared.lastTime - this.lastHit;
	  	if (this.timeSinceLastHit > 3000) {
	  		if (this.currentShield < this.maxShield) this.currentShield += .01;
	  		if (this.currentShield > this.maxShield) this.currentShield = this.maxShield;
	  		this.timeSinceLastHit = 0;
	  	}
	}
}