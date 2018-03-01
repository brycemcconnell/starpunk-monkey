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
	"MoveExitLeft": {
		type: "move",
		path: [
			{x: -60}
		]
	},
	"StrafeExitLeft": {
		type: "strafe",
		path: [
			{x: -60}
		]
	},
	"RotateC": {
		type: "timer",
		path: [undefined],
		rotate: 1,
		rotateSpeedModifier: .1
	},
	"RotateCC": {
		type: "timer",
		path: [undefined],
		rotate: -1,
		rotateSpeedModifier: .1
	},
	"MoveSquare": {
		type: "move",
		path: [
			{x: Gs.MAP_EDGE_PADDING,                   y: Gs.MAP_EDGE_PADDING},
			{x: Gs.CANVAS_SIZEX - Gs.MAP_EDGE_PADDING, y: Gs.MAP_EDGE_PADDING},
			{x: Gs.CANVAS_SIZEX - Gs.MAP_EDGE_PADDING, y: Gs.CANVAS_SIZEY / 1.6},
			{x: Gs.MAP_EDGE_PADDING,                   y: Gs.CANVAS_SIZEY / 1.6},
		]
	},
	"StrafeSquare": {
		type: "strafe",
		path: [
			{x: Gs.MAP_EDGE_PADDING, y: Gs.MAP_EDGE_PADDING},
			{x: Gs.CANVAS_SIZEX - Gs.MAP_EDGE_PADDING},
			{y: Gs.CANVAS_SIZEY / 1.6},
			{x: Gs.MAP_EDGE_PADDING},
		]
	},

};