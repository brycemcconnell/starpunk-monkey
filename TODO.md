[ ] Enemy, on creation takes a type and an AI



[✓] 2018.03.07 done: Type dictates firepower, sprite, and health

[ ] AI dictates move route/firing behaviour



[✓] 2018.03.07 done:  Enemy projectiles -> Smart Array // Changed to BulletArray

[✓] 2018.03.07 done:  Player projectiles -> Smart Array (old bullets) // Changed to BulletArray



[✓] 2018.03.07 done:  Handle projectiles in a loop by type? Or Projectile types know their own movement? And then call projectile[i].move()



[~] Projectiles have damage, speed, move pattern // Projectile move pattern not yet implemented, maybe a plasma shot will curve back and forth (sine wave)





[✓] 2018.03.07 done: Implement player damage, player flashes for x seconds on hit, during which player is invulnerable, and loses x HP



[✓] 2018.03.07 done: Enemiks previously implemented health does not have this, they take consecutive hits, flashing tint.red on hit, when their HP reaches 0 they explode, shadow fades out?



~~[ ] Bugs:~~

~~[ ] With the new AI shadows desync over time~~



[ ] AI Extended:

[✓] 2018.03.07 done:  Change enemies to move by their 'vx'/'vy' values on handleMove()

```

on handleMove() {

    check target destination

    rotate towards if not already facing (difference of angle)

    calculate and set vx/vy with trigonometry

    move

}

```



[✓] 2018.03.07 done:  Ship guns are modular, they can be placed on your ship in sockets, which dictates what position they shoot from. Thesse can be programmed to have different shoot patterns/use different amounts of energy. You can also choose what gun type to put in (and what type of ammo?)

[✓] 2018.03.07 done:  Eg. you could put two basic lasers on your ship, then begin the level. Insteaed of one projectile you shoot two at a time.



[ ] Enemy spawning should be slightly dynamic. Although we design the structure of the level and the waves, if a player kills all enemies on the screen, they shouldn't have to wait for the next scripted wave to spawn.



[ ] Think about health bars maybe? Only shown when within a small buffer on the x axis, where there are player bullets?

[ ] Alternatively, slowly add smoke or have damage visible?



[ ] Different sound for player vs playerAI vs enemyAI ships being hit



[ ] Multiplier, time between killing enemies?



[ ] Grazing, when close to a bullet gain points? Damage bonus?



[~] 2018.03.07 update: Not entirely fixed, do this properly, not that shitty ```*.7``` hack or whatever it is. Original: Fix diagonal movement speed to be the true speed.



[~] 2018.03.07 update: Make this consistent, some have userData some don't. Original: Save smaller props into variables instead of referncing directly?

[~] 2018.03.07 update: Perhaps the player should have a separate reference to this? Original: Eg. allies.activePool[0].sprite.rotation -> allyRot



[ ] Different types of weapons,

[✓] 2018.03.07 done: Normal270 - fire straight to top of screen

[✓] 2018.03.07 done: Normal - fire in player direction

[ ] Seeking - Seek closest enemy target, retarget if enemy is destroyed before they hit them, fly into eternity if no enemies available

[ ] Guided - even after shooting they remain on the same x-value as your ship while you move

[✓] 2018.03.07 done: MouseGuided? - Select and then mouse click where to fire

[ ] Orbit - Orbits the player until it comes into contact with an enemy?

[~] 2018.03.07 update: Does this work both directions? Original: Circle - rotates in a direction constantly



[ ] Types of bullet

[✓] 2018.03.07 done: Normal - A single shell

[ ] Beam - a beam that is very long

[~] 2018.03.07 update: AoE collision begining to implement, also needs a unique explosion sprite. Original: Missile - A single shell that explodes with AoE on impact

[ ] TinyBeam? - Can't damage shields, has low damage but high speed, good for seeking



[✓] 2018.03.07 done: Added modifier system. Original: Perhaps modifiers?

[ ] Cluster - On hit, shoots out x of itself in random directions

[ ] Timed Missile - explodes even if it doesn't hit anything

[ ] Mine - Stops at x location and stays until an enemy collides with it or (timer runs out and it explodes anyway)



[ ] Plasma - Medium damage to shields, small to hull, can only be fired from HighTech cannons (animated sprite, tail move back and forth? projectile also moves left to right)

[ ] Phaser - High damage to shields, doesnt damage hull, can only be fired from HighTech cannons

[ ] Ion - Small damage to shields, doesnt damage hull, slows enemy on hit, only fired from HighTech Cannons



[ ] Bullet sizes affect which guns can use them.



[ ] Types of guns

[✓] 2018.03.07 done: Normal - Shoots standard rate

