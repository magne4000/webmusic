<?php
/*
 * Informations on a track
 */
require_once "../app/include.php";
//header('Content-Type: text/html; charset=UTF-8');
if (isset($_POST['id']) && !is_array($_POST['id']) && preg_match("/^\d+$/", $_POST['id'])){
	// Get informations of one file
	$id = $_POST['id'];
	$q = Doctrine_Core::getTable('Track')
		->createQuery('t')
		->leftJoin('t.Album al')
		->leftJoin('t.Genre g')
		->leftJoin('al.Artist ar');
	$q->where('t.id = ?', $id);
	$a = $q->fetchArray();
	echo json_encode($a[0]);
}elseif (isset($_POST['ids']) && is_array($_POST['ids'])){
	// Get informations of several files
	$ids = $_POST['ids'];
	$q = Doctrine_Core::getTable('Track')
		->createQuery('t')
		->leftJoin('t.Album al')
		->leftJoin('t.Genre g')
		->leftJoin('al.Artist ar');
	$q->whereIn('t.id', $ids);
	$a = $q->fetchArray();
	echo json_encode($a);
}