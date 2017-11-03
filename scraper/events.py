import urllib2, re, json
from BeautifulSoup import *

months = {
		"01": "Jan",
		"02": "Feb",
		"03": "Mar",
		"04": "Apr",
		"05": "May",
		"06": "Jun",
		"07": "Jul",
		"08": "Aug",
		"09": "Sep",
		"10": "Oct",
		"11": "Nov",
		"12": "Dec"
	}

def event(ev):
	result = {}
	pieces = ev.findAll('td')
	info = pieces[0].find("a")
	href = str(info["href"])
	if "iframes" not in href:
		id = -1
		roh = ""
	else:
		id = re.search(r'id=(\d+)', href)
		if id: id = int(id.group(1))
		else: id = -1
		roh = re.search(r'regatta_or_hor=(\w+)', href).group(1)
	result["roh"] = roh
	result["id"] = id
	result["name"] = info.text
	result["venue"] = pieces[1].text
	status = pieces[2].text
	if "Non" in status: status = 0
	elif "Semi" in status: status = 1
	elif "Full" in status: status = 2
	else: status = -1
	result["status"] = status
	result["event_date"] = pieces[3].text
	split = pieces[3].text.split("/")
	result["event_year"] = int(split[2])
	result["event_month"] = months[split[1]]
	result["event_day"] = split[0]
	result["closing_date"] = pieces[4].text
	return result

def events(tbody):
	result = []
	for ev in tbody.findAll('tr'):
		result.append(event(ev))
	return result

def main(mode="upcoming"):
	url = "http://www.rowingireland.ie/iframes/event-details.php?mode=" + mode
	req =  urllib2.Request(url, headers={'User-Agent' : "Magic Browser"}) 
	data = urllib2.urlopen(req)
	soup = BeautifulSoup(data)
	tbody = soup.find('tbody')
	return events(tbody)

#upcoming or old_events
result = {}
print "Scraping upcoming events..."
result["upcoming"]	= main("upcoming")
print "Done."
print
print "Scraping past events..."
result["past"]		= main("old_events")
print "Done."

f = open("events.json", "w")
f.write(json.dumps(result))
f.close()