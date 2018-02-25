import {allies, enemies} from './Model.js';
import {stats} from './player.js';
import * as fr from './fr.js';
import * as Gs from './Globals.js';
class UIElement {
	constructor(config) {
		this.container;
		this.title;
		this.content;
	}
	update(newContent) {
		this.content = newContent;
	}
}
class UIStatusBar extends UIElement {
	constructor() {
		super();
		this.fill;
	}
}

export const UIGuageOverlay = document.createElement('div');
UIGuageOverlay.classList.add("UI_guage_overlay");

export const FuelContainer = document.createElement('div');
FuelContainer.classList.add("UI_guage_container", "UI_box");
export const FuelGuage = document.createElement('div');
FuelGuage.classList.add("UI_fuel_guage");
FuelContainer.appendChild(FuelGuage);
UIGuageOverlay.appendChild(FuelContainer);

export const CoolDownContainer = document.createElement('div');
CoolDownContainer.classList.add("UI_guage_container", "UI_box");
export const CoolDownGuage = document.createElement('div');
CoolDownGuage.classList.add("UI_cool_down_guage");
CoolDownContainer.appendChild(CoolDownGuage);
UIGuageOverlay.appendChild(CoolDownContainer);

export const Player = document.createElement('table');
Player.classList.add('UI_player', "UI_box");


export const PlayerShotsRow = document.createElement('tr');
Player.appendChild(PlayerShotsRow);
export const PlayerShotsTitle = document.createElement('th');
PlayerShotsTitle.innerHTML = "Shots: ";
PlayerShotsRow.appendChild(PlayerShotsTitle);
export const PlayerShots = document.createElement('td');
PlayerShotsRow.appendChild(PlayerShots);

/*
export const PlayerShots = new UIElement({
	parent: Player,
	title: ["Shots: ", "th"],
	content: ["0", "td"]
});
*/
export const PlayerHitsRow = document.createElement('tr');
Player.appendChild(PlayerHitsRow);
export const PlayerHitsTitle = document.createElement('th');
PlayerHitsTitle.innerHTML = "Hits: ";
PlayerHitsRow.appendChild(PlayerHitsTitle);
export const PlayerHits = document.createElement('td');
PlayerHitsRow.appendChild(PlayerHits);

export const killsRow = document.createElement('tr');
Player.appendChild(killsRow);
export const killsTitle = document.createElement('th');
killsTitle.innerHTML = "Kills: ";
killsRow.appendChild(killsTitle);
export const kills = document.createElement('td');
killsRow.appendChild(kills);

export const PlayerAccuracyRow = document.createElement('tr');
Player.appendChild(PlayerAccuracyRow);
export const PlayerAccuracyTitle = document.createElement('th');
PlayerAccuracyTitle.innerHTML = "Acc: ";
PlayerAccuracyRow.appendChild(PlayerAccuracyTitle);
export const PlayerAccuracy = document.createElement('td');
PlayerAccuracyRow.appendChild(PlayerAccuracy);

// scorre
export const PlayerScoreRow = document.createElement('tr');
Player.appendChild(PlayerScoreRow);
export const PlayerScoreTitle = document.createElement('th');
PlayerScoreTitle.innerHTML = "Score: ";
PlayerScoreRow.appendChild(PlayerScoreTitle);
export const PlayerScore = document.createElement('td');
PlayerScoreRow.appendChild(PlayerScore);

// multiplier
export const PlayerMultiplierRow = document.createElement('tr');
Player.appendChild(PlayerMultiplierRow);
export const PlayerMultiplierTitle = document.createElement('th');
PlayerMultiplierTitle.innerHTML = "Multiplier: ";
PlayerMultiplierRow.appendChild(PlayerMultiplierTitle);
export const PlayerMultiplier = document.createElement('td');
PlayerMultiplierRow.appendChild(PlayerMultiplier);

// combo
export const PlayerComboRow = document.createElement('tr');
Player.appendChild(PlayerComboRow);
export const PlayerComboTitle = document.createElement('th');
PlayerComboTitle.innerHTML = "Combo: ";
PlayerComboRow.appendChild(PlayerComboTitle);
export const PlayerCombo = document.createElement('td');
PlayerComboRow.appendChild(PlayerCombo);

export const FPSRow = document.createElement('tr');
Player.appendChild(FPSRow);
export const FPSTitle = document.createElement('th');
FPSTitle.innerHTML = "FPS: ";
FPSRow.appendChild(FPSTitle);
export const FPS = document.createElement('td');
FPSRow.appendChild(FPS);

export const EnemyCountRow = document.createElement('tr');
Player.appendChild(EnemyCountRow);
export const EnemyCountTitle = document.createElement('th');
EnemyCountTitle.innerHTML = "EnemyCount: ";
EnemyCountRow.appendChild(EnemyCountTitle);
export const EnemyCount = document.createElement('td');
EnemyCountRow.appendChild(EnemyCount);


export const AddEnemy = document.createElement('button');
AddEnemy.innerHTML = "add Enemy";
AddEnemy.onmouseup = () => {
	enemies.getNew(fr.randAngle4(), fr.random(224), fr.random(256));  
	stats.enemyCounter.update();
}

export const ToggleRespawn = document.createElement('button');
ToggleRespawn.innerHTML = "Toggle Respawn";
ToggleRespawn.onmouseup = () => {
	Gs.RESPAWN.toggle();
}

const sidebar = document.createElement('div');

const fireRateSliderContainer = document.createElement('div');
fireRateSliderContainer.innerHTML = 'FireRate';
fireRateSliderContainer.style.borderRadius = '2px';
fireRateSliderContainer.style.backgroundColor = '#fff';
fireRateSliderContainer.style.padding = '12px';
const fireRateSlider = document.createElement('input');
fireRateSlider.type = "range";
fireRateSlider.min = '1';
fireRateSlider.max = '30';
fireRateSlider.value = '20';
fireRateSlider.style.margin = '0';
fireRateSlider.style.borderColor = '#0f0';

fireRateSlider.onchange = () => {
  allies[0].fireRate = fireRateSlider.value;
}
fireRateSliderContainer.appendChild(fireRateSlider);

export function init() {
	wrapper.appendChild(UIGuageOverlay);
	wrapper.appendChild(sidebar)
	sidebar.appendChild(Player);
	sidebar.appendChild(AddEnemy);
	sidebar.appendChild(ToggleRespawn);
	sidebar.appendChild(fireRateSliderContainer);
}