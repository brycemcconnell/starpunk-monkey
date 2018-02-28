import Stat from './Stat.js';
import * as UI from './UI.js';
export const enemyCount = new Stat(UI.enemiesCount);
export const enemyBulletCount = new Stat(UI.enemyBulletsCount);
export const allyCount = new Stat(UI.alliesCount);
export const allyBulletCount = new Stat(UI.allyBulletsCount);
export const playerScore = new Stat(UI.PlayerScore);
export const playerKills = new Stat(UI.PlayerKills);
export const playerSpeed = new Stat(UI.PlayerSpeed);