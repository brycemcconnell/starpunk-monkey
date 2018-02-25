export const CANVAS_SIZEX = 256;
export const CANVAS_SIZEY = 320;
export const TILE_SIZE = 32;
export const SHADOW_OFFSET = 50;
export const SHADOW_STRENGTH = .0;
export const SCALE_FACTOR = 1;
export const UI_SCALE = 2;
export let RESPAWN = {
	value: false,
	toggle: function() {
		this.value = this.value ? false : true;
		console.log(this.value);
	}
};