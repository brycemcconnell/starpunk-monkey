import setup from './Setup.js';
import * as Loader from './Loader.js';//Create a Pixi Application
import * as Gs from './Globals.js';//Create a Pixi Application
import {init} from './UI.js';
import {app} from './Model.js';
import {initKeyboard} from './controls.js';
import {ship} from './ship.js';


const wrapper = document.getElementById("wrapper");
wrapper.appendChild(app.view);
init();
Loader.load();

initKeyboard();

window.addEventListener('resize', () => {
  wrapper.style.width = document.querySelector("canvas").clientWidth + "px";
  wrapper.style.height = document.querySelector("canvas").clientHeight + "px";
});

const fireRateSliderContainer = document.createElement('div');
const fireRateSlider = document.createElement('input');
fireRateSlider.type = "range";
fireRateSlider.min = '1';
fireRateSlider.max = '30';
fireRateSlider.value = '20';
fireRateSlider.style.backgroundColor = '#fff';
fireRateSlider.style.padding = '12px';
fireRateSlider.style.borderRadius = '2px';
fireRateSlider.onchange = () => {
  ship.fireRate = fireRateSlider.value;
}

fireRateSliderContainer.appendChild(fireRateSlider);
wrapper.appendChild(fireRateSliderContainer);