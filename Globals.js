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
export const SHADOW_STRENGTH = .3;
export const SCALE_FACTOR = 1;
export const UI_SCALE = 2;
export const DEFAULT_ROTATION = 270;
export const FIRERATE_MIN = 1;
export const FIRERATE_MAX = 60;
export const SHOW_HITBOXES = {
	value: true,
	toggle: function() {
		this.value = this.value ? false : true;
		console.log('Hitboxes set to', this.value);
	}
};

export const RESPAWN = {
	value: false,
	toggle: function() {
		this.value = this.value ? false : true;
		console.log('Respawning set to', this.value);
	}
};