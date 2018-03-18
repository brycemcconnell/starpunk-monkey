import {BulletSprites} from './data/BulletSprites.js';
import {app, beamArray} from './Model.js';
import * as Gs from './Globals.js';
export default class Beam {
	constructor(config) {
		this.damage = 0.05; 
		this.height = Gs.CANVAS_SIZEY;
		let newConf = Object.assign(config, BulletSprites[config.type]);
		this.start = new PIXI.Sprite(PIXI.loader.resources[newConf.spriteStart].texture);
		this.mid = new PIXI.TilingSprite(PIXI.loader.resources[newConf.spriteMid].texture, this.height, 8);
		this.mid.position.x += 4.5;
		this.mid.position.y += -.5;
		this.end = new PIXI.Sprite(PIXI.loader.resources[newConf.spriteEnd].texture);
		this.end.position.x = this.start.width + this.mid.width;
		this.container = new PIXI.Container();
		// this.container.rotation = newConf.rotation;
		// this.container.position.set( newConf.x, newConf.y)
		this.container.addChild(this.start);
		this.container.addChild(this.mid);
		this.container.addChild(this.end);
		this.container.position.y = 2;
		this.container.visible = false;
		beamArray.push(this);
		app.stage.addChild(this.container);
	}

	handleHit(collisionY) {
		// if hitting something
		this.height = this.container.worldTransform.ty - (collisionY.sprite.position.y + collisionY.sprite.height/2);
		// console.log((collisionY.sprite.position.y + collisionY.sprite.height/2), this.container.worldTransform.ty)
		this.mid.width = this.height;
		this.end.position.x = this.start.width + this.mid.width;
	}
}