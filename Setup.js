import { grid, app, enemies, bulletPool } from './Model.js';
import {gameLoop} from './gameLoop.js';
import {instantiateShip} from './ship.js';
import * as Gs from './Globals.js';
import Enemy from './Enemy.js';

export let wallpaper;
export let stars;
export let clouds;
export default function setup() {
  wallpaper = new PIXI.extras.TilingSprite(PIXI.loader.resources["sprites/wallpaper.png"].texture, 256, 640);
  wallpaper.position.set(0, -320);
  wallpaper.tint = 0x777777;
  app.stage.addChild(wallpaper);
  
  clouds = new PIXI.extras.TilingSprite(PIXI.loader.resources["sprites/clouds.png"].texture, 256, 640);
  clouds.position.set(0, -320);
  app.stage.addChild(clouds);

  stars = new PIXI.extras.TilingSprite(PIXI.loader.resources["sprites/stars.png"].texture, 256, 640);
  stars.position.set(0, -320);
  app.stage.addChild(stars);
  // A tiling wallpaper
  // for (let i = grid.length - 1; i >= 0; i--) {
  //   for (let j = grid[i].length - 1; j >= 0; j--) {
  //     if (grid[i][j] == 1) {
  //       let bg = new PIXI.extras.TilingSprite(PIXI.loader.resources["sprites/bg.png"].texture, 32, 32);
  //       bg.scale.set(1, 1);
  //       let x = i * 32;
  //       let y = j * 32;
  //       bg.position.set(x, y);
  //       grid[i][j] = bg;
  //       app.stage.addChild(bg);
  //     }
  //   }
  // }
  for (let i = 0; i < 5; i++ ) {
    let enemy = new Enemy({x: 30 * i, y: 30});
    enemies.activePool.push(enemy);
  }
  // ship = new PIXI.Sprite(PIXI.loader.resources["sprites/ship.png"].texture);
  // ship.scale.set(1, 1);
  // ship.position.set(64, 64);
  // ship.vx = 0;
  // ship.vy = 0;
  // ship.moveDirection = {
  //   up: false,
  //   down: false,
  //   left: false,
  //   right: false,
  // }
  // ship.shooting = false;
  // ship.fireRate = 20;
  // ship.coolDown = 0;
  // ship.maxFuel = 100;
  // ship.fuel = 100;
  // ship.booster = false;
  // app.stage.addChild(ship);
  instantiateShip();
  app.ticker.add(delta => gameLoop(delta));

  

  // Create initial bullets
  for (let i = 0; i < 10; i++) {
    let bullet = new PIXI.Sprite(PIXI.loader.resources["sprites/laser.png"].texture);
    bulletPool.push(bullet);
  }

  wrapper.style.display = "flex";
  wrapper.style.width = document.querySelector("canvas").clientWidth + "px";
  wrapper.style.height = document.querySelector("canvas").clientHeight + "px";
  // sound.laser = PIXI.loader.resources["laser.wav"];
}