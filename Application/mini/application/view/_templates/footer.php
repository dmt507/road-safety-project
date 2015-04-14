

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
            src="https://maps.googleapis.com/maps/api/js?libraries=geometry,places,visualization&key=AIzaSyApDnGnoYhR9Jw90js8WyGQcxv3qOIruko">
    </script>

    <script type="text/javascript">
        google.maps.event.addDomListener(window, 'load', initialize);
    </script>

    <script type="text/javascript">
        $(document).ready(function(){
            $(function () {
                $('[data-toggle="popover"]').popover()
            })
            $("#search_collisions").submit(function(event) {
                event.preventDefault();
                searchData($("#from").val(), $("#to").val(),$("#severityFatal").is(':checked'),$("#severitySerious").is(':checked')
                    ,$("#severitySlight").is(':checked'),$("#year2005").is(':checked'),$("#year2006").is(':checked'),
                    $("#year2007").is(':checked'),$("#year2008").is(':checked'),$("#year2009").is(':checked'),
                    $("#year2010").is(':checked'),$("#year2011").is(':checked'),$("#year2012").is(':checked'),
                    $("#year2013").is(':checked'));
            });
        });
    </script>
</body>
</html>
