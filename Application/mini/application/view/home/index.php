<div class="container map-main">
    <div class="row">
        <div class="col-sm-12">

            <div id="application-alerts">

            </div>


        </div>

    </div>
    <div class="row map-row">
        <div class="col-sm-3">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">
                        Search Parameters
                    </h3>
                </div>
                <div class="panel-body">
                    <form id="search_collisions" name="search-collisions" action="#" method="get">
                        <div class="form-group">
                            <label for="from">From:</label>
                            <input type="text" id="from" name="from" class="form-control" required="required" placeholder="An address" size="30" value="york" />
                        </div>
                        <div class="form-group">
                            <label for="to">To:</label>
                            <input type="text" id="to" name="to" class="form-control" required="required" placeholder="Another address" size="30" value="leeds" />
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
                                <div>
                                    <div class="checkbox-inline">
                                        <label>
                                            <input type="checkbox" id="year2005">
                                            2005
                                        </label>
                                    </div>
                                    <div class="checkbox-inline">
                                        <label>
                                            <input type="checkbox" id="year2006">
                                            2006
                                        </label>
                                    </div>
                                    <div class="checkbox-inline">
                                        <label>
                                            <input type="checkbox" id="year2007">
                                            2007
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <div class="checkbox-inline">
                                        <label>
                                            <input type="checkbox" id="year2008">
                                            2008
                                        </label>
                                    </div>
                                    <div class="checkbox-inline">
                                        <label>
                                            <input type="checkbox" id="year2009">
                                            2009
                                        </label>
                                    </div>
                                    <div class="checkbox-inline">
                                        <label>
                                            <input type="checkbox" id="year2010">
                                            2010
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <div class="checkbox-inline">
                                        <label>
                                            <input type="checkbox" id="year2011" checked>
                                            2011
                                        </label>
                                    </div>
                                    <div class="checkbox-inline">
                                        <label>
                                            <input type="checkbox" id="year2012" checked>
                                            2012
                                        </label>
                                    </div>
                                    <div class="checkbox-inline">
                                        <label>
                                            <input type="checkbox" id="year2013" checked>
                                            2013
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>

        <div class="col-sm-9 map-col">
            <div id="search-results">
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th>Collisions</th>
                        <th>CPKM  <span class="glyphicon glyphicon-question-sign" aria-hidden="true" data-placement="bottom" tabindex="0"  data-toggle="popover" data-trigger="hover" title="Collisions Per Kilometre" data-content="Total number of collisions divided by the length of the route."></span>
                            <span class="sr-only">Collisions per kilometre.</span>
                        </th>
                        <th>Weighted CPKM <span class="glyphicon glyphicon-question-sign" aria-hidden="true" data-placement="bottom" tabindex="0"  data-toggle="popover" data-trigger="hover" title="Weighted Collisions Per Kilometre" data-content=" Each collision is assigned a value based on its severity; 3 for fatal, 2 for serious and 1 for slight. These weighted values are summed together and divided by the length of the route to give the Weighted CPKM."></span>
                            <span class="sr-only">Weighted collisions per kilometre.</span>
                        </th>
                        <th>Casualties</th>
                        <th>CaPKM <span class="glyphicon glyphicon-question-sign" aria-hidden="true" data-placement="bottom" tabindex="0"  data-toggle="popover" data-trigger="hover" title="Casualties Per Kilometre" data-content="Total number of casualties divided by the length of the route."></span>
                            <span class="sr-only">Collisions per kilometre.</span></th>
                        <th>Weighted CaPKM <span class="glyphicon glyphicon-question-sign" aria-hidden="true" data-placement="bottom" tabindex="0"  data-toggle="popover" data-trigger="hover" title="Weighted Casualties Per Kilometre" data-content=" Each casualty is assigned a value based on severity; 3 for fatal, 2 for serious and 1 for slight. These weighted values are summed together and divided by the length of the route to give the Weighted CaPKM."></span>
                            <span class="sr-only">Weighted collisions per kilometre.</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td id="result-number-collisions"></td>
                        <td id="result-collisions-km"></td>
                        <td id="result-weighted-collisions-km"></td>
                        <td id="result-number-casualties"></td>
                        <td id="result-casualties-km"></td>
                        <td id="result-weighted-casualties-km"></td>
                    </tr>
                    </tbody>
                </table>


                <div id="map-canvas"></div>
            </div>
        </div>

    </div>

</div>
<div id="search-results-test"></div>




