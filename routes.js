"use strcit"
class Route
    {
        constructor (sourcePort,desPort,departureDate,distance,cost,selectedShip)
        {
            this._sourcePort = sourcePort;
            this._desPort = desPort;

            // this._shipName = shipName;
            // this._distance = distance;

            this._departureDate = departureDate;
            this._distance = distance;
            this._cost = cost;
            this._waypoint = [];
            this._weather = [];
            this._selectedShip = selectedShip;

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

            get distance()
            {
              return this._distance
            }
            set distance(distance)
            {
              this._distance = distance;
            }

            get cost()
            {
              return this._cost
            }
            set cost(cost)
            {
              this._cost = cost;
            }



        storeWaypoint(waypoints)
        {
          for (var i = 0; i < waypoints.length; i++)
          {
            this._waypoint.push(waypoints[i])
          }

        }

        storeWeather(weather)
        {
          for (var i = 0; i < weather.length; i++)
          {
            this._weather.push(weather[i])
          }

        }



        fromData(routeData)
        {
          this._sourcePort = routeData._sourcePort;
          this._desPort = routeData._desPort;
          this._departureDate = routeData._departureDate;
          this._distance = routeData._distance;
          this._cost = routeData._cost;
          this._selected = routeData._selectedShip;

          for (let i = 0; i < routeData._waypoint.length; i++)
          {
            this._waypoint.push(routeData._waypoint[i])
          }


          // for (let i = 0; i < routeData._weather.length; i++)
          // {
          //   this._waypoint.push(routeData._weather[i])
          // }

        }
}

console.log(newPortList);
let srcPort = new Port()
let wayPointLocation = [];
let locations
let routeClass = new Route();
let shipChosen = new Ship();
let darksky = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/';
key = "9610451768f0eed3dde6aaa8604ffd41";

let nowDate = new Date()
setMinDate();

function setMinDate()
{
  let minAttribute = "";
  let liveDate = nowDate.getDate();
  let liveMonth = nowDate.getMonth() + 1;
  let liveYear = nowDate.getFullYear();
  if(liveDate < 10)
    {
      liveDate='0'+ liveDate;
    }
  if(liveMonth < 10)
    {
      liveMonth = '0'+ liveMonth;
    }
  minAttribute = liveYear +'-' + liveMonth + '-' + liveDate;
  console.log(minAttribute)

  document.getElementById("departDate").setAttribute("min",minAttribute);
}

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
let portSrc;
let departTime;
let weatherInfo = [];

function searchRoutes()
{
  let Source = document.getElementById("sourcePort").value
  let Destiny = document.getElementById("desPort").value
  departTime = document.getElementById("departDate").value

  if (Source == "" | Destiny == "" | departTime =="")
  {
    alert("Please fill in all required field including 'From', 'Depart At' and 'Destination'!")
  }

  else
  {
    let searchResultSrc = srcPort._searchForPort(Source);
    let searchResultDstny = srcPort._searchForPort(Destiny);
    portSrc = portList[searchResultSrc];
    portDstny = portList[searchResultDstny];

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
          let marker = new mapboxgl.Marker({ "color": "#" });
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
              weatherInfo.push(j.currently.summary)

            })
            .catch( (err) =>{
                console.log('Error:', err.message);
            });


            let deslatt = portDstny.lat;
            let deslng = portDstny.lng;
            let desApi = darksky + key + '/' + deslatt + ',' + deslng;
            desApi = desApi.concat('?exclude=hourly,minutely,daily,flags&units=si');
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
                document.getElementById("summ2").innerHTML =  k.currently.summary;
                weatherInfo.push(k.currently.summary)


              })
              .catch( (err) =>{
                  console.log('Error:', err.message);
              });
          }

  }



//mouse click show marker on map
let clickedMarker = new mapboxgl.Marker({"color": "#FF3333"});
let clickedCoordinates = {};


map.on('click', function (e) {
   // gives you coorindates of the location where the map is clicked

   clickedCoordinates = e.lngLat.wrap()

   if (object.geometry.coordinates.length == 0)
   {
     alert("Please add a route!")
   }

   else
   {
  // add the pop up to the point to map was clicked and
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

        //.setHTML(description) // add description to the popup

        let checkDistance = checkAppropirateDistance(object.geometry.coordinates)
        //to avoid stacking same coordinate
        if (checkDistance !== false)
        {
          document.getElementById("wayPoint").disabled = false;
          clickedMarker.setLngLat(clickedCoordinates);
          //.setHTML(description) // add description to the popup
          clickedMarker.addTo(map);
          map.getSource("geojson").setData(object)
        }
        else
        {
          alert("The distance between waypoint or port too near!")
        }
    }
});

console.log(object.geometry.coordinates)

//purpose : generate a list of port name in dropdown list
//return output : a list of port name in dropdown list
function generateDataList()
{
  let output = "";
  for (var i = 0; i < portList.length; i++)
  {
    output += "<option value=\"" + portList[i].name + "\">" + portList[i].name + "</option>";
  }
  return output
}

