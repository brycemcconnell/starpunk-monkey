import {allies, allyBullets, enemies, enemyBullets} from './Model.js';
import * as Gs from './Globals.js';
import {gameRelevantStats} from "./stats.js";
export function resetGame() {
  console.log("Resetting game...");
  allies.getNew(
    270,
    Gs.CANVAS_SIZEX / 2,
    Gs.CANVAS_SIZEY - 64,
    "Player2",
    "ally"
  );
  if (enemies.activePool.length > 0) {
    for (let i = enemies.activePool.length - 1; i >=0; i--) {
      enemies.activePool[i].handleDeath(false);
      console.log("Enemies removed");
    }
    for (let i = enemyBullets.activePool.length - 1; i >=0; i--) {
      enemyBullets.recycle(enemyBullets.activePool[i]);
      console.log("EnemyBullets removed");
    }
    for (let i = allyBullets.activePool.length - 1; i >=0; i--) {
      allyBullets.recycle(allyBullets.activePool[i]);
      console.log("AllyBullets removed");
    }
    gameRelevantStats.forEach(stat => {
      stat.update(0);
      console.log("resetting game stats");
    });
  }
}