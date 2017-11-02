# -*- coding: utf-8 -*-

from __future__ import division

import urllib2, re, json
from BeautifulSoup import *

f = open("result.json", "r")
events = f.read()
f.close()

events = json.loads(events)

result = {}

def get_int(str):
    try: 
        return int(str)
    except ValueError:
        return -1

def save_result():
	rf = open("event_entries.json", "w")
	rf.write(json.dumps(result))
	rf.close()

def events_result(tbody):
	result = []
	if tbody:
		for ev in tbody.findAll("tr"):
			result.append(event_result(ev))
	return result

def event_result(ev):
	result = {}
	data = ev.findAll("td")
	result["name"] = data[0].text
	status = data[1].text
	if "Non" in status: status = 0
	elif "Semi" in status: status = 1
	elif "Full" in status: status = 2
	else: status = -1
	result["status"] = status
	result["max-crew-pts"] = get_int(data[2].text)
	result["win-pts"] = get_int(data[3].text)
	result["loss-pts"] = get_int(data[4].text)
	result["crew-fee"] = data[5].text.replace("&euro;", "")
	id_ = -1
	try:
		a = data[6].find("a")
	except:
		a = None
	if a:
		a = a["href"]
		a = re.search(r'event_id=(\d+)', a).group(1)
		id_ = int(a)
	result["id"] = id_
	return result

for mode in ("upcoming", "past"):

	print "Scraping " + mode + " events..."

	result[mode] = {}

	i = 0

	for event in events[mode]:

		if event["id"] == -1:
			result[mode][event["id"]] = []
		else:
			url = "http://www.rowingireland.ie/iframes/event-details.php?regatta_or_hor=hor&view=events&id=" + str(event["id"])
			req =  urllib2.Request(url, headers={'User-Agent' : "Magic Browser"})
			try:
				data = urllib2.urlopen(req)
			except:
				url = "http://www.rowingireland.ie/iframes/event-details.php?regatta_or_hor=regatta&view=events&id=" + str(event["id"])
				req =  urllib2.Request(url, headers={'User-Agent' : "Magic Browser"})
				data = urllib2.urlopen(req)
			soup = BeautifulSoup(data)
			tbody = soup.find('tbody')
			result[mode][event["id"]] = events_result(tbody)

		if i % 10 == 0: save_result()
		print str(event["id"]) + " - " + str(round(i / (len(events[mode]) - 1) * 100, 2)) + "%"
		i+=1

	save_result()
	print "Done."
	print