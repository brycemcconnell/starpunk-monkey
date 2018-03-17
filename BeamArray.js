import * as Gs from './Globals.js';
import {app} from './Model.js';
import Beam from './Beam.js';
export default class MovingObjectArray {
	constructor(listener) {
		this.activePool = new Array();
		this.inactivePool = new Array().fill();
		this.listener = listener;
	}
	getNew(config) {
		let item;
		if (this.inactivePool.length > 0) {
			item = this.inactivePool.pop()
		}
		item = new Beam(config, false);
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