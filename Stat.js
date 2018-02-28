export default class Stat {
	constructor(domRepresentation) {
		this.active = 0;
		this.inactive = 0;
		this.ui = domRepresentation;
	}
	update(activeLength, inactiveLength) {
		this.active = activeLength;
		if (inactiveLength) {
			this.inactive = inactiveLength;
			this.ui.innerHTML = this.active + " / " + this.inactive;
		} else {
			this.ui.innerHTML = this.active;
		}
		
	}
}