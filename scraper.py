import urllib2, re, json
from BeautifulSoup import *

def event(ev):
	result = {}
	pieces = ev.findAll('td')
	info = pieces[0].find("a")
	id = re.search(r'id=(\d+)', str(info["href"]))
	if id: id = int(id.group(1))
	else: id = -1
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
result["upcoming"]	= main("upcoming")
result["past"]		= main("old_events")

f = open("result.json", "w")
f.write(json.dumps(result))
f.close()