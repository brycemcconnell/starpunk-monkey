import {allies, enemies} from './Model.js';
import Wave from './Wave.js';
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

export const LeftSideBar = document.createElement('div');
export const LeftSideBarTable = document.createElement('table');
LeftSideBar.appendChild(LeftSideBarTable);
LeftSideBar.classList.add("UI_box", "UI_left_table");
mapWrapper.appendChild(LeftSideBar);

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

export const PlayerKillsRow = document.createElement('tr');
Player.appendChild(PlayerKillsRow);
export const PlayerKillsTitle = document.createElement('th');
PlayerKillsTitle.innerHTML = "Kills: ";
PlayerKillsRow.appendChild(PlayerKillsTitle);
export const PlayerKills = document.createElement('td');
PlayerKillsRow.appendChild(PlayerKills);

export const PlayerAccuracyRow = document.createElement('tr');
Player.appendChild(PlayerAccuracyRow);
export const PlayerAccuracyTitle = document.createElement('th');
PlayerAccuracyTitle.innerHTML = "Acc: ";
PlayerAccuracyRow.appendChild(PlayerAccuracyTitle);
export const PlayerAccuracy = document.createElement('td');
PlayerAccuracyRow.appendChild(PlayerAccuracy);

export const GameTimeRow = document.createElement('tr');
Player.appendChild(GameTimeRow);
export const GameTimeTitle = document.createElement('th');
GameTimeTitle.innerHTML = "Game time: ";
GameTimeRow.appendChild(GameTimeTitle);
export const GameTime = document.createElement('td');
GameTimeRow.appendChild(GameTime);

export const TrueTimeRow = document.createElement('tr');
Player.appendChild(TrueTimeRow);
export const TrueTimeTitle = document.createElement('th');
TrueTimeTitle.innerHTML = "True time: ";
TrueTimeRow.appendChild(TrueTimeTitle);
export const TrueTime = document.createElement('td');
TrueTimeRow.appendChild(TrueTime);


/*
Score
*/
export const PlayerScoreRow = document.createElement('tr');
Player.appendChild(PlayerScoreRow);
export const PlayerScoreTitle = document.createElement('th');
PlayerScoreTitle.innerHTML = "Score: ";
PlayerScoreRow.appendChild(PlayerScoreTitle);
export const PlayerScore = document.createElement('td');
PlayerScoreRow.appendChild(PlayerScore);
PlayerScore.innerHTML = 0;

/*
Multiplier
Add to multiplier through:
	Special drops
	Maintaining a high combo?
	// High accuracy?

Subtract from multiplier through:
	Taking damage (small)
	Losing a ship (big minus)
	// Low accuracy?
*/
export const PlayerMultiplierRow = document.createElement('tr');
Player.appendChild(PlayerMultiplierRow);
export const PlayerMultiplierTitle = document.createElement('th');
PlayerMultiplierTitle.innerHTML = "Multiplier: ";
PlayerMultiplierRow.appendChild(PlayerMultiplierTitle);
export const PlayerMultiplier = document.createElement('td');
PlayerMultiplierRow.appendChild(PlayerMultiplier);

/*
Combo system
An additive bonus based on enemy kills since last taking damage
A player ship being hit resets this.

eg. kill enemy ship
enemy ship score value (eg. 100) + combo (eg. 20) = 120 points
*/
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

export const PlayerSpeedRow = document.createElement('tr');
Player.appendChild(PlayerSpeedRow);
export const PlayerSpeedTitle = document.createElement('th');
PlayerSpeedTitle.innerHTML = "Current Speed: ";
PlayerSpeedRow.appendChild(PlayerSpeedTitle);
export const PlayerSpeed = document.createElement('td');
PlayerSpeedRow.appendChild(PlayerSpeed);


/*
@LEFTSIDEBAR START
*/
export const PlayerGalaxialPositionRow = document.createElement('tr');
LeftSideBarTable.appendChild(PlayerGalaxialPositionRow);
export const PlayerGalaxialPositionTitle = document.createElement('th');
PlayerGalaxialPositionTitle.innerHTML = "Current Galaxial Position: ";
PlayerGalaxialPositionRow.appendChild(PlayerGalaxialPositionTitle);
export const PlayerGalaxialPosition = document.createElement('td');
PlayerGalaxialPositionRow.appendChild(PlayerGalaxialPosition);
export const MapZoomIn = document.createElement('button');
MapZoomIn.innerHTML = "+";
MapZoomIn.onmouseup = () => {
	Gs.MAP_ZOOM.set(1);
	Gs.MAP_ZOOM.updateText(MapCurrentZoom);
}
export const MapZoomOut = document.createElement('button');
MapZoomOut.innerHTML = "-";
MapZoomOut.onmouseup = () => {
	Gs.MAP_ZOOM.set(-1);
	Gs.MAP_ZOOM.updateText(MapCurrentZoom);
}
export const MapCurrentZoom = document.createElement("div");
MapCurrentZoom.innerHTML = "x1";
export const MapControls = document.createElement("div");
MapControls.classList.add("UI_map_controls")
MapControls.appendChild(MapZoomIn);
MapControls.appendChild(MapCurrentZoom);
MapControls.appendChild(MapZoomOut);
LeftSideBar.appendChild(MapControls);

