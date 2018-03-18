/*
Gun Template

"Reference name": {
	fireRate: x, // the frames in between each shot
	type: "Standard" - Shoots toward turret direction
	      "unknown" - a radius around player
	      "Beam" - A beam from the player straight
}
*/

export const GunList = {
	"Slow Laser": {
		fireRate: 60,
		sprite:"GUN_Laser-Standard",
		pivotX: 2.5,
		pivotY: 2,
		turrets: [
			{x: 0, y: 0}
		],
		type: "Standard",
		ammo: "Laser",
		accuracy: .05 // 95%
	},
	"Standard Laser": {
		fireRate: 20,
		sprite:"GUN_Laser-Standard",
		pivotX: 2.5,
		pivotY: 2,
		turrets: [
			{x: 0, y: 0}
		],
		type: "Standard",
		ammo: "Laser",
		accuracy: .05 // 95%
	},
	"Standard Gatling": {
		fireRate: 5,
		sprite:"GUN_Gatling-Standard",
		pivotX: 2.5,
		pivotY: 2,
		turrets: [
			{x: 0, y: 0}
		],
		type: "Standard",
		ammo: "Gatling",
		accuracy: .2 // 80%
	},
	"Double Laser": {
		fireRate: 20,
		sprite:"GUN_Laser-Double",
		pivotX: 2.5,
		pivotY: 2,
		turrets:[
			{x: 2, y: 0},
			{x: -2, y: 0}
		],
		type: "Standard",
		ammo: "Laser",
		accuracy: .1 // 90%
	},
	"Standard Missile": {
		fireRate: 50,
		sprite:"GUN_Missile-Standard",
		pivotX: 2.5,
		pivotY: 2,
		turrets:[
			{x: 0, y: 0}
		],
		type: "Standard",
		ammo: "Missile",
		accuracy: .05 // 95%
	},
	"Standard Gravity Cannon": {
		description: "Can use shockwave and imploding ammo types, otherwise is just a weaker cannon",
		fireRate: 60,
		sprite:"GUN_Missile-Standard",
		pivotX: 2.5,
		pivotY: 2,
		turrets:[
			{x: 0, y: 0}
		],
		type: "Standard",
		ammo: "Gravity Shell",
		accuracy: .05 // 95%
	},
	"Standard Gravity Beam": {
		description: "Can use shockwave and imploding types, otherwise is just a weaker beam",
		fireRate: 1,
		sprite:"GUN_Missile-Standard",
		pivotX: 2.5,
		pivotY: 2,
		turrets:[
			{x: 0, y: 0}
		],
		type: "Beam",
		ammo: "Tractor Beam Cell",
		accuracy: .05 // 95%
	},
	"Standard Beam": {
		description: "Pushes the hit enemy towards the player",
		fireRate: 1,
		beamCharge: 20,
		sprite:"GUN_Beam-Standard",
		pivotX: 4,
		pivotY: 4,
		turrets:[
			{x: 0, y: 0}
		],
		type: "Beam",
		ammo: "Beam Cell",
		accuracy: 0 // 100%
	}
};