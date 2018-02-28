import setup from './Setup.js';
export function load() {
  PIXI.loader
  .add([
    "sprites/bg.png"
  ]).add([
    "sprites/wallpaper.png"
  ]).add([
    "sprites/stars.png"
  ]).add([
    "sprites/clouds.png"
  ]).add([
    "sprites/ship.png"
  ]).add([
    "sprites/ship2.png"
  ]).add([
    "sprites/shipAlt.png"
  ]).add([
    "sprites/battleCruiser.png"
  ]).add([
    "sprites/laser.png"
  ]).add([
    "sprites/enemy.png"
  ]).add([
    "sprites/enemy2.png"
  ])
  .add('laser','sounds/laser.wav')
  .add('explode','sounds/explode.mp3')
  .on("progress", loadProgressHandler)
  .load(setup);
}

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
document.body.appendChild(loaderContainer);


function loadProgressHandler(loader, resource) {
  // console.log("loading: " + resource.url); 
  // console.log("progress: " + loader.progress + "%"); 
  loaderInfo.innerHTML = "loading: " + resource.url + ", " + parseFloat(loader.progress).toFixed(2) + "%";
  loaderBar.style.width = loader.progress + "%";
  // loaderBar.style.width = "100%";
}