<?php

class About extends Controller
{
    /**
     * PAGE: index
     *
     */
    public function index()
    {
        // load views
        require APP . 'view/_templates/header.php';
        require APP . 'view/about/index.php';
        require APP . 'view/_templates/footer.php';
    }


}