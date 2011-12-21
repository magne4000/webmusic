<?php
require_once "../app/include.doctrine.php";
require_once "../app/utils.php";
//header('Content-Type: text/html; charset=UTF-8');
if (isset($_POST['url'])){
	$response = array('exists' => false);
	if (@url_exists($_POST['url'])) $response['exists'] = true;
	echo json_encode($response);
}