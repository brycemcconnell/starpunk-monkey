import * as Gs from './Globals.js';
import SmartArray from './SmartArray.js';
export default class BulletArray extends SmartArray {
	getNew(rotation, x, y, type) {
		let item = this.inactivePool.length > 0 ?
			this.inactivePool.pop() :
			new this.defaultClass({
				x: x, y: y, sprite: type
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
		item.sprite.visible = false;
		this.activePool.splice(this.activePool.indexOf(item), 1);
		this.inactivePool.push(item);
		this.listener.update(this.activePool.length, this.inactivePool.length);
	}
}