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

    $('#application-alerts').html("");
    $('.result-number-collisions').html("");
    $('.result-number-casualties').html("");
    $('.result-collisions-km').html("");
    $('.result-weighted-collisions-km').html("");
    $('.result-casualties-km').html("");


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

    var validation = validateForm(severity,years);

    if(validation){
        new ajaxLoader($('#search-results'));

        findRoute(from, to, function(route){
            var routeSteps = route.legs[0].steps;


            var splitSteps = splitRouteSteps(routeSteps);

            getCollisions(splitSteps,severity,years, function(unfilteredCollisions){
                map.fitBounds(route.bounds);
                var stats = filterCollisions(unfilteredCollisions,splitSteps);


                var cpkm = stats.collisions / (route.legs[0].distance.value/1000);
                var wcpkm = stats.weightedCollisions / (route.legs[0].distance.value/1000);
                var capkm = stats.casualties / (route.legs[0].distance.value/1000);

                $('.result-number-collisions').html(stats.collisions);
                $('.result-number-casualties').html(stats.casualties);
                $('.result-collisions-km').html(cpkm.toFixed(2));
                $('.result-weighted-collisions-km').html(wcpkm.toFixed(2));
                $('.result-casualties-km').html(capkm.toFixed(2));
                removeAjaxLoader();
            });


        });
    }


}

/**
 * ensure that one severity/year has been selected
 * @param severity
 * @param years
 * @returns {boolean}
 */
function validateForm(severity, years){

    var validationPass = true;

    if(severity.length == 0){
        $('#application-alerts').append("<div class='alert alert-danger alert-dismissible' role='alert'> " +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span>" +
        "</button><strong>Error!</strong> You must select at least one collision severity. </div>");
        validationPass = false;
    }

    if(years.length == 0){
        $('#application-alerts').append("<div class='alert alert-danger alert-dismissible' role='alert'> " +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span>" +
        "</button><strong>Error!</strong> You must select at least one year. </div>");
        validationPass = false;
    }

    return validationPass;
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
            else {
                $('#application-alerts').html("<div class='alert alert-danger alert-dismissible' role='alert'> " +
                "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span>" +
                "</button><strong>Error!</strong> Unable to find route for your given locations. </div>");
                removeAjaxLoader();
            }
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
 * @param collisions
 * @param routeSteps
 */
function filterCollisions(collisions,routeSteps){
    var collisionsOnRoute = 0;
    var weightedCollisionsOnRoute = 0;
    var casualtiesOnRoute = 0;
    var heatmapData = [];
    var collisionIndexes=[];

    for(var n=routeSteps.length; n--;){

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
            if(google.maps.geometry.poly.isLocationOnEdge(collisionLatLng,stepLine,0.0001)){

                //check that collision has not already been included in results
                if ($.inArray(collisions[n][i].accident_index,collisionIndexes)==-1) {

                    //add collision id to array to ensure it doesn't get added multiple times
                    collisionIndexes.push(collisions[n][i].accident_index);

                    collisionsOnRoute++;

                    if(collisions[n][i].accident_severity == 1){ //if fatal
                        var weight = 3;
                        weightedCollisionsOnRoute += 3;
                    }
                    else if(collisions[n][i].accident_severity == 2){ //if serious
                        var weight = 2;
                        weightedCollisionsOnRoute += 2;
                    }
                    else if(collisions[n][i].accident_severity == 3){
                        var weight = 1;
                        weightedCollisionsOnRoute += 1;
                    }
                    casualtiesOnRoute += parseInt(collisions[n][i].number_of_casualties);

                    var weightedCollision ={
                        location:collisionLatLng,
                        weight: weight
                    };
                    heatmapData.push(weightedCollision);
                }


            }


            //For testing: adds a marker for all collisions returned from database
           /*var marker = new google.maps.Marker({
                position: collisionLatLng,
                map: map
            });*/
        }


    }

    //create the heat map
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData
    });
    heatmap.setMap(map);


    $('.accident-search-progress').css({"display":"none"});


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

/**
 * Displays loading animation while search is taking place.
 * taken from http://www.aplusdesign.com.au/blog/jquery-ajax-loader-spinner/
 * And CSS spinner from http://tobiasahlin.com/spinkit/
 * @param el
 * @param options
 */
function ajaxLoader (el, options) {
    // Becomes this.options
    var defaults = {
        bgColor 		: '#fff',
        duration		: 800,
        opacity			: 0.9,
        classOveride 	: false
    };
    this.options 	= jQuery.extend(defaults, options);
    this.container 	= $(el);

    this.init = function() {
        var container = this.container;
        // Delete any other loaders
        removeAjaxLoader();
        // Create the overlay
        var overlay = $('<div></div>').css({
            'background-color': this.options.bgColor,
            'opacity':this.options.opacity,
            'width':'100%',
            'height':'100%',
            'position':'absolute',
            'top':'0px',
            'left':'0px',
            'z-index':99999
        }).addClass('ajax_overlay');
        // add an overiding class name to set new loader style
        if (this.options.classOveride) {
            overlay.addClass(this.options.classOveride);
        }
        // insert overlay and loader into DOM
        container.append(
            overlay.append(
                '<div class="spinner">' +
                    '<div class="spinner-container container1">'+
                        '<div class="circle1"></div>' +
                        '<div class="circle2"></div>' +
                        '<div class="circle3"></div>' +
                        '<div class="circle4"></div>' +
                    '</div>' +
                    '<div class="spinner-container container2">'+
                        '<div class="circle1"></div>' +
                        '<div class="circle2"></div>' +
                        '<div class="circle3"></div>' +
                        '<div class="circle4"></div>' +
                    '</div>' +
                    '<div class="spinner-container container3">'+
                        '<div class="circle1"></div>' +
                        '<div class="circle2"></div>' +
                        '<div class="circle3"></div>' +
                        '<div class="circle4"></div>' +
                    '</div>' +
                '</div>' +
                '<div class="loader-text">Analysing Data...</div>').fadeIn(this.options.duration)
        );
    };


    this.init();
}

function removeAjaxLoader(){
    var overlay = $(".ajax_overlay");
    if (overlay.length) {
        overlay.fadeOut(function() {
            overlay.remove();
        });
    }
}
