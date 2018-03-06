Enemy, on creation takes a type and an AI

Type dictates firepower, sprite, and health
AI dictates move route/firing behaviour

Enemy projectiles -> Smart Array
Player projectiles -> Smart Array (old bullets) 

Handle projectiles in a loop by type? Or Projectile types know their own movement? And then call projectile[i].move()

Projectiles have damage, speed, move pattern


Implement player damage, player flashes for x seconds on hit, during which player is invulnerable, and loses 1 HP

Enemikes previously implemented health does not have this, they take consecutive hits, flashing tint.red on hit, when their HP reaches 0 they explode, shadow fades out?

Bugs:
With the new AI shadows desync over time

AI Extended:
Change enemies to move by their 'vx'/'vy' values on handleMove()
```
on handleMove() {
    check target destination
    rotate towards if not already facing (difference of angle)
    calculate and set vx/vy with trigonometry
    move
}
```

Ship guns are modular, they can be placed on your ship in sockets, which dictates what position they shoot from. Thesse can be programmed to have different shoot patterns/use different amounts of energy. You can also choose what gun type to put in (and what type of ammo?)
Eg. you could put two basic lasers on your ship, then begin the level. Insteaed of one projectile you shoot two at a time.

Enemy spawning should be slightly dynamic. Although we design the structure of the level and the waves, if a player kills all enemies on the screen, they shouldn't have to wait for the next scripted wave to spawn.

Think about health bars maybe? Only shown when within a small buffer on the x axis, where there are player bullets?
Alternatively, slowly add smoke or have damage visible?

Different sound for player vs playerAI vs enemyAI ships being hit

Multiplier, time between killing enemies?

Grazing, when close to a bullet gain points? Damage bonus?

Fix diagonal movement speed to be the true speed.

Save smaller props into variables instead of referncing directly?
Eg. allies.activePool[0].sprite.rotation -> allyRot

Different types of weapons,
Normal - fire straight
Seeking - Seek closest enemy target, retarget if enemy is destroyed before they hit them, fly into eternity if no enemies available
Guided - even after shooting they remain on the same x-value as your ship while you move
MouseGuided? - Select and then mouse click where to fire
Orbit - Orbits the player until it comes into contact with an enemy?

Types of bullet
Normal - A single shell
Beam - a beam that is very long
Missile - A single shell that explodes with AoE on impact
TinyBeam? - Can't damage shields, has low damage but high speed, good for seeking

Perhaps modifiers?
Cluster - On hit, shoots out x of itself in random directions
Timed Missile - explodes even if it doesn't hit anything
Mine - Stops at x location and stays until an enemy collides with it or (timer runs out and it explodes anyway)

Plasma - Medium damage to shields, small to hull, can only be fired from HighTech cannons (animated sprite, tail move back and forth? projectile also moves left to right)
Phaser - High damage to shields, doesnt damage hull, can only be fired from HighTech cannons
Ion - Small damage to shields, doesnt damage hull, slows enemy on hit, only fired from HighTech Cannons

Bullet sizes affect which guns can use them.

Types of guns
Normal - Shoots standard rate
Gatling - Shoots much faster but with poor accuracy (add -45~45 degree offset to rotation?)
Cannon - Shoots larger ammunition but at a slower rate
Sniper - Shoots slowly but with a speed bonus to projectiles and perfect accuracy (maybe even damage bonus?)

Also add shields, a round perimeter around a ship that regenerates energy if not hit within a certain threshold

Change all setTimeouts and setIntervals to aa in-game based system, because those functions dont listen to game pauses/etc.

Add toggle movement mode, battle/travel
When in travel mode, free move, scroll background in negative (sin/cos) direction to look like moving,
create background class with dynamic speed based on ship. Maintain parallax.
Moving in travel mode costs fuel, battle doesnt.
Moving in travel mode changes your global(game) location, battle doesnt
Add a global(game) location, as in your position in the galaxy
add galaxy map, either canvas or webgl based on imagedata maybe in the top left corner? Hovering cursor shows location of pixel and relative data. Keep this data in a json? When a player visits locations add them to the player save state as visited
If a place is not visited no data is shown, and the location is unknown, maybe have a signal detected kind of thing?
Travelling in travel mode moves you at (speed) on your galaxial position
Each pixel of the galaxy map represents (x) of galaxial position.
Note that if screen size was 400, you would want to move a few (backgrounds) before changing galaxial position, maybe 10-20?
If you click on a map in travel mode, you can select a destination for auto-pilot (or some variant of light speed?), this uses more fuel? Or normal travel sometimes you find loot?
Locations include planets, asteroid fields, space stations, wormholes?
Every time you enter a quandrant, load the data for it, also have RnG for events? Pirate ambush?
Should traders be random events or should they be entities travelling around the galaxy map? 

Add a party overview menu under the map that shows the current status of your partys ships (HP/etc)
Fuel is managed player-level and not ship-level
Eg. have a separate fuel bar to the party menu.

SERVER STUFF
Highscores stored in a db, contact server and ask for list of current level?
Have a 'pilot' career score which adds up all scores, averages etc?

Add asteroids and other space debris?

When moving around in galaxial mode, (lazy load) the quadrant data/doodads and then place them in. Move within quadrant coordinates, and when the player leaves the quadrant, ensure the doodads eiterh stay in the previous quadrant coordinates or move off screen (before they go back to the inative doodad pool)

When in a system of a (ntc named) color, have a distant star in the background of the same hue, and text somewhere showing its name, type, (size) etc.

Have the background fade into different nebula when entering a different zone. Eg, no sun would be darker? Change particle effects and hues

Local - What you see on the current viewport
Quadrant - The pseudo region, 1 pixel area on the map, (approx 980pixels squared?)
Galaxy - Your region on the entire map (200x200, or 40000 quadrants)

Make a function that takes all bullet sprites and creates a particle container for each within bulletContainers array(Model.js)