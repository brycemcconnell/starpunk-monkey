export default class Path {
	/*
		@param {string} type - The type of movement to be calculated
	*/
	constructor(type) {
		switch (type) {
			case "move":

			break;
			case "strafe":

			break;
			case "rotate":

			break;
			case "orbit":

			break;
		}
	}

	/*	
	// Maybe keep movement within the Ship class, and make this only for constructing JSON like paths like we had in the ShipPaths.js file
	next(x, y, rotation, speed) {
		// Calculate next position/rotation

		let nextMove = {
			x: 0,
			y: 0,
			rotation: 0
		}
		return nextMove;
	}
	*/
}