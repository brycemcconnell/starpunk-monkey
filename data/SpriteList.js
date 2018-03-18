export const ShipSprites = {
  "Enemy": {
    sprite: "SHIP_G1-Enemy1",
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
    sprite: "SHIP_G1-Player1",
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
    sprite: "SHIP_G1-Player2",
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
    sprite: "SHIP_G1-Player1Alt",
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
    sprite: "SHIP_G1-BattleCruiser",
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
    sprite: "SHIP_G1-Enemy2",
    maxHealth: 3,
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
    ],
    drops: [
    // I want each enemy to be able to have different drop chance/count/and value per item
      {
        name: "credits",
        count: [1]
      },
      {
        name: "Enemy2 Parts",
        chance: 10,
        count: 1,
      },
      {
        name: "Enemy2 Parts",
        chance: 5,
        count: 2,
      },
      {
        name: "Repair Pack",
        amount: [0, 1],
      }
    ]
  },
  "Enemy3": {
    sprite: "SHIP_G1-Enemy3",
    maxHealth: 4,
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
    sprite: "SHIP_G2-Arwing1",
    maxHealth: 4,
    maxShield: 2,
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
    sprite: "SHIP_G2-Arwing2",
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
  "Bluebird": {
    sprite: "SHIP_G2-Bluebird",
    maxHealth: 4,
    maxShield: 3,
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
        x: -4,
        y: -10,
        type: "standard"
      },
      "main-right": {
        x: -4,
        y: 8,
        type: "standard"
      },
    }
  },
  "Castle": {
    sprite: "SHIP_G1-Castle",
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
  "Tepop": {
    sprite: "SHIP_G3-Tepop",
    maxHealth: 4,
    maxShield: 2,
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
        x: 6,
        y: -7.5,
        type: "standard"
      },
      "main-right": {
        x: 6,
        y: 6.5,
        type: "standard"
      },"main": {
        x: 20,
        y: 0,
        type: "standard"
      },
    }
  },
};