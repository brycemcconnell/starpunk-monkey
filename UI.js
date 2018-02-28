import {allies, enemies} from './Model.js';
// import {statsOld} from './player.js';
import * as fr from './lib/fr.js';
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

export const EnemyRotationRow = document.createElement('tr');
Player.appendChild(EnemyRotationRow);
export const EnemyRotationTitle = document.createElement('th');
EnemyRotationTitle.innerHTML = "EnemyRotation: ";
EnemyRotationRow.appendChild(EnemyRotationTitle);
export const EnemyRotation = document.createElement('td');
EnemyRotationRow.appendChild(EnemyRotation);

export const MouseLocationRow = document.createElement('tr');
Player.appendChild(MouseLocationRow);
export const MouseLocationTitle = document.createElement('th');
MouseLocationTitle.innerHTML = "MouseLocation: ";
MouseLocationRow.appendChild(MouseLocationTitle);
export const MouseLocation = document.createElement('td');
MouseLocationRow.appendChild(MouseLocation);


export const AddEnemy = document.createElement('button');
AddEnemy.innerHTML = "add Enemy";
AddEnemy.onmouseup = () => {
	enemies.getNew(fr.randAngle4(), fr.random(224), fr.random(256), "Enemy2");  
	// update stat
}

export const ToggleRespawn = document.createElement('button');
ToggleRespawn.innerHTML = "Toggle Respawn";
ToggleRespawn.onmouseup = () => {
	Gs.RESPAWN.toggle();
}
export const ToggleHitboxes = document.createElement('button');
ToggleHitboxes.innerHTML = "Toggle Hitboxes";
ToggleHitboxes.onmouseup = () => {
	Gs.SHOW_HITBOXES.toggle();
}

const sidebar = document.createElement('div');
sidebar.classList.add("UI_sidebar");

const fireRateSliderContainer = document.createElement('div');
fireRateSliderContainer.classList.add("UI_box");
const fireRateSliderTitle = document.createElement('div');
fireRateSliderTitle.innerHTML = 'FireRate';
fireRateSliderTitle.classList.add("UI_sidebar-title");
fireRateSliderContainer.style.borderRadius = '2px';
// fireRateSliderContainer.style.backgroundColor = '#fff';
const fireRateMin = document.createElement("span");
fireRateMin.innerHTML = Gs.FIRERATE_MIN;
const fireRateMax = document.createElement("span");
fireRateMax.innerHTML = Gs.FIRERATE_MAX;
const fireRateSliderView = document.createElement("div");
fireRateSliderView.classList.add("UI_sidebar_fireRate-view");

const fireRateSlider = document.createElement('input');
fireRateSlider.type = "range";
fireRateSlider.min = Gs.FIRERATE_MIN;
fireRateSlider.max = Gs.FIRERATE_MAX;
fireRateSlider.value = '20';
fireRateSlider.style.margin = '0';
fireRateSlider.style.borderColor = '#0f0';
fireRateSliderView.appendChild(fireRateMin);
fireRateSliderView.appendChild(fireRateSlider);
fireRateSliderView.appendChild(fireRateMax);

fireRateSlider.onchange = () => {
  allies.activePool.forEach(ship => {
  	ship.fireRate = fireRateSlider.value;
  });
}
fireRateSliderContainer.appendChild(fireRateSliderTitle);
fireRateSliderContainer.appendChild(fireRateSliderView);

export const playerShipView = document.createElement("div");
playerShipView.classList.add("UI_box");
playerShipView.style.color = "#fff";
playerShipView.style.fontSize = "11px";
playerShipView.style.fontFamily = "monospace";
export const playerShipDebugTitle = document.createElement("div");
playerShipDebugTitle.innerHTML = "Player Ship";
playerShipDebugTitle.classList.add("UI_sidebar-title");
export const playerShipDebugContainer = document.createElement("div");
playerShipDebugContainer.style.display = "flex";
playerShipDebugContainer.style.width = "300px";
playerShipDebugContainer.style.position = "relative";
playerShipView.appendChild(playerShipDebugTitle);
playerShipView.appendChild(playerShipDebugContainer);
export const playerShipDebugView = document.createElement("div");
playerShipDebugView.classList.add('UI_player-ship-view')

