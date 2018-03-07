export const DebrisList = {
	"Asteroid-S": {
	    sprite: "DOODAD_Asteroid-Small",
	    type: "Debris",
	    maxHealth: 4,
	    speed: .9
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
	}
}; 