import * as Gs from "./../Globals.js";
export const ShipPaths = {
	"MoveCenterCenter": {
		type: "move",
		path: [
			{x: Gs.CANVAS_SIZEX / 2, y: Gs.CANVAS_SIZEY / 2}
		]
	},
	"MoveCurrentCenter": {
		type: "move",
		path: [
			{y: Gs.CANVAS_SIZEY / 2}
		]
	},
	"ExitLeft": {
		type: "move",
		path: [
			{x: -60}
		]
	},
	"MoveLeft": {
		type: "move",
		path: [
			{offsetX: -60}
		]
	},
	"StrafeLeft": {
		type: "strafe",
		path: [
			{offsetX: -60}
		]
	},

};