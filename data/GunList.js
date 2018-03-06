/*
Gun Template

"Reference name": {
	fireRate: x, // the frames in between each shot
	type: "Laser", // Laser, Missile, etc.
}
*/

export const GunList = {
	"Standard Laser": {
		fireRate: 20,
		sprite:"sprites/gun/gun.png",
		pivotX: 2.5,
		pivotY: 2,
		turrets: [
			{x: 0, y: 0}
		],
		type: "Laser",
		accuracy: .05 // 95%
	},
	"Standard Gatling": {
		fireRate: 5,
		sprite:"sprites/gun/gun-gatling.png",
		pivotX: 2.5,
		pivotY: 2,
		turrets: [
			{x: 0, y: 0}
		],
		type: "Gatling",
		accuracy: .2 // 80%
	},
	"Double Laser": {
		fireRate: 20,
		sprite:"sprites/gun/gun-double.png",
		pivotX: 2.5,
		pivotY: 2,
		turrets:[
			{x: 2, y: 0},
			{x: -2, y: 0}
		],
		type: "Laser",
		accuracy: .1 // 90%
	},
	"Standard Missile": {
		fireRate: 50,
		sprite:"sprites/gun/gun-missile.png",
		pivotX: 2.5,
		pivotY: 2,
		turrets:[
			{x: 0, y: 0}
		],
		type: "Missile",
		accuracy: .05 // 95%
	},
};