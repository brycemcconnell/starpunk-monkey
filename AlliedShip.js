import Ship from './Ship.js';
import * as Gs from './Globals.js';
import {allies} from './Model.js';
import {resetGame} from './resetGame.js';
import Gun from './Gun.js';
export default class AlliedShip extends Ship {
  constructor(pos) {
    super(pos);
    this.moveDirection = {
      up: false,
      down: false,
      left: false,
      right: false,
    }
    this.shooting = false;
    this.fireRate = 14;
    this.coolDown = 0;
    this.maxFuel = 100;
    this.fuel = 100;
    this.booster = false;
    this.moveType = "manual";
    this.breaking = false;
    

    this.sprite.rotation = Math.PI/180 * Gs.DEFAULT_ROTATION;
    this.shadow.rotation = Math.PI/180 * Gs.DEFAULT_ROTATION;

    let gun = new Gun(this.sprite, this.gunSlots["main-left"], "Standard Laser", "Mouse");
    let gun2 = new Gun(this.sprite, this.gunSlots["main-right"], "Standard Gatling", "Mouse");
    this.guns.push(gun);
    this.guns.push(gun2);
    this.sprite.addChild(gun.sprite);
    this.sprite.addChild(gun2.sprite);
    // let gun3 = new Gun(this.sprite, this.gunSlots["secondary-left"], "Double Laser", "StayStraight");
    // let gun4 = new Gun(this.sprite, this.gunSlots["secondary-right"], "Double Laser", "StayStraight");
    // this.guns.push(gun3);
    // this.guns.push(gun4);
    // this.sprite.addChild(gun3.sprite);
    // this.sprite.addChild(gun4.sprite);

  }
  handleHit(bullet) {
    super.handleHit(bullet);
    if (!this.immune) {
      this.immune = true;
      setTimeout(() => {
        this.immune = false;
      }, 200);
    }
  }
}