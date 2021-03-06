/*
Current game data store here
Example: Anything that would go into a save file
- Player inventory
- Ships
- Guns
- Scores
- Stats (kills/deaths)
*/
export const state = {
	ships: [
		{
			type: "Arwing"
		}
	],
	guns: [
		{
			type: "Standard Laser",
			movement: "Mouse"
		},
		{
			type: "Standard Laser",
			movement: "Mouse"
		},
	],
	inventory: {
		items: [],
		add(item) {
			this.items.push(item);
		},
		remove(item) {
			this.items.splice(this.items.indexOf(item), 1);
		}
	},
	currency: {
		count: 0,
		add(amount) {
			this.count += amount;
		},
		remove(amount) {
			this.count -= amount;
		}
	}
}