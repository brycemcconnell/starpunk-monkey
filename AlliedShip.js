import Ship from './Ship.js';
import * as Gs from './Globals.js';
import {allies} from './Model.js';
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
    this.fireRate = 20;
    this.coolDown = 0;
    this.maxFuel = 100;
    this.fuel = 100;
    this.booster = false;
    this.speed = 1.6;
    this.moveType = "manual";
    

    this.sprite.rotation = Math.PI/180 * Gs.DEFAULT_ROTATION;
    this.shadow.rotation = Math.PI/180 * Gs.DEFAULT_ROTATION;
  }
  
}