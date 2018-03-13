import { eventList } from './Model.js';
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
      eventList.splice(eventList.indexOf(this), 1);
    }
  }
}
/*
	@param {function} fn - The function to be run
	@param {int} time - the delay in ms between calls
	@param {int|'loop'} [count=1] - The number of iterations to be called
*/
export function tickerEvent (fn, time, count = 1) {
	for (let i = 1; i <= count; i++) {
		let event = new Event({
			fn: fn,
			time: time * i
		});
		eventList.push(event);
	}
}
// tickerEvent(() => 'asd', 3000, 3);

// eventList.forEach(ev => console.log(ev.time))