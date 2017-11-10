function filterTable()
{
	Array.prototype.forEach.call(table.children, child => child.classList.remove("hidden"));

	for (var child of table.children)
	{
		var name = child.querySelector("td a").innerText;
		var namelc = name.toLowerCase();

		var hide = false;

		console.log(genderFilter.selectedIndex)

		if (genderFilter.selectedIndex == 1 && name.includes("Womens"))
			hide = true;

		else if (genderFilter.selectedIndex == 2 && name.includes("Mens"))
			hide = true;

		/*else if (boatSizeFilter.selectedIndex == 1 && ! name.includes("1"))
			hide = true;

		else if (boatSizeFilter.selectedIndex == 2 && ! name.includes("2"))
			hide = true;

		else if (boatSizeFilter.selectedIndex == 3 && ! name.includes("4"))
			hide = true;

		else if (boatSizeFilter.selectedIndex == 4 && ! name.includes("8"))
			hide = true;

		else if (boatTypeFilter.selectedIndex == 1 && ! name.includes("X"))
			hide = true;

		else if (boatTypeFilter.selectedIndex == 2 && name.includes("X"))
			hide = true*/

		else if (groupFilter.selectedIndex == 1 && (namelc.includes("junior") || namelc.includes("senior") || namelc.includes("intermediate") || namelc.includes("novice") || namelc.includes("masters")))
			hide = true

		else if (groupFilter.selectedIndex == 2 && ! namelc.includes("senior"))
			hide = true

		else if (groupFilter.selectedIndex == 3 && ! namelc.includes("intermediate"))
			hide = true

		else if (groupFilter.selectedIndex == 4 && ! namelc.includes("novice"))
			hide = true

		else if (groupFilter.selectedIndex == 5 && ! namelc.includes("masters"))
			hide = true

		else if (boatFilter.selectedIndex == 1 && ! name.includes("1X"))
			hide = true

		else if (boatFilter.selectedIndex == 2 && ! name.includes("2X"))
			hide = true

		else if (boatFilter.selectedIndex == 3 && (!name.includes(" 2") || name.includes("X")))
			hide = true

		else if (boatFilter.selectedIndex == 4 && ! name.includes("4X"))
			hide = true

		else if (boatFilter.selectedIndex == 5 && (!name.includes(" 4") || name.includes("X")))
			hide = true

		else if (boatFilter.selectedIndex == 6 && (!name.includes(" 8") || name.includes("X")))
			hide = true

		else if (boatFilter.selectedIndex == 7 && ! name.includes("8X"))
			hide = true

		else if (coxFilter.selectedIndex == 1 && ! name.includes("+"))
			hide = true

		else if (coxFilter.selectedIndex == 2 && ! name.includes("-"))
			hide = true

		if (hide)
		{
			child.classList.add("hidden");
		}
	}

	clearFilterButton.style.display = "inline-block";
}

function clearFilter()
{
	genderFilter.selectedIndex = 0;
	groupFilter.selectedIndex = 0;
	boatFilter.selectedIndex = 0;
	coxFilter.selectedIndex = 0;
	filterTable();
	clearFilterButton.style.display = "none";
}