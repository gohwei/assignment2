"use strict"
class Port
{
  constructor(name, country, type, size, locprecision, lat, lng)
  {
    this._name = name;
    this._country = country;
    this._type = type;
    this._size = size;
    this._locprecision = locprecision;
    this._lat = lat;
    this._lng = lng;
  }

  get name()
  {
    return this._name;
  }

  get country()
  {
    return this._country;
  }

  get type()
  {
    return this._type;
  }

  get size()
  {
    return this._size;
  }

  get locprecision()
  {
    return this._locprecision;
  }

  get lat()
  {
    return this._lat;
  }

  get lng()
  {
    return this._lng;
  }

  set name(newName)
  {
    this._name = newName;
  }

  set country(newCountry)
  {
    this._country = newCountry;
  }

  set type(newType)
  {
    this._type = newType;
  }

  set size(newSize)
  {
    this._size = newSize;
  }

  set locprecision(newLocprecision)
  {
    this._locprecision = newLocprecision;
  }

  set lat(newLat)
  {
    this._lat = newLat;
  }

  set lng(newLng)
  {
    this._lng= newLng;
  }

   _searchForPort(port)
    {
        /*
         * This is a private method searches the port for a given portName
         * If it exists, the index is returned; else it returns -1.
         */

        let result = -1; // assume it's never found
        if (port !== "")
        {
            if (portList.length >= 1) // ensures that theres at least 1 item in array
            {
                result = portList.findIndex(
                function(arrayItem)
                {
                    return arrayItem.name.toUpperCase() == port.toUpperCase();
                });
                
                if(result == -1 && newPortList.length >=1)
                    {
                        result = newPortList.findIndex(
                        function(newArrayItem)
                        {
                            return newArrayItem.name.toUpperCase() == port.toUpperCase();
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

  enrolPort()
    {
			let portname = document.getElementById("portName").value

                // check if port already enrolled
                let searchResult = this._searchForPort(portname);
                if (searchResult == -1) // port not found
                {
                    let portcountry = portCountry;
                    let porttype = document.getElementById("portType").value;
                    let portsize = document.getElementById("portSize").value;
                    let portlocprecision = document.getElementById("portLocationPrecision").value;
                    let portlat = portLat;
                    let portlng = portLng;
                    let port = new Port(portname, portcountry, porttype, portsize, portlocprecision, portlat, portlng);

                     return port;
                }
                 else if(searchResult >= 0)
                    {
                        alert(" This name is already registered !!!  ")
                        return null;
                    }
                else
                    {
                        alert(" Please enter a port name! ")
                        return null;
                    }


    }

  toString()
  {
    return this._name ;
  }

  fromData(dataObject)
	{
		this._name = dataObject._name;
        this._country = dataObject._country;
        this._type = dataObject._type;
        this._size = dataObject._size;
        this._locprecision = dataObject._locprecision;
        this._lat = dataObject._lat;
        this._lng = dataObject._lng;
	}

}

/* Functions for page */
let portsListElement = document.getElementById('portsList');

// global variable to hold the ports information
let portsList = [];    //data array from API
let portList =[];      //all port data
let newPortList = [];  //add port data

// Make the API call to the ports API for the data provided below
let portData = {

    callback: "portsResponse"
};
webServiceRequest("https://eng1003.monash/api/v1/ports/", portData);

function portsResponse(portsArray)
{
    portsList = portsArray;

    for (let i = 0; i < portsList.ports.length; i++)
    {
        let portName, portCountry, portType, portSize, portLocprecision, portLat, portLng;
        portName = portsList.ports[i].name;
        portCountry = portsList.ports[i].country;
        portType = portsList.ports[i].type;
        portSize = portsList.ports[i].size;
        portLocprecision = portsList.ports[i].locprecision;
        portLat = portsList.ports[i].lat;
        portLng = portsList.ports[i].lng;

        let portAPI = new Port (portName, portCountry, portType, portSize, portLocprecision, portLat, portLng);
        portList.push(portAPI);
    }
    portsListElement.innerHTML = generatePortList();
}

//Generate port name list from a array that stored the API data -in class
function generatePortList()
{

	let output = "";
    
    //create row for add port
     for (let j = 0; j < newPortList.length; j++)
	{
        output += "<tr>"
        output += "<td onmousedown=\"viewNewPortInfo("+j+")\" class=\"full-width mdl-data-table__cell--non-numeric\">"
        output += "<b>*NEW PORT*</b><br><br>"
        output += "Port Name: " + newPortList[j].name ;
        output += "<div class=\"subtitle\">" + "Country: " + newPortList[j].country +"<br><br><b>VIEW</b></div></td></tr>";
	}
    
    //create row for port from API
	for (let i = 0; i < portList.length; i++)
	{
        output += "<tr>"
        output += "<td onmousedown=\"viewPortInfo("+i+")\" class=\"full-width mdl-data-table__cell--non-numeric\">"
        output += "Port Name: " + portList[i].name ;
        output += "<div class=\"subtitle\">" + "Country: " + portList[i].country +"<br><br><b>VIEW</b></div></td></tr>";
	}
    
    return output
}
/**
 * viewPortInfo function
 * @param  index of selected port to view information
 * This function displays the information for the selected port.
 */
document.getElementById("portInfoCard").style.display = "none";
function viewPortInfo(portIndex)
{
    document.getElementById("portInfoCard").style.display = "block";
	document.getElementById("name").innerText = portList[portIndex].name;
	document.getElementById("country").innerText = portList[portIndex].country;
    document.getElementById("type").innerText = portList[portIndex].type;
    document.getElementById("size").innerText = portList[portIndex].size;
    document.getElementById("locPrecision").innerText = portList[portIndex].locprecision;
    document.getElementById("lat").innerText = portList[portIndex].lat;
    document.getElementById("lng").innerText = portList[portIndex].lng;

}

function viewNewPortInfo(portIndex)
{
    document.getElementById("portInfoCard").style.display = "block";
	document.getElementById("name").innerText = newPortList[portIndex].name;
	document.getElementById("country").innerText = newPortList[portIndex].country;
    document.getElementById("type").innerText = newPortList[portIndex].type;
    document.getElementById("size").innerText = newPortList[portIndex].size;
    document.getElementById("locPrecision").innerText = newPortList[portIndex].locprecision;
    document.getElementById("lat").innerText = newPortList[portIndex].lat;
    document.getElementById("lng").innerText = newPortList[portIndex].lng;

}

function addPortForm()
{
		let dialogBox = "";
		dialogBox += '<dialog class="mdl-dialog" style="width:50vw;"><h4 class="mdl-dialog__title" style="font-family: georgia">Add a New Port</h4>';

        dialogBox += '<div class="mdl-dialog__content"><div style="color:blue; font-size: 1.1em; font-weight: 500">Please fill up the detail information of the port.</div>'

        dialogBox += '<b> Port Name: </b></label><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" placeholder=" Eg: Kipindi" id="portName"></div><br>';

        dialogBox += '<b> Type: </b></label><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" placeholder=" Eg: River "id="portType"></div><br>';

        dialogBox += '<b> Size: </b></label><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" placeholder=" Eg: Very small " id="portSize"></div><br>';

        dialogBox += '<b> Location Precision: </b></label><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" placeholder=" Eg: Unknown " id="portLocationPrecision"></div><br>';

        dialogBox += '<b> Address: </b></label><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" id="address"></div><br>';

		dialogBox +='</div><div class="mdl-dialog__actions"><button type="button" class="mdl-button close" onclick = "getPortLocation()" id="confirmButton">Confirm</button></div></dialog>';
		document.getElementById("hiddenDialog").innerHTML = dialogBox;
		let dialog = document.querySelector('dialog');
	    let showDialogButton = document.querySelector('#show-dialog');
	    if (!dialog.showModal) {
	      dialogPolyfill.registerDialog(dialog);
	    }
	    dialog.showModal();
	    dialog.querySelector('.close').addEventListener('click', function() {
	    dialog.close();
	    });
}

function geocodeRequest(key, address, callback)
{
    let script = document.createElement('script');
    script.src = "https://api.opencagedata.com/geocode/v1/json?q=" + encodeURIComponent(address) + "&key=" + key + "&jsonp=" + callback;
    document.body.appendChild(script);
}

function getPortLocation()
{
    let myAddress = document.getElementById("address").value;
    let apiKey = "b92d8c11e38c4e45a4497ce3c89c408d"
    if (myAddress !== "")
    {
        geocodeRequest(apiKey, myAddress, 'addPort');
    }

    else {
        alert("Please fill up the port information !!!")
    }
};

// global variable to hold the add ports information that get from geocode
let portCountry = [];
let portLat = [];
let portLng = [];

function addPort(portInfo)
{
    let addPortInfo = portInfo;
    if (addPortInfo.results[0] !== undefined)
    {
        portCountry = addPortInfo.results[0].components.country;
        portLat = addPortInfo.results[0].geometry.lat;
        portLng = addPortInfo.results[0].geometry.lng;

        let port = new Port();
        let portEnrolment = port.enrolPort();
        if (portEnrolment !== null)
        {
            newPortList.push(portEnrolment); //push new port to a new list
            storeDataToLS(newPortList); //store the add port list to local storage
        }
            portsListElement.innerHTML = generatePortList();
    }
    else 
    {
        alert("This address is invalid ! Please enter a valid address !!!")
    }

};

// local storage

let key ="port";
//Store data into local storage
function storeDataToLS(port)
{
	if(typeof (Storage) !== "undefined")
	{
		localStorage.setItem(key,JSON.stringify(port)) //The port instance with the new data is uploaded into the localStorage
	}
	else
	{
		alert("The current browser doesn't support local storage");
	}
}

//Retrive data from local storage and convert to javascript object
function retrieveDataFromLS(storageKey)
{
	if (typeof(Storage) !== "undefined")
	{
		return JSON.parse(localStorage.getItem(storageKey));
	}
}

/* Global code */
if (localStorage.length > 0)
{
    let portdata = retrieveDataFromLS(key); // Retrive data into new variable
    for (let i=0; i< portdata.length; i++)
        {
            let port = new Port();
            port.fromData(portdata[i]);// convert data back into instance
            newPortList.push(port);
        }
    portsListElement.innerHTML = generatePortList(); //And the page display is updated with the previously "saved" data
}


function search() {
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchPort");
  filter = input.value.toUpperCase();
  table = document.getElementById("portsList");
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
