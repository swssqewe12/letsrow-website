var express = require('express');
var data = require('./data');
var app = express();

app.use('/static', express.static('static'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.get('/', function (req, res) {
	res.render('index.html');
})

app.get('/events/', function(req, res) {
	res.render('current_events.html', {'events': data.events.upcoming});
})

app.get('/events/past', function(req, res) {
	newestYear = data.events.past[0].event_year;
	oldestYear = data.events.past[data.events.past.length - 1].event_year;
	res.render('past_events.html', {'events': data.events.past, 'year': newestYear, 'newestYear': newestYear, 'oldestYear': oldestYear});
})

app.get('/events/:year', function(req, res) {
	newestYear = data.events.past[0].event_year;
	oldestYear = data.events.past[data.events.past.length - 1].event_year;
	res.render('past_events.html', {'events': data.events.past, 'year': Number(req.params.year), 'newestYear': newestYear, 'oldestYear': oldestYear});
})

app.get('/event/:id', function(req, res) {
	res.render('event.html', {'event': getEventInfo(Number(req.params.id)), 'eventRaces': getEventRaces(Number(req.params.id))})
})

app.get('/event/:id/:race_id', function(req, res) {
	res.render('event_race.html', {'event': getEventInfo(Number(req.params.id)), 'race_id': Number(req.params.race_id)})
})

app.get('/event/:id/results', function(req, res) {
	event = getEventInfo(Number(req.params.id))
	if (app.locals.nowDate() >= app.locals.dateFromStr(event.event_date))
		res.render('event_results.html', {'event': event})
	else
		res.redirect('/event/' + req.params.id);
})

app.listen(process.env.PORT || 8000, function () {
	console.log('App listening on port 8000!');
})

function getEventInfo(id)
{
	for (var event of data.events.upcoming)
		if (event.id == id)
			return event

	for (var event of data.events.past)
		if (event.id == id)
			return event
}

function getEventRaces(id)
{
	console.log(data.event_races.upcoming[id] || data.event_races.past[id])
	return data.event_races.upcoming[id] || data.event_races.past[id];
}

function getEventResults(id)
{

}

// EJS helpers

// app.locals.

app.locals.randChoice = function()
{
	return arguments[Math.floor(Math.random()*arguments.length)];
}

app.locals.today = function()
{
	var t = new Date(), dd = t.getDate(), mm = t.getMonth() + 1;
	var yyyy = t.getFullYear();

	if(dd<10)
	    dd='0'+dd;
	if(mm<10)
	    mm='0'+mm;

	return dd+'/'+mm+'/'+yyyy;
}

app.locals.dateFromStr = function(str)
{
	var pieces = str.split("/");
	return new Date(pieces[2], pieces[1] - 1, pieces[0]);
}

app.locals.nowDate = function()
{
	var now = new Date();
	now.setHours(0,0,0,0);
	return now;
}

app.locals.statuses = {
	"0": "non",
	"1": "semi",
	"2": "full"
}