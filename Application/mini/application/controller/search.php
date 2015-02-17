<?php


class Search extends Controller
{


    public function getAccidents()
    {
        $coords = json_decode($_POST['coords']);
        $buffered_coords = $this->bufferCoords($coords);
        $accidents = $this->model->getAccidents($buffered_coords);
        print_r($accidents);
    }

    public function bufferCoords($coords){
        for($x=0;$x<count($coords);$x++){
            $coords[$x]->max_long = $coords[$x]->D + 0.00001;
            $coords[$x]->min_long = $coords[$x]->D - 0.00001;
            $coords[$x]->max_lat = $coords[$x]->k + 0.00001;
            $coords[$x]->min_lat = $coords[$x]->k - 0.00001;
        }
        return $coords;
    }

}
