import setup from './Setup.js';
import {animate, generateGalaxyData} from './map.js';
export function load() {
  PIXI.loader
  //backgrounds
  .add("BG_Nebulae","sprites/background/nebulae.png")
  .add("BG_Stars",  "sprites/background/stars.png")
  .add("BG_Clouds", "sprites/background/clouds.png")

  // ships
  .add("SHIP_G1-Player1",      "sprites/ship/g1-player1.png")
  .add("SHIP_G1-Player2",      "sprites/ship/g1-player2.png")
  .add("SHIP_G1-Player1Alt",   "sprites/ship/g1-playeralt.png")
  .add("SHIP_G1-BattleCruiser","sprites/ship/g1-battlecruiser.png")
  .add("SHIP_G1-Enemy1",       "sprites/ship/g1-enemy1.png")
  .add("SHIP_G1-Enemy2",       "sprites/ship/g1-enemy2.png")
  .add("SHIP_G1-Castle",       "sprites/ship/g1-castle.png")
  .add("SHIP_G2-Arwing1",      "sprites/ship/g2-arwing1.png")
  .add("SHIP_G2-Arwing2",      "sprites/ship/g2-arwing2.png")
   
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

  .add("DOODAD_Asteroid-Medium",      "sprites/doodads/asteroid-m.png")
  .add("DOODAD_Asteroid-Large",       "sprites/doodads/asteroid-l.png")
  .add("DOODAD_Asteroid-Small",       "sprites/doodads/asteroid-s.png")

   // Explosions
  .add([
    "./sprites/explode/explode.json"
  ]).add([
    "./sprites/explode/explodeb.json"
  ]).add([
    "./sprites/explode/explodec.json"
  ]).add([
    "./sprites/explode/exploded.json"
  ])

  // UI graphics
  .add([
    "sprites/etc/cursor.png"
  ])
  // sound fx
  .add('laser','sounds/laser.wav')
  .add('explode','sounds/explode.mp3')
  .add('explode2','sounds/explode2.mp3')
  .add('explode3','sounds/explode3.mp3')
  .add('missile','sounds/missile.wav')
  .add('geonosis','sounds/geonosis.wav')
  .add('laser2','sounds/laser2.wav')
  .add('laser3','sounds/laser3.wav')
  .add('laser4','sounds/laser4.wav')
  .add('laser5','sounds/laser5.wav')
  .add('laser6','sounds/laser6.wav')
  .add('online','sounds/online.wav')
  .add('offline','sounds/offline.wav')
  .add('galaxial-booster','sounds/galaxial-booster.wav')
  .add('galaxial-booster2','sounds/galaxial-booster2.wav')
  .add('galaxial-booster3','sounds/galaxial-booster3.wav')
  .add('space-missile','sounds/space-missile.wav')

  // music
  .add('moment-of-time','sounds/music/moment-of-time.mp3')

  // Data
  .add({
    name: "galaxy",
    url: "sprites/map/galaxy.png",
    onComplete: function() {
      animate();
      PIXI.loader.resources['galaxy'].metadata.galaxy = generateGalaxyData();
    }
  })

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
  loaderInfo.innerHTML = "loading: " + resource.url + ", " + parseFloat(loader.progress).toFixed(2) + "%";
  loaderBar.style.width = loader.progress + "%";
  // loaderBar.style.width = "100%";
}