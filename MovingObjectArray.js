import * as Gs from './Globals.js';
import {app} from './Model.js';
import Debris from './MovingObject/Debris.js'
import Doodad from './MovingObject/Doodad.js'
import Pickup from './MovingObject/Pickup.js'
import {DebrisList} from './data/DebrisList.js'
const movingObjectClasses = {
	"Debris": Debris,
	"Doodad": Doodad,
	"Pickup": Pickup
}
export default class MovingObjectArray {
	constructor(listener) {
		this.activePool = new Array();
		this.inactivePool = new Array().fill();
		this.listener = listener;
		// app.stage.addChild(this.allShips);
	}
	/*
	Take either a config of 
	*/
	getNew(config) {
		let item;
		if (this.inactivePool.length > 0) {
			item = this.inactivePool.pop()
		}
		// 	item.sprite.position.x = config.x;
		// 	item.sprite.position.y = config.y;
		// 	item.sprite.rotation = config.rotation;
		// 	item.sprite.visible = true;
		// 	item.sprite.texture = DebrisList[config.associate].sprite;
		// } else {
			item = new movingObjectClasses[DebrisList[config.associate].type]({
				type: DebrisList[config.associate].type,
				x: config.x,
				y: config.y,
				animated: DebrisList[config.associate].animated,
				texture: DebrisList[config.associate].sprite,
				rotation: config.rotation,
				moveAngle: config.moveAngle,
				spin: config.spin,
				spawnOnDeathEnabled: DebrisList[config.associate].spawnOnDeathEnabled,
				spawnOnDeathMin: DebrisList[config.associate].spawnOnDeathMin,
				spawnOnDeathMax: DebrisList[config.associate].spawnOnDeathMax,
				spawnOnDeathChild: DebrisList[config.associate].spawnOnDeathChild,
				maxHealth: DebrisList[config.associate].maxHealth,
				speed: DebrisList[config.associate].speed,
				pickupRange: DebrisList[config.associate].pickupRange,
				frames: DebrisList[config.associate].frames,
				loop: DebrisList[config.associate].loop,
				animationSpeed: DebrisList[config.associate].animationSpeed
			}, false);
		// }
		this.activePool.push(item);
		this.listener.update(this.activePool.length, this.inactivePool.length);
		return item;
	}
	recycle(item) {
		// item.handleDeath();
		this.activePool.splice(this.activePool.indexOf(item), 1);
		this.inactivePool.push(item);
		this.listener.update(this.activePool.length, this.inactivePool.length);
	}
}