import { app, enemies, enemyBullets, background, allies, bulletContainers, movingObjects } from './Model.js';
import {gameLoop} from './gameLoop.js';
// import {instantiateShip} from './ship.js';
import * as Gs from './Globals.js';
import * as UI from './UI.js';
import * as fr from './lib/fr.js';
import Enemy from './Enemy.js';

import AlliedShip from './AlliedShip.js';
import {loaderInfo} from './Loader.js';
import {initKeyboard} from './controls.js';
import Wave from './Wave.js';

function createBackgroundLayer(x) {
  const layer = new PIXI.extras.TilingSprite(PIXI.loader.resources[x.sprite].texture, x.w, x.h);
  layer.name = x.name || undefined;
  layer.position.set(x.x || 0, x.y || 0);
  layer.tint = x.tint ? '0x' + fr.color.rgbToHex(...fr.color.hslToRgb(...x.tint)) : 0xFFFFFF;
  layer.alpha = x.alpha || 1;
  layer.speed = x.speed || 0;
  layer.direction = {
    x: Math.round(fr.random(1)) ? 1 : -1,
    y: Math.round(fr.random(1)) ? 1 : -1,
    set: function() {
      this.x = Math.round(fr.random(1)) ? 1 : -1;
      this.y = Math.round(fr.random(1)) ? 1 : -1;
    }
  };
  layer.vx = layer.direction.value * (layer.speed / 5);
  layer.vy = layer.direction.value * (layer.speed / 5);
  layer.tilePosition.x = x.offSetX || 0;
  layer.tilePosition.y = x.offSetY || 0;
  layer.parentGroup = x.displayGroup || backgroundGroup;
  app.stage.addChild(layer);
  background.push(layer);
}

const backgroundGroup = new PIXI.display.Group(-2, true);
const dynamicBackgroundGroup = new PIXI.display.Group(-1, true);
export const shadowGroup = new PIXI.display.Group(0, true);
export const debugGroup = new PIXI.display.Group(1, true);
export const shipGroup = new PIXI.display.Group(2, true);
export const allyBulletGroup = new PIXI.display.Group(3, true);
export const enemyBulletGroup = new PIXI.display.Group(4, true);
export const controlGroup = new PIXI.display.Group(5, true);

