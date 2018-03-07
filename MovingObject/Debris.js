import MovingObject from './MovingObject.js';
/*
Debris
Represents an object that has hit detection,
For example an asteroid, can be destroyed by projectiles, but can also damage ships
*/

export default class Debris extends MovingObject {
	constructor(config) {
		super(config);
	}
}