export default class Wave {
	constructor(config) {
		this.team = config.team || null;
		this.type = config.type || null;
		this.count = config.count || null;
		this.pattern = config.pattern || null;
		this.timing = config.timing || null;
		this.spawn = config.spawn || null;
		console.log("Wave generated");

		let currentCount = 0;
		this.interval = setInterval(() => {
			this.team.getNew(this.spawn.r, this.spawn.x, this.spawn.y, "Enemy2", "enemy")
			// add a new ship at default location
			currentCount += 1;
			if (currentCount == this.count) clearInterval(this.interval);
		}, this.timing);
	}
}