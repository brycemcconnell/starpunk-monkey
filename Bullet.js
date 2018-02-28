import {BulletSprites} from './data/BulletSprites.js';
import {app} from './Model.js';
export default class Bullet {
	constructor(config) {
		this.sprite = new PIXI.Sprite(PIXI.loader.resources[BulletSprites[config.sprite].sprite].texture);
		this.sprite.position.set(config.x, config.y);
		this.speed = BulletSprites[config.sprite].speed;
	    app.stage.addChild(this.sprite);
	}
	handleDeath() {
		this.sprite.visible = false;
	}
}