import * as move from './common.js';
import * as helper from './helpers.js';

export default function(obj, delta) {
	if (obj.sprite.position.y > 160) {
		move.smoothTurn(obj, delta, 270, -1);
	} else if (obj.sprite.position.y < 20) {
		move.smoothTurn(obj, delta, 90, -1);
	} else {
		move.vertical(obj, delta, helper.getVerticalHeading(obj));
	}
}