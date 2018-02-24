// import Cell from './Cell.js';




//Create a Pixi Application
const CANVAS_SIZE = 256;
const TILE_SIZE = 32;
let app = new PIXI.Application({ 
    width: CANVAS_SIZE,         // default: 800
    height: CANVAS_SIZE,        // default: 600
    antialias: false,    // default: false
    transparent: false, // default: false
    resolution: 1      // default: 1
});
app.renderer.backgroundColor = 0x061639;
wrapper.appendChild(app.view);
PIXI.loader
  .add([
    "bg.png"
  ])
  .add([
    "ship.png"
  ])
  .add([
    "laser.png"
  ])
  .add([
  	"enemy.png"
  ])
  .on("progress", loadProgressHandler)
  .load(setup);

const UIPlayer = document.createElement('table');
UIPlayer.classList.add('UI_player');
wrapper.appendChild(UIPlayer);

const UIPlayerShotsRow = document.createElement('tr');
UIPlayer.appendChild(UIPlayerShotsRow);
const UIPlayerShotsTitle = document.createElement('th');
UIPlayerShotsTitle.innerHTML = "Shots: ";
UIPlayerShotsRow.appendChild(UIPlayerShotsTitle);
const UIPlayerShots = document.createElement('td');
UIPlayerShotsRow.appendChild(UIPlayerShots);

const UIPlayerHitsRow = document.createElement('tr');
UIPlayer.appendChild(UIPlayerHitsRow);
const UIPlayerHitsTitle = document.createElement('th');
UIPlayerHitsTitle.innerHTML = "Hits: ";
UIPlayerHitsRow.appendChild(UIPlayerHitsTitle);
const UIPlayerHits = document.createElement('td');
UIPlayerHitsRow.appendChild(UIPlayerHits);

const UIPlayerAccuracyRow = document.createElement('tr');
UIPlayer.appendChild(UIPlayerAccuracyRow);
const UIPlayerAccuracyTitle = document.createElement('th');
UIPlayerAccuracyTitle.innerHTML = "Acc: ";
UIPlayerAccuracyRow.appendChild(UIPlayerAccuracyTitle);
const UIPlayerAccuracy = document.createElement('td');
UIPlayerAccuracyRow.appendChild(UIPlayerAccuracy);

const player = {
  shots: {
    count: 0,
    ui: UIPlayerShots,
    update: () => {
      player.shots.count += 1;
      player.shots.ui.innerHTML = player.shots.count;
    }
  },
  hits: {
    count: 0,
    ui: UIPlayerHits,
    update: () => {
      player.hits.count += 1;
      player.hits.ui.innerHTML = player.hits.count;
    }
  },
  accuracy: {
    count: 0,
    ui: UIPlayerAccuracy,
    update: () => {
      player.accuracy.count = parseFloat((player.hits.count / player.shots.count).toFixed(2)) + "%";
      player.accuracy.ui.innerHTML = player.accuracy.count;
    }
  },
};


function loadProgressHandler(loader, resource) {
  console.log("loading: " + resource.url); 
  console.log("progress: " + loader.progress + "%"); 
}
function createGrid() {
  let newGrid = [];
  for (let i = 0; i < CANVAS_SIZE; i+=TILE_SIZE) {
    let row = [];
    // Add one extra vertical layer
    for (let j = 0; j < CANVAS_SIZE + TILE_SIZE; j+=TILE_SIZE) {
      row.push(1);
    }
    newGrid.push(row);
  }
  return newGrid;
}
let grid = createGrid();
let ship;
const enemies = [];

