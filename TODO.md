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