[✓] 2018.03.07 done: Gatling - Shoots much faster but with poor accuracy (add -45~45 degree offset to rotation?)

[✓] 2018.03.07 done: Cannon - Shoots larger ammunition but at a slower rate

[ ] Sniper - Shoots slowly but with a speed bonus to projectiles and perfect accuracy (maybe even damage bonus?)



[ ] Also add shields, a round perimeter around a ship that regenerates energy if not hit within a certain threshold



[ ] Change all setTimeouts and setIntervals to aa in-game based system, because those functions dont listen to game pauses/etc.



[✓] 2018.03.07 done: Add toggle movement mode, battle/travel

[✓] 2018.03.07 done: When in travel mode, free move, scroll background in negative (sin/cos) direction to look like moving,

[ ] create background class with dynamic speed based on ship. Maintain parallax.

[ ] Moving in travel mode costs fuel, battle doesnt.

[✓] 2018.03.07 done: Moving in travel mode changes your global(game) location, battle doesnt

[✓] 2018.03.07 done: Add a global(game) location, as in your position in the galaxy

[~] 2018.03.07 update: Begun implementation but, not very happy with it. Original: add galaxy map, either canvas or webgl based on imagedata maybe in the top left corner? Hovering cursor shows location of pixel and relative data. Keep this data in a json? When a player visits locations add them to the player save state as visited

[ ] If a place is not visited no data is shown, and the location is unknown, maybe have a signal detected kind of thing?

[✓] 2018.03.07 done: Travelling in travel mode moves you at (speed) on your galaxial position

[✓] 2018.03.07 done: Each pixel of the galaxy map represents (x) of galaxial position.

[ ] Note that if screen size was 400, you would want to move a few (backgrounds) before changing galaxial position, maybe 10-20?

[ ] If you click on a map in travel mode, you can select a destination for auto-pilot (or some variant of light speed?), this uses more fuel? Or normal travel sometimes you find loot?

[ ] Locations include planets, asteroid fields, space stations, wormholes?

[ ] Every time you enter a quandrant, load the data for it, also have RnG for events? Pirate ambush?

[ ] Should traders be random events or should they be entities travelling around the galaxy map? 



[ ] Add a party overview menu under the map that shows the current status of your partys ships (HP/etc)

[ ] Fuel is managed player-level and not ship-level

[ ] Eg. have a separate fuel bar to the party menu.



[ ] SERVER STUFF

[ ] Highscores stored in a db, contact server and ask for list of current level?

[ ] Have a 'pilot' career score which adds up all scores, averages etc?

[ ] Maybe use amazon bucket for this? Try researching?



[~] 2018.03.07 update: Began implementing classes, rotating asteroids would be cool, get on this. Original: Add asteroids and other space debris?



[ ] When moving around in galaxial mode, (lazy load) the quadrant data/doodads and then place them in. Move within quadrant coordinates, and when the player leaves the quadrant, ensure the doodads eiterh stay in the previous quadrant coordinates or move off screen (before they go back to the inative doodad pool)



[~] 2018.03.07 update: Implemented ntc for naming based on pixel color. Original: When in a system of a (ntc named) color, have a distant star in the background of the same hue, and text somewhere showing its name, type, (size) etc.



[ ] Have the background fade into different nebula when entering a different zone. Eg, no sun would be darker? Change particle effects and hues



[ ] Local - What you see on the current viewport

[ ] Quadrant - The pseudo region, 1 pixel area on the map, (approx 980pixels squared?)

[ ] Galaxy - Your region on the entire map (200x200, or 40000 quadrants)



[ ] Make a function that takes all bullet sprites and creates a particle container for each within bulletContainers array(Model.js)



[ ] Take the AI logic from within the "Enemy" class and move it into a new AIShip class

[ ] Add asteroids which can be destroyed, and asteroids that cannot? Maybe make them some other type of object

[ ] Asteroids split into 2-4 of the next smallest size when destroyed. Small asteroids just blow up normally, maybe a chance to drop something?

[ ] Gravity gun, two types, in: suck enemies into a hole and then damage them in an explosion (or just leave them there so the player can shoot easily?), out: send a shockwave that pushes enemies away from x/y location or player?

[ ] Improve & optimize ship/gun/bullet/modifiers implementation
```
Create Ship >
Create Guns > Assign gun ammunition
Assign Ship Guns >
In game loop:
On fire > For each gun, shoot guns ammunition

Gun dictates the type of ammunition available to use, modifiers to the bullet
Bullets define their own effects, but are locked to the type of gun through the ammunition limitation
```

[ ] Make enemies generate their guns and shoot if they have guns, currently they are 'shooting' from themselves without a gun

[ ] Add descriptions to ship/gun/bullet/modifiers

