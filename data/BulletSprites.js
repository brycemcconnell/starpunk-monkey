export const BulletSprites = {
	"Basic": {
  	  sprite: "PROJECTILE_Test",
  	  damage: 1,
  	  speed: 2,
  	  type: "basic",
  	  sound: 'SFX_Laser1',
      hitAnimation: "explodec",
      hitAnimationFrames: 7,
      gun: "Laser"
  	},
  	"Laser": {
  	  sprite: "PROJECTILE_Laser1",
  	  damage: 1,
  	  speed: 2,
  	  type: "basic",
  	  sound: 'SFX_Laser1',
      hitAnimation: "explodec",
      hitAnimationFrames: 7,
      gun: "Laser"
  	},
  	// Implement damage system
  	"Missile": {
  		sprite: "PROJECTILE_Missile1",
  		damage: 1,
  		speed: 2,
  		type: "aoe",
  		splashRadius: 80,
  		sound: 'SFX_space-missile',
      hitAnimation: "explodeb",
      hitAnimationFrames: 6,
      gun: "Missile"
  	},
  	"Gatling": {
      sprite: "PROJECTILE_Gatling1",
      damage: .2,
      speed: 4,
      type: "basic",
      sound: 'SFX_Laser1',
      hitAnimation: "exploded",
      hitAnimationFrames: 4,
      gun: "Gatling"
    },
    "Tractor Shell": {
      sprite: "PROJECTILE_Gravity4",
      damage: .2,
      speed: 4,
      sound: 'SFX_Laser1',
      hitAnimation: "exploded",
      hitAnimationFrames: 4,
      type: "pull",
      gun: "Gravity",
      strength: 1
    },
    "Repulsion Shell": {
      sprite: "PROJECTILE_Gravity3",
      damage: .2,
      speed: 4,
      sound: 'SFX_Laser1',
      hitAnimation: "exploded",
      hitAnimationFrames: 4,
      type: "push",
      gun: "Gravity",
      strength: 1
    },
    "Beam Cell": {
      sprite: "PROJECTILE_BeamStart",
      damage: .2,
      speed: 4,
      sound: 'SFX_Laser1',
      hitAnimation: "exploded",
      hitAnimationFrames: 4,
      type: "beam",
      strength: 1
    },
    "Beam1": {
      spriteStart: "PROJECTILE_BeamStart",
      spriteMid: "PROJECTILE_BeamMid",
  		spriteEnd: "PROJECTILE_BeamEnd",
  		damage: .2,
  		speed: 4,
  		sound: 'SFX_Laser1',
      hitAnimation: "exploded",
      hitAnimationFrames: 4,
      type: "beam",
      strength: 1
  	},

};