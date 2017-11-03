var express = require('express');
var data = require('./data');
var app = express();

app.use('/static', express.static('static'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.get('/', function (req, res) {
	res.render('index.html');
})

app.get('/events', function(req, res) {
	newestYear = data.events.past[0].event_year;
	res.render('events.html', {'pastStartYear': newestYear});
})

app.get('/iframes/events/current', function(req, res) {
	res.render('current_events.html', {'events': data.events.upcoming});
})

app.get('/iframes/events/past/:year', function(req, res) {
	newestYear = data.events.past[0].event_year;
	oldestYear = data.events.past[data.events.past.length - 1].event_year;
	res.render('past_events.html', {'events': data.events.past, 'year': Number(req.params.year), 'newestYear': newestYear, 'oldestYear': oldestYear});
})

/*app.get('/events/current', function(req, res) {
	res.render('events.html', {'situation': 'current', 'events': data.events.upcoming, 'page': -1});
})

app.get('/events/past/:page', function(req, res) {
	var year = app.locals.year(data.events.past[0].event_date)
	page_count = year - app.locals.year(data.events.past[data.events.past.length - 1].event_date) + 1
	year -= Number(req.params.page) - 1
	res.render('events.html', {'situation': 'past', 'events': data.events.past, 'page': Number(req.params.page), 'page_count': page_count, 'yr': year});
})*/

app.listen(process.env.PORT || 8000, function () {
	console.log('App listening on port 8000!');
})

// EJS helpers

// app.locals.