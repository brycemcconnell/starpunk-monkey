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
	"Standard Shockwave": {
		description: "Releases a shockwave around the turret pushing nearby enemies back",
		fireRate: 100,
		sprite:"GUN_Missile-Standard",
		pivotX: 2.5,
		pivotY: 2,
		turrets:[
			{x: 0, y: 0}
		],
		type: "Shockwave",
		ammo: "Shockwave Shell",
		accuracy: .05 // 95%
	},
	"Standard Implosion": {
		description: "Pulls area-of-effect hit enemies into one spot for x seconds",
		fireRate: 100,
		sprite:"GUN_Missile-Standard",
		pivotX: 2.5,
		pivotY: 2,
		turrets:[
			{x: 0, y: 0}
		],
		type: "Standard",
		ammo: "Implode Shell",
		accuracy: .05 // 95%
	},
	"Standard Tractor Beam": {
		description: "Pulls the hit enemy towards the player",
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
	"Standard Repulsion Beam": {
		description: "Pushes the hit enemy towards the player",
		fireRate: 1,
		sprite:"GUN_Missile-Standard",
		pivotX: 2.5,
		pivotY: 2,
		turrets:[
			{x: 0, y: 0}
		],
		type: "Beam",
		ammo: "Repulsion Beam Cell",
		accuracy: .05 // 95%
	},
	"Standard Laser Beam": {
		description: "Pushes the hit enemy towards the player",
		fireRate: 1,
		sprite:"GUN_Missile-Standard",
		pivotX: 2.5,
		pivotY: 2,
		turrets:[
			{x: 0, y: 0}
		],
		type: "Beam",
		ammo: "Beam Cell",
		accuracy: .05 // 95%
	},
	"Phaser Laser Beam": {
		description: "Pushes the hit enemy towards the player",
		fireRate: 1,
		sprite:"GUN_Missile-Standard",
		pivotX: 2.5,
		pivotY: 2,
		turrets:[
			{x: 0, y: 0}
		],
		type: "Beam",
		ammo: "Phaser Beam Cell",
		accuracy: .05 // 95%
	},
};