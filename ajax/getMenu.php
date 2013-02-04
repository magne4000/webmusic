<?php
require_once dirname(__FILE__)."/../app/include.php";
require_once dirname(__FILE__)."/../app/cache.inc.php";
//header('Content-Type: text/html; charset=UTF-8');
if (isset($_POST['i']) && preg_match("/^\d+$/", $_POST['i'])){
	if (!Cache::sendMenu($_POST['i']))
		echo "0";
}