<?php
require_once dirname(__FILE__)."/../../admin/login.php";
require_once dirname(__FILE__)."/../../app/yield.php";
if (isLogged()){
    if (isset($_GET['cache']) && $_GET['cache']){
        require_once dirname(__FILE__)."/../../app/utils.php";
        require_once dirname(__FILE__)."/../../app/cache.inc.php";
        Cache::generateMenu();
        yield("Cached menu regenerated.");
    }
}else{
    yield("You don't have permission to access this file.");
}