import * as Gs from './Globals.js';
import SmartArray from './SmartArray.js';
import Enemy from './Enemy.js';
import AlliedShip from './AlliedShip.js';
function createGrid() {
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
export let grid = createGrid();

export let app = new PIXI.Application({ 
    width: Gs.CANVAS_SIZEX * Gs.SCALE_FACTOR,         // default: 800
    height: Gs.CANVAS_SIZEY * Gs.SCALE_FACTOR,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1      // default: 1
});
app.renderer.backgroundColor = 0x061639;
app.stage.scale.set(Gs.SCALE_FACTOR, Gs.SCALE_FACTOR);
app.renderer = PIXI.autoDetectRenderer(Gs.CANVAS_SIZEX, Gs.CANVAS_SIZEY, {
    roundPixels: true,
    resolution: window.devicePixelRatio || 1
  });
PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.BICUBIC;

export const enemies = new SmartArray(Enemy);
export const bulletPool = [];
export const speed = 2;
export const bullets = [];

export const background = [];


export const spriteList = {
  "Enemy": {
    sprite: "sprites/enemy.png"
  },
  "Player": {
    sprite: "sprites/ship.png"
  },
  "Player2": {
    sprite: "sprites/ship2.png"
  },
  "PlayerAlt": {
    sprite: "sprites/shipAlt.png"
  },
  "BattleCruiser": {
    sprite: "sprites/battleCruiser.png"
  },
  "Enemy2": {
    sprite: "sprites/enemy2.png"
  },
};

export const allies = [];