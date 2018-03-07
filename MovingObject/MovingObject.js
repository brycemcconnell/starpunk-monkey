import {app, movingObjects} from './../Model.js';
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
		this.speed = config.speed || 1;
		this.moveAngle = config.moveAngle;

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
}