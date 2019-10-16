class Ship
{
  constructor(name, maxSpeed, range, description, cost, status, comment)
  {
    this._name = name;
    this._maxSpeed = maxSpeed;
    this._range = range;
    this._description = description;
    this._cost = cost;
    this._status = status;
    this._comment = comment;
  }

  get name()
  {
    return this._name;
  }

  get maxSpeed()
  {
    return this._maxSpeed;
  }

  get range()
  {
    return this._range;
  }

  get description()
  {
    return this._description;
  }

  get cost()
  {
    return this._cost;
  }

  get status()
  {
    return this._status;
  }

  get comment()
  {
    return this._comment;
  }

  set name(newName)
  {
    this._name = newName;
  }

  set maxSpeed(newMaxSpeed)
  {
    this._maxSpeed = newMaxSpeed;
  }

  set range(newRange)
  {
    this._range = newRange;
  }

  set description(newDescription)
  {
    this._description = newDescription;
  }

  set cost(newCost)
  {
    this._cost = newCost;
  }

  set status(newStatus)
  {
    this._status = newStatus;
  }

  set comment(newComment)
  {
    this._comment = newComment;
  }

  toString()
  {
    return this._name;
  }

  //purpose : Private method to search the ship for a given ship name
  //parameter : ship - ship name
  //return output : index
  _searchForShip(ship)
  {

      //If it exists, the index is returned; else it returns -1.

      let result = -1; // assume it's never found
      if (ship !== "")
      {
        if (shipList.length >= 1) // ensures that theres at least 1 item in array
        {
            result = shipList.findIndex(
                function(arrayItem)
                {
                    return arrayItem.name.toUpperCase() == ship.toUpperCase();
                });

                if(result == -1 && newShipList.length >=1)
                    {
                        result = newShipList.findIndex(
                        function(newArrayItem)
                        {
                            return newArrayItem.name.toUpperCase() == ship.toUpperCase();
                        });
                    }
            }
        }
        else
        {
            result = "null";
        }

        return result

  }

  //purpose : Get the data of ship that are input by the user from the dialog box
  //return output : ship instance
  addLocalShip()
  {
    let shipName = document.getElementById("shipName").value;
    let searchResult = this._searchForShip(shipName);

    if (searchResult == -1)  //ship not found
    {

      let ship = new Ship(shipName, maxSpeed, range, description, cost, status, comment);

      return ship;
    }

    else if(searchResult >= 0)
    {
      alert(" This name is already registered !!!  ")
      return null;
    }

    else
    {
      alert(" Please enter a ship name! ")
      return null;
    }
  }

  //purpose : convert the data back into a class instance
  //parameter : shipObject - data object of ship
  //return output : class instance of ship
  fromData(shipObject)
  {
    this._name = shipObject._name;
    this._maxSpeed = shipObject._maxSpeed;
    this._range = shipObject._range;
    this._description = shipObject._description;
    this._cost = shipObject._cost;
    this._status = shipObject._status;
    this._comment = shipObject._comment;

  }

}

/* Functions for page */
function webServiceRequest(url,data)
{
  // Build URL parameters from data object.
    let params = "";
    // For each key in data object...
    for (let key in data)
    {
        if (data.hasOwnProperty(key))
        {
            if (params.length == 0)
            {
                // First parameter starts with '?'
                params += "?";
            }
            else
            {
                // Subsequent parameter separated by '&'
                params += "&";
            }

            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(data[key]);

            params += encodedKey + "=" + encodedValue;
         }
    }
    let script = document.createElement('script');
    script.src = url + params;
    document.body.appendChild(script);
}


let shipsListElement = document.getElementById('shipsList');

// global variable to hold the ships information
let shipsList = [];   //data array from API
let shipList = [];    //array with the class instance for api ship data
let newShipList = []; //array for local ship data

// Make the API call to the ships API for the data provided below
let shipData = {

    callback: "shipResponse"
};
webServiceRequest("https://eng1003.monash/api/v1/ships/", shipData);

