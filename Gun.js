import {GunList} from './data/GunList.js';
import * as Gs from './Globals.js';
import * as fr from './lib/fr.js';
import {GunModList} from './data/GunModList.js';
export default class Gun {
	constructor(parent, slot, type, movement, modifier) {
	  	this.sprite = new PIXI.Sprite(PIXI.loader.resources[GunList[type].sprite].texture);
	  	this.parent = parent;
	  	this.moveType = movement; // @TODO Make this user configuragle
	  	this.sprite.position.set(slot.x, slot.y);
	  	this.sprite.pivot.set(GunList[type].pivotX, GunList[type].pivotY);
	  	this.type = GunList[type].type;
	  	this.fireRate = GunList[type].fireRate;
	  	this.coolDown = 0;
	  	this.turrets = GunList[type].turrets.map(turret => {
	  		let obj = new PIXI.DisplayObject();
	  		obj.position.set(turret.x, turret.y);
	  		this.sprite.addChild(obj)
	  		return obj;
	  	});
	  	this.modifier = GunModList[modifier] || false;
	  	this.accuracy = this.modifier ? GunList[type].accuracy - this.modifier.accuracy >= 0 ? 
	  	                                  GunList[type].accuracy - this.modifier.accuracy :
	  	                                  0 :
	  	                                GunList[type].accuracy;

	}
	handleMovement () { 
  		if (this.moveType == "StayStraight") {
  			let rotation = this.parent.rotation - (3 * (Math.PI / 2))
  			this.sprite.rotation = -rotation;
  		}
  		if (this.moveType == "Circle") {
  			this.sprite.rotation += 0.05;
  		}
  		if (this.moveType == "WithShip") {

  		}
  		if (this.moveType == "MousePosition") {
  			let angle = fr.angleToPoint(
  				{x: this.sprite.worldTransform.tx, y: this.sprite.worldTransform.ty},
  				{x: Gs.MOUSE_LOCATION.x, y: Gs.MOUSE_LOCATION.y});
  			this.sprite.rotation = angle + (Math.PI  / 2); // For some reason the turret was -90deg from predicted
  		}
  	}
}