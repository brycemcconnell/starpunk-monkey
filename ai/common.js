export function circle(obj, delta, dir = 1) {
	obj.sprite.rotation += 0.05 * dir;
	obj.shadow.rotation += 0.05 * dir;
	obj.sprite.position.x += (Math.cos(obj.sprite.rotation)*obj.speed) * delta;
    obj.sprite.position.y += (Math.sin(obj.sprite.rotation)*obj.speed) * delta;
    obj.shadow.position.x += (Math.cos(obj.shadow.rotation)*obj.speed) * delta;
    obj.shadow.position.y += (Math.sin(obj.shadow.rotation)*obj.speed) * delta;
}

export function forward(obj, delta) {
	obj.sprite.position.x += (Math.cos(obj.sprite.rotation)*obj.speed) * delta;
    obj.sprite.position.y += (Math.sin(obj.sprite.rotation)*obj.speed) * delta;
    obj.shadow.position.x += (Math.cos(obj.shadow.rotation)*obj.speed) * delta;
    obj.shadow.position.y += (Math.sin(obj.shadow.rotation)*obj.speed) * delta;
}

export function vertical(obj, delta, dir = 1) {
	// obj.sprite.position.x += (obj.speed * delta) * dir;
	// console.log(dir, Math.PI/2 ,Math.PI);
	obj.sprite.rotation = dir == -1 ? Math.PI/180 * -90 : Math.PI/180 * 90;
    obj.sprite.position.y += (obj.speed * delta) * dir;
    obj.shadow.position.y += (obj.speed * delta) * dir;
}
export function horizontal(obj, delta, dir = 1) {
	obj.sprite.rotation = dir == -1 ? Math.PI/180 * 180 : Math.PI/180 * 0;
	obj.shadow.rotation = dir == -1 ? Math.PI/180 * 180 : Math.PI/180 * 0;
    obj.sprite.position.x += (obj.speed * delta) * dir;
    obj.shadow.position.x += (obj.speed * delta) * dir;
}

export function smoothTurn(obj, delta, targetRotation, dir = 1, turningSpeed = 0.05) {
	if (obj.sprite.rotation != Math.PI/180 * targetRotation) {
		obj.sprite.rotation += turningSpeed * dir;
		obj.shadow.rotation += turningSpeed * dir;
		forward(obj, delta);
	} else {
		console.log('done');
	}
}

export function staticTurn(obj, delta, turningSpeed = 0.05) {
	obj.sprite.rotation += turningSpeed * dir;
	obj.shadow.rotation += turningSpeed * dir;
}