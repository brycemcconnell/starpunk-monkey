export function getVerticalHeading(obj) {
	return obj.sprite.rotation/Math.PI * 180 % 360 > 0 ? 1 : -1;
}
export function getHorizontalHeading(obj) {
	return obj.sprite.rotation/Math.PI * 180 % 360 > 0 ? -1 : 1;
}