import { grid, app, enemies, enemyBullets, background, allies } from './Model.js';
import {gameLoop} from './gameLoop.js';
// import {instantiateShip} from './ship.js';
import * as Gs from './Globals.js';
import * as UI from './UI.js';
import Enemy from './Enemy.js';

import AlliedShip from './AlliedShip.js';
import {loaderInfo} from './Loader.js';
import {initKeyboard} from './controls.js';
import Wave from './Wave.js';

function createBackgroundLayer(x) {
  const layer = new PIXI.extras.TilingSprite(PIXI.loader.resources[x.sprite].texture, x.w, x.h);
  layer.name = x.name || undefined;
  layer.position.set(x.x || 0, x.y || 0);
  layer.tint = x.tint || 0xFFFFFF;
  layer.vy = x.vy || 0;
  layer.parentGroup = backgroundGroup;
  app.stage.addChild(layer);
  background.push(layer);
}

const backgroundGroup = new PIXI.display.Group(-1, true);
export const shadowGroup = new PIXI.display.Group(0, true);
export const shipGroup = new PIXI.display.Group(1, true);

export default function setup() {
  app.stage = new PIXI.display.Stage();
  app.stage.group.enableSort = true;
  app.stage.addChild(new PIXI.display.Layer(backgroundGroup));
  app.stage.addChild(new PIXI.display.Layer(shadowGroup));
  app.stage.addChild(new PIXI.display.Layer(shipGroup));
  loaderInfo.innerHTML = "complete!";
  createBackgroundLayer({
    name: "Nebulae",
    sprite: "sprites/wallpaper.png",
    w: 256,
    h: 640,
    y: -320,
    vy: .1,
    tint: 0xaaaaaa
  });
  createBackgroundLayer({
    name: "deepStars",
    sprite: "sprites/stars.png",
    w: 320,
    h: 640,
    x: -64,
    y: -320,
    vy: 0.01,
    tint: 0xaa0077
  });
  createBackgroundLayer({
    name: "bgStars",
    sprite: "sprites/stars.png",
    w: 288,
    h: 640,
    x: -32,
    y: -320,
    vy: .3,
    tint: 0xeeaabb
  });
  createBackgroundLayer({
    name: "clouds",
    sprite: "sprites/clouds.png",
    w: 256,
    h: 640,
    y: -320,
    tint: 0xcccccc,
    vy: .4
  });
  createBackgroundLayer({
    name: "fgStars",
    sprite: "sprites/stars.png",
    w: 256,
    h: 640,
    y: -320,
    vy: .6
  });

  
  // for (let i = 0; i < 5; i++ ) {
  //   let enemy = new Enemy({x: 10, y: (30 * i)+ 30, sprite: "Enemy", tint: 0xff7777}, null, {type: "verticalSnake", config: {loop: true}});
  //   enemies.activePool.push(enemy);
  // }

  // const ship = new AlliedShip({
  //   x: Gs.CANVAS_SIZEX / 2,
  //   y: Gs.CANVAS_SIZEY - 64,
  //   
  // });
  allies.getNew(
    270,
    Gs.CANVAS_SIZEX / 2,
    Gs.CANVAS_SIZEY - 64,
    "Player2",
    "ally"
  );
  allies.getNew(
    270,
    Gs.CANVAS_SIZEX / 2 + 64,
    Gs.CANVAS_SIZEY - 64,
    "BattleCruiser",
    "ally"
  );
  // instantiateShip();
  app.ticker.add(delta => gameLoop(delta));

  wrapper.style.display = "flex";
  wrapper.style.width = document.querySelector("canvas").clientWidth + "px";
  wrapper.style.height = document.querySelector("canvas").clientHeight + "px";
  // sound.laser = PIXI.loader.resources["laser.wav"];

  Gs.setCANVAS_SCALE();
  document.querySelector("canvas").addEventListener("mousemove", (e) => {
    // enemies.activePool[0].destination = {
    //   x: (e.clientX / Gs.CANVAS_SCALEX),
    //   y: (e.clientY / Gs.CANVAS_SCALEY),
    // };
    UI.MouseLocation.innerHTML = "x:" + Math.round(e.clientX / Gs.CANVAS_SCALEX) + " / " +
      "y: " + Math.round(e.clientY / Gs.CANVAS_SCALEY);
    // UI.EnemyRotation.innerHTML = "target: " +
    // (enemies.activePool[0].targetAngle).toFixed(2) + "," +
    // // (enemies.activePool[0].angle/Math.PI * 180).toFixed(2) +
    // "/ current: " +
    // (enemies.activePool[0].sprite.rotation).toFixed(2)// + "," +
    // (enemies.activePool[0].sprite.rotation/Math.PI * 180 % 360).toFixed(2)
    ;
  // console.log(enemies.activePool[0])
  });
  initKeyboard();

  let testWave = new Wave({
    team:  enemies,
    count: 5,
    timing: 500,
    spawn: {
      r: 90,
      x: 128,
      y: -64
    }
  });
}

