"use strict";

mapboxgl.accessToken = "pk.eyJ1Ijoic2Ftd29uZzEzOSIsImEiOiJjazB1dGZ5OHcwcnd5M2lsYTRqNG5ycm9rIn0.7219ikKXH6Z6tixAlsr5mg";
let map = new  mapboxgl.Map({
  container: 'mapAreaBooking',
 center: [44.63, 28.77],
 zoom: 1,
 style: 'mapbox://styles/mapbox/streets-v9'
});

document.getElementById("routeinfo").style.display = "none";
document.getElementById("mapAreaBooking").style.display = "none";

function popup()
{
  if (document.getElementById("routeinfo").style.display === "none")
  {
    document.getElementById("routeinfo").style.display = "block";
    document.getElementById("mapAreaBooking").style.display = "block";
  }
  else {
    document.getElementById("routeinfo").style.display = "none";
    document.getElementById("mapAreaBooking").style.display = "none";
  }
}
