<?php
require_once dirname(__FILE__).'/Config.php';
require_once dirname(__FILE__)."/../doctrine/Doctrine.php";
spl_autoload_register(array('Doctrine', 'autoload'));
spl_autoload_register(array('Doctrine_Core', 'modelsAutoload'));
$manager = Doctrine_Manager::getInstance();
$manager->setAttribute(Doctrine_Core::ATTR_AUTO_ACCESSOR_OVERRIDE, true);
$manager->setAttribute(Doctrine_Core::ATTR_AUTOLOAD_TABLE_CLASSES, true);
$manager->setAttribute(Doctrine_Core::ATTR_MODEL_LOADING, Doctrine_Core::MODEL_LOADING_CONSERVATIVE);
Doctrine_Core::loadModels(dirname(__FILE__).'/../models');
$conn = Doctrine_Manager::connection(sprintf('mysql://%s:%s@%s/%s', Config::get('db', 'user'), Config::get('db', 'password'), Config::get('db', 'host'), Config::get('db', 'database')), 'doctrine');
$conn->execute("SET CHARACTER SET utf8");