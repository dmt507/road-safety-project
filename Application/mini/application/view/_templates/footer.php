

    <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>


    <!-- define the project's URL (to make AJAX calls possible, even when using this in sub-folders etc) -->
    <script>
        var url = "<?php echo URL; ?>";
    </script>

    <!-- our JavaScript -->
    <script src="<?php echo URL; ?>js/application.js"></script>

    <script src="<?php echo URL; ?>public/js/map.js"></script>

    <script src="<?php echo URL; ?>public/js/bootstrap.min.js"></script>


    <script type="text/javascript"
            src="https://maps.googleapis.com/maps/api/js?libraries=geometry,places&key=AIzaSyApDnGnoYhR9Jw90js8WyGQcxv3qOIruko">
    </script>

    <script type="text/javascript">
        google.maps.event.addDomListener(window, 'load', initialize);
    </script>

    <script type="text/javascript">
        $(document).ready(function(){
            $("#calculate-route").submit(function(event) {
                event.preventDefault();
                calculateRoute($("#from").val(), $("#to").val(),$("#severityFatal").is(':checked'),$("#severitySerious").is(':checked')
                    ,$("#severitySlight").is(':checked'));
            });
        });
    </script>
</body>
</html>
