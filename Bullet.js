import {BulletSprites} from './data/BulletSprites.js';
import {app} from './Model.js';
import {enemyBulletGroup} from './Setup.js';
export default class Bullet {
	constructor(config, newInstance = true) {
		this.sprite = new PIXI.Sprite(PIXI.loader.resources[BulletSprites[config.sprite].sprite].texture);
		this.sprite.position.set(config.x, config.y);
		this.speed = BulletSprites[config.sprite].speed;
		if (!newInstance) {
			this.sprite.parentGroup = enemyBulletGroup;
	 	    app.stage.addChild(this.sprite);
		}
		this.type = BulletSprites[config.sprite].type;
		this.splashRadius = BulletSprites[config.sprite].splashRadius;
		this.damage = BulletSprites[config.sprite].damage;
		this.sound = BulletSprites[config.sprite].sound;
		
	}
	handleDeath() {
		this.sprite.visible = false;
	}

	explode() {
		let a = new PIXI.Graphics();
		a.beginFill(0xe74c3c); 
		a.drawCircle(this.sprite.worldTransform.tx, this.sprite.worldTransform.ty - this.splashRadius, this.splashRadius);
		a.endFill(); 
		app.stage.addChild(a);
	}
}