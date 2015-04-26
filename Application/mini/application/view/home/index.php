<div class="container map-main">
    <div class="row">
        <div class="col-sm-12">

            <div id="application-alerts">
                <div class='alert alert-info alert-dismissible' role='alert'>
                    <button type='button' class='close' data-dismiss='alert' aria-label='Close'>
                        <span aria-hidden='true'>&times;</span>
                    </button>
                    Enter start and end locations for a UK route in order to get collision statistics and view collision hotspots.
                </div>
            </div>


        </div>

    </div>
    <div class="row map-row">
        <div class="col-sm-3">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">
                        Search
                    </h3>
                </div>
                <div class="panel-body">
                    <form id="search_collisions" name="search-collisions" action="#" method="get">
                        <div class="form-group">
                            <label for="from">Driving From:</label>
                            <input type="text" id="from" name="from" class="form-control" required="required" placeholder="An address" size="30" />
                        </div>
                        <div class="form-group">
                            <label for="to">Driving To:</label>
                            <input type="text" id="to" name="to" class="form-control" required="required" placeholder="Another address" size="30" />
                        </div>
                        <div class="form-group">
                            <label for="severity">Collision Severity</label>
                            <div id="severity">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" id="severityFatal" checked>
                                        Fatal
                                    </label>
                                </div>
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" id="severitySerious" checked>
                                        Serious
                                    </label>
                                </div>
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" id="severitySlight" checked>
                                        Slight
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="year">Year of Collision</label>
                            <div id="year">
                                <div class="row">
                                    <div class="col-xs-4">
                                        <label>
                                            <input type="checkbox" id="year2005">
                                            2005
                                        </label>
                                    </div>
                                    <div class="col-xs-4">
                                        <label>
                                            <input type="checkbox" id="year2006">
                                            2006
                                        </label>
                                    </div>
                                    <div class="col-xs-4">
                                        <label>
                                            <input type="checkbox" id="year2007">
                                            2007
                                        </label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-4">
                                        <label>
                                            <input type="checkbox" id="year2008">
                                            2008
                                        </label>
                                    </div>
                                    <div class="col-xs-4">
                                        <label>
                                            <input type="checkbox" id="year2009">
                                            2009
                                        </label>
                                    </div>
                                    <div class="col-xs-4">
                                        <label>
                                            <input type="checkbox" id="year2010">
                                            2010
                                        </label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-4">
                                        <label>
                                            <input type="checkbox" id="year2011" checked>
                                            2011
                                        </label>
                                    </div>
                                    <div class="col-xs-4">
                                        <label>
                                            <input type="checkbox" id="year2012" checked>
                                            2012
                                        </label>
                                    </div>
                                    <div class="col-xs-4">
                                        <label>
                                            <input type="checkbox" id="year2013" checked>
                                            2013
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="search-submit-button">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="col-sm-9 map-col">
            <div id="search-results">
                <table id="collision-results-table" class="table table-bordered">
                    <thead>
                    <tr>
                        <th>Collisions</th>
                        <th>Casualties</th>
                        <th>Distance</th>
                        <th>CPKM  <span class="glyphicon glyphicon-question-sign" aria-hidden="true" data-placement="bottom" tabindex="0"  data-toggle="popover" data-trigger="hover" title="Collisions Per Kilometre" data-content="Total number of collisions divided by the length of the route."></span>
                            <span class="sr-only">Collisions per kilometre.</span>
                        </th>
                        <th>WCPKM <span class="glyphicon glyphicon-question-sign" aria-hidden="true" data-placement="bottom" tabindex="0"  data-toggle="popover" data-trigger="hover" title="Weighted Collisions Per Kilometre" data-content=" Each collision is assigned a value based on its severity; 3 for fatal, 2 for serious and 1 for slight. These weighted values are then summed together and divided by the length of the route."></span>
                            <span class="sr-only">Weighted collisions per kilometre.</span>
                        </th>
                        <th>CaPKM <span class="glyphicon glyphicon-question-sign" aria-hidden="true" data-placement="bottom" tabindex="0"  data-toggle="popover" data-trigger="hover" title="Casualties Per Kilometre" data-content="Total number of casualties divided by the length of the route."></span>
                            <span class="sr-only">Collisions per kilometre.</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td class="result-number-collisions"></td>
                        <td class="result-number-casualties"></td>
                        <td class="result-distance"></td>
                        <td class="result-collisions-km"></td>
                        <td class="result-weighted-collisions-km"></td>
                        <td class="result-casualties-km"></td>
                    </tr>
                    </tbody>
                </table>

                <table id="mobile-collision-results-table" class="table table-bordered">
                    <tbody>
                        <tr>
                            <th>Collisions</th>
                            <td class="result-number-collisions"></td>
                        </tr>
                        <tr>
                            <th>Casualties</th>
                            <td class="result-number-casualties"></td>
                        </tr>
                        <tr>
                            <th>Distance</th>
                            <td class="result-distance"></td>
                        </tr>
                        <tr>
                            <th>CPKM  <span class="glyphicon glyphicon-question-sign" aria-hidden="true" data-placement="bottom" tabindex="0"  data-toggle="popover" data-trigger="click" title="Collisions Per Kilometre" data-content="Total number of collisions divided by the length of the route."></span>
                                <span class="sr-only">Collisions per kilometre.</span>
                            </th>
                            <td class="result-collisions-km"></td>
                        </tr>
                        <tr>
                            <th>Weighted CPKM <span class="glyphicon glyphicon-question-sign" aria-hidden="true" data-placement="bottom" tabindex="0"  data-toggle="popover" data-trigger="click" title="Weighted Collisions Per Kilometre" data-content=" Each collision is assigned a value based on its severity; 3 for fatal, 2 for serious and 1 for slight. These weighted values are then summed together and divided by the length of the route."></span>
                                <span class="sr-only">Weighted collisions per kilometre.</span>
                            </th>
                            <td class="result-weighted-collisions-km"></td>
                        </tr>
                        <tr>
                            <th>CaPKM <span class="glyphicon glyphicon-question-sign" aria-hidden="true" data-placement="bottom" tabindex="0"  data-toggle="popover" data-trigger="click" title="Casualties Per Kilometre" data-content="Total number of casualties divided by the length of the route."></span>
                                <span class="sr-only">Collisions per kilometre.</span>
                            </th>
                            <td class="result-casualties-km"></td>
                        </tr>
                    </tbody>
                </table>

                <div id="map-canvas"></div>
            </div>
        </div>

    </div>

</div>
<div id="search-results-test"></div>


<!-- our JavaScript -->

<script src="<?php echo URL; ?>js/application.js"></script>

<script src="<?php echo URL; ?>public/js/map.js"></script>

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
        });
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



