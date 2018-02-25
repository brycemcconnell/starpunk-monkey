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