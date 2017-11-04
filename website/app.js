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
	res.render('event.html', {'event': getEventInfo(Number(req.params.id))})
})

app.get('/event/:id/results', function(req, res) {
	res.render('event_results.html', {'event': getEventInfo(Number(req.params.id))})
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

function getEventEvents(id)
{

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

app.locals.statuses = {
	"0": "non",
	"1": "semi",
	"2": "full"
}