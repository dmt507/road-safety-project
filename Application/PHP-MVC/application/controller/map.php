<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 29/09/2014
 * Time: 11:37
 */


/**
 * Class Home
 *
 * Please note:
 * Don't use the same name for class and method, as this might trigger an (unintended) __construct of the class.
 * This is really weird behaviour, but documented here: http://php.net/manual/en/language.oop5.decon.php
 *
 */
class Map extends Controller
{
    /**
     * PAGE: index
     * This method handles what happens when you move to http://yourproject/home/index (which is the default page btw)
     */
    public function index()
    {
        require 'application/views/_templates/header.php';
        require 'application/views/map/index.php';
        require 'application/views/_templates/footer.php';
    }


}
