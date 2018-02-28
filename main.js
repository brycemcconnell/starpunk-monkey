import setup from './Setup.js';
import * as Loader from './Loader.js';//Create a Pixi Application
import * as Gs from './Globals.js';//Create a Pixi Application
import {init} from './UI.js';
import {app, allies} from './Model.js';
import {initKeyboard} from './controls.js';
// import {ship} from './ship.js';


const wrapper = document.getElementById("wrapper");
wrapper.appendChild(app.view);
init();
Loader.load();
// PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
initKeyboard();

// Resizing in chromium v.64 is bugged 2018-02-28
window.addEventListener('resize', () => {
  wrapper.style.width = document.querySelector("canvas").clientWidth + "px";
  wrapper.style.height = document.querySelector("canvas").clientHeight + "px";
});