export default function setup() {
  const hue = fr.random(255);
  const hsl = fr.color.hslToRgb(hue, 90, 70);
  app.stage = new PIXI.display.Stage();
  app.stage.group.enableSort = true;
  app.stage.addChild(new PIXI.display.Layer(backgroundGroup));
  app.stage.addChild(new PIXI.display.Layer(dynamicBackgroundGroup));
  app.stage.addChild(new PIXI.display.Layer(shadowGroup));
  app.stage.addChild(new PIXI.display.Layer(debugGroup));
  app.stage.addChild(new PIXI.display.Layer(shipGroup));
  app.stage.addChild(new PIXI.display.Layer(allyBulletGroup));
  app.stage.addChild(new PIXI.display.Layer(enemyBulletGroup));
  app.stage.addChild(new PIXI.display.Layer(controlGroup));
  loaderInfo.innerHTML = "complete!";
  movingObjects.getNew({
    x: 10,
    y: 10,
    rotation: 1,
    spin: .01,
    moveAngle: 1,
    associate: "Asteroid-S"
  });
  movingObjects.getNew({
    x: 40,
    y: 10,
    rotation: 1,
    spin: -.005,
    moveAngle: 1,
    associate: "Asteroid-M"
  });
  movingObjects.getNew({
    x: 20,
    y: 30,
    rotation: 1,
    spin: .01,
    moveAngle: 1,
    associate: "Asteroid-L"
  });
   

  createBackgroundLayer({
    name: "Nebulae",
    sprite: "BG_Nebulae",
    w: Gs.CANVAS_SIZEX * 2,
    h: Gs.CANVAS_SIZEY * 2,
    speed: .1,
   tint: [(hsl[0] - 30), 50, 50]
  });
  createBackgroundLayer({
    name: "deepStars",
    sprite: "BG_Stars",
    w: Gs.CANVAS_SIZEX * 2,
    h: Gs.CANVAS_SIZEY * 2,
    offSetX: -64,
    speed: 0.01,
    tint: [(hsl[0]), 100, 40]
  });
  createBackgroundLayer({
    name: "bgStars",
    sprite: "BG_Stars",
    w: Gs.CANVAS_SIZEX * 2,
    h: Gs.CANVAS_SIZEY * 2,
    offSetX: -32,
    speed: .3,
    tint: [(hsl[0]), 80, 90]
  });
  createBackgroundLayer({
    name: "clouds",
    sprite: "BG_Clouds",
    w: Gs.CANVAS_SIZEX * 2,
    h: Gs.CANVAS_SIZEY * 2,
    speed: .4,
    tint: [(hsl[0] + 30), 90, 60],
    displayGroup: controlGroup
  });
  createBackgroundLayer({
    name: "fgStars",
    sprite: "BG_Stars",
    w: Gs.CANVAS_SIZEX * 2,
    h: Gs.CANVAS_SIZEY * 2,
    speed: .6
  });
  let cursor = new PIXI.Sprite(PIXI.loader.resources["UI_Cursor-Attack"].texture);
  app.stage.addChild(cursor);
  Object.values(bulletContainers).forEach(container => {
    app.stage.addChild(container);
  })
  
  // for (let i = 0; i < 5; i++ ) {
  //   let enemy = new Enemy({x: 10, y: (30 * i)+ 30, sprite: "Enemy", tint: 0xff7777}, null, {type: "verticalSnake", config: {loop: true}});
  //   enemies.activePool.push(enemy);
  // }

  // const ship = new AlliedShip({
  //   x: Gs.CANVAS_SIZEX / 2,
  //   y: Gs.CANVAS_SIZEY - 64,
  //   
  // });
  // allies.getNew(
  //   270,
  //   Gs.CANVAS_SIZEX / 2 + 42,
  //   Gs.CANVAS_SIZEY - 64,
  //   "Player2",
  //   "ally"
  // );
  allies.getNew(
    270,
    Gs.CANVAS_SIZEX / 2,
    Gs.CANVAS_SIZEY - 64,
    "Arwing",
    "ally"
  );
  // allies.getNew(
  //   270,
  //   Gs.CANVAS_SIZEX / 2 - 42,
  //   Gs.CANVAS_SIZEY - 64,
  //   "Player2",
  //   "ally"
  // );
  // instantiateShip();
  app.ticker.add(delta => gameLoop(delta));

  wrapper.style.display = "flex";
  wrapper.style.width = app.view.clientWidth + "px";
  wrapper.style.height = app.view.clientHeight + "px";
  // sound.laser = PIXI.loader.resources["laser.wav"];

  Gs.setCANVAS_SCALE();
  window.addEventListener("mousemove", (e) => {
    // enemies.activePool[0].destination = {
    //   x: (e.clientX / Gs.CANVAS_SCALEX),
    //   y: (e.clientY / Gs.CANVAS_SCALEY),
    // };
    Gs.MOUSE_LOCATION.update(e);
    cursor.position.x = Math.round(e.clientX / Gs.CANVAS_SCALEX) - (cursor.width / 2);
    cursor.position.y = Math.round(e.clientY / Gs.CANVAS_SCALEY) - (cursor.height / 2);
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

  /*  
  // Debug wave
  let testWave = new Wave({
    team:  enemies,
    count: 5,
    timing: 500,
    spawn: {
      r: 90,
      x: 128,
      y: -64
    }
  });*/
  PIXI.sound.play('moment-of-time', {
    loop: true,
    volume: Gs.VOLUME_MUSIC.value
  });
  /*
  // debug changing volume after a song has started
  // When changing global volume, call all sounds/music and set their volume like so
  setTimeout(() => {
    PIXI.sound.volume('moment-of-time', 0)
  }, 2500)
  setTimeout(() => {
    PIXI.sound.volume('moment-of-time', 1)
  }, 4500)*/
  function makeGradient() {
    let x = Gs.CANVAS_SIZEX - 60;
    let y = 60;
    let radius = 80;
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    
    

    let gradient = ctx.createRadialGradient(x, y, radius, x, y, 0);
    gradient.addColorStop(0, `hsla(${hue}, 90%, 70%, 0)`);
    gradient.addColorStop(0.4, `hsla(${hue}, 90%, 70%, .3)`);
    gradient.addColorStop(0.8, `hsla(${hue}, 90%, 50%, .8)`);
    gradient.addColorStop(1, `hsla(0, 100%, 100%, .8)`);
    
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2*Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();
    return canvas;
  }
  let canvas = makeGradient();
  let sun = new PIXI.Sprite(PIXI.Texture.fromCanvas(canvas));
  sun.parentGroup = dynamicBackgroundGroup;
  app.stage.addChild(sun);
}

