<?php


class Search extends Controller
{


    public function getAccidents()
    {
        $steps = json_decode($_POST['steps']);
        $severity = json_decode($_POST['severity']);


        for($x=0;$x<count($steps);$x++){
                $step_accidents[] = $this->model->getAccidents($steps[$x]->bounds,$severity);
        }


        echo json_encode($step_accidents);
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
