<?php
require_once dirname(__FILE__).'/Config.php';
$ini_array = parse_ini_file(dirname(__FILE__).'/webmusic.conf', true);
Config::set($ini_array);
require_once dirname(__FILE__).'/include.doctrine.php';