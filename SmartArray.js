import * as Gs from './Globals.js';
import {allies} from './Model.js';
export default class SmartArray {
	constructor(defaultClass, listener) {
		this.activePool = new Array();
		this.inactivePool = new Array().fill();
		this.defaultClass = defaultClass;
		this.listener = listener;
	}
	getNew(rotation, x, y, type) {
		let item = this.inactivePool.length > 0 ?
			this.inactivePool.pop() :
			new this.defaultClass({
				x: x, y: y, sprite: "Basic"
		});
		item.sprite.position.x = x;
		item.sprite.position.y = y;
		item.sprite.rotation = rotation;
		item.sprite.visible = true;
		this.activePool.push(item);
		this.listener.update(this.activePool.length, this.inactivePool.length);
		return item;
	}
	recycle(item) {
		item.handleDeath();
		this.activePool.splice(this.activePool.indexOf(item), 1);
		this.inactivePool.push(item);
		this.listener.update(this.activePool.length, this.inactivePool.length);
	}
}