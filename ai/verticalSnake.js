import * as move from './common.js';
import * as helper from './helpers.js';
import * as Gs from './../Globals.js';

export default function(obj, delta) {
	if (obj.sprite.position.y > 160)  {
		move.circle(obj, delta, -1);
	} else if (obj.sprite.position.y < 24) {
		move.circle(obj, delta, 1);
	} else {
		move.vertical(obj, delta, helper.getVerticalHeading(obj));
	}
	if (obj.AIconfig.loop && obj.sprite.position.x > Gs.CANVAS_SIZEX + 24) {
		obj.sprite.position.x = -24;
		obj.shadow.position.x = -24;
	}
}