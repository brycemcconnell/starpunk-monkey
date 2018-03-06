/*
Moving Object
Base class for any object that simply moves in space
*/
export default class MovingObject {
	constructor() {
		this.sprite = new PIXI.Sprite(PIXI.loader.resources[/*resource*/].texture);
		this.sprite.position.x = config.x;
		this.sprite.position.y = config.y;
	}
}