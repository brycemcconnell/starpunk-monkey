import * as Gs from './Globals.js';
export const map = document.createElement("canvas");
map.width = 200;
map.height = 200;
map.style.mixBlendMode = "hard-light";
export const mapCtx = map.getContext('2d');

export const mapPosition = {
	x: 0,
	y: 0,
	update: function(x, y) {
		this.x = x;
		this.y = y;
		this.pixel = mapCtx.getImageData(this.x, this.y, 1, 1);
	},
	pixel: undefined
};
mapCtx.webkitImageSmoothingEnabled = false;
mapCtx.mozImageSmoothingEnabled = false;
mapCtx.imageSmoothingEnabled = false;
// mapCtx.scale(2, 2);
// mapCtx.translate(-50, -50);
// mapCtx.scale(4, 4);
// mapCtx.translate(-75, -75);
// mapCtx.scale(8, 8); 
// mapCtx.translate(-87.5, -87.5); // 12.5
// mapCtx.scale(16, 16);
// mapCtx.translate(-93.75, -93.75); // 6.25

export function animate() {
	mapCtx.clearRect(0,0, 200, 200);
	mapCtx.save();
	mapCtx.scale(Gs.MAP_ZOOM.scale, Gs.MAP_ZOOM.scale);
	mapCtx.translate(Gs.MAP_ZOOM.translate, Gs.MAP_ZOOM.translate);
	mapCtx.drawImage(galaxy, Math.floor(0 - mapPosition.x), Math.floor(0 - mapPosition.y), 200, 200);
	mapCtx.fillStyle = "#f00";
	mapCtx.translate(100, 100);
	mapCtx.fillRect(0, 0, 1, 1);
	mapCtx.strokeStyle = "#fc9";
	mapCtx.lineWidth = .2;
	mapCtx.strokeRect(0, 0, 1, 1);
	mapCtx.translate(-100, -100);
	mapCtx.restore();
	requestAnimationFrame(animate);
}
const galaxy = new Image();
galaxy.src = "sprites/map/galaxy.png";

//http://www.javascripter.net/faq/rgbtohex.htm
function toHex(n) {
 n = parseInt(n,10);
 if (isNaN(n)) return "00";
 n = Math.max(0,Math.min(n,255));
 return "0123456789ABCDEF".charAt((n-n%16)/16)
      + "0123456789ABCDEF".charAt(n%16);
}

galaxy.onload = () => {
	animate();
	let galaxyArray = [];
	let galaxyData = mapCtx.getImageData(0, 0, 200, 200);
	for (let i = 0; i < galaxyData.data.length; i += 4) {
		let r = galaxyData.data[i]
		let g = galaxyData.data[i + 1]
		let b = galaxyData.data[i + 2]
		let a = galaxyData.data[i + 3]
		galaxyArray.push({
			r: r,
			g: g,
			b: b,
			a: a,
			x: Math.floor(i / 4) % 200,
			y: Math.floor(i / 800),
			hex: a != 0 ? `${toHex(r)}${toHex(g)}${toHex(b)}` : undefined,
			name: a != 0 ? ntc.name(`${toHex(r)}${toHex(g)}${toHex(b)}`) : ['','','']
		});
	}
	// console.log(galaxyArray);
	let totalStars = 0;
	ntc.names.forEach(name => {
		let count = galaxyArray.filter(star => star.name[1] == name[1]).length;
		console.log(count + ' ' + name[1] + ' stars');
		totalStars += count;
	});
	console.log('There are ' + totalStars + ' stars total, out of 40000 sectors');
};

