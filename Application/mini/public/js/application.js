var progress;
var heatmap;
var routeLines = [];

/**
 * Called when user submits search. Uses form parameters to search road safety data.
 * @param from
 * @param to
 * @param fatal
 * @param serious
 * @param slight
 * @param y2005
 * @param y2006
 * @param y2007
 * @param y2008
 * @param y2009
 * @param y2010
 * @param y2011
 * @param y2012
 * @param y2013
 */
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
    if(fatal){
        severity.push(1);
    }
    if(serious){
        severity.push(2);
    }
    if(slight){
        severity.push(3);
    }

    var years = [];
    if(y2005){
        years.push(2005);
    }
    if(y2006){
        years.push(2006);
    }
    if(y2007){
        years.push(2007);
    }
    if(y2008){
        years.push(2008);
    }
    if(y2009){
        years.push(2009);
    }
    if(y2010){
        years.push(2010);
    }
    if(y2011){
        years.push(2011);
    }
    if(y2012){
        years.push(2012);
    }
    if(y2013){
        years.push(2013);
    }

    findRoute(from, to, function(route){
        var routeSteps = route.legs[0].steps;

        map.fitBounds(route.bounds);

        var splitSteps = splitRouteSteps(routeSteps);

        getCollisions(splitSteps,severity,years, function(unfilteredCollisions){

            var stats = filterCollisions(unfilteredCollisions,splitSteps);


            var cpkm = stats.collisions / (route.legs[0].distance.value/1000);
            var wcpkm = stats.weightedCollisions / (route.legs[0].distance.value/1000);
            var capkm = stats.casualties / (route.legs[0].distance.value/1000);

            $('#result-number-collisions').html(stats.collisions);
            $('#result-number-casualties').html(stats.casualties);
            $('#result-collisions-km').html(cpkm.toFixed(2));
            $('#result-weighted-collisions-km').html(wcpkm.toFixed(2));
            $('#result-casualties-km').html(capkm.toFixed(2));


        });


    });



}

/**
 * Uses the Google Maps Direction service to find route between two locations
 * @param from
 * @param to
 * @param callback
 */

function findRoute(from, to, callback){
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
                callback(response.routes[0]);
            }
            else
                $("#error").append("Unable to retrieve your route<br />");
        }
    );
}

/**
 * Used to split route steps returned by google into smaller steps if they are over 10km
 * @param routeSteps
 */
function splitRouteSteps(routeSteps){
    var newRouteSteps=[];

    //loop through each route step
    for(var n= 0, routesteps_length = routeSteps.length; n<routesteps_length; n++){

        var newStep;

        var distance = routeSteps[n].distance.value;

        //if step is longer than 10km
        if(distance>10000){

            //calculate how many new steps the current step should be split into
            var splitSteps = Math.ceil(distance/10000);

            //get number of coords for the step
            var noOfLatLngs = routeSteps[n].lat_lngs.length;

            //calculate how many coords each new step should contain
            var latLngsPerStep = Math.ceil(noOfLatLngs/splitSteps);

            var currentLatLng=0;

            //for each new step, add the designated coords
            for(var i=0;i<splitSteps;i++){
                var counter=0;
                var lat_lngs=[];

                //while there are more coords to add to this new step
                while(counter<latLngsPerStep && currentLatLng<noOfLatLngs){
                    lat_lngs.push(routeSteps[n].lat_lngs[currentLatLng]);
                    counter++;
                    currentLatLng++;

                    //if we are at the last coords for this new step, but not the last coords in the old step,
                    //add the first coords of the next new step
                    if(counter==latLngsPerStep && currentLatLng<noOfLatLngs){
                        lat_lngs.push(routeSteps[n].lat_lngs[currentLatLng]);

                        //if there is only 1 coords left in the old step, do not create a new step for it
                        if (noOfLatLngs-currentLatLng==1){
                            i++;
                        }
                    }

                }
                newStep={
                    bounds: getBounds(lat_lngs),
                    lat_lngs: lat_lngs
                };
                newRouteSteps.push(newStep);
            }
        }else{
            newStep={
                bounds: getBounds(routeSteps[n].lat_lngs),
                lat_lngs: routeSteps[n].lat_lngs
            };

            newRouteSteps.push(newStep);

        }
    }

    return newRouteSteps;

}

