import * as Gs from './Globals.js';
import * as UI from './UI.js';
import * as Stat from './stats.js';
import ShipArray from './ShipArray.js';
import BulletArray from './BulletArray.js';
import Enemy from './Enemy.js';
import Bullet from './Bullet.js';
import AlliedShip from './AlliedShip.js';
/*function createGrid() {
  let newGrid = [];
  for (let i = 0; i < Gs.CANVAS_SIZEX; i+=Gs.TILE_SIZE) {
    let row = [];
    // Add one extra vertical layer
    for (let j = 0; j < Gs.CANVAS_SIZEY + Gs.TILE_SIZE; j+=Gs.TILE_SIZE) {
      row.push(1);
    }
    newGrid.push(row);
  }
  return newGrid;
}
export let grid = createGrid();*/

export let app = new PIXI.Application({ 
    width: Gs.CANVAS_SIZEX * Gs.SCALE_FACTOR,         // default: 800
    height: Gs.CANVAS_SIZEY * Gs.SCALE_FACTOR,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1,      // default: 1

});
app.renderer.backgroundColor = 0x061639;
app.stage.scale.set(Gs.SCALE_FACTOR, Gs.SCALE_FACTOR);
app.renderer = PIXI.autoDetectRenderer(Gs.CANVAS_SIZEX, Gs.CANVAS_SIZEY, {
    roundPixels: true,
    resolution: window.devicePixelRatio || 1
  });
PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.BICUBIC;

export const enemies = new ShipArray(Enemy, Stat.enemyCount);
export const enemyBullets = new BulletArray(Bullet, Stat.enemyBulletCount, "Enemies");
export const allyBullets = new BulletArray(Bullet, Stat.allyBulletCount, "Allies");
export const speed = 2;

export const background = [];
export const bulletContainers = {
  Gatling: new PIXI.ParticleContainer(50, {
    tint: true,
    position: true,
    rotation: true,
    alpha: true,
    uvs: true,
  }),
  Missile: new PIXI.ParticleContainer(50, {
    tint: true,
    position: true,
    rotation: true,
    alpha: true,
    uvs: true,
  }),
  Laser: new PIXI.ParticleContainer(500, {
    tint: true,
    position: true,
    rotation: true,
    alpha: true,
    uvs: true,
  }),
};



export const allies = new ShipArray(AlliedShip, Stat.allyCount);
