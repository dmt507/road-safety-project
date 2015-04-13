<?php

class Model
{
    /**
     * @param object $db A PDO database connection
     */
    function __construct($db)
    {
        try {
            $this->db = $db;
        } catch (PDOException $e) {
            exit('Database connection could not be established.');
        }
    }

    public function getAccidents($bounds,$severity,$years)
    {


        $sev  = join(',', array_fill(0, count($severity), '?'));
        $yr  = join(',', array_fill(0, count($years), '?'));


        $sql = "SELECT accident_index,longitude,latitude FROM accidents WHERE longitude>=? AND
                    longitude<=? AND latitude>=? AND latitude<=? AND accident_severity IN ($sev) AND
                    YEAR(accident_date) IN ($yr)";

        //buffer bounds to ensure no accidents on the route are ignored
        $bounds = array($bounds->minlong-0.0001,$bounds->maxlong+0.0001,$bounds->minlat-0.0001,$bounds->maxlat+0.0001);
        $params = array_merge($bounds,$severity,$years);
        $query = $this->db->prepare($sql);
        $query->execute($params);

        return $query->fetchAll();
    }
}
