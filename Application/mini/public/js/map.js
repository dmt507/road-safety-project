/**
 * Created by Dave on 29/09/2014.
 */

var map;

function initialize() {
    var mapOptions = {
        center: { lng: -1.08726, lat: 53.95995},
        zoom: 8
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
}
//need to move some of this to application.js
function calculateRoute(from, to, fatal, serious, slight, y2005, y2006, y2007, y2008, y2009, y2010, y2011, y2012, y2013) {
    var directionsService = new google.maps.DirectionsService();
    var directionsRequest = {
        origin: from,
        destination: to,
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    };

    directionsService.route(
        directionsRequest,
        function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                new google.maps.DirectionsRenderer({
                    map: map,
                    directions: response
                });

                var severity =[];
                if(fatal==true){
                    severity.push(1);
                }
                if(serious==true){
                    severity.push(2);
                }
                if(slight==true){
                    severity.push(3);
                }

                var years = [];
                if(y2005==true){
                    years.push(2005);
                }
                if(y2006==true){
                    years.push(2006);
                }
                if(y2007==true){
                    years.push(2007);
                }
                if(y2008==true){
                    years.push(2008);
                }
                if(y2009==true){
                    years.push(2009);
                }
                if(y2010==true){
                    years.push(2010);
                }
                if(y2011==true){
                    years.push(2011);
                }
                if(y2012==true){
                    years.push(2012);
                }
                if(y2013==true){
                    years.push(2013);
                }

                getAccidents(response.routes[0].legs[0].steps,severity,years);
            }
            else
                $("#error").append("Unable to retrieve your route<br />");
        }
    );
}