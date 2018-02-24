export default class SmartArray {
	constructor(defaultTexture, initialCount = 20, filler) {
		this.activePool = new Array();
		this.inactivePool = new Array(initialCount).fill(filler);
		this.defaultTexture = defaultTexture;
	}
	getNew(rotation, x, y) {
	  let item = this.inactivePool.length > 0 ?
	    this.inactivePool.pop() :
	    new PIXI.Sprite(PIXI.loader.resources[this.defaultTexture].texture);
	  item.position.x = x;
	  item.position.y = y;
	  item.rotation = rotation;
	  item.visible = true;
	  this.activePool.push(item);
	  return item;
	}
	recycle(item) {
	  item.handleDeath();
	  this.activePool.splice(this.activePool.indexOf(item), 1);
	  this.inactivePool.push(item);
	  console.log(this.activePool.length, this.inactivePool.length);
	}
}