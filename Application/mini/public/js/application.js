$(function() {

    // just a super-simple JS demo

    var demoHeaderBox;

    // simple demo to show create something via javascript on the page
    if ($('#javascript-header-demo-box').length !== 0) {
    	demoHeaderBox = $('#javascript-header-demo-box');
    	demoHeaderBox
    		.hide()
    		.text('Hello from JavaScript! This line has been added by public/js/application.js')
    		.css('color', 'green')
    		.fadeIn('slow');
    }

    // if #javascript-ajax-button exists
    if ($('#javascript-ajax-button').length !== 0) {

        $('#javascript-ajax-button').on('click', function(){

            // send an ajax-request to this URL: current-server.com/songs/ajaxGetStats
            // "url" is defined in views/_templates/footer.php
            $.ajax(url + "/songs/ajaxGetStats")
                .done(function(result) {
                    // this will be executed if the ajax-call was successful
                    // here we get the feedback from the ajax-call (result) and show it in #javascript-ajax-result-box
                    $('#javascript-ajax-result-box').html(result);
                })
                .fail(function() {
                    // this will be executed if the ajax-call had failed
                })
                .always(function() {
                    // this will ALWAYS be executed, regardless if the ajax-call was success or not
                });
        });
    }

});

function getAccidents(routeBounds,routePath)
{
    if (routeBounds=="")
    {
        return;
    }

    /*var coords = [];
    var colours = ['#FF0000','#FFFF00'];
    var colour_index = 0;
    var noOfSteps = routeSteps.length;
    for (var step = 0; step < noOfSteps; step++) {
        var step_line = new google.maps.Polyline({
            path: routeSteps[step].lat_lngs,
            geodesic: true,
            strokeColor: colours[colour_index],
            strokeOpacity: 1.0,
            strokeWeight: 3
        });
        if (colour_index == 1){
            colour_index=0;
        }
        else{
            colour_index++;
        }
        step_line.setMap(map);

        var noOfLatLngs = routeSteps[step].lat_lngs.length;
        var test = 0;
        for (var lat_lng = 0; lat_lng < noOfLatLngs; lat_lng++) {
            if (step==0 || (step>0 && lat_lng>0)) {
                var point = {D: routeSteps[step].lat_lngs[lat_lng].D.toFixed(6), k: routeSteps[step].lat_lngs[lat_lng].k.toFixed(6)};
                coords.push(point);
                if(google.maps.geometry.poly.isLocationOnEdge(routeSteps[step].lat_lngs[lat_lng],step_line,10e-6)){
                    test++;
                }
            }
        }
        //alert(test);
    }*/


/*
    var myLatlng = new google.maps.LatLng(bounds.Ba.j,bounds.ua.j);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title:"Hello World!"
    });

    var myLatlng = new google.maps.LatLng(bounds.Ba.j,bounds.ua.k);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title:"Hello World!"
    });

    var myLatlng = new google.maps.LatLng(bounds.Ba.k,bounds.ua.j);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title:"Hello World!"
    });

    var myLatlng = new google.maps.LatLng(bounds.Ba.k,bounds.ua.k);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title:"Hello World!"
    });*/


    var str = JSON.stringify(routeBounds);
    $.post(url + "/search/getaccidents",
        {bounds: str},
        function(data,status){
            if(status=="success"){
                var accidents = JSON.parse(data);
                var accidentsOnRoute = filterAccidents(accidents,routePath);
                alert (accidentsOnRoute);
            }
        }
    );

}

function filterAccidents(accidents,routePath){
    var accidentsOnRoute = 0;

    var routeLine = new google.maps.Polyline({
        path: routePath,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 3
    });
    routeLine.setMap(map);

    for (var i = 0; i<accidents.length;i++){
        var accidentLatLng = new google.maps.LatLng(accidents[i].latitude,accidents[i].longitude);
        if(google.maps.geometry.poly.isLocationOnEdge(accidentLatLng,routeLine,10e-6)){
            accidentsOnRoute++;
            var marker = new google.maps.Marker({
                position: accidentLatLng,
                map: map
            })
        }
    }
    return accidentsOnRoute;
}

