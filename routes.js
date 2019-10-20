class Route
    {
        constructor (sourcePort,desPort,departureDate)
        {
            this._sourcePort = sourcePort;
            this._desPort = desPort;
            // this._shipName = shipName;
            // this._distance = distance;
            this._waypoint = [];
            // this._weather = weather;
            this._departureDate = departureDate;
        }

            get sourcePort()
            {
              return this._sourcePort;
            }

            get desPort()
            {
              return this._desPort;
            }

            get departureDate()
            {
              return this._departureDate;
            }

            set sourcePort(newSourcePort)
            {
              this._sourcePort = newSourcePort;
            }

            set desPort(newDesPort)
            {
              this._desPort = newDesPort;
            }

            set departureDate(newDepartureDate)
            {
              this._departureDate = newDepartureDate;
            }

        storeWaypoint(waypoints)
        {
          this._waypoint.push(waypoints)
        }

        fromData(routeData)
        {
          this._sourcePort = routeData._sourcePort
          this._desPort = routeData._desPort
          this._departureDate = routeData._departureDate;

          for (let i = 0; i < routeData._waypoint.length; i++)
          {
            this._waypoint.push(routeData._waypoint[i])
          }
        }
}

console.log(newPortList);
let srcPort = new Port()
let wayPointLocation = [];
let locations
let routeClass = new Route();
let shipChosen = new Ship();
let darksky = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/';
let key = "9610451768f0eed3dde6aaa8604ffd41";

//check object empty
function isEmpty(obj)
{
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

let object = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: []
    }
  };

let referenceLength = object.geometry.coordinates.length
let portDstny;

function searchRoutes()
{
        let Source = document.getElementById("sourcePort").value
        let Destiny = document.getElementById("desPort").value
        console.log(Destiny)
        let searchResultSrc = srcPort._searchForPort(Source);
        let searchResultDstny = srcPort._searchForPort(Destiny);
        let portSrc = portList[searchResultSrc];
        portDstny = portList[searchResultDstny];
        let newRoute = new Route(portSrc,portDstny);
        console.log(newRoute);
        console.log(portDstny.lat,portDstny.lng);
        map.panTo([portSrc.lng,portSrc.lat]);

  portSrc = portList[searchResultSrc];
  portDstny = portList[searchResultDstny];
  let Date = document.getElementById("departDate").value
  newRoute = new Route(portSrc,portDstny,Date);
  routeClass = newRoute;
  console.log(routeClass);
  console.log(portDstny.lat,portDstny.lng);
  map.panTo([portSrc.lng,portSrc.lat]);

  locations = [
    {
      coordinates: [portSrc.lng,portSrc.lat]
    },
    {
      coordinates: [portDstny.lng,portDstny.lat]
    }
  ]

  //polyline


  for(let i = 0; i < locations.length; i++)
    {
      object.geometry.coordinates.push(locations[i].coordinates);
    }

  map.addSource('geojson', {
    "type": "geojson",
    "data": object
  });

  map.addLayer({
    id: "routes",
    type: "line",
    source: 'geojson',
    layout: { "line-join": "round", "line-cap": "round" },
    paint: { "line-color": "#888", "line-width": 6 }
  })

  //popup marker
  for (let i = 0; i < locations.length; i++)
    {
       let location = locations[i];
        let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
         marker.setLngLat(location.coordinates);

         let popup = new mapboxgl.Popup({ offset: 45});
          // popup.setText(location.description);

           marker.setPopup(popup)

        // Display the marker.
         marker.addTo(map);

        // Display the popup.
        popup.addTo(map);
      }

      map.getSource("geojson").setData(object)

      referenceLength = object.geometry.coordinates.length;

          let darksky = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/';
      let key = '9610451768f0eed3dde6aaa8604ffd41';
      let sourcelatt = portSrc.lat;
      let sourcelng = portSrc.lng;
      let api = darksky + key + '/' + sourcelatt + ',' + sourcelng;
      api = api.concat('?exclude=minutely,hourly,daily&units=si');
        console.log(api)
      fetch(api)
          .then((response)=>{
              if(response.ok)
              {
                  return response.json();
              }
              else
              {
                  alert("Location unknown. Click the \"Get Current Location\" button")
              }
          })
          .then( (j) =>{
            document.getElementById("summ").innerHTML =  j.currently.summary;

          })
          .catch( (err) =>{
              console.log('Error:', err.message);
          });




  }


    //mouse click show marker on map
let clickedMarker = new mapboxgl.Marker({"color": "#FF8C00"});
let clickedCoordinates = {};


    map.on('click', function (e) {
       // gives you coorindates of the location where the map is clicked
       clickedCoordinates = e.lngLat.wrap()
       console.log(clickedCoordinates)
       document.getElementById("wayPoint").disabled = false;


	    // add the pop up to the point to map was clicked and

      clickedMarker.setLngLat(clickedCoordinates);
      //.setHTML(description) // add description to the popup
      clickedMarker.addTo(map);

      //to avoid stacking same coordinate
      if (object.geometry.coordinates.length > referenceLength)
      {
        object.geometry.coordinates.pop()

      }

      if (object.geometry.coordinates.length > 1)
      {
        object.geometry.coordinates.pop()
        object.geometry.coordinates.push([clickedCoordinates.lng,clickedCoordinates.lat])
        object.geometry.coordinates.push(locations[1].coordinates);
      }

      map.getSource("geojson").setData(object)

    });


console.log(object.geometry.coordinates)
function generateDataList()
{
  let output = "";
  for (var i = 0; i < portList.length; i++)
  {
    output += "<option value=\"" + portList[i].name + "\">" + portList[i].name + "</option>";
  }
  return output
}



