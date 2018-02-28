export default class Stat {
	constructor(domRepresentation) {
		this.active;
		this.inactive;
		this.ui = domRepresentation;
	}
	update(activeLength, inactiveLength) {
		this.active = activeLength;
		this.inactive = inactiveLength;
		this.ui.innerHTML = this.active + " / " + this.inactive;
	}
}