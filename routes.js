class Route
    {
        constructor (sourcePort,desPort)
        {
            this._sourcePort = sourcePort;
            this._desPort = desPort;
            // this._shipName = shipName;
            // this._distance = distance;
            this._waypoint = [];
            // this._weather = weather;
            // this._departureDate = departureDate;

        }


    }


let srcPort = new Port()
let wayPointLocation = [];
let locations

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


function searchRoutes()
{

        let Source = document.getElementById("sourcePort").value
        let Destiny = document.getElementById("desPort").value
        console.log(Destiny)
        let searchResultSrc = srcPort._searchForPort(Source);
        let searchResultDstny = srcPort._searchForPort(Destiny);
        let portSrc = portList[searchResultSrc];
        let portDstny = portList[searchResultDstny];
        let newRoute = new Route(portSrc,portDstny);
        console.log(newRoute);
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


      let deslatt = portDstny.lat;
      let deslng = portDstny.lng;
        let desApi = darksky + key + '/' + deslatt + ',' + deslng;
      desApi = desApi.concat('?exclude=minutely,hourly,daily&units=si');

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
