
mapboxgl.accessToken = 'pk.eyJ1Ijoic2Ftd29uZzEzOSIsImEiOiJjazB1dGZ5OHcwcnd5M2lsYTRqNG5ycm9rIn0.7219ikKXH6Z6tixAlsr5mg';

let bookMap = new  mapboxgl.Map({
   container: 'bookingMapArea',
 center: [44.63, 28.77],
 zoom: 1,
 style: 'mapbox://styles/mapbox/streets-v9'
});

document.getElementById("postponeDateTab").style.display = "none";
let bookingInfomartion = document.getElementById("bookingInfo-list");
let globRouteArray
let index

let currentTime = new Date()
let liveDate = currentTime.getDate();
let liveMonth = currentTime.getMonth() + 1;
let liveYear = currentTime.getFullYear();
let currentDate

if (liveMonth < 10)
{
  currentDate = liveYear.toString() + "0" + liveMonth.toString() + liveDate.toString();
}
else
{
  currentDate = liveYear.toString() + liveMonth.toString() + liveDate.toString();
}

console.log(currentDate)

function checkDate()
{
  let setDate = globRouteArray[index]._departureDate.substr(8,2)
  let setMonth = globRouteArray[index]._departureDate.substr(5,2)
  let setYear = globRouteArray[index]._departureDate.substr(0,4)
  let pastDate = setYear + setMonth + setDate;
  console.log(pastDate)
  console.log((Number(pastDate) - Number(currentDate)))
  if ( (Number(pastDate) - Number(currentDate)) <= 0 )
  {
    document.getElementById("postponeButton").disabled = true
  }

}


function postponeRoute()
{
  let maxLimiteDateString = (globRouteArray[index]._departureDate).slice(0,5)
  let setDate = Number(globRouteArray[index]._departureDate.substr(8,2))
  let setMonth = Number(globRouteArray[index]._departureDate.substr(5,2))
  let setYear = Number(globRouteArray[index]._departureDate.substr(0,4))


  let monthDays
  switch (setMonth) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      monthDays = 31;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      monthDays = 30;
      break;

    default:
      monthDays = febDays(setYear);
  }

  let limitDate = setDate + 7;
  let limitMonth = setMonth;
  let limitYear =  setYear;
  if (limitDate > monthDays)
  {
    limitDate = limitDate - monthDays;
    limitMonth = limitMonth + 1;
    console.log(maxLimiteDateString)
  }

  if (limitMonth > 12)
  {
    limitMonth = '01'
    limitYear = limitYear + 1
    maxLimiteDateString = limitYear.toString() + "-" ;
  }

  if (limitDate < 10)
  {
    limitDate = "0" + limitDate.toString();
    maxLimiteDateString += limitMonth.toString() + "-" + limitDate;
    console.log(maxLimiteDateString)
  }
  else
  {
    maxLimiteDateString += limitDate.toString();
    console.log(maxLimiteDateString)
  }


  let maxLimitDate = maxLimiteDateString;
  let minLimitDate = globRouteArray[index]._departureDate;

  console.log(maxLimitDate)
  console.log(typeof minLimitDate)



  let listHTML = "<input class=\"mdl-textfield__input\" type=\"date\" id=\"departDate\" max=\""+maxLimitDate+"\" min=\""+minLimitDate+"\">"
  listHTML += "<div class=\"mdl-card__actions mdl-card--border\">"
  listHTML += "<a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\" id=\"confirmButton\" onclick=\"confirmButton()\">" + "Confirm" + "</a></div>"
  document.getElementById("postponeDateTab").style.display = "block";

  document.getElementById("postponeDateTab").innerHTML = listHTML;

  console.log(globRouteArray[index]._departureDate)
  console.log(globRouteArray[index])
}


function febDays(setYear)
{
  let remainder = setYear%4
  if(remainder == 0)
  {
    return 29
  }
  else
  {
    return 28
  }
}


function confirmButton()
{
  let postponeDate = document.getElementById("departDate").value

  console.log(postponeDate)
  if(postponeDate !== "")
  {
    if (confirm("Postpone Departure date?"))
    {
      globRouteArray[index]._departureDate = postponeDate;
      storeRoute(globRouteArray)
      alert("The departure date has been update!")

    }
  }
  else
  {
    alert("Please select a date")
  }
}


function removeRoute()
{
  if(confirm("Delete this Route?"))
  {
    globRouteArray.splice(index,1)
    storeRoute(globRouteArray)
    location.href = "Main.html"

  }
}



function loadRouteInfo(index)
{
  let routeArray = globRouteArray[index]
  let listHTML = "";
  listHTML += "<tr> <td class=\"full-width mdl-data-table__cell--non-numeric\">" + "Source Port: " + routeArray._sourcePort._name + "</td></tr>"
  listHTML += "<tr> <td class=\"full-width mdl-data-table__cell--non-numeric\">" + "Destination: " + routeArray._desPort._name + "</td></tr>"
  listHTML += "<tr> <td class=\"full-width mdl-data-table__cell--non-numeric\">" + "Depature Date:" + routeArray._departureDate + "</td></tr>";

  bookingInfomartion.innerHTML = listHTML


}

bookMap.on('load', function() {
  addPolyline()
  });

function addPolyline()
{
  let routeArray = globRouteArray[index];
  console.log(routeArray)

    let object = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: []
        }
      };





    		object.geometry.coordinates.push([routeArray._sourcePort._lng,routeArray._sourcePort._lat])

        for (var i = 0; i < routeArray._waypoint.length; i++)
        {
          object.geometry.coordinates.push(routeArray._waypoint[i])
        }

        object.geometry.coordinates.push([routeArray._desPort._lng,routeArray._desPort._lat])

        console.log(object.geometry.coordinates)

        bookMap.addSource('geojson', {
          "type": "geojson",
          "data": object
        });

        bookMap.addLayer({
          id: "routes",
          type: "line",
          source: 'geojson',
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": "#888", "line-width": 6 }
        })

        for (let i = 0; i < object.geometry.coordinates.length; i++)
          {
             let location = object.geometry.coordinates[i];
              let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
               marker.setLngLat(location);

            	 let popup = new mapboxgl.Popup({ offset: 45});
            	  // popup.setText(location.description);

            	   marker.setPopup(popup)

            	// Display the marker.
            	 marker.addTo(bookMap);

            	// Display the popup.
            	popup.addTo(bookMap);
            }

            bookMap.getSource("geojson").setData(object)



    }

function storeRoute(route)
{
	if(typeof (Storage) !== "undefined")
	{
		localStorage.setItem("routes",JSON.stringify(route)) //The port instance with the new data is uploaded into the localStorage
	}
	else
	{
		alert("The current browser doesn't support local storage");
	}
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
    globRouteArray = routeDatas;

}

if (localStorage.length > 0)
{
    let routeIndex = retrieveRouteData("routeIndex"); // Retrive data into new variable
    index = routeIndex
    if (routeIndex !== null)
    {

          loadRouteInfo(routeIndex);
          checkDate();

    }

}
