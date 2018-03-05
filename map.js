export const map = document.createElement("canvas");
map.width = 200;
map.height = 200;
export const mapCtx = map.getContext('2d');

export const mapPosition = {
	x: 0,
	y: 0,
	update: function(x, y) {
		this.x = x;
		this.y = y;
		this.pixel = mapCtx.getImageData(this.x, this.y, 1, 1);
		console.log(this.pixel.data)
	},
	pixel: undefined
};
mapCtx.webkitImageSmoothingEnabled = false;
mapCtx.mozImageSmoothingEnabled = false;
mapCtx.imageSmoothingEnabled = false;
mapCtx.translate(100,100);
mapCtx.scale(8, 8);
export function animate() {
	mapCtx.clearRect(-100,-100, 200, 200);
	mapCtx.drawImage(galaxy, Math.floor(-100 - mapPosition.x), Math.floor(-100 - mapPosition.y), 200, 200);
	mapCtx.fillStyle = "#acf";
	mapCtx.fillRect(-.2, -.2, 1.4, 1.4);
	mapCtx.fillStyle = "#73a";
	mapCtx.fillRect(0, 0, 1, 1);
	requestAnimationFrame(animate);
}
const galaxy = new Image();
galaxy.src = "sprites/map/galaxy.png";
galaxy.onload = () => {
	animate();
};
