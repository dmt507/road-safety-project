function getAccidents(coords)
{
    var xmlhttp;
    if (coords=="")
    {
        return;
    }

    //round coords to 6 d.p. as they are given in datasets
    var i = 0;
    while (i<coords.length){
        coords[i].D = coords[i].D.toFixed(6);
        coords[i].k = coords[i].k.toFixed(6);
        i++;
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
    alert(str);
    xmlhttp.open("POST","/search/datasearch",true);
    xmlhttp.send(str);
}

