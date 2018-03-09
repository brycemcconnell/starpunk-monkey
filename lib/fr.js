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
export const angleToPoint = (a, b) => {
    const x1 = a.x;
    const y1 = a.y;
    const x2 = b.x;
    const y2 = b.y;
    const result = Math.atan2(y2 - y1, x2 - x1)
    return result > 0 ? result : Math.PI - result*-1 + Math.PI;
  };
export const distanceToPoint = (a, b) => {
    const x1 = a.x;
    const y1 = a.y;
    const x2 = b.x;
    const y2 = b.y;
    const result = Math.hypot(x2 - x1, y2 - y1);
    return result;
  };
  export const normalize = (val, max, min) => {
  return (val - min) / (max - min);
};

export const pad = (x, w) => {
  return new Array(w - `${x}`.length + 1).join(0)+`${x}`;
};

export const base = {
  decToHex(n) {
    n = Math.floor(n);
    return pad(n.toString(16), 2);
  }
};

export const color = {
  rgbToHex(r, g, b) {
    r %= 255;
    g %= 255;
    b %= 255;
   return (`${base.decToHex(r)}${base.decToHex(g)}${base.decToHex(b)}`);
  },
  hexToRgb(hex) {
    return [parseInt(`${hex[0]}${hex[1]}`, 16), parseInt(`${hex[2]}${hex[3]}`, 16), parseInt(`${hex[4]}${hex[5]}`, 16)];
  },
  rgbToHsl(r, g, b) {
    // Convert to range 0 - 1
    r /= 255, g /= 255, b /= 255;
    // Find mins/maxes
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    // Calculate luminance by adding max and min then dividing by 2
    let l = (max + min) / 2;
    // If min and max are the same, there is no saturation, if there is no saturation, there is no hue
    let h;
    let s;
    if (max == min) {
        h = 0;
        s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h, s, l];
  },
  hslToRgb(h, s, l) {
    h /= 255, s/=100, l/=100
    let r, g, b;
    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;

      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return [ r * 255, g * 255, b * 255 ];
    }
};


