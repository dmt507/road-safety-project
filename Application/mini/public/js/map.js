/**
 * Created by Dave on 29/09/2014.
 */

var map;

function initialize() {
    var mapOptions = {
        center: { lng: -2.7428, lat: 54.9714},
        zoom: 5
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
}
