var progress;

function searchData(from, to, fatal, serious, slight, y2005, y2006, y2007, y2008, y2009, y2010, y2011, y2012, y2013) {

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
                var routeSteps = response.routes[0].legs[0].steps;

                //get bounds for each step in the route
                for(var n=0;n<routeSteps.length;n++){
                    routeSteps[n].bounds = getBounds(routeSteps[n].lat_lngs);
                }

                getAccidents(routeSteps,severity,years);
                map.fitBounds(response.routes[0].bounds);

            }
            else
                $("#error").append("Unable to retrieve your route<br />");
        }
    );
}

function getAccidents(routeSteps,severity,years)
{

    $('.accident-search-progress').css({"display":"block"});
    progress = (1/(routeSteps.length+1)) * 100;
    $('.progress-bar').css('width', progress+'%').attr('aria-valuenow', progress);


    var steps = JSON.stringify(routeSteps);
    var accidentSeverity = JSON.stringify(severity);
    var accidentYear = JSON.stringify(years);

    $.post(url + "/search/getaccidents",
        {steps: steps,severity: accidentSeverity,years:accidentYear},
        function(data,status){
            if(status=="success"){
               // $('#search-results').html(data);
                var accidents = JSON.parse(data);
                filterAccidents(accidents,routeSteps);

            }
        }
    );

}

function filterAccidents(accidents,routeSteps){
    var accidentsOnRoute = 0;
    var heatmapData = [];


    for(var n=0;n<routeSteps.length;n++){

        progress = ((n+1)/(routeSteps.length+1)) * 100;
        $('.progress-bar').css('width', progress+'%').attr('aria-valuenow', progress);

        var stepLine = new google.maps.Polyline({
            path: routeSteps[n].lat_lngs,
            geodesic: true,
            strokeColor: '#005CE6',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        stepLine.setMap(map);


        var accidentsOnStep=0;
        for (var i = 0; i<accidents[n].length;i++){
            var accidentLatLng = new google.maps.LatLng(accidents[n][i].latitude,accidents[n][i].longitude);
            if(google.maps.geometry.poly.isLocationOnEdge(accidentLatLng,stepLine,10e-5)){
                accidentsOnRoute++;
                accidentsOnStep++;
                heatmapData.push(accidentLatLng);
                /*var marker = new google.maps.Marker({
                    position: accidentLatLng,
                    map: map
                })*/
            }
        }



      /*  var distance = routeSteps[n].distance.value/1000;
        if(accidentsOnStep/distance>10) {
            stepLine.setMap(map);
        }*/

    }

    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData
    });
    heatmap.setMap(map);

    $('.accident-search-progress').css({"display":"none"});
    $('.accident-search-success').css({"display":"block"});



}


function getBounds(latlngs){
    var bounds = new google.maps.LatLngBounds();
    for(var i=0;i<latlngs.length;i++) {
        bounds.extend(latlngs[i]);
    }
    return bounds;
}