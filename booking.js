// mapboxgl.accessToken = 'pk.eyJ1IjoiZ29oc2hld2VpIiwiYSI6ImNrMW9xMzF6djBvem4zY3BnazBpcTEwOXYifQ.u69KawZGLgqA1eyr0GILBw'
// map = new  mapboxgl.Map({
//    container: 'bookingMapArea',
//  center: [44.63, 28.77],
//  zoom: 1,
//  style: 'mapbox://styles/mapbox/streets-v9'
// });

let currentList = document.getElementById("currentbooking-list")

function loadRoutes(routesInfo)
{

  let listHTML = "";

  for (var i = 0; i < routesInfo.length; i++)
  {

    listHTML += "<tr> <td onmousedown=\"viewRouteInformation("+i+")\" class=\"full-width mdl-data-table__cell--non-numeric\">" + routesInfo[i]._sourcePort._name + " &rarr; " + routesInfo[i]._desPort._name;
    listHTML += "<div class=\"subtitle\">" + "Depature Date:" + routesInfo[i]._departureDate + "</div></td></tr>";
  }

  currentList.innerHTML = listHTML
}

function viewRouteInformation(index)
{


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
    console.log(routeDatas)

    if (routeDatas !== null)
    {

          loadRoutes(routeDatas);

    }

}
