window.addEventListener("load", function() {
	iframe.onload = iframeLoad;
	iframePage("/iframes/events/current");
	//setInterval(iframeHeightAdjust, 1000);
})

function iframeLoad()
{
	var path = iframe.contentWindow.location.pathname;

	if (path == "/iframes/events/current")
	{
		currentClass();
		//history.replaceState("", document.title, window.location.pathname + window.location.search);
	}
	else if (path.startsWith("/iframes/events/past"))
	{
		pastClass();
		//history.replaceState("", document.title, window.location.pathname + window.location.search);
	}
	else
	{
		current_button.classList.remove("selected");
		past_button.classList.remove("selected");
		//history.pushState("", document.title, window.location.pathname + window.location.search + "#!233");
	}
}

function iframePage(url)
{
	iframe.src = url;
	/*iframe.onload = function() {
		iframeHeightAdjust();
	}*/	
}

function iframeHeightAdjust()
{
	//iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
}

function current()
{
	iframePage("/iframes/events/current");
	currentClass();
}

function currentClass()
{
	current_button.classList.add("selected");
	past_button.classList.remove("selected");
}

function past()
{
	iframePage("/iframes/events/past/" + pastStartYear);
	pastClass();
}

function pastClass()
{
	current_button.classList.remove("selected");
	past_button.classList.add("selected");
}

////

isNumber = number => number == "" ? false : ! isNaN(number);
getEventID = hash => Number(hash.substring(2));

window.addEventListener("hashchange", hashchange);
window.addEventListener("load", hashchange);

function hashchange()
{
	var id = getEventID(location.hash);
	if (isNumber(id))
		loadEvent(id);
}

function loadEvent(id)
{
	iframePage("/iframes/event/" + id);
	current_button.classList.remove("selected");
	past_button.classList.remove("selected");
}