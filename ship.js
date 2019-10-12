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
    this._newShip = [];
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
    return
  }

  _searchForShip(ship)
  {
      /*
       * This is a private method searches the ship for a given portName
       * If it exists, the index is returned; else it returns -1.
       */
      let result = -1; // assume it's never found
      if (ship !== "")
      {
        if (shipList.length >= 1) // ensures that theres at least 1 item in array
        {
            result = shipList.findIndex(
                function(arrayItem)
                {
                    return arrayItem.name.toUpperCase() == ship.toUpperCase();
                }
            );
        }
     }
     else
     {
        result = "null";
     }
      return result;
  }

  addLocalShip(newLocalShip)
  {
    if (newLocalShip instanceof Ship)
    {
      let shipName = document.getElementById("shipName").value;
      let searchResult = this._searchForShip(shipName);

      if (searchResult == -1)
      {
        this._newShip.push(newLocalShip);
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
  }

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

  fromDataNew(newShipObject)
  {
    this._newShip = [];

    for (let i = 0; i < newShipObject._newShip.length; i++)
    {
      let ship = new Ship()
      ship.fromData(newShipObject._newShip[i]);
      this._newShip.push(ship);
    }
  }

}

document.getElementById("hideShipInformation").style.display = "none";


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

let localShip = new Ship()
let shipListElement = document.getElementById('shipList');
// global variable to hold the ships information
let shipList = [];

// Make the API call to the ports API for the data provided below
let shipData = {

    callback: "shipResponse"
};
webServiceRequest("https://eng1003.monash/api/v1/ships/", shipData);

function shipResponse(shipArray)
{
    shipList = shipArray;

    // List view section heading: ships list
    let listHTML = "";

    // Generate some HTML table rows for the ships array
    for (let i = 0; i < shipList.ships.length; i++)
    {
        listHTML += "<tr>";
        listHTML += "<td>" + shipList.ships[i].name + "</td>";
        listHTML += "<td>" + shipList.ships[i].maxSpeed + "</td>";
        listHTML += "<td>" + shipList.ships[i].range + "</td>";
        listHTML += "<td>" + shipList.ships[i].desc + "</td>";
        listHTML += "<td>" + shipList.ships[i].cost + "</td>";
        listHTML += "<td>" + shipList.ships[i].status + "</td>";
        listHTML += "<td>" + shipList.ships[i].comments + "</td>";
        listHTML += "</tr>";
    }

    // Insert the list view elements into the flights list.
    shipListElement.innerHTML = listHTML;

}

//PROBLEM
function newShipResponse()
{
    let shipArray = localShip._newShip;

    // List view section heading: ships list
    let listHTML = "";

    // Generate some HTML table rows for the ships array
    for (let i = 0; i < shipArray.length; i++)
    {
        listHTML += "<tr>";
        listHTML += "<td>" + shipArray[i].name + "</td>";
        listHTML += "<td>" + shipArray[i].maxSpeed + "</td>";
        listHTML += "<td>" + shipArray[i].range + "</td>";
        listHTML += "<td>" + shipArray[i].description + "</td>";
        listHTML += "<td>" + shipArray[i].cost + "</td>";
        listHTML += "<td>" + shipArray[i].status + "</td>";
        listHTML += "<td>" + shipArray[i].comment + "</td>";
        listHTML += "</tr>";
    }

    // Insert the list view elements into the flights list.
    return listHTML;

}

function shipInformation(shipIndex)
{
  let shipInformationTab = document.getElementById("hideShipInformation");

  let listHTML = "";

  listHTML += "<div class=\"mdl-card__title\"><h2 class=\"mdl-card__title-text\">" + "Ship Information" + "</h2></div>"
  listHTML += "<div class=\"mdl-card__supporting-text\">";
  listHTML += "<span>" + "Ship Name: " +  shipList.ships[shipIndex].name + "</span><br/>";
  listHTML += "<span>" + "Max Speed(knots): " +  shipList.ships[shipIndex].maxSpeed + "</span><br/>";
  listHTML += "<span>" + "Range(km): " +  shipList.ships[shipIndex].range + "</span><br/>";
  listHTML += "<span>" + "Description: " +  shipList.ships[shipIndex].desc + "</span><br/>";
  listHTML += "<span>" + "Cost(unit per km): " +  shipList.ships[shipIndex].cost + "</span><br/>";
  listHTML += "<span>" + "Status: " +  shipList.ships[shipIndex].status + "</span><br/>";
  listHTML += "<span>" + "Comment: " +  shipList.ships[shipIndex].comments + "</span><br/>";



  listHTML += "</div>";

  shipInformationTab.innerHTML = listHTML

  if (shipInformationTab.style.display === "none")
  {
  shipInformationTab.style.display = "block";
  }
  else {
    shipInformationTab.style.display = "none";
  }

}

let STORAGE_KEY = "SHIP_INFORMATION"

function storeShipData()
{

  if (typeof (Storage) !== "undefined")
  {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(localShip));
  }

  else
  {
      alert("localStorage is not supported by current browser!");
  }
}

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

function addNewShip()
{
  let shipName = document.getElementById("shipName").value;
  let maxSpeed = document.getElementById("maxSpeed").value;
  let range = document.getElementById("range").value;
  let description = document.getElementById("description").value;
  let cost = document.getElementById("cost").value;
  let status = document.getElementById("status").value;
  let comment = document.getElementById("comment").value;

  let ship = new Ship(shipName, maxSpeed, range, description, cost, status, comment);
  localShip.addLocalShip(ship)
  storeShipData()
  document.getElementById("newShipTable").innerHTML = newShipResponse()

}

function retrieveShipData()
{
  let newShipObject = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (newShipObject !== null)
  {
    localShip.fromDataNew(newShipObject);
    document.getElementById("newShipTable").innerHTML = newShipResponse()
    //refresh : code to run on load to display content on page
  }
}

retrieveShipData()

function searchForShip() {
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchShip");
  filter = input.value.toUpperCase();
  table = document.getElementById("shipList");
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
