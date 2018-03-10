import MovingObject from './MovingObject.js';
/*
Pickup
Represent an object that has hit detection with the player,
when hit the player will recieve x into their inventory state
*/

export default class Pickup extends MovingObject {
	constructor(config) {
		super(config);
		this.pickupRange = config.pickupRange;
	}
	handleDeath() {
		this.sprite.visible = false;
	}
}