//purpose : response to the API and get th data
//parameter : shipsArray - an array of ships from API
//return output : an array with the class instance for ship API data
function shipResponse(shipsArray)
{
    shipsList = shipsArray;

    for (let i = 0; i < shipsList.ships.length; i++)
    {
      let shipNameAPI, maxSpeedAPI, rangeAPI, descriptionAPI, costAPI, statusAPI, commentAPI;
      shipNameAPI = shipsList.ships[i].name;
      maxSpeedAPI = shipsList.ships[i].maxSpeed;
      rangeAPI = shipsList.ships[i].range;
      descriptionAPI = shipsList.ships[i].desc;
      costAPI = shipsList.ships[i].cost;
      statusAPI = shipsList.ships[i].status;
      commentAPI = shipsList.ships[i].comments;

      let shipAPI = new Ship (shipNameAPI, maxSpeedAPI, rangeAPI, descriptionAPI, costAPI, statusAPI, commentAPI);
      shipList.push(shipAPI);
    }

    // Insert the list view elements into the ship list.
    shipsListElement.innerHTML = generateShipList();
  }

//purpose : Generate ship name and status list from the ship list
//return output : a table with ship data from API and local storage
function generateShipList()
{

	let output = "";

    //create row for local ship
     for (let j = 0; j < newShipList.length; j++)
	   {
        output += "<tr>"
        output += "<td onmousedown=\"viewNewShipInfo("+j+")\" class=\"full-width mdl-data-table__cell--non-numeric\">"
        output += "<b>*NEW SHIP*</b><br><br>"
        output += "Ship Name: " + newShipList[j].name ;
        output += "<div class=\"subtitle\">" + "Status: " + newShipList[j].status +"<br><br><b>VIEW</b></div></td></tr>";
	   }

    //create row for ship from API
  	for (let i = 0; i < shipList.length; i++)
  	{
          output += "<tr>"
          output += "<td onmousedown=\"viewShipInfo("+i+")\" class=\"full-width mdl-data-table__cell--non-numeric\">"
          output += "Ship Name: " + shipList[i].name ;
          output += "<div class=\"subtitle\">" + "Status: " + shipList[i].status +"<br><br><b>VIEW</b></div></td></tr>";
  	}

    return output
}

 //purpose : display the information for the selected ship
 //parameter : shipIndex - index of selected ship
 //return output : info card with information of the selected ship
document.getElementById("shipInfoCard").style.display = "none";

function viewShipInfo(shipIndex)
{
    document.getElementById("shipInfoCard").style.display = "block";
  	document.getElementById("shipName").innerText = shipList[shipIndex].name;
	  document.getElementById("maxSpeed").innerText = shipList[shipIndex].maxSpeed;
    document.getElementById("range").innerText = shipList[shipIndex].range;
    document.getElementById("description").innerText = shipList[shipIndex].desc;
    document.getElementById("cost").innerText = shipList[shipIndex].cost;
    document.getElementById("status").innerText = shipList[shipIndex].status;
    document.getElementById("comment").innerText = shipList[shipIndex].comments;

}

//purpose : display the information for the selected local ship
//parameter : shipIndex - index of selected local ship
//return output : info card with information of the selected local ship
function viewNewShipInfo(shipIndex)
{
  document.getElementById("shipInfoCard").style.display = "block";
  document.getElementById("shipName").innerText = newShipList[shipIndex].name;
  document.getElementById("maxSpeed").innerText = newShipList[shipIndex].maxSpeed;
  document.getElementById("range").innerText = newShipList[shipIndex].range;
  document.getElementById("description").innerText = newShipList[shipIndex].desc;
  document.getElementById("cost").innerText = newShipList[shipIndex].cost;
  document.getElementById("status").innerText = newShipList[shipIndex].status;
  document.getElementById("comment").innerText = newShipList[shipIndex].comments;

}