export const PlayerGalaxialAngleRow = document.createElement('tr');
Player.appendChild(PlayerGalaxialAngleRow);
export const PlayerGalaxialAngleTitle = document.createElement('th');
PlayerGalaxialAngleTitle.innerHTML = "Current Galaxial Angle: ";
PlayerGalaxialAngleRow.appendChild(PlayerGalaxialAngleTitle);
export const PlayerGalaxialAngle = document.createElement('td');
PlayerGalaxialAngleRow.appendChild(PlayerGalaxialAngle);
/*
@LEFTSIDEBAR END
*/


export const AddEnemy = document.createElement('button');
AddEnemy.innerHTML = "add Enemy";
AddEnemy.onmouseup = () => {
	enemies.getNew(fr.randAngle4(), fr.random(224), fr.random(256), "Enemy2", "enemy");  
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
export const ToggleSizeboxes = document.createElement('button');
ToggleSizeboxes.innerHTML = "Toggle Sizeboxes";
ToggleSizeboxes.onmouseup = () => {
	Gs.SHOW_SIZEBOXES.toggle();
}
export const ToggleRender = document.createElement('button');
ToggleRender.innerHTML = "Toggle Render";
ToggleRender.onmouseup = () => {
	Gs.RENDER_STATE.toggle();
}
export const ToggleSound = document.createElement('button');
ToggleSound.innerHTML = "Toggle Sound";
ToggleSound.onmouseup = () => {
	PIXI.sound.volumeAll = PIXI.sound.volumeAll ? 0 : 1;
}
export const TogglePlayerHitDetection = document.createElement('button');
TogglePlayerHitDetection.innerHTML = "Toggle Player Hit Detection";
TogglePlayerHitDetection.onmouseup = () => {
	Gs.PLAYER_HIT_DETECTION.toggle();
}
export const ToggleGalaxyModeDrift = document.createElement('button');
ToggleGalaxyModeDrift.innerHTML = "Toggle Galaxy Mode Drift";
ToggleGalaxyModeDrift.onmouseup = () => {
	Gs.GALAXY_MODE_DRIFT.toggle();
}
export const AddWave = document.createElement('button');
AddWave.innerHTML = "Add Wave";
AddWave.onmouseup = () => {
	let newTestWave = new Wave({
    team:  enemies,
    count: 5,
    timing: 500,
    spawn: {
      r: 90,
      x: 128,
      y: -64
    }
  });
}

const sidebar = document.createElement('div');
sidebar.classList.add("UI_sidebar");

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
const totalEntitiesTitle = document.createElement("th");
enemiesTitle.innerHTML = "Enemy count";
alliesTitle.innerHTML = "Ally Count";
enemyBulletsTitle.innerHTML = "Enemy Bullet Count";
allyBulletsTitle.innerHTML = "Ally Bullet Count";
totalEntitiesTitle.innerHTML = "Total Entities";
const objectCountsTitleList = [
	enemiesTitle,
	alliesTitle,
	enemyBulletsTitle,
	allyBulletsTitle,
	totalEntitiesTitle
];

export const enemiesCount = document.createElement("td");
export const alliesCount = document.createElement("td");
export const enemyBulletsCount = document.createElement("td");
export const allyBulletsCount = document.createElement("td");
export const entitiesTotalCount = document.createElement("td");
const objectCountsCountList = [
	enemiesCount,
	alliesCount,
	enemyBulletsCount,
	allyBulletsCount,
	entitiesTotalCount
];
objectCountsCountList.forEach(item => item.innerHTML = 0);

objectCountsTitleList.forEach((item, index) => {
	let row = document.createElement("tr");
	row.appendChild(item);
	row.appendChild(objectCountsCountList[index]);
	objectCountsTable.appendChild(row);
})

const wrapperOverlay = document.createElement("div");
wrapperOverlay.classList.add("canvas-inset-shadow");
export function init() {
	// This removes mousemove detection
	// wrapper.appendChild(wrapperOverlay);
	// wrapper.appendChild(UIGuageOverlay);
	pageWrapper.appendChild(sidebar)
	sidebar.appendChild(Player);
	sidebar.appendChild(AddEnemy);
	sidebar.appendChild(ToggleRespawn);
	sidebar.appendChild(ToggleHitboxes);
	sidebar.appendChild(ToggleSizeboxes);
	sidebar.appendChild(ToggleSound);
	sidebar.appendChild(ToggleRender);
	sidebar.appendChild(TogglePlayerHitDetection);
	sidebar.appendChild(ToggleGalaxyModeDrift);
	sidebar.appendChild(AddWave);
	sidebar.appendChild(playerShipView);
	sidebar.appendChild(objectCountsContainer);
}

const inactiveItems = [
	PlayerMultiplierRow,
	PlayerComboRow,
	EnemyRotationRow,
	EnemyCountRow
];
inactiveItems.forEach(item => {
	item.classList.add("UI_inactive");
});