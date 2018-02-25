import * as move from './common.js';
import * as helper from './helpers.js';
import * as Gs from './../Globals.js';

export default function(obj, delta) {
	if (obj.sprite.position.x > 230)  {
		move.smoothTurn(obj, delta, -90);
	} else if (obj.sprite.position.x < 24) {
		move.smoothTurn(obj, delta, 90, -1);
	} else {
		move.horizontal(obj, delta, helper.getHorizontalHeading(obj));
	}
	if (obj.AIconfig.loop && obj.sprite.position.y > Gs.CANVAS_SIZEY + 24) {
		obj.sprite.position.y = -24;
		obj.shadow.position.y = -24;
	}
}