<?php
$message = null;
if (isset($_GET['cache']) && $_GET['cache']){
    require "../app/cache.inc.php";
    Cache::generateMenu();
    $message = "Menu regénéré.";
}