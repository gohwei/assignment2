"use strict";


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
