var fs = require('fs');

console.log("Getting data...")

var events = JSON.parse(fs.readFileSync('./data/events.json').toString());
var event_races = JSON.parse(fs.readFileSync('./data/event_races.json').toString());

console.log("Done!")

module.exports = {
	'events': events,
	'event_races': event_races
}