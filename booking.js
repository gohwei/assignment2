// mapboxgl.accessToken = 'pk.eyJ1IjoiZ29oc2hld2VpIiwiYSI6ImNrMW9xMzF6djBvem4zY3BnazBpcTEwOXYifQ.u69KawZGLgqA1eyr0GILBw'
// map = new  mapboxgl.Map({
//    container: 'bookingMapArea',
//  center: [44.63, 28.77],
//  zoom: 1,
//  style: 'mapbox://styles/mapbox/streets-v9'
// });

let currentList = document.getElementById("currentbooking-list")
let futureList = document.getElementById("futurebooking-list")
let historyList = document.getElementById("history-list")

let globRoutes
let currentTime = new Date()
console.log(currentTime.getDay())

function loadRoutes(routesInfo)
{
  console.log(routesInfo)
  let currentListHTML = "";
  let futureListHTML = "";
  let historyListHTML = "";
  let liveDate = currentTime.getDate();
  let liveMonth = currentTime.getMonth() + 1;
  let liveYear = currentTime.getFullYear();

  for (var i = 0; i < routesInfo.length; i++)
  {
    console.log(liveMonth+1)
    console.log(Number(routesInfo[i]._departureDate.substr(5,2))-liveMonth)

    if ( (Number(routesInfo[i]._departureDate.substr(0,4))-liveYear) == 0 && (Number(routesInfo[i]._departureDate.substr(5,2))-liveMonth) == 0 && (Number(routesInfo[i]._departureDate.substr(8,2))-liveDate) == 0)
    {
      currentListHTML += "<tr> <td onmousedown=\"viewRouteInformation("+i+")\" class=\"full-width mdl-data-table__cell--non-numeric\">" + routesInfo[i]._sourcePort._name + " &rarr; " + routesInfo[i]._desPort._name;
      currentListHTML += "<div class=\"subtitle\">" + "Depature Date:" + routesInfo[i]._departureDate + "</div></td></tr>";
    }

    if ((Number(routesInfo[i]._departureDate.substr(0,4))-liveYear) >= 0 && (Number(routesInfo[i]._departureDate.substr(5,2))-liveMonth) >= 0 )
    {
      if ( (Number(routesInfo[i]._departureDate.substr(5,2))-liveMonth) == 0 && (Number(routesInfo[i]._departureDate.substr(8,2))-liveDate) > 0)
      {
      futureListHTML += "<tr> <td onmousedown=\"viewRouteInformation("+i+")\" class=\"full-width mdl-data-table__cell--non-numeric\">" + routesInfo[i]._sourcePort._name + " &rarr; " + routesInfo[i]._desPort._name;
      futureListHTML += "<div class=\"subtitle\">" + "Depature Date:" + routesInfo[i]._departureDate + "</div></td></tr>";
      }
      else
      {
        historyListHTML += "<tr> <td onmousedown=\"viewRouteInformation("+i+")\" class=\"full-width mdl-data-table__cell--non-numeric\">" + routesInfo[i]._sourcePort._name + " &rarr; " + routesInfo[i]._desPort._name;
        historyListHTML += "<div class=\"subtitle\">" + "Depature Date:" + routesInfo[i]._departureDate + "</div></td></tr>";
      }
    }

    else if  ((Number(routesInfo[i]._departureDate.substr(0,4))-liveYear) < 0)
    {
      historyListHTML += "<tr> <td onmousedown=\"viewRouteInformation("+i+")\" class=\"full-width mdl-data-table__cell--non-numeric\">" + routesInfo[i]._sourcePort._name + " &rarr; " + routesInfo[i]._desPort._name;
      historyListHTML += "<div class=\"subtitle\">" + "Depature Date:" + routesInfo[i]._departureDate + "</div></td></tr>";
    }

  }

  if (currentListHTML == "")
  {
    currentListHTML = "<tr> <td class=\"full-width mdl-data-table__cell--non-numeric\">" + "No ongoing routes at the moment" + "</td></tr>";
  }
  if (futureListHTML == "")
  {
    futureListHTML = "<tr> <td class=\"full-width mdl-data-table__cell--non-numeric\">" + "No scheduled routes at the moment" + "</td></tr>";
  }
  if (historyListHTML == "")
  {
    historyListHTML = "<tr> <td class=\"full-width mdl-data-table__cell--non-numeric\">" + "No historical routes at the moment" + "</td></tr>";
  }

  historyList.innerHTML = historyListHTML
  futureList.innerHTML = futureListHTML
  currentList.innerHTML = currentListHTML
}

function viewRouteInformation(index)
{
  storeParticularRoute(index)
  location.href = 'bookinghistory.html'

}

function retrieveRouteData(storageKey)
{
	if (typeof(Storage) !== "undefined")
	{
		return JSON.parse(localStorage.getItem(storageKey));
	}
}

if (localStorage.length > 0)
{
    let routeDatas = retrieveRouteData("routes"); // Retrive data into new variable
    globRoutes = routeDatas;

    if (routeDatas !== null)
    {

          loadRoutes(routeDatas);

    }

}

function storeParticularRoute(routedata)
{
  if(typeof (Storage) !== "undefined")
	{
		localStorage.setItem("routeIndex",JSON.stringify(routedata)) //The port instance with the new data is uploaded into the localStorage
	}
	else
	{
		alert("The current browser doesn't support local storage");
	}
}
