<?php


class Search extends Controller
{


    public function getAccidents()
    {
        $steps = json_decode($_POST['steps']);
        $severity = json_decode($_POST['severity']);
        $years = json_decode($_POST['years']);


        for($x=0;$x<count($steps);$x++){
            $step_accidents[] = $this->model->getAccidents($steps[$x]->bounds,$severity,$years);

        }


        echo json_encode($step_accidents);
    }


}
