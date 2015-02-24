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

