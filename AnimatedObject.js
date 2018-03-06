import {app} from './Model.js';
export default class AnimatedObject {
	constructor(sprite, frameCount, pos) {
		this.textures = [];
		for (let i = 0; i < frameCount; i++) {
			let texture = PIXI.Texture.fromFrame(sprite + '0' + (i + 1) + '.png');
				this.textures.push(texture);
		}
		this.animation = new PIXI.extras.AnimatedSprite(this.textures);
		this.animation.x = pos.x;
		this.animation.y = pos.y;
		this.animation.anchor.set(0.5, 0.5)
		this.animation.loop = false;
		this.animation.animationSpeed = .3;
		this.animation.play();
		this.animation.onComplete = () => {this.animation.destroy()};
		app.stage.addChild(this.animation);
	}
}