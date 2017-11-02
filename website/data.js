var fs = require('fs');

console.log("Getting data...")

var events = JSON.parse(fs.readFileSync('./data/events.json').toString());
var event_entries = JSON.parse(fs.readFileSync('./data/event_entries.json').toString())

console.log("Done!")

module.exports = {
	'events': events,
	'event_entires': event_entries
}