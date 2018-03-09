import {BulletSprites} from './data/BulletSprites.js';
import {app, bulletContainers} from './Model.js';
import {enemyBulletGroup, debugGroup} from './Setup.js';
import AnimatedObject from './AnimatedObject.js';
export default class Bullet {
	constructor(config, newInstance = true) {
		this.sprite = new PIXI.Sprite(PIXI.loader.resources[config.ammo.sprite].texture);
		this.sprite.position.set(config.x, config.y);
		this.speed = config.ammo.speed;
		if (!newInstance) {
			this.sprite.parentGroup = enemyBulletGroup;
	 	  	bulletContainers[config.ammo.sprite].addChild(this.sprite);
		}
		this.type = config.ammo.type;
		this.splashRadius = config.ammo.splashRadius;
		this.damage = config.ammo.damage;
		this.sound = config.ammo.sound;
		this.hitAnimation = config.ammo.hitAnimation;
		this.hitAnimationFrames = config.ammo.hitAnimationFrames;
		this.strength = config.ammo.strength;
		
	}
	handleMove(delta) {
		this.sprite.position.x += (Math.cos(this.sprite.rotation)*this.speed)*delta;
    	this.sprite.position.y += (Math.sin(this.sprite.rotation)*this.speed)*delta;
	}
	handleDeath() {
		// this.sprite.visible = false;
	}

	explode() {
		let explosion = new AnimatedObject({
			sprite: "explodeb",
			frames: 6,
			x: this.sprite.x,
			y: this.sprite.y
		});
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