mapboxgl.accessToken = 'pk.eyJ1Ijoic2Ftd29uZzEzOSIsImEiOiJjazB1dGZ5OHcwcnd5M2lsYTRqNG5ycm9rIn0.7219ikKXH6Z6tixAlsr5mg';
map = new  mapboxgl.Map({
    container: 'mapArea',
	center: [44.63, 28.77],
	zoom: 1,
	style: 'mapbox://styles/mapbox/streets-v9'
});

function searchRoutes()
{
    function desPort()
    {
        for (let i = 0 ;i < portsList.length; i++)
            {
                let desPortNameAct = portsList.ports[i].name;
                let desPortName = document.getElementById("desPort").innerHTML;
                if (desPortName == desPortNameAct)
                    {
                        let desPortLat = portsList.ports[i].lat;
                        let desPortLng = portsList.ports[i].lng;
                        break;
                    }
            }
    }
    
    function sourcePort()
    {
        for (let i = 0;i<portsList.length; i++)
            {
                let sourcePortNameAct = portsList.ports[i].name;
                let sourcePortName = document.getElementById("sourcePort").innerHTML;
                if(sourcePortName == sourcePortNameAct)
                    {
                        let sourcePortLat = portsList.ports[i].lat;
                        let sourcePortLng = portsList.ports[i].lng;
                        break;
                    }
            }
    }

        let key = "9610451768f0eed3dde6aaa8604ffd41";
        function darkSkyRequestSource(key,lat,lng,data,time)
        {
            // Build URL parameters from data object.
            let params = "";
            lat = sourcePortLat;
            lng = sourcePortLng;
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
            if (time == undefined)
            {
                script.src = "https://api.darksky.net/forecast/"+key+"/"+lat+","+lng+ params;
            }
            else
            {
                script.src = "https://api.darksky.net/forecast/"+key+"/"+lat+","+lng+","+time+ params;
            }

            document.body.appendChild(script);
        }  

}