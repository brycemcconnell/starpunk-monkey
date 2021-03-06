export const DebrisList = {
	"Asteroid-S": {
	    sprite: "DOODAD_Asteroid-Small",
	    type: "Debris",
	    maxHealth: 4,
	    speed: .7
	},
	"Asteroid-M": {
	    sprite: "DOODAD_Asteroid-Medium",
	    type: "Debris",
	    spawnOnDeathEnabled: true,
	    spawnOnDeathMax: 4,
	    spawnOnDeathChild: "Asteroid-S",
	    maxHealth: 8,
	    speed: .5
	},
	"Asteroid-L": {
	    sprite: "DOODAD_Asteroid-Large",
	    type: "Debris",
	    spawnOnDeathEnabled: true,
	    spawnOnDeathMax: 4,
	    spawnOnDeathChild: "Asteroid-M",
	    maxHealth: 16,
	    speed: .2
	},
	"Credit": {
		type: "Pickup",
	    sprite: "CreditAnim",
	    spawnOnDeathEnabled: false,
	    maxHealth: 0,
	    speed: .1,
	    pickupRange: 20,
	    animated: true,
	    frames: 8,
	    loop: true,
	    animationSpeed: .2
	},
	"Metal": {
		type: "Pickup",
	    sprite: "Metal",
	    spawnOnDeathEnabled: false,
	    maxHealth: 0,
	    speed: .1,
	    pickupRange: 20,
	    animated: false
	},
	"Metal2": {
		type: "Pickup",
	    sprite: "Metal2",
	    spawnOnDeathEnabled: false,
	    maxHealth: 0,
	    speed: .1,
	    pickupRange: 20,
	    animated: false
	},"HealthPack": {
		type: "Pickup",
	    sprite: "HealthPack",
	    spawnOnDeathEnabled: false,
	    maxHealth: 0,
	    speed: .1,
	    pickupRange: 20,
	    animated: false
	},
}; 