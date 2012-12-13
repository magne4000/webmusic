<?php
/*
 * Retrieve an album art. Return default album art if none is found.
 */
require_once "../app/include.php";
require_once "../app/utils.php";
//header('Content-Type: text/html; charset=UTF-8');
if (isset($_POST['albumpath'])){
	$albumpath = $_POST['albumpath'];
	$a = array();
	$names = array('Folder.jpg', 'folder.jpg');
	foreach($names as $name){
		$uri = $albumpath . '/' . $name;
		if (url_exists($uri)){
			$a['path'] = $uri;
			break;
		}
	}
	echo json_encode($a);
}