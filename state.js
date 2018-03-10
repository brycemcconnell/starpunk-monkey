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
	]
}