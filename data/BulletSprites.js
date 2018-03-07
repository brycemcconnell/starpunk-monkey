export const BulletSprites = {
	"Basic": {
  	  sprite: "sprites/projectile/laser.png",
  	  damage: 1,
  	  speed: 2,
  	  type: "basic",
  	  sound: 'laser',
      hitAnimation: "explodec",
      hitAnimationFrames: 7
  	},
  	"Laser": {
  	  sprite: "sprites/projectile/laser2.png",
  	  damage: 1,
  	  speed: 2,
  	  type: "basic",
  	  sound: 'laser',
      hitAnimation: "explodec",
      hitAnimationFrames: 7
  	},
  	// Implement damage system
  	"Missile": {
  		sprite: "sprites/projectile/missile.png",
  		damage: 1,
  		speed: 2,
  		type: "aoe",
  		splashRadius: 20,
  		sound: 'space-missile',
      hitAnimation: "explodeb",
      hitAnimationFrames: 6
  	},
  	"Gatling": {
  		sprite: "sprites/projectile/gatling.png",
  		damage: .2,
  		speed: 4,
  		sound: 'laser',
      hitAnimation: "exploded",
      hitAnimationFrames: 4
  	},

};