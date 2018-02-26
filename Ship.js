import * as Gs from './Globals.js';
import {app, spriteList} from './Model.js';
import {shadowGroup, shipGroup} from './Setup.js';
export default class Ship {
	constructor(config) {
		this.sprite = new PIXI.Sprite(PIXI.loader.resources[spriteList[config.sprite].sprite].texture);
		this.sprite.position.set(config.x, config.y);
		this.sprite.tint = config.tint || 0xFFFFFF;
		// this.sprite.pivot = {x: 20, y: 20}
		this.sprite.anchor.set(0.5);
		this.sprite.parentGroup = shipGroup;
		this.shadow = new PIXI.Sprite(PIXI.loader.resources[spriteList[config.sprite].sprite].texture);
	    this.shadow.tint = 0x000000;
	    this.shadow.alpha = Gs.SHADOW_STRENGTH;
	    this.shadow.position.set(config.x, config.y + Gs.SHADOW_OFFSET);
	    this.shadow.anchor.set(0.5);
	    this.shadow.parentGroup = shadowGroup;
	    app.stage.addChild(this.sprite);
	    app.stage.addChild(this.shadow);

	    this.vx = 0;
	    this.vy = 0;
	    this.vr = 0;
	   	this.speed = 1;
	   	this.rotateSpeed = .05;
	}
}