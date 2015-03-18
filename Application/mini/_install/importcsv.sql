LOAD DATA LOCAL INFILE '~/University/Stats19-Data2005-2013/Accidents0513.csv'
INTO TABLE mini.accidents0513
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(accident_index,location_easting_OGSR,location_northing_OGSR,longitude,latitude,police_force,accident_severity,
number_of_vehicles,number_of_casualties,@date_var,day_of_week,accident_time,local_authority_district,
local_authority_highway,1st_road_class,1st_road_number,road_type,speed_limit,junction_detail,junction_control,
2nd_road_class,2nd_road_number,pedestrian_crossing_human_control,pedestrian_crossing_physical_facilities,
light_conditions,weather_conditions,road_surface_conditions,special_conditions_at_site,carriageway_hazards,
urban_or_rural_area,did_police_officer_attend_scene_of_accident,LSOA_of_Accident_Location)
SET accident_date = STR_TO_DATE(@date_var,'%d/%m/%Y')