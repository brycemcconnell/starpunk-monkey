import * as Gs from './Globals.js';
import SmartArray from './SmartArray.js';

export default class ShipArray extends SmartArray {
	getNew(rotation, x, y, sprite, team) {
		let item = this.inactivePool.length > 0 ?
		this.inactivePool.pop() :
		new this.defaultClass({
			x: x, y: y, sprite: sprite, team: team
		});
		
		item.sprite.position.x = x;
		item.shadow.position.x = x;
		item.sprite.position.y = y;
		item.shadow.position.y = y + Gs.SHADOW_OFFSET;
		item.sprite.rotation = Math.PI/180 * rotation;
		item.shadow.rotation = Math.PI/180 * rotation;
		item.sprite.visible = true;
		item.shadow.visible = true;
		item.currentHealth = item.maxHealth;
		this.activePool.push(item);
		this.listener.update(this.activePool.length, this.inactivePool.length);
		return item;
	}
	recycle(item) {
		this.activePool.splice(this.activePool.indexOf(item), 1);
		this.inactivePool.push(item);
		this.listener.update(this.activePool.length, this.inactivePool.length);
	}
}