import {app} from './Model.js';
import * as Gs from './Globals.js';

export let ship;

export function instantiateShip() {
  ship = new PIXI.Sprite(PIXI.loader.resources["sprites/ship.png"].texture);
  ship.shadow = new PIXI.Sprite(PIXI.loader.resources["sprites/ship.png"].texture);
  ship.shadow.position.set(64, 64 + Gs.SHADOW_OFFSET);
  ship.shadow.alpha = Gs.SHADOW_STRENGTH;
  ship.shadow.tint = 0x000000;
  ship.scale.set(1, 1);
  ship.position.set(64, 64);
  ship.vx = 0;
  ship.vy = 0;
  ship.moveDirection = {
    up: false,
    down: false,
    left: false,
    right: false,
  }
  ship.shooting = false;
  ship.fireRate = 20;
  ship.coolDown = 0;
  ship.maxFuel = 100;
  ship.fuel = 100;
  ship.booster = false;
  app.stage.addChild(ship.shadow);
  app.stage.addChild(ship);
  
}