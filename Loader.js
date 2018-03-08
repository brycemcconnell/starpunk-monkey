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
  .add("PROJECTILE_Test",     "sprites/projectile/test.png")
  .add("PROJECTILE_Laser1",   "sprites/projectile/laser1.png")
  .add("PROJECTILE_Missile1", "sprites/projectile/missile1.png")
  .add("PROJECTILE_Gatling1", "sprites/projectile/gatling1.png")
  .add("PROJECTILE_Gravity1", "sprites/projectile/gravity1.png")
  .add("PROJECTILE_Gravity2", "sprites/projectile/gravity2.png")
  .add("PROJECTILE_Gravity3", "sprites/projectile/gravity3.png")
  .add("PROJECTILE_Gravity4", "sprites/projectile/gravity4.png")

  // gun
  .add("GUN_Laser-Standard",   "sprites/gun/laser-standard.png")
  .add("GUN_Laser-Double",     "sprites/gun/laser-double.png")
  .add("GUN_Missile-Standard", "sprites/gun/missile-standard.png")
  .add("GUN_Gatling-Standard", "sprites/gun/gatling-standard.png")

  // Doodads
  .add("DOODAD_Asteroid-Medium","sprites/doodads/asteroid-m.png")
  .add("DOODAD_Asteroid-Large", "sprites/doodads/asteroid-l.png")
  .add("DOODAD_Asteroid-Small", "sprites/doodads/asteroid-s.png")

   // Explosions
  .add("explode",  "./sprites/explode/explode.json")
  .add("explodeb", "./sprites/explode/explodeb.json")
  .add("explodec", "./sprites/explode/explodec.json")
  .add("exploded", "./sprites/explode/exploded.json")

  // UI graphics
  .add("UI_Cursor-Attack", "sprites/ui/cursor-attack.png")

  // sound fx
  .add('SFX_Laser1',           'sounds/laser.wav')
  .add('SFX_explode',          'sounds/explode.mp3')
  .add('SFX_explode2',         'sounds/explode2.mp3')
  .add('SFX_explode3',         'sounds/explode3.mp3')
  .add('SFX_missile',          'sounds/missile.wav')
  .add('SFX_geonosis',         'sounds/geonosis.wav')
  .add('SFX_laser2',           'sounds/laser2.wav')
  .add('SFX_laser3',           'sounds/laser3.wav')
  .add('SFX_laser4',           'sounds/laser4.wav')
  .add('SFX_laser5',           'sounds/laser5.wav')
  .add('SFX_laser6',           'sounds/laser6.wav')
  .add('SFX_online',           'sounds/online.wav')
  .add('SFX_offline',          'sounds/offline.wav')
  .add('SFX_galaxial-booster', 'sounds/galaxial-booster.wav')
  .add('SFX_galaxial-booster2','sounds/galaxial-booster2.wav')
  .add('SFX_galaxial-booster3','sounds/galaxial-booster3.wav')
  .add('SFX_space-missile',    'sounds/space-missile.wav')

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