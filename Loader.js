import setup from './Setup.js';
export function load() {
  PIXI.loader
  .add([
    "sprites/bg.png"
  ])
  .add([
    "sprites/wallpaper.png"
  ])
  .add([
    "sprites/stars.png"
  ])
  .add([
    "sprites/clouds.png"
  ])
  .add([
    "sprites/ship.png"
  ]).add(["sprites/shipShadow.png"])
  .add([
    "sprites/laser.png"
  ])
  .add([
    "sprites/enemy.png"
  ]).add(["sprites/genericShadow.png"])
  .add('laser','sounds/laser.wav')
  .add('explode','sounds/explode.mp3')
  .on("progress", loadProgressHandler)
  .load(setup);
}

function loadProgressHandler(loader, resource) {
  console.log("loading: " + resource.url); 
  console.log("progress: " + loader.progress + "%"); 
}