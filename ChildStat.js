import Stat from "./Stat.js";
export default class ChildStat extends Stat {
	constructor(domRepresentation, parent) {
		super(domRepresentation, parent);
		this.parent = parent;
	}
	update(activeLength, inactiveLength) {
		let activeChange = activeLength - this.active;
		let inactiveChange = 0;
		if (inactiveLength) inactiveChange = inactiveLength - this.inactive;
		super.update(activeLength, inactiveLength);
		// this.parent.ui.innerHTML = activeLength;
		this.parent.update(this.parent.active += activeChange, this.parent.inactive += inactiveChange);
	}
}