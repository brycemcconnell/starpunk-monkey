import {app} from './Model.js';
export default class AnimatedObject {
	constructor(config) {
		this.textures = [];
		for (let i = 0; i < config.frames; i++) {
			let texture = PIXI.Texture.fromFrame(config.sprite + '0' + (i + 1) + '.png');
				this.textures.push(texture);
		}
		this.animation = new PIXI.extras.AnimatedSprite(this.textures);
		this.animation.x = config.x;
		this.animation.y = config.y;
		this.animation.scale.set(config.scale || 1);
		this.animation.height = config.height || this.textures[0].height;
		this.animation.width = config.width || this.textures[0].width;
		this.animation.anchor.set(0.5, 0.5)
		this.animation.loop = config.loop || false;
		this.animation.animationSpeed = config.animationSpeed || .3;
		this.animation.play();
		this.animation.onComplete = () => {this.animation.destroy()};

		app.stage.addChild(this.animation);
	}
}