<?php
require_once dirname(__FILE__)."/../app/include.php";
$arRetour = array();
$filters = array();
if (isset($_POST['filters']) && is_array($_POST['filters'])){
	foreach($_POST['filters'] as $filter){
		if (is_array($filter['elements'])){
			//$filter['type'] might be 'artist', 'genre' or 'album'
			$filters[$filter['type']] = array();
			foreach($filter['elements'] as $elt){
				$filters[$filter['type']][] = $elt['id'];
			}
		}
	}
}
if (isset($_POST['mode']) && ($_POST['mode'] == 'artists' || $_POST['mode'] == 'albums' || $_POST['mode'] == 'tracks')){
	switch($_POST['mode']){
		case "artists":
			$arRetour = Artist::getAll($filters);
			break;
		case "albums":
			$arRetour = Album::getAll($filters);
			break;
		case "tracks":
			$arRetour = Track::getAll(null, $filters);
		default:
	}
}
//Offset utilisé pour le chargement dynamique de la liste des résultats
/*if (isset($_POST['offset']) && preg_match("/^\d+$/", $_POST['offset'])){
	$arRetour = Track::getAll(null, $filters, $_POST['offset']);
}*/
echo json_encode($arRetour);