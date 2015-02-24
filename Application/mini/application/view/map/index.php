<div class="container map-main">
    <div class="row map-row">
        <div class="col-sm-3">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">
                        Search Parameters
                    </h3>
                </div>
                <div class="panel-body">
                    <form id="calculate-route" name="calculate-route" action="#" method="get">
                        <div class="form-group">
                            <label for="from">From:</label>
                            <input type="text" id="from" name="from" class="form-control" required="required" placeholder="An address" size="30" value="york" />
                        </div>
                        <div class="form-group">
                            <label for="to">To:</label>
                            <input type="text" id="to" name="to" class="form-control" required="required" placeholder="Another address" size="30" value="leeds" />
                        </div>
                        <div class="form-group">
                            <label for="severity">Accident Severity</label>
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
                                        <input type="checkbox" id="severitySlight">
                                        Slight
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="year">Year of Accident</label>
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
            <div class="panel panel-primary map-panel">
                <div class="panel-heading">
                    <h3 class="panel-title">
                        Map
                    </h3>
                </div>
                <div class="panel-body map-panel-body">
                    <div id="map-canvas"></div>
                </div>
            </div>
        </div>

    </div>

</div>



<div id="search-results">

</div>

