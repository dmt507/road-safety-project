var progress;
var heatmap;
var routeLines = [];

function searchData(from, to, fatal, serious, slight, y2005, y2006, y2007, y2008, y2009, y2010, y2011, y2012, y2013) {

    if(heatmap){
        heatmap.setMap(null);
    }

    for(var i=routeLines.length;i--;){
        routeLines[i].setMap(null);
    }
    routeLines=[];

    $('.accident-search-success').css({"display":"none"});


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


    var newRouteSteps=[];

    //loop through each route step
    for(var n= 0, routesteps_length = routeSteps.length; n<routesteps_length; n++){

        var distance = routeSteps[n].distance.value;

        //if step is longer than 5km
        if(distance>5000){

            //calculate how many new steps the current step should be split into
            var splitSteps = Math.ceil(distance/5000);

            //get number of coords for the step
            var noOfLatLngs = routeSteps[n].lat_lngs.length;

            //calculate how many coords each new step should contain
            var latLngsPerStep = Math.ceil(noOfLatLngs/splitSteps);

            var currentLatLng=0;

            //for each new step, add the designated coords
            for(var i=0;i<splitSteps;i++){
                var counter=0;
                var newStep=new Object();
                newStep.lat_lngs=[];
                while(counter<latLngsPerStep && currentLatLng<noOfLatLngs){
                    newStep.lat_lngs.push(routeSteps[n].lat_lngs[currentLatLng]);
                    counter++;
                    currentLatLng++;

                    if(counter==latLngsPerStep && currentLatLng<noOfLatLngs){
                        newStep.lat_lngs.push(routeSteps[n].lat_lngs[currentLatLng]);
                        if (noOfLatLngs-currentLatLng==1){
                            i++;
                        }
                    }

                }
                newStep.bounds = getBounds(newStep.lat_lngs);
                newRouteSteps.push(newStep);
            }
        }else{
            var newStep = new Object();
            newStep.lat_lngs = routeSteps[n].lat_lngs;
            newStep.bounds = getBounds(newStep.lat_lngs);

            newRouteSteps.push(newStep);

        }
    }

    var steps = JSON.stringify(newRouteSteps);
    var accidentSeverity = JSON.stringify(severity);
    var accidentYear = JSON.stringify(years);

    $.post(url + "/search/getaccidents",
        {steps: steps,severity: accidentSeverity,years:accidentYear},
        function(data,status){
            if(status=="success"){
                //$('#search-results').html(data);
                var accidents = JSON.parse(data);
                filterAccidents(accidents,newRouteSteps);

            }
        }
    );

}

function filterAccidents(accidents,routeSteps){
    var accidentsOnRoute = 0;
    var heatmapData = [];
    var data =[];


    for(var n=routeSteps.length-1; n--;){


        progress = ((n+1)/(routeSteps.length+1)) * 100;
        $('.progress-bar').css('width', progress+'%').attr('aria-valuenow', progress);

        var stepLine = new google.maps.Polyline({
            path: routeSteps[n].lat_lngs,
            geodesic: true,
            strokeColor: '#005CE6',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        routeLines.push(stepLine);
        stepLine.setMap(map);

        var accidentsOnStep=0;
        for (var i = accidents[n].length; i--;){
            var accidentLatLng = new google.maps.LatLng(accidents[n][i].latitude,accidents[n][i].longitude);
            if(google.maps.geometry.poly.isLocationOnEdge(accidentLatLng,stepLine,10e-5)){
                accidentsOnRoute++;
                accidentsOnStep++;
                heatmapData.push(accidentLatLng);
                data.push(accidents[n][i]);
            }
        }



      /*  var distance = routeSteps[n].distance.value/1000;
        if(accidentsOnStep/distance>10) {
            stepLine.setMap(map);
        }*/

    }

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData
    });
    heatmap.setMap(map);

    $('#search-results').html(JSON.stringify(data));


    $('.accident-search-progress').css({"display":"none"});
    $('.accident-search-success').css({"display":"block"});
    alert(accidentsOnRoute);



}


function getBounds(latlngs){
    var bounds = new google.maps.LatLngBounds();
    for(var i=latlngs.length;i--;) {
        bounds.extend(latlngs[i]);
    }
    return bounds;
}