/**
 * Make Ajax call to find collisions close to the route
 * @param routeSteps
 * @param severity
 * @param years
 */
function getCollisions(routeSteps,severity,years,callback)
{

    $('.accident-search-progress').css({"display":"block"});
    progress = (1/(routeSteps.length+1)) * 100;
    $('.progress-bar').css('width', progress+'%').attr('aria-valuenow', progress);

    var steps = JSON.stringify(routeSteps);
    var collisionSeverity = JSON.stringify(severity);
    var collisionYear = JSON.stringify(years);

    $.post(url + "/search/getcollisions",
        {steps: steps,severity: collisionSeverity,years:collisionYear},
        function(data,status){
            if(status=="success"){
                //$('#search-results-test').html(data);
                callback(JSON.parse(data));
            }
        }
    );

}

/**
 * filter the collisions returned from db using the google maps isLocationOnEdge function
 * plot route on map and add heatmap
 * @param accidents
 * @param routeSteps
 */
function filterCollisions(collisions,routeSteps){
    var collisionsOnRoute = 0;
    var weightedCollisionsOnRoute = 0;
    var casualtiesOnRoute = 0;
    var heatmapData = [];

    for(var n=routeSteps.length-1; n--;){


        progress = ((n+1)/(routeSteps.length+1)) * 100;
        $('.progress-bar').css('width', progress+'%').attr('aria-valuenow', progress);

       /*
       //for testing: for making each step of the route alternate colours
        var colors=['#ffff00','#005CE6'];
        if (c==0){
            c=1;
        }  else{
            c=0;
        }    */

        //create line for this step and add it to the map
        var stepLine = new google.maps.Polyline({
            path: routeSteps[n].lat_lngs,
            geodesic: true,
            strokeColor: '#005CE6',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        routeLines.push(stepLine);
        stepLine.setMap(map);

        //check if each collision is on the route
        for (var i = collisions[n].length; i--;){
            var collisionLatLng = new google.maps.LatLng(collisions[n][i].latitude,collisions[n][i].longitude);
            if(google.maps.geometry.poly.isLocationOnEdge(collisionLatLng,stepLine,0.00015)){
                collisionsOnRoute++;
                if(collisions[n][i].accident_severity == 1){
                    weightedCollisionsOnRoute += 3;
                }
                else if(collisions[n][i].accident_severity == 2){
                    weightedCollisionsOnRoute += 2;
                }
                else if(collisions[n][i].accident_severity == 3){
                    weightedCollisionsOnRoute += 1;
                }
                casualtiesOnRoute += parseInt(collisions[n][i].number_of_casualties);
                heatmapData.push(collisionLatLng);
            }

           /*
            //For testing: adds a marker for all collisions returned from database
           var marker = new google.maps.Marker({
                position: accidentLatLng,
                map: map
            });  */
        }


    }

    //create the heat map
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData
    });
    heatmap.setMap(map);


    $('.accident-search-progress').css({"display":"none"});
    $('.accident-search-success').css({"display":"block"});

    var results={
        collisions: collisionsOnRoute,
        weightedCollisions: weightedCollisionsOnRoute,
        casualties: casualtiesOnRoute
    };


    return results;

}

/**
 * Get the bounds for an array of coords
 * @param latlngs
 * @returns {{maxlat: *, minlat: *, maxlong: *, minlong: *}}
 */
function getBounds(latlngs){
    var bounds = new google.maps.LatLngBounds();
    for(var i=latlngs.length;i--;) {
        bounds.extend(latlngs[i]);
    }

    //get the min and max longitude and latitude from the bounds
    var northEast = bounds.getNorthEast();
    var southWest = bounds.getSouthWest();

    var formattedBounds = {
        maxlat: northEast.k,
        minlat: southWest.k,
        maxlong: northEast.D,
        minlong: southWest.D
    };

    return formattedBounds;
}