[ ] Implement RNG drops from enemies and debris. These could include:
- energy refills
- health refills
- Materials
- Guns
- Ammunition (is this limited? or maybe only some are?)
- Ship parts (collect x amount to be able to build that ship once OR that ship blueprint, which requires materials to build any amount of times once blueprint is unlocked)
- Gun parts, same as above
- Modifiers, or potentially a similar system to above? I like the idea of this being just random drops as is though
- Credits?
- Some sort of 'transmission data', required to call an ally into the battle (or make this accumulate through killing ships instead? don't worry about a drop?)

[ ] Perhaps make phase weaons (projectiles that go through enemies) into a gun modifier? Available on standard and beam weapons?

[ ] Bullets have different types. A seeking bullet will seek out 'energy signiatures', aka enemy ships. Ships can have energy signiature cloaking mechanisms however. Make follow player x axis bullets? Or should phaser bullets be a thing instead of phaser guns? what mods on bullets vs guns

[ ] Maybe just get rid of bullets entirely. Guns instead take damage/speed values and just increase the amount of guns (if needed). They still have an ammo property, but this only refers to the sprite of the ammunition and the animation it plays on hit (aka only graphical data stored per projectile)

[ ] For timing events, make the timed event take a value in ms, then get the curret ticker time, and gradually take away from the timed event, when 0, run the event. Maybe all timed events go into an array, which just simply minuses the time from each event each frame, and checks if the value is less than 0, before doing event.run() or something.

[ ] Guns have cooldown markers at the bottom, kinda like FTL. You can toggle between auto fire or manual fire. ??

[ ] Asteroids drop rock with a very rare chance of dropping precious minerals?

[ ] Difficulty select: At the start of the game you have just done a huge job and got paid immensly, you are heading somewhere when a salesman appears selling you insurance:
Hard: You tell him to slog on,
Hardcore mode, if you die you're dead for good.

Normal: You buy life insurance for 40,000,000 monehs
Whenever you die, you are reborn in a lab as part of your insurance, are you really you? Or just a copy? You lose your ship/inventory etc.

Easy: You buy life insurance and comprehensive ship insurance for 60,000,000 monehs
If you die you are reborn as normal mode, but all your inventory and ships are returned to you by the insurance company.

You started with 80,000,000 monehs?
Depending on your choice, something bad happens and you get screwed over by your old contractor, who steals your remaining money leaving you with nothing.

At some stage during the game, you and your crew are up against the same type of enemy you faced when you made that haul before the game started. It's an almost impossible task but you've done it before. Something goes wrong and (female that you care for) gets killed. Then another (male that is like sidekick) also gets killed. You've come this far you won't let them die in vain and you push harder, but at the () moment, your last ally ditches leaving you to die. The enemy inches within death takes the advantage and destroys your ship, leaving you floating in space, dead.
If you're on hardcore mode, you wake up in the depths of the () spacestation, where some (underground figure) rips out your corpses spine and harvests something from it, and begins growing a clone of you. You are reborn there.
Otherwise your insurance kicks in and you wake up at the facility again, (female love interest?) is there? Somehow intertwine this with the underground group, where both difficulty modes link up again.

After this you gain access to the next tier of 'ships', maybe call them unrestricted? (your sidekick male fried) turns out had insurance, and is alive again, (female) didn't and is gone forever.

[ ] The more you use an item the more valuable it becomes? Even if you get a strong weapon late game, your current weapon has a multiplier kind of thing so it improves with use, but if you unequip it, it takes a penalty?

Pros:
Using items longer is profitable

Cons:
New weapons obsolete?

Perhaps a proficiency stat? Proficiency is unique to each weapon instance, and gives a bonus that increases while equiped, while not equiped it deteriorates.
Bonuses include: Accuracy, damage, durability. You can sell these WITH the stats, thus increasing the value of items used a lot.
Maybe the items themselves have a level up system and you can choose what to put the points into.

[ ] Change shield recharge rate from 1 to like 0.05

[ ] Some drop ideas:
- HP Restore
- Shield Restore
- Fuel Restore
- Travel fuel restore
- Attack damage bonus
- Speed bonus
- Super shield? (An extra shield above your own that doesn't recharge)
- Transmission data (accumulate to call a friend, or make this accumulate through kill count?)

[ ] Scrap metal looks too similar to small asteroids

[ ] Resources:
Player based:
- Fame
- Credits
- Morality (good/evil?)
- xp/levels?

Inventory
- Fuel
- Ships
- Parts (turrets, shields)
- Modifications (chips to place into parts)
- crafting materials
- health pack stuff/etc.

[ ] Fix all sprites to be of even dimensions, odd dimensions create rendering issues (Was mostly evident with the beam, it would have strange offsets)