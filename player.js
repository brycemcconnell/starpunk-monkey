import { bulletPool, bullets, app } from './Model.js';
import * as UI from './UI.js';
export const bulletSpeed = 3;
export const player = {
  shots: {
    count: 0,
    ui: UI.PlayerShots,
    update: () => {
      player.shots.count += 1;
      player.shots.ui.innerHTML = player.shots.count;
    }
  },
  hits: {
    count: 0,
    ui: UI.PlayerHits,
    update: () => {
      player.hits.count += 1;
      player.hits.ui.innerHTML = player.hits.count;
    }
  },
  accuracy: {
    count: 0,
    ui: UI.PlayerAccuracy,
    update: () => {
      player.accuracy.count = parseFloat(((player.hits.count / player.shots.count) * 100).toFixed(2)) + "%";
      player.accuracy.ui.innerHTML = player.accuracy.count;
    }
  },
  score: {
    count: 0,
    ui: UI.PlayerScore,
    update: (score) => {
      player.score.count += score * player.multiplier;
      player.score.ui.innerHTML = player.score.count;
    }
  },
  multipler: {
	count: 0,
    ui: UI.PlayerMultiplier,
    update: (score) => {
      player.multipler.ui.innerHTML = player.multipler.count;
    }
  },
  combo: {
  	count: 0,
    ui: UI.PlayerCombo,
    update: (score) => {
      player.combo.ui.innerHTML = player.combo.count;
    }
  }
};


export function shoot(rotation, startPosition){  
  let bullet = getNewBullet(rotation, startPosition.x, startPosition.y);
  app.stage.addChild(bullet);
  player.shots.update();
  player.accuracy.update();
  PIXI.sound.play('laser');
  // console.log(bullets.length, bulletPool.length);
}
export function getNewBullet(rotation, x, y) {
  let bullet;
  if (bulletPool.length > 0) {
    bullet = bulletPool.pop();
  } else {
    bullet = new PIXI.Sprite(PIXI.loader.resources["sprites/laser.png"].texture);
  }
  bullet.position.x = x;
  bullet.position.y = y;
  bullet.rotation = rotation;
  bullet.visible = true;
  bullets.push(bullet);
  return bullet;
}
export function recycleBullet(bullet) {
  bullet.visible = false;
  bullets.splice(bullets.indexOf(bullet), 1);
  bulletPool.push(bullet);
}