export const playerShipDebug = document.createElement("div");
playerShipDebug.style.position = "absolute";
playerShipDebug.style.top = "50%";
playerShipDebug.style.left = "50%";
playerShipDebug.style.transform = `translate(-50%, -50%) rotate(${Gs.DEFAULT_ROTATION}deg)`;
playerShipDebug.style.width = "40px";
playerShipDebug.style.height = "40px";
playerShipDebug.style.border = "1px solid #fff";
playerShipDebugView.appendChild(playerShipDebug);
export const playerShipDebugRotation = document.createElement("div");
playerShipDebugRotation.classList.add("UI_player-ship-debug_rotation");
playerShipDebug.appendChild(playerShipDebugRotation);
export const playerShipDebugMarkers = [];
export const playerShipDebugOverview = [];
const playerShipOverviewAA = document.createElement("td");
const playerShipOverviewAB = document.createElement("td");
const playerShipOverviewBA = document.createElement("td");
const playerShipOverviewBB = document.createElement("td");
const playerShipOverviewCP = document.createElement("td");
const playerShipOverviewRO = document.createElement("td");
playerShipDebugOverview.push(
	playerShipOverviewAA,
	playerShipOverviewAB,
	playerShipOverviewBA,
	playerShipOverviewBB,
	playerShipOverviewCP,
	playerShipOverviewRO
);
// Fix table inside div rendering issue
export const playerShipDebugOverviewTableHolder = document.createElement("div");
export const playerShipDebugOverviewTable = document.createElement("table");
playerShipDebugOverviewTable.style.flex = "1";
playerShipDebugOverviewTableHolder.appendChild(playerShipDebugOverviewTable);
playerShipDebugOverview.forEach((item,index) => {
	const tableRow = document.createElement("tr");
	const heading = document.createElement("th");
	heading.innerHTML = index == 0 ? "AA":
	                    index == 1 ? "AB":
	                    index == 2 ? "BA":
	                    index == 3 ? "BB":
	                    index == 4 ? "CP":
	                                 "RO";
	tableRow.appendChild(heading);
	tableRow.appendChild(item);
	playerShipDebugOverviewTable.appendChild(tableRow);
});

const playerShipDebugAA = document.createElement("p");
playerShipDebugAA.innerHTML = "AA";
playerShipDebugAA.style.top = "0";
playerShipDebugAA.style.left = "0";
const playerShipDebugAB = document.createElement("p");
playerShipDebugAB.innerHTML = "AB";
playerShipDebugAB.style.top = "0";
playerShipDebugAB.style.right = "0";
const playerShipDebugBA = document.createElement("p");
playerShipDebugBA.innerHTML = "BA";
playerShipDebugBA.style.bottom = "0";
playerShipDebugBA.style.left = "0";
const playerShipDebugBB = document.createElement("p");
playerShipDebugBB.innerHTML = "BB";
playerShipDebugBB.style.bottom = "0";
playerShipDebugBB.style.right = "0";
const playerShipDebugCP = document.createElement("p");
playerShipDebugCP.innerHTML = "CP";
playerShipDebugCP.style.top = "35%";
playerShipDebugCP.style.right = "30%";

playerShipDebugMarkers.push(
	playerShipDebugAA,
	playerShipDebugAB,
	playerShipDebugBA,
	playerShipDebugBB,
	playerShipDebugCP
);
playerShipDebugMarkers.forEach(item => {
	item.style.position = "absolute";
	item.style.fontSize = "10px";
	item.style.transform = `rotate(-${Gs.DEFAULT_ROTATION}deg)`;
	playerShipDebug.appendChild(item);
});

playerShipDebugContainer.appendChild(playerShipDebugView);
playerShipDebugContainer.appendChild(playerShipDebugOverviewTableHolder);

const objectCountsContainer = document.createElement("div");
const objectCountsTitle = document.createElement("div");
const objectCountsTableContainer = document.createElement("div");
const objectCountsTable = document.createElement("table");
objectCountsTitle.innerHTML = "Object counter";
objectCountsContainer.classList.add("UI_box");
objectCountsTitle.classList.add('UI_sidebar-title');

objectCountsContainer.appendChild(objectCountsTitle);
objectCountsContainer.appendChild(objectCountsTableContainer);

objectCountsTableContainer.appendChild(objectCountsTable);

const enemiesTitle = document.createElement("th");
const alliesTitle = document.createElement("th");
const enemyBulletsTitle = document.createElement("th");
const allyBulletsTitle = document.createElement("th");
enemiesTitle.innerHTML = "Enemy count";
alliesTitle.innerHTML = "Ally Count";
enemyBulletsTitle.innerHTML = "Enemy Bullet Count";
allyBulletsTitle.innerHTML = "Ally Bullet Count";
const objectCountsTitleList = [
	enemiesTitle,
	alliesTitle,
	enemyBulletsTitle,
	allyBulletsTitle
];

export const enemiesCount = document.createElement("td");
export const alliesCount = document.createElement("td");
export const enemyBulletsCount = document.createElement("td");
export const allyBulletsCount = document.createElement("td");
const objectCountsCountList = [
	enemiesCount,
	alliesCount,
	enemyBulletsCount,
	allyBulletsCount
];

objectCountsTitleList.forEach((item, index) => {
	let row = document.createElement("tr");
	row.appendChild(item);
	row.appendChild(objectCountsCountList[index]);
	objectCountsTable.appendChild(row);
})

export function init() {
	wrapper.appendChild(UIGuageOverlay);
	pageWrapper.appendChild(sidebar)
	sidebar.appendChild(Player);
	sidebar.appendChild(AddEnemy);
	sidebar.appendChild(ToggleRespawn);
	sidebar.appendChild(ToggleHitboxes);
	sidebar.appendChild(fireRateSliderContainer);
	sidebar.appendChild(playerShipView);
	sidebar.appendChild(objectCountsContainer);
}

const inactiveItems = [
	PlayerScoreRow,
	PlayerMultiplierRow,
	PlayerComboRow,
	EnemyRotationRow,
	EnemyCountRow
];
inactiveItems.forEach(item => {
	item.classList.add("UI_inactive");
});