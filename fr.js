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