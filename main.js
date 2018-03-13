import setup from './Setup.js';
import * as Loader from './Loader.js';//Create a Pixi Application
import * as Gs from './Globals.js';//Create a Pixi Application
import {init} from './UI.js';
import {app, allies} from './Model.js';
import {map} from './map.js';

// import {ship} from './ship.js';


const mapWrapper = document.getElementById("mapWrapper");
const mapContainer = document.createElement("div");
mapWrapper.appendChild(mapContainer);
mapContainer.classList.add("UI_box", "UI_map");
mapContainer.appendChild(map);
const wrapper = document.getElementById("wrapper");
wrapper.appendChild(app.view);
init();
Loader.load();


// Resizing in chromium v.64 is bugged 2018-02-28
window.addEventListener('resize', () => {
  wrapper.style.width = app.view.clientWidth + "px";
  wrapper.style.height = app.view.clientHeight + "px";
});

