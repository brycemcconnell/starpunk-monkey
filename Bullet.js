import {BulletSprites} from './data/BulletSprites.js';
import {app, bulletContainers} from './Model.js';
import {enemyBulletGroup, debugGroup} from './Setup.js';
import AnimatedObject from './AnimatedObject.js';
export default class Bullet {
	constructor(config, newInstance = true) {
		this.sprite = new PIXI.Sprite(PIXI.loader.resources[BulletSprites[config.sprite].sprite].texture);
		this.sprite.position.set(config.x, config.y);
		this.speed = BulletSprites[config.sprite].speed;
		if (!newInstance) {
			this.sprite.parentGroup = enemyBulletGroup;
	 	    bulletContainers[config.sprite].addChild(this.sprite);
		}
		this.type = BulletSprites[config.sprite].type;
		this.splashRadius = BulletSprites[config.sprite].splashRadius;
		this.damage = BulletSprites[config.sprite].damage;
		this.sound = BulletSprites[config.sprite].sound;
		this.hitAnimation = BulletSprites[config.sprite].hitAnimation;
		this.hitAnimationFrames = BulletSprites[config.sprite].hitAnimationFrames;
		
	}
	handleDeath() {
		// this.sprite.visible = false;
	}

	explode() {
		let explosion = new AnimatedObject("explodeb", 6, {x: this.sprite.x, y: this.sprite.y});
		// let a = new PIXI.Graphics();
		// a.beginFill(0xe74c3c); 
		// // Being in a particle, only has simple position, (no worldTransform)
		// a.drawCircle(this.sprite.position.x, this.sprite.position.y, this.splashRadius);
		// a.endFill(); 
		// let b = new PIXI.Graphics();
		// b.beginFill(0xff0000); 
		// b.drawCircle(this.sprite.position.x, this.sprite.position.y, 2);
		// b.endFill(); 
		// a.displayGroup = debugGroup;
		// app.stage.addChild(a);
		// app.stage.addChild(b);
	}
}