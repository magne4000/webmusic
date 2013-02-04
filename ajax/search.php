<?php
if (!isset($_GET['type']) || !isset($_POST['term'])) exit;
require_once dirname(__FILE__)."/../app/include.php";
$type = $_GET['type'];
$arRetour = array();
if ($type == 'artist' || $type == 'album' || $type == 'track'){
	switch($type){
		case "artist":
			$arRetour = Artist::search($_POST['term']);
			break;
		case "album":
			$arRetour = Album::getAll();
			break;
		case "track":
			$arRetour = Track::getAll();
		default:
	}
}
//Offset utilisé pour le chargement dynamique de la liste des résultats
/*if (isset($_POST['offset']) && preg_match("/^\d+$/", $_POST['offset'])){
	$arRetour = Track::getAll(null, $filters, $_POST['offset']);
}*/
echo json_encode($arRetour);