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

function getAccidents(routeSteps)
{
    var xmlhttp;
    if (routeSteps=="")
    {
        return;
    }

    var coords = [];
    var noOfSteps = routeSteps.length;
    for (var step = 0; step < noOfSteps; step++) {
        var noOfLatLngs = routeSteps[step].lat_lngs.length;
        for (var lat_lng = 0; lat_lng < noOfLatLngs; lat_lng++) {
            if (step==0 || (step>0 && lat_lng>0)) {
                var point = {D: routeSteps[step].lat_lngs[lat_lng].D.toFixed(6), k: routeSteps[step].lat_lngs[lat_lng].k.toFixed(6)};
                coords.push(point);
            }
        }
    }

    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            document.getElementById("search-results").innerHTML=xmlhttp.responseText;
        }
    }
    var str = JSON.stringify(coords);
    alert(coords.length);
    xmlhttp.open("POST",url + "/search/getaccidents",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send('coords=' + str);
}
