import {GunList} from './data/GunList.js';
import Beam from './Beam.js';
import * as Gs from './Globals.js';
import * as fr from './lib/fr.js';
import {GunModList} from './data/GunModList.js';
import {BulletSprites} from './data/BulletSprites.js';
export default class Gun {
	constructor(config) {
		// console.log(GunList[config.type])
	  	this.sprite = new PIXI.Sprite(PIXI.loader.resources[GunList[config.type].sprite].texture);
	  	this.parent = config.parent;
	  	this.moveType = config.movement; // @TODO Make this user configuragle
	  	this.sprite.position.set(config.slot.x, config.slot.y);
	  	this.sprite.pivot.set(GunList[config.type].pivotX, GunList[config.type].pivotY);
	  	this.type = GunList[config.type].type;
	  	this.fireRate = GunList[config.type].fireRate;
	  	this.beamCharge = GunList[config.type].beamCharge;
	  	this.coolDown = 0;

	  	this.turrets = GunList[config.type].turrets.map(turret => {
	  		let obj = new PIXI.Container();
	  		obj.position.set(turret.x, turret.y);
	  		let beam = new Beam({
		  						type: "Beam1"
		  					});
	  		beam.container.position.x += this.sprite.width;
	  		beam.container.position.y -= 2;
	  		obj.addChild(beam.container);
	  		obj.beam = beam;
	  		this.sprite.addChild(obj)
	  		return obj;
	  	});
	  	this.modifier = GunModList[config.modifier] || false;
	  	this.accuracy = this.modifier ? GunList[config.type].accuracy - this.modifier.accuracy >= 0 ? 
	  	                                  GunList[config.type].accuracy - this.modifier.accuracy :
	  	                                  0 :
	  	                                GunList[config.type].accuracy;
	  	this.ammo = GunList[config.type].ammo;
	  	this.shooting = false;

	}
	handleMovement () { 
  		if (this.moveType == "StayStraight") {
  			this.sprite.rotation = -(this.parent.rotation - (Math.PI * 1.5));
  		}
  		if (this.moveType == "Circle") {
  			this.sprite.rotation += 0.05;
  		}
  		if (this.moveType == "WithShip") {

  		}
  		if (this.moveType == "Mouse") {
  			let angle = fr.angleToPoint(
  				{x: this.sprite.worldTransform.tx, y: this.sprite.worldTransform.ty},
  				{x: Gs.MOUSE_LOCATION.x, y: Gs.MOUSE_LOCATION.y});
  			this.sprite.rotation = angle + (Math.PI  / 2); // For some reason the turret was -90deg from predicted
  		}
  	}
}