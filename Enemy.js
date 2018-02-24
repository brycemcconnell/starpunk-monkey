import * as Gs from './Globals.js';
import {app} from './Model.js';
export default class Enemy {
	constructor(pos) {
		this.sprite = new PIXI.Sprite(PIXI.loader.resources["sprites/enemy.png"].texture);
		this.shadow = new PIXI.Sprite(PIXI.loader.resources["sprites/enemy.png"].texture);
	    this.sprite.position.set(pos.x, pos.y);
	    this.shadow.tint = 0x000000;
	    this.shadow.alpha = Gs.SHADOW_STRENGTH;
	    this.shadow.position.set(pos.x, pos.y + Gs.SHADOW_OFFSET);
	    app.stage.addChild(this.sprite);
	    app.stage.addChild(this.shadow);
	}
	handleDeath(index,container) {
		this.sprite.visible = false;
        this.shadow.visible = false;
	}
}