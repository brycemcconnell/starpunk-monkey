export const random = (max, min) => {
  if (min == undefined) min = 0
  return Math.round(Math.random() * (max - min) + min);
};
export const randAngle4 = ()=> {
	let angle = random(360);
	let result;
	if (angle > 270) {
		result = 270;
	}
	else if (angle > 270) {
		result = 180;
	}
	else if (angle > 270) {
		result = 90;
	}
	else {
		result = 0;
	}
	return result;
};
export const getCentrePoint = (v) => {
  let cx = (v[0].x + v[1].x + v[2].x + v[3].x) / 4;
  let cy = (v[0].y + v[1].y + v[2].y + v[3].y) / 4;
  return { x: cx, y: cy};
};
export const transformRotate = (x, y, c, angle) => {
  x -= c.x;
  y -= c.y

  let newx = x * Math.cos(angle) - y * Math.sin(angle);
  let newy = x * Math.sin(angle) + y * Math.cos(angle);

  x = newx + c.x;
  y = newy + c.y;

  return {x: x, y: y};
};

export const convertXYPairs = (array) => {
  let newArray = [];
  for (let i = 0; i < array.length; i+=2) {
    newArray.push({x: array[i], y: array[i+1]});
  }
  return newArray;
};

export const round = (num, precision) => {
  const factor = Math.pow(10, precision);
  return Math.round(num * factor) / factor;
};
export const roundFraction = (num, fraction) => {
    return Math.round( num * fraction ) / fraction;
};
export const deltaAngle = (a, b) => {
  return Math.atan2(Math.sin(a-b), Math.cos(a-b));
};