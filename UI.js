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


export function init() {
	wrapper.appendChild(UIGuageOverlay);
	wrapper.appendChild(Player);
}