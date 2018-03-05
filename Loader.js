import setup from './Setup.js';
export function load() {
  PIXI.loader
  //backgrounds
  .add([
    "sprites/background/bg.png"
  ]).add([
    "sprites/background/wallpaper.png"
  ]).add([
    "sprites/background/stars.png"
  ]).add([
    "sprites/background/clouds.png"
  ])
  // ships
  .add([
    "sprites/ship/ship.png"
  ]).add([
    "sprites/ship/ship2.png"
  ]).add([
    "sprites/ship/shipAlt.png"
  ]).add([
    "sprites/ship/battleCruiser.png"
  ]).add([
    "sprites/ship/enemy.png"
  ]).add([
    "sprites/ship/enemy2.png"
  ])  .add([
    "sprites/ship/arwing.png"
  ]).add([
    "sprites/ship/arwing2.png"
  ]).add([
    "sprites/ship/castle.png"
  ])
  // projectiles
  .add([
    "sprites/projectile/laser.png"
  ]).add([
    "sprites/projectile/laser2.png"
  ]).add([
    "sprites/projectile/missile.png"
  ]).add([
    "sprites/projectile/gatling.png"
  ])
  // gun
  .add([
    "sprites/gun/gun.png"
  ]).add([
    "sprites/gun/gun-double.png"
  ]).add([
    "sprites/gun/gun-missile.png"
  ]).add([
    "sprites/gun/gun-gatling.png"
  ])
  //etc
  .add([
    "sprites/etc/cursor.png"
  ])
  // sound
  .add('laser','sounds/laser.wav')
  .add('explode','sounds/explode.mp3')
  .add('missile','sounds/missile.wav')
  .add('geonosis','sounds/geonosis.wav')
  .add('laser2','sounds/laser2.wav')
  .add('laser3','sounds/laser3.wav')
  .add('laser4','sounds/laser4.wav')
  .add('laser5','sounds/laser5.wav')
  .add('laser6','sounds/laser6.wav')
  .add('online','sounds/online.wav')
  .add('offline','sounds/offline.wav')
  .on("progress", loadProgressHandler)
  .load(setup);
}
const mapWrapper = document.getElementById("mapWrapper");
const loaderContainer = document.createElement('div');
loaderContainer.classList.add("UI_loader_container");
export const loaderInfo = document.createElement('p');
const loaderBarContainer = document.createElement('div');
loaderBarContainer.classList.add("UI_loader_container__loaderContainer", "UI_box");
const loaderBar = document.createElement('div');
loaderBar.classList.add('UI_loader_container__loader');
loaderBarContainer.appendChild(loaderBar);
loaderContainer.appendChild(loaderBarContainer);
loaderContainer.appendChild(loaderInfo);
mapWrapper.appendChild(loaderContainer);


function loadProgressHandler(loader, resource) {
  // console.log("loading: " + resource.url); 
  // console.log("progress: " + loader.progress + "%"); 
  loaderInfo.innerHTML = "loading: " + resource.url + ", " + parseFloat(loader.progress).toFixed(2) + "%";
  loaderBar.style.width = loader.progress + "%";
  // loaderBar.style.width = "100%";
}