import Stat from './Stat.js';
import ChildStat from './ChildStat.js';
import * as UI from './UI.js';

// Global stats
export const entitiesTotalCount = new Stat(UI.entitiesTotalCount);
export const enemyCount = new ChildStat(UI.enemiesCount, entitiesTotalCount);
export const enemyBulletCount = new ChildStat(UI.enemyBulletsCount, entitiesTotalCount);
export const allyCount = new ChildStat(UI.alliesCount, entitiesTotalCount);
export const allyBulletCount = new ChildStat(UI.allyBulletsCount, entitiesTotalCount);
export const movingObjectCount = new ChildStat(UI.movingObjectCount, entitiesTotalCount);

export const nonEntitiesTotalCount = new Stat(UI.nonEntitiesTotalCount);
// Dynamic stats
export const playerSpeed = new Stat(UI.PlayerSpeed);
export const playerGalaxialAngle = new Stat(UI.PlayerGalaxialAngle);
export const playerGalaxialPosition = new Stat(UI.PlayerGalaxialPosition);
playerGalaxialPosition.update(0, "0");

export const playerScore = new Stat(UI.PlayerScore);
export const playerKills = new Stat(UI.PlayerKills);
export const gameTime = new Stat(UI.GameTime);
export const trueTime = new Stat(UI.TrueTime);

export const gameRelevantStats = [
	playerScore,
	playerKills,
	gameTime,
	trueTime
];