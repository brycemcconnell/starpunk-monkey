import * as Gs from './Globals.js';
import {app, enemies, allies} from './Model.js';
import {ShipSprites} from './data/SpriteList.js';
import {shadowGroup, shipGroup} from './Setup.js';
export default class Ship {
	constructor(config) {
		this.team = config.team == "enemy" ? enemies :
		            config.team == "ally" ? allies :
		            nullw;
		this.sprite = new PIXI.Sprite(PIXI.loader.resources[ShipSprites[config.sprite].sprite].texture);
		this.sprite.position.set(config.x, config.y);
		this.sprite.tint = config.tint || 0xFFFFFF;
		// this.sprite.pivot = {x: 20, y: 20}
		this.sprite.anchor.set(0.5);
		this.sprite.parentGroup = shipGroup;
		this.shadow = new PIXI.Sprite(PIXI.loader.resources[ShipSprites[config.sprite].sprite].texture);
		this.shadow.tint = 0x000000;
		this.shadow.alpha = Gs.SHADOW_STRENGTH;
		this.shadow.position.set(config.x, config.y + Gs.SHADOW_OFFSET);
		this.shadow.anchor.set(0.5);
		this.shadow.parentGroup = shadowGroup;
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
		this.speed = 1;
		this.rotateSpeed = .05;

		this.maxHealth = ShipSprites[config.sprite].maxHealth;
  	this.currentHealth = this.maxHealth;
	}
	handleHit() {
		this.currentHealth -= 1;
		this.sprite.tint = 0xffaaaa;
		setTimeout(() => {
			this.sprite.tint = 0xffffff;
		}, 100);
		if (this.currentHealth < 1) {
			this.handleDeath();
		}
	}
	handleDeath() {
		this.sprite.visible = false;
		this.shadow.visible = false;
		this.team.recycle(this);
	}
}