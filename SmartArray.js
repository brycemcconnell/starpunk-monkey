import * as Gs from './Globals.js';
export default class SmartArray {
	constructor(defaultClass, initialCount = 0, filler) {
		this.activePool = new Array();
		this.inactivePool = new Array(initialCount).fill(filler);
		this.defaultClass = defaultClass;
	}
	getNew(rotation, x, y) {
	  let item = this.inactivePool.length > 0 ?
	    this.inactivePool.pop() :
	    new this.defaultClass({
	    	x: x, y: y, sprite: "Enemy2"
	    });
	    // new PIXI.Sprite(PIXI.loader.resources[this.defaultTexture].texture);
	  item.sprite.position.x = x;
	  item.shadow.position.x = x;
	  item.sprite.position.y = y;
	  item.shadow.position.y = y + Gs.SHADOW_OFFSET;
	  item.sprite.rotation = Math.PI/180 * rotation;
	  item.shadow.rotation = Math.PI/180 * rotation;
	  item.sprite.visible = true;
	  item.shadow.visible = true;
	  this.activePool.push(item);
	  return item;
	}
	recycle(item) {
	  item.handleDeath();
	  this.activePool.splice(this.activePool.indexOf(item), 1);
	  this.inactivePool.push(item);
	  // console.log(this.activePool.length, this.inactivePool.length);
	}
}