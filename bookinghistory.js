"use strict"

let currentList = document.getElementById("currentbooking-list");
let futureList = document.getElementById("futurebooking-list");
let historyList = document.getElementById("history-list");

let globRoutes; //variable to load and save all the routes from local storage
let currentTime = new Date()

//Categorize all routes and display on the main page
function loadRoutes(routesInfo)
{
  console.log(routesInfo)
  let currentListHTML = "";
  let futureListHTML = "";
  let historyListHTML = "";
  let liveDate = currentTime.getDate();
  let liveMonth = currentTime.getMonth() + 1;
  let liveYear = currentTime.getFullYear();

  if (routesInfo !== [])
  {
    for (var i = 0; i < routesInfo.length; i++)
    {

      if ( (Number(routesInfo[i]._departureDate.substr(0,4))-liveYear) == 0 && (Number(routesInfo[i]._departureDate.substr(5,2))-liveMonth) == 0 && (Number(routesInfo[i]._departureDate.substr(8,2))-liveDate) == 0)
      {
        currentListHTML += "<tr> <td onmousedown=\"viewRouteInformation("+i+")\" class=\"full-width mdl-data-table__cell--non-numeric\">" + routesInfo[i]._sourcePort._name + " &rarr; " + routesInfo[i]._desPort._name;
        currentListHTML += "<div class=\"subtitle\">" + "Depature Date:" + routesInfo[i]._departureDate + "</div></td></tr>";
      }

      if ((Number(routesInfo[i]._departureDate.substr(0,4))-liveYear) >= 0 && (Number(routesInfo[i]._departureDate.substr(5,2))-liveMonth) >= 0 )
      {
        if ( (Number(routesInfo[i]._departureDate.substr(5,2))-liveMonth) == 0 && (Number(routesInfo[i]._departureDate.substr(8,2))-liveDate) > 0)
        {
          currentListHTML += "<tr> <td onmousedown=\"viewRouteInformation("+i+")\" class=\"full-width mdl-data-table__cell--non-numeric\" bgcolor=\"#D5E0EE\">" + routesInfo[i]._sourcePort._name + " &rarr; " + routesInfo[i]._desPort._name;
          currentListHTML += "<div class=\"subtitle\">" + "Depature Date:" + routesInfo[i]._departureDate + "</div></td></tr>";
        }
        else
        {
          if ( (Number(routesInfo[i]._departureDate.substr(5,2))-liveMonth) == 0 && (Number(routesInfo[i]._departureDate.substr(8,2))-liveDate) > 0)
          {
          futureListHTML += "<tr> <td onmousedown=\"viewRouteInformation("+i+")\" class=\"full-width mdl-data-table__cell--non-numeric\" bgcolor=\"#D5E0EE\">" + routesInfo[i]._sourcePort._name + " &rarr; " + routesInfo[i]._desPort._name;
          futureListHTML += "<div class=\"subtitle\">" + "Depature Date:" + routesInfo[i]._departureDate + "</div></td></tr>";
          }
          else
          {
            historyListHTML += "<tr> <td onmousedown=\"viewRouteInformation("+i+")\" class=\"full-width mdl-data-table__cell--non-numeric\" bgcolor=\"#D5E0EE\">" + routesInfo[i]._sourcePort._name + " &rarr; " + routesInfo[i]._desPort._name;
            historyListHTML += "<div class=\"subtitle\">" + "Depature Date:" + routesInfo[i]._departureDate + "</div></td></tr>";
          }
        }
      }

      else if  ((Number(routesInfo[i]._departureDate.substr(0,4))-liveYear) < 0)
      {
        historyListHTML += "<tr> <td onmousedown=\"viewRouteInformation("+i+")\" class=\"full-width mdl-data-table__cell--non-numeric\" >" + routesInfo[i]._sourcePort._name + " &rarr; " + routesInfo[i]._desPort._name;
        historyListHTML += "<div class=\"subtitle\">" + "Depature Date:" + routesInfo[i]._departureDate + "</div></td></tr>";
      }

    }
  }

  if (currentListHTML == "")
  {
    currentListHTML = "<tr> <td class=\"full-width mdl-data-table__cell--non-numeric\" bgcolor=\"#D5E0EE\">" + "No ongoing routes at the moment" + "</td></tr>";
  }
  if (futureListHTML == "")
  {
    futureListHTML = "<tr> <td class=\"full-width mdl-data-table__cell--non-numeric\" bgcolor=\"#D5E0EE\">" + "No scheduled routes at the moment" + "</td></tr>";
  }
  if (historyListHTML == "")
  {
    historyListHTML = "<tr> <td class=\"full-width mdl-data-table__cell--non-numeric\" bgcolor=\"#D5E0EE\">" + "No historical routes at the moment" + "</td></tr>";
  }

  historyList.innerHTML = historyListHTML
  futureList.innerHTML = futureListHTML
  currentList.innerHTML = currentListHTML
}

//Purpose: Store the routes index, link to html page
//Parameter: index - index of the clicked route
function viewRouteInformation(index)
{
  storeParticularRoute(index)
  location.href = 'bookinghistory.html'
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

//Call retrieveRouteData() to store local item to globRoutes
if (localStorage.length > 0)
{
  let routeDatas = retrieveRouteData("routes"); // Retrive data into new variable
  globRoutes = routeDatas;//assign globRoutes to local data

  if (routeDatas !== null)
  {
      loadRoutes(routeDatas);//Call loadRoutes function to display routes on map
  }
  else
  {
    let noDataList = "No data available"
    historyList.innerHTML = noDataList;
    futureList.innerHTML = noDataList;
    currentList.innerHTML = noDataList;
  }

}

//purpose : store route data object into local storage
//parameter : routedata - route data object
//return output : route data is stored in local storage
function storeParticularRoute(routedata)
{
  if(typeof (Storage) !== "undefined")
	{
		localStorage.setItem("routeIndex",JSON.stringify(routedata)) //The route instance with the new data is uploaded into the localStorage
	}
	else
	{
		alert("The current browser doesn't support local storage");
	}
}