//purpose : display marker when waypoint is added on map
//return output : pink marker shown on map
function addWayPoint()
{
  if (isEmpty(clickedCoordinates) !== true)
  {
    referenceLength = object.geometry.coordinates.length;
    document.getElementById("wayPoint").disabled = true;
    wayPointLocation.push([clickedCoordinates.lng,clickedCoordinates.lat])

    findShip()
  }
  else
  {
    alert("Please select a location")
  }

let description = '';
  for (let i = 1; i < (object.geometry.coordinates.length - 1); i++)
    {

        let location = locations[i];
        let marker = new mapboxgl.Marker({ "color": "#FF3333" });
         marker.setLngLat(object.geometry.coordinates[i]);
        let waypointWeather = object.geometry.coordinates[i];
        let popup = new mapboxgl.Popup({ offset: 45});
        let waypointLatt = waypointWeather[1];
        let waypointLng = waypointWeather[0];
        let desApi = darksky + key + '/' + waypointLatt + ',' + waypointLng;
        desApi = desApi.concat('?exclude=hourly,minutely,daily,flags&units=si');
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

        description =  k.currently.summary;
        console.log(description);
        popup.setText(description);

        marker.setPopup(popup)

        // Display the marker.
         marker.addTo(map);

        // Display the popup.
        popup.addTo(map);
      })
      .catch( (err) =>{
          console.log('Error:', err.message);
      });
      }

}

let routesStorage = [];

//local storage
let STORAGE_KEY_ROUTE = "routes";

//purpose : save a route by first confirming user wishes to do so
//return output : route is saved to local storage
function confirmRoute()
{
  if(confirm("Save this route?"))
  {
    routesStorage.push(routeClass)
    storeRoute(routesStorage)
    location.reload()
  }
}

//purpose : cancel route by first confirming user wishes to do so
//return output : reload the page
function cancelRoute()
{
  if(confirm("Cancel this route?"))
  {
    location.reload()
  }
}

//purpose : store route data object into local storage
//parameter : route - route data object
//return output : route data is stored in local storage
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

//purpose : Retrive data from local storage and convert to Javascript object
//parameter : storageKey - key value
//return output : Data in the form of Javascript object
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

//purpose : convert the latitude and longitude from degree to radians
//parameter : degree - latitude/longitude in degree
//return output : latitude/longitude in radians
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
let totalDistance = 0;

function checkAppropirateDistance(array)
{
    let lat1 = array[referenceLength-2];
    let lon1 = array[referenceLength-2];
    let lat2 = array[referenceLength-1];
    let lon2 = array[referenceLength-1];
    let lat3 = array[referenceLength];
    let lon3 = array[referenceLength];
    let R = 6371e3; // metres
    let lat1toRad = toRadians(lat1[0]);
    let lat2toRad = toRadians(lat2[0]);
    let phi = toRadians(lat2[0]-lat1[0]);
    let lamda = toRadians(lon2[1]-lon1[1]);

    let lat3toRad = toRadians(lat3[0]);
    let phi1 = toRadians(lat3[0]-lat2[0]);
    let lamda1 = toRadians(lon3[1]-lon2[1]);

    let a1 = Math.sin(phi/2) * Math.sin(phi/2) +
            Math.cos(lat1toRad) * Math.cos(lat2toRad) *
            Math.sin(lamda/2) * Math.sin(lamda/2);
    let c1 = 2 * Math.atan2(Math.sqrt(a1), Math.sqrt(1-a1));
    let a2 = Math.sin(phi1/2) * Math.sin(phi1/2) +
            Math.cos(lat2toRad) * Math.cos(lat3toRad) *
            Math.sin(lamda1/2) * Math.sin(lamda1/2);
    let c2 = 2 * Math.atan2(Math.sqrt(a2), Math.sqrt(1-a2));
    let d1 = (R * c1)/1000;
    let d2 = (R * c2)/1000;

    if (d1 <= 50 | d2 <= 100 )
    {
      return false
    }
    else
    {
      return true
    }
}

//purpose : find available ships based on distance need to be travelled
//return output : a list of available ships
function findShip()
{
  let Distance = 0;
    for (i=0;i<object.geometry.coordinates.length-1;i++)
        {
            let lat1 = object.geometry.coordinates[i];
            let lon1 = object.geometry.coordinates[i];
            let lat2 = object.geometry.coordinates[i+1];
            let lon2 = object.geometry.coordinates[i+1];
            let R = 6371e3; // metres
            let phi1 = toRadians(lat1[0]);
            let phi2 = toRadians(lat2[0]);
            let phiDiffer = toRadians(lat2[0]-lat1[0]);
            let lamdaDiffer = toRadians(lon2[1]-lon1[1]);

            let a = Math.sin(phiDiffer/2) * Math.sin(phiDiffer/2) +
                    Math.cos(phi1) * Math.cos(phi2) *
                    Math.sin(lamdaDiffer/2) * Math.sin(lamdaDiffer/2);
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

            let d = (R * c)/1000;
            Distance += d
        }

        totalDistance = Distance;
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

    newRoute = new Route(portSrc,portDstny,departTime,totalDistance,totalCost,shipSearched);
    routeClass = newRoute;
    routeClass.storeWaypoint(wayPointLocation);
    routeClass.storeWeather(weatherInfo);
    console.log(routeClass)

};
