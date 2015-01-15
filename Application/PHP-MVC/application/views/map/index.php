
<script src="<?php echo URL; ?>public/js/map.js"></script>

<script type="text/javascript"
        src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyApDnGnoYhR9Jw90js8WyGQcxv3qOIruko">
</script>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

<script type="text/javascript">
    google.maps.event.addDomListener(window, 'load', initialize);
</script>

<script type="text/javascript">
    $(document).ready(function(){
        $("#calculate-route").submit(function(event) {
            event.preventDefault();
            calculateRoute($("#from").val(), $("#to").val());
        });
    });
</script>

<div id="search-params">
    <form id="calculate-route" name="calculate-route" action="#" method="get">
        <label for="from">From:</label>
        <input type="text" id="from" name="from" required="required" placeholder="An address" size="30" />
        <a id="from-link" href="#">Get my position</a>
        <br />

        <label for="to">To:</label>
        <input type="text" id="to" name="to" required="required" placeholder="Another address" size="30" />
        <a id="to-link" href="#">Get my position</a>
        <br />

        <input type="submit" />
        <input type="reset" />
    </form>
</div>

<div id="search-results">

</div>

<div id="map-canvas"></div>
