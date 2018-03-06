import * as Gs from './Globals.js';
import SmartArray from './SmartArray.js';
import {BulletSprites} from './data/BulletSprites.js';
export default class BulletArray extends SmartArray {
	constructor(defaultClass, listener, team) {
		super(defaultClass, listener);
		this.team = team;
	}
	getNew(rotation, x, y, type) {
		let item = this.inactivePool.length > 0 ?
			this.inactivePool.pop() :
			new this.defaultClass({
				x: x, y: y, sprite: type
		}, false);
		// item = new this.defaultClass({
		// 	x: x, y: y, sprite: type
		// }, false);
		item.sprite.tint = this.team == "Allies" ? 0x33ffff :
			                 this.team == "Enemies" ? 0xff3300 :
			                 0xffffff;
	
		item.sprite.position.x = x;
		item.sprite.position.y = y;
		item.sprite.rotation = rotation;
		item.sprite.visible = true;
		item.sprite.alpha = 1;
		this.activePool.push(item);
		this.listener.update(this.activePool.length, this.inactivePool.length);
		return item;
	}
	recycle(item) {
		// item.sprite.destroy();
		// item.sprite.visible = false;
		item.sprite.alpha = 0;
		this.activePool.splice(this.activePool.indexOf(item), 1);
		this.inactivePool.push(item);
		this.listener.update(this.activePool.length, this.inactivePool.length);
	}
}