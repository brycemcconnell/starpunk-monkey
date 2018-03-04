export const ShipSprites = {
  "Enemy": {
    sprite: "sprites/ship/enemy.png",
    hitBoxes: [
      {
        x: 0,
        y: 0,
        w: 24,
        h: 24,
      }
    ]
  },
  "Player": {
    sprite: "sprites/ship/ship.png",
    hitBoxes: [
      {
        x: 0,
        y: 0,
        w: 32,
        h: 32,
      }
    ]
  },
  "Player2": {
    sprite: "sprites/ship/ship2.png",
    maxHealth: 3,
    speed: 2.5,
    hitBoxes: [
      {
        x: 0,
        y: 0,
        w: 12,
        h: 26,
      },
      {
        x: 12,
        y: 7,
        w: 14,
        h: 13,
      }
    ],
    gunSlots: {
      "main": {
        x: 10,
        y: 0,
        type: "standard"
      }
    }
  },
  "PlayerAlt": {
    sprite: "sprites/ship/shipAlt.png",
    hitBoxes: [
      {
        x: 0,
        y: 0,
        w: 32,
        h: 32,
      }
    ]
  },
  "BattleCruiser": {
    sprite: "sprites/ship/battleCruiser.png",
    maxHealth: 6,
    speed: 2,
    hitBoxes: [
      {
        x: 0,
        y: 0,
        w: 32,
        h: 32,
      }
    ]
  },
  "Enemy2": {
    sprite: "sprites/ship/enemy2.png",
    maxHealth: 2,
    score: 100,
    speed: 1.5,
    hitBoxes: [
      {
        x: 0,
        y: 0,
        w: 16,
        h: 24,
      },
      {
        x: 16,
        y: 8,
        w: 8,
        h: 8
      }
    ]
  },
  "Arwing": {
    sprite: "sprites/ship/arwing.png",
    maxHealth: 4,
    score: 100,
    speed: 2,
    hitBoxes: [
      {
        x: 6,
        y: -2,
        w: 10,
        h: 41,
      },
      {
        x: 16,
        y: 8,
        w: 8,
        h: 20
      },
      {
        x: 24,
        y: 14,
        w: 10,
        h: 8
      }
    ],
    gunSlots: {
      "main-left": {
        x: -2,
        y: -12,
        type: "standard"
      },
      "main-right": {
        x: -2,
        y: 10,
        type: "standard"
      },
    }
  },
  "Arwing2": {
    sprite: "sprites/ship/arwing2.png",
    maxHealth: 4,
    score: 100,
    speed: 2.5,
    hitBoxes: [
      {
        x: 8,
        y: -2,
        w: 8,
        h: 41,
      },
      {
        x: 16,
        y: 8,
        w: 8,
        h: 20
      },
      {
        x: 24,
        y: 16,
        w: 10,
        h: 4
      }
    ],
    gunSlots: {
      "main-left": {
        x: -2,
        y: -12,
        type: "standard"
      },
      "main-right": {
        x: -2,
        y: 10,
        type: "standard"
      },
    }
  },
  "Castle": {
    sprite: "sprites/ship/castle.png",
    maxHealth: 4,
    score: 100,
    speed: 2.5,
    hitBoxes: [
      {
        x: 8,
        y: -2,
        w: 8,
        h: 41,
      },
      {
        x: 16,
        y: 8,
        w: 8,
        h: 20
      },
      {
        x: 24,
        y: 16,
        w: 10,
        h: 4
      }
    ],
    gunSlots: {
      "main-left": {
        x: 8,
        y: -15,
        type: "standard"
      },
      "main-right": {
        x: 8,
        y: 14,
        type: "standard"
      },
      "secondary-left": {
        x: 6,
        y: -29,
        type: "standard"
      },
      "secondary-right": {
        x: 6,
        y: 28,
        type: "standard"
      },
    }
  },
};