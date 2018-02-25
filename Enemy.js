import * as AI from './ai/index.js';
import Ship from './Ship.js';
import {stats} from './player.js';
export default class Enemy extends Ship {
	constructor(pos, type, ai = {type: "verticalSnake", config: {loop: true}}) {
		// Sprite Construction
		super(pos);
		this.AI = AI[ai.type];
		this.AIconfig = ai.config;
		this.sprite.rotation = Math.PI/180 * 90;
		this.shadow.rotation = Math.PI/180 * 90;
		// this.handleMove();
	    // Type construction
	    this.speed = 1;
	    this.currentMovement;
	    // AI Construction
	    
	}
	handleDeath(index,container) {
		this.sprite.visible = false;
        this.shadow.visible = false;
        stats.kills.update();
	}
	handleMove(delta) {
		this.AI(this, delta);
	}
}