//purpose : Get new ship information from the user
//return output : Display a dialog box with the input column for ship information
function addShip()
{
  let dialogBox = "";
  dialogBox += '<dialog class="mdl-dialog" style="width:50vw;"><h4 class="mdl-dialog__title">Add Ship</h4>';

  dialogBox += '<div class="mdl-dialog__content"><div style="color:black; font-size: 1em; font-weight: 500">Please fill up the detail information of the ship.</div>'

  dialogBox += '<b> Ship Name: </b><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield_input" type="text" id="shipName"><label class="mdl-textfield_label" for="shipName">Eg: Bumble Bee </label></div><br>';
  dialogBox += '<b> Max Speed (knots): </b></label><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield_input" type="number" id="maxSpeed"><label class="mdl-textfield_label" for="maxSpeed">Eg: 15 </label></div><br>';
  dialogBox += '<b> Range(km): </b></label><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield_input" type="number" id="range"><label class="mdl-textfield_label" for="range">Eg: 6576 </label></div><br>';
  dialogBox += '<b> Description: </b></label><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield_input" type="text" id="description"><label class="mdl-textfield_label" for="description">Eg: tanker </label></div><br>';
  dialogBox += '<b> Cost (units per km): </b></label><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield_input" type="number" id="cost"><label class="mdl-textfield_label" for="cost">Eg: 2 </label></div><br>';
  dialogBox += '<b> Status: </b></label><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield_input" type="text" id="status"><label class="mdl-textfield_label" for="status">Eg: available </label></div><br>';
  dialogBox += '<b> Comment: </b></label><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield_input" type="text" id="comment"><label class="mdl-textfield_label" for="comment"></label></div><br>';

  dialogBox +='</div><div class="mdl-dialog__actions"><button type="button" class="mdl-button close" onclick="addNewShip()">Confirm</button></div></dialog>';
  document.getElementById("hiddenDialog").innerHTML = dialogBox;
  let dialog = document.querySelector('dialog');
  let showDialogButton = document.querySelector('#show-dialog');
  if (!dialog.showModal)
  {
    dialogPolyfill.registerDialog(dialog);
  }
  dialog.showModal();
  dialog.querySelector('.close').addEventListener('click', function() {
    dialog.close();
  });
}

//global variable to hold the new ships information
let shipName, maxSpeed, range, description, cost, status, comment;

//purpose : add new ship into the table and store new ship into local storage
//return output : an array with class instance for local ship data
function addNewShip()
{
  shipName = document.getElementById("shipName").value;
  maxSpeed = document.getElementById("maxSpeed").value;
  range = document.getElementById("range").value;
  description = document.getElementById("description").value;
  cost = document.getElementById("cost").value;
  status = document.getElementById("status").value;
  comment = document.getElementById("comment").value;

  let ship = new Ship();
  let localShip = ship.addLocalShip();

  if (localShip !== null)
  {
    newShipList.push(localShip); //push new ship to a new ship list
    storeShipData(newShipList); //store the ship added recently to local storage
  }
    shipsListElement.innerHTML = generateShipList();
}

//local storage
let STORAGE_KEY = "SHIP_INFORMATION";

//purpose : store ship data object into local storage
//parameter : ship - ship data object
//return output : ship data is stored in local storage
function storeShipData(ship)
{
  //check that browser support local storage
  if (typeof (Storage) !== "undefined")
  {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ship));
  }

  else
  {
      alert("localStorage is not supported by current browser!");
  }
}

//purpose : Retrive data from local storage and convert to Javascript object
//parameter : storageKey - key value
//return output : Data in the form of Javascript oject
function retrieveShipData(storageKey)
{
	if (typeof(Storage) !== "undefined")
	{
		return JSON.parse(localStorage.getItem(storageKey));
	}
}

/* Global code */
if (localStorage.length > 0)
{
    let shipdata = retrieveShipData(STORAGE_KEY); // Retrive data into new variable
    for (let i = 0; i < shipdata.length; i++)
    {
        let ship = new Ship();
        ship.fromData(shipdata[i]);// convert data back into instance
        newShipList.push(ship);
    }
    shipsListElement.innerHTML = generateShipList(); //And the page display is updated with the previously "saved" data
}

//purpose : filter the table
//return output : Display the column with the keyword that is input in the text box
function searchForShip() {
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchShip");
  filter = input.value.toUpperCase();
  table = document.getElementById("shipsList");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
      txtValue = tr[i].textContent || tr[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
