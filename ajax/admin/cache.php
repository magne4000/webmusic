<?php
//TODO only admin
if (isset($_GET['cache']) && $_GET['cache']){
    require_once "../../app/include.php";
    require_once "../../app/utils.php";
    require_once "../../app/yield.php";
    require_once "../../app/cache.inc.php";
    Cache::generateMenu();
    yield("Menu regénéré.");
}