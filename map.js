"use strict"
mapboxgl.accessToken = 'pk.eyJ1Ijoic2Ftd29uZzEzOSIsImEiOiJjazB1dGZ5OHcwcnd5M2lsYTRqNG5ycm9rIn0.7219ikKXH6Z6tixAlsr5mg';
let map = new  mapboxgl.Map({
    container: 'mapArea',
	center: [44.63, 28.77],
	zoom: 1,
	style: 'mapbox://styles/mapbox/streets-v9'
});

portData = {

    callback: "portsRes"
};
webServiceRequest("https://eng1003.monash/api/v1/ports/", portData);

let sourcePortLat,sourcePortLng;
console.log(newPortList);
if (newPortList.length>0)
    {
        for (i=0 ; i<newPortList.length;i++)
            {
                let portName = newPortList[i].name;
                let node = document.createElement("OPTION");
                let textnode = document.createTextNode(portName);
                node.appendChild(textnode);
                document.getElementById("sourcePort").appendChild(node);
            }
        for (i=0 ; i<newPortList.length;i++)
            {
                let portName = newPortList[i].name;
                let node = document.createElement("OPTION");
                let textnode = document.createTextNode(portName);
                node.appendChild(textnode);
                document.getElementById("desPort").appendChild(node);
            }
    }


function portsRes(portsArray)
{
    portsList = portsArray;
    for (let i =0; i<portsList.ports.length ; i++)
        {
            let portName = portsList.ports[i].name;
            let node = document.createElement("OPTION");
            let textnode = document.createTextNode(portName);
            node.appendChild(textnode);
            document.getElementById("sourcePort").appendChild(node);
        }

    for (let i =0; i<portsList.ports.length ; i++)
        {
            let portName = portsList.ports[i].name;
            let node = document.createElement("OPTION");
            let textnode = document.createTextNode(portName);
            node.appendChild(textnode);
            document.getElementById("desPort").appendChild(node);
        }
}
