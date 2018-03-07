export const BulletSprites = {
	"Basic": {
  	  sprite: "PROJECTILE_Test",
  	  damage: 1,
  	  speed: 2,
  	  type: "basic",
  	  sound: 'SFX_Laser1',
      hitAnimation: "explodec",
      hitAnimationFrames: 7
  	},
  	"Laser": {
  	  sprite: "PROJECTILE_Laser1",
  	  damage: 1,
  	  speed: 2,
  	  type: "basic",
  	  sound: 'SFX_Laser1',
      hitAnimation: "explodec",
      hitAnimationFrames: 7
  	},
  	// Implement damage system
  	"Missile": {
  		sprite: "PROJECTILE_Missile1",
  		damage: 1,
  		speed: 2,
  		type: "aoe",
  		splashRadius: 20,
  		sound: 'SFX_space-missile',
      hitAnimation: "explodeb",
      hitAnimationFrames: 6
  	},
  	"Gatling": {
  		sprite: "PROJECTILE_Gatling1",
  		damage: .2,
  		speed: 4,
  		sound: 'SFX_Laser1',
      hitAnimation: "exploded",
      hitAnimationFrames: 4
  	},

};