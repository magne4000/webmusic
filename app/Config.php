<?php
class Config{
    private static $_ini_array;

    public static function set($ini_array){
        self::$_ini_array = $ini_array;
    }

    public static function get($section, $key){
        return self::$_ini_array[$section][$key];
    }

    public static function getAsArray($section, $key){
        return explode(",", self::$_ini_array[$section][$key]);
    }
}