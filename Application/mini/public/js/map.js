/**
 * Created by Dave on 29/09/2014.
 */

var map;

function initialize() {
    var mapOptions = {
        center: { lat: -34.397, lng: 150.644},
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
                new google.maps.DirectionsRenderer({
                    map: map,
                    directions: response
                });
                getAccidents(response.routes[0].legs[0].steps);
            }
            else
                $("#error").append("Unable to retrieve your route<br />");
        }
    );
}