function setup() {
  for (let i = grid.length - 1; i >= 0; i--) {
    for (let j = grid[i].length - 1; j >= 0; j--) {
      if (grid[i][j] == 1) {
        let bg = new PIXI.extras.TilingSprite(PIXI.loader.resources["bg.png"].texture, 32, 32);
        bg.scale.set(1, 1);
        let x = i * 32;
        let y = j * 32;
        bg.position.set(x, y);
        grid[i][j] = bg;
        app.stage.addChild(bg);
      }
    }
  }
  for (let i = 0; i < 5; i++ ) {
     let enemy = new PIXI.Sprite(PIXI.loader.resources["enemy.png"].texture);
    enemy.position.set(30 * i, 30);
    app.stage.addChild(enemy);
    enemies.push(enemy);
  }
  ship = new PIXI.Sprite(PIXI.loader.resources["ship.png"].texture);
  ship.scale.set(1, 1);
  ship.position.set(64, 64);
  ship.vx = 0;
  ship.vy = 0;
  ship.moveDirection = {
    up: false,
    down: false,
    left: false,
    right: false,
  }
  ship.shooting = false;
  ship.fireRate = 10;
  ship.coolDown = 0;
  ship.maxFuel = 100;
  ship.fuel = 100;
  ship.booster = false;
  app.stage.addChild(ship);
  app.ticker.add(delta => gameLoop(delta));

  window.addEventListener('keydown', (e) => {
    // console.log(e.key)
    if (e.key == "w" || e.key == "W") {
      ship.moveDirection.up = true;
    }
    if (e.key == "s" || e.key == "S") {
      ship.moveDirection.down = true;
    }
    if (e.key == "a" || e.key == "A") {
      ship.moveDirection.left = true;
    }
    if (e.key == "d" || e.key == "D") {
      ship.moveDirection.right = true;
    }
    if (e.key == "Shift") {
      ship.booster = true;
    }
    if (e.key == " ") {
      // ship.booster = true;
      ship.shooting = true;
    }
  });
  window.addEventListener('keyup', (e) => {
    if (e.key == "w" || e.key == "W") {
      ship.moveDirection.up = false;
    }
    if (e.key == "s" || e.key == "S") {
      ship.moveDirection.down = false;
    }
    if (e.key == "a" || e.key == "A") {
      ship.moveDirection.left = false;
    }
    if (e.key == "d" || e.key == "D") {
      ship.moveDirection.right = false;
    }
    if (e.key == "Shift") {
      ship.booster = false;
    }
    if (e.key == " ") {
      // ship.booster = true;
      ship.shooting = false;
    }
  });

  // Create initial bullets
  for (let i = 0; i < 10; i++) {
    let bullet = new PIXI.Sprite(PIXI.loader.resources["laser.png"].texture);
    bulletPool.push(bullet);
  }

  wrapper.style.display = "flex";
}
const speed = 2;
const UIFuelContainer = document.createElement('div');
UIFuelContainer.classList.add("UI_fuel_container");
const UIFuelGuage = document.createElement('div');
UIFuelGuage.classList.add("UI_fuel_guage");
UIFuelContainer.appendChild(UIFuelGuage);
wrapper.appendChild(UIFuelContainer);
function gameLoop(delta){
  //Move the cat 1 pixel 
  for (let i = grid.length - 1; i >= 0; i--) {
    for (let j = grid[i].length - 1; j >= 0; j--) {
      grid[i][j].y += 1;
      if (grid[i][j].y >= CANVAS_SIZE) grid[i][j].y = -TILE_SIZE + 1/* For some reason this looks better*/;
    }
  }
  
  let currentSpeed = speed;
  if ((ship.moveDirection.up || ship.moveDirection.down) &&
      (ship.moveDirection.left || ship.moveDirection.right)) {
    currentSpeed = 1.3;
  }
  if (ship.booster && ship.fuel > 0) {
    currentSpeed += 1;
    ship.fuel -= .5;
  } else {
    ship.fuel += ship.fuel < ship.maxFuel ? 0.1 : 0;
  }
  UIFuelGuage.style.height =  (ship.fuel * 100) / ship.maxFuel + "%";
  if (ship.moveDirection.up && ship.y > 0) {
    ship.y -= currentSpeed;
  }
  if (ship.moveDirection.down && ship.y < CANVAS_SIZE - TILE_SIZE) {
    ship.y += currentSpeed;
  }
  if (ship.moveDirection.left && ship.x > 0) {
    ship.x -= currentSpeed;
  }
  if (ship.moveDirection.right && ship.x < CANVAS_SIZE - TILE_SIZE) {
    ship.x += currentSpeed;
  }
  // ship.coolDown += ship.coolDown > 0 ? -1 : ship.coolDown == 0 ? ship.fireRate : -1;
  if (ship.coolDown > 0) {
    ship.coolDown -= 1;
  }
  if (ship.shooting && ship.coolDown == 0) {
    let pos = {x: ship.x + TILE_SIZE / 2 - 4, y: ship.y + TILE_SIZE / 2 - 4};
    shoot(Math.PI/180 * -90, pos);
    ship.coolDown = ship.fireRate;
  }
  UICoolDown.innerHTML = ship.coolDown;
  // ship.x += ship.vx;
  // ship.y += ship.vy;
  bulletLoop:
  for(let b = bullets.length - 1; b >= 0; b--){
    bullets[b].position.x += Math.cos(bullets[b].rotation)*bulletSpeed;
    bullets[b].position.y += Math.sin(bullets[b].rotation)*bulletSpeed;
    for (let x = enemies.length - 1; x >= 0; x--) {
      if (bullets[b].position.y < enemies[x].position.y + 24 &&
          bullets[b].position.y > enemies[x].position.y &&
          bullets[b].position.x > enemies[x].position.x &&
          bullets[b].position.x < enemies[x].position.x + 24 &&
          enemies[x].visible) {
        // console.log('hit', enemies);
        enemies[x].visible = false;
        player.hits.update();
        enemies.slice(enemies.indexOf(x), 1);
        recycleBullet(bullets[b]);
        break bulletLoop;
      }
    }

    if (bullets[b].position.y < 0) {
      recycleBullet(bullets[b]);
    }
  }
}
const bulletSpeed = 3;
const bulletPool = [];
const bullets = [];
function shoot(rotation, startPosition){  
  let bullet = getNewBullet(rotation, startPosition.x, startPosition.y);
  app.stage.addChild(bullet);
  player.shots.update();
  player.accuracy.update();
  // console.log(bullets.length, bulletPool.length);
}

function getNewBullet(rotation, x, y) {
  let bullet;
  if (bulletPool.length > 0) {
    bullet = bulletPool.pop();
  } else {
    bullet = new PIXI.Sprite(PIXI.loader.resources["laser.png"].texture);
  }
  bullet.position.x = x;
  bullet.position.y = y;
  bullet.rotation = rotation;
  bullet.visible = true;
  bullets.push(bullet);
  return bullet;
}
function recycleBullet(bullet) {
  bullet.visible = false;
  bullets.splice(bullets.indexOf(bullet), 1);
  bulletPool.push(bullet);
}

const UICoolDown = document.createElement('div');
UICoolDown.classList.add('UI_cool_down');
// UICoolDown.innerHTML = ship.coolDown;
wrapper.appendChild(UICoolDown);

