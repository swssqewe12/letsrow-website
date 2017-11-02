var express = require('express');
var data = require('./data');
var app = express();

app.use('/static', express.static('static'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.get('/', function (req, res) {
	res.render('index.html');
})

app.get('/events/current', function(req, res) {
	var year = app.locals.year(data.events.past[0].event_date);
	res.render('events.html', {'situation': 'current', 'events': data.events.upcoming, 'page': -1, 'yr': year});
})

app.get('/events/past/:page', function(req, res) {
	var year = app.locals.year(data.events.past[0].event_date)
	page_count = year - app.locals.year(data.events.past[data.events.past.length - 1].event_date) + 1
	year -= Number(req.params.page) - 1
	res.render('events.html', {'situation': 'past', 'events': data.events.past, 'page': Number(req.params.page), 'page_count': page_count, 'yr': year});
})

app.listen(process.env.PORT || 8000, function () {
	console.log('App listening on port 8000!');
})

// EJS helpers

app.locals.dayMonth = function(date)
{
	months = {
		"01": "January",
		"02": "Febuary",
		"03": "March",
		"04": "April",
		"05": "May",
		"06": "June",
		"07": "July",
		"08": "August",
		"09": "September",
		"10": "October",
		"11": "November",
		"12": "December"
	}

	pieces = date.split("/");
	return pieces[0] + " " + months[pieces[1]];
}

app.locals.year = function(date)
{
	return date.split("/")[2];
}