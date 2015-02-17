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

function calculateRoute(from, to) {
    var directionsService = new google.maps.DirectionsService();
    var directionsRequest = {
        origin: from,
        destination: to,
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    };

    directionsService.route(
        directionsRequest,
        function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                /*new google.maps.DirectionsRenderer({
                    map: map,
                    directions: response
                });*/
                getAccidents(response.routes[0].bounds, response.routes[0].overview_path);
            }
            else
                $("#error").append("Unable to retrieve your route<br />");
        }
    );
}