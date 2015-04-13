<?php


class Search extends Controller
{


    public function getCollisions()
    {
        $steps = json_decode($_POST['steps']);
        $severity = json_decode($_POST['severity']);
        $years = json_decode($_POST['years']);


        for($x=0, $steps_length=count($steps);$x<$steps_length;$x++){
            $step_collisions[] = $this->model->getCollisions($steps[$x]->bounds,$severity,$years);

        }


        echo json_encode($step_collisions);
    }


}
