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
			this.team.getNew(this.spawn.r, this.spawn.x, this.spawn.y, "Enemy3", "enemy")
			// add a new ship at default location
			currentCount += 1;
			if (currentCount == this.count) clearInterval(this.interval);
		}, this.timing);
		// tickerEvent(function, timing, count)
	}
}


class Event {
  constructor(config) {
    this.fn = config.fn || (() =>'na');
    this.time = config.time || 0;
  }
  tick (ms) {
    this.time += this.time > 0 ? -ms : 0;
    if (this.time <= 0) {
      this.fn();
      // remove self from eventList (recycle?)
    }
    console.log(this.time)
  }
}
const eventList = [];
/*
	@param {function} fn - The function to be run
	@param {int} time - the delay in ms between calls
	@param {int|'loop'} [count=1] - The number of iterations to be called
*/
function tickerEvent (fn, time, count = 1) {
	for (let i = 1; i <= count; i++) {
		let event = new Event({
			fn: fn,
			time: time * i
		});
		eventList.push(event);
	}
}
tickerEvent(() => 'asd', 3000, 3);

eventList.forEach(ev => console.log(ev.time))