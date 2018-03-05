import {app} from './Model.js';
export const CANVAS_SIZEX = 256;
export const CANVAS_SIZEY = 320;
export let CANVAS_SCALEX = 1;
export let CANVAS_SCALEY = 1;
export const setCANVAS_SCALE = () => {
	CANVAS_SCALEX = document.querySelector("canvas").clientWidth / CANVAS_SIZEX;
    CANVAS_SCALEY = document.querySelector("canvas").clientHeight / CANVAS_SIZEY;
}
export const TILE_SIZE = 32;
export const SHADOW_OFFSET = 50;
export const SHADOW_ALPHA = .3;
export const SCALE_FACTOR = 1;
export const UI_SCALE = 2;
export const DEFAULT_ROTATION = 270;
export const FIRERATE_MIN = 1;
export const FIRERATE_MAX = 60;
export const FADE_SPEED = .1;
export const MAP_EDGE_PADDING = 32;

PIXI.sound.volumeAll = 1;
export const VOLUME_MUSIC = {
	value: 1
};
export const VOLUME_SOUND = {
	value: 1
};
export const SHOW_HITBOXES = {
	value: false,
	toggle: function() {
		this.value = this.value ? false : true;
		console.log('Hitboxes set to', this.value);
	}
};
export const SHOW_SIZEBOXES = {
	value: false,
	toggle: function() {
		this.value = this.value ? false : true;
		console.log('Sizeboxes set to', this.value);
	}
};

export const RESPAWN = {
	value: false,
	toggle: function() {
		this.value = this.value ? false : true;
		console.log('Respawning set to', this.value);
	}
};

export const RENDER_STATE = {
	value: true,
	toggle: function() {
		this.value = this.value ? false : true;
		console.log('Render set to', this.value);
	}
};
export const PLAYER_HIT_DETECTION = {
	value: true,
	toggle: function() {
		this.value = this.value ? false : true;
		console.log('Player hit detection set to', this.value);
	}
};
export const MOUSE_LOCATION = {
	x: 0,
	y: 0,
	update: function(e) {
		this.x = Math.round(e.clientX / CANVAS_SCALEX);
		this.y = Math.round(e.clientY / CANVAS_SCALEY);
	}
};
export const GALAXY_MODE_DRIFT = {
	value: false,
	toggle: function() {
		this.value = this.value ? false : true;
		console.log('Galaxy drift set to', this.value);
	}
};

export const MAP_ZOOM = {
	translateValues: [0, -50, -75, -87.5, -93.75],
	scaleValues: [1, 2, 4, 8, 16],
	currentIndex: 0,
	scale: 1,
	translate: 0,
	set(dir) {
		let newIndex = this.currentIndex + dir;

		// Check if too big
		newIndex = newIndex > this.translateValues.length - 1 ? this.translateValues.length - 1 : newIndex;
		// Check if too small
		newIndex = newIndex < 0 ? 0 : newIndex;

		// Set values
		this.currentIndex = newIndex;
		this.scale = this.scaleValues[this.currentIndex];
		this.translate = this.translateValues[this.currentIndex];
	},
	updateText(domElement) {
		domElement.innerHTML = "x" + this.scaleValues[this.currentIndex];
	}
}