function addWayPoint()
{
  if (isEmpty(clickedCoordinates) !== true)
  {
    referenceLength = object.geometry.coordinates.length;
    document.getElementById("wayPoint").disabled = true;
  }
  else
  {
    alert("Please select a location")
  }


  for (let i = 1; i < (object.geometry.coordinates.length - 1); i++)
    {
       let location = locations[i];
        let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
         marker.setLngLat(object.geometry.coordinates[i]);

         let popup = new mapboxgl.Popup({ offset: 45});
          // popup.setText(location.description);

           marker.setPopup(popup)

        // Display the marker.
         marker.addTo(map);

        // Display the popup.
        popup.addTo(map);
      }

}

let routesStorage = [];
let STORAGE_KEY_ROUTE = "routes";

function confirmRoute()
{
  if(confirm("Save this route?"))
  {
    routesStorage.push(routeClass)
    storeRoute(routesStorage)
    location.reload()
  }

}


function cancelRoute()
{
  if(confirm("Cancel this route?"))
  {
    document.getElementById("sourcePort").value = "";
    document.getElementById("desPort").value = "";
    document.getElementById("departDate").value = "";

  }
}


function storeRoute(route)
{
	if(typeof (Storage) !== "undefined")
	{
		localStorage.setItem(STORAGE_KEY_ROUTE,JSON.stringify(route)) //The port instance with the new data is uploaded into the localStorage
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

/* Global code */
if (localStorage.length > 0)
{
    let routeData = retrieveRouteData(STORAGE_KEY_ROUTE); // Retrive data into new variable

    if (routeData !== null)
    {
    for (let i=0; i< routeData.length; i++)
        {
            let getRoute = new Route();
            getRoute.fromData(routeData[i]);
            routesStorage.push(getRoute);
        }
    }
}

function toRadians(degree)
{
    let radians = degree*(Math.PI/180);
    return radians;
}

let shipDatas = {

    callback: "shipRes"
};
webServiceRequest("https://eng1003.monash/api/v1/ships/", shipDatas);

let shipNameAPI=[];
let rangeAPI = [];
let maxSpeedAPI = [];
let statusAPI = [];
let costAPI = [];
//purpose : response to the API and get th data
//parameter : shipsArray - an array of ships from API
//return output : an array with the class instance for ship API data
function shipRes(shipsArray)
{
    shipsList = shipsArray;

    for (let i = 0; i < shipsList.ships.length; i++)
    {
        shipNameAPI.push(shipsList.ships[i].name);
        rangeAPI.push(shipsList.ships[i].range);
        costAPI.push(shipsList.ships[i].cost);
        statusAPI.push(shipsList.ships[i].status);
        maxSpeedAPI.push(shipsList.ships[i].maxSpeed);
    }
}

console.log(rangeAPI);
let totalDistance;
function findShip()
{
    for (i=0;i<object.geometry.coordinates.length-1;i++)
        {
            let lat1 = object.geometry.coordinates[i];
            let lon1 = object.geometry.coordinates[i];
            let lat2 = object.geometry.coordinates[i+1];
            let lon2 = object.geometry.coordinates[i+1];
            let R = 6371e3; // metres
            let φ1 = toRadians(lat1[0]);
            let φ2 = toRadians(lat2[0]);
            let Δφ = toRadians(lat2[0]-lat1[0]);
            let Δλ = toRadians(lon2[1]-lon1[1]);

            let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                    Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ/2) * Math.sin(Δλ/2);
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

            let d = (R * c)/1000;
            if (d>=100)
                {
                    totalDistance =+ d;
                }
            else
                {
                    alert("The distance between waypoint and port is too short ")
                }
        }
    console.log(totalDistance);

    for (i=0;i<rangeAPI.length;i++)
        {
            if (rangeAPI[i]>=totalDistance && (statusAPI[i]==='available'))
                {
                    let node = document.createElement("OPTION");
                    let textnode = document.createTextNode(shipNameAPI[i]);
                    node.appendChild(textnode);
                    document.getElementById("avaShips").appendChild(node);
                }
        }
};

let totalCost;
function calculateInfo()
{
    let availableShips = document.getElementById("avaShips").innerHTML.value;
    console.log(availableShips)
    let chosenShip = document.getElementById("avaShips").value;
    console.log(chosenShip);
    let searchResultShip = shipChosen._searchForShip(chosenShip);
    let shipSearched = shipList[searchResultShip];
    let maxSpeedChosen = shipSearched.maxSpeed * 1.852;
    let costChosen = shipSearched.cost;
    totalCost = costChosen* totalDistance;

    let travelTime = (totalDistance / maxSpeedChosen); // In hours
    console.log(travelTime);
    let departureDate = document.getElementById('departDate').value;
    console.log(departureDate);
    let unixTime = Math.floor(new Date(departureDate).getTime()/1000 + (travelTime*60*60));
    console.log(unixTime);
    let deslatt = portDstny.lat;
    let deslng = portDstny.lng;
    let desApi = darksky + key + '/' + deslatt + ',' + deslng + ',' + unixTime;
    desApi = desApi.concat('?exclude=hourly,currently,flags&units=si');
    console.log(desApi);
    fetch(desApi)
      .then((response)=>{
          if(response.ok)
          {
              return response.json();
          }
          else
          {
              alert("Location unknown. Click the \"Get Current Location\" button")
          }
      })
      .then( (k) =>{
        document.getElementById("summ2").innerHTML =  k.daily.summary;

      })
      .catch( (err) =>{
          console.log('Error:', err.message);
      });
};
