<?php
require_once dirname(__FILE__).'/include.php';

class Cache{
	
	const ARTISTS_PER_FILE = 200;
	const REL_PATH = '../cache/';
	private static $filename = 'menu.cache.%d.html';
	private static $nbfiles = 0;
	
	public static function deleteFiles(){
		$mask = dirname(__FILE__).'/'.self::REL_PATH.'*';
		array_map("unlink", glob( $mask ));
	}
	
	public static function generateMenu(){
		self::deleteFiles();
		$artists = Artist::getAll();
		$count = 0;
		if (Config::get('cache', 'maxitems') >= count($artists)){
			$f = self::getNextFile();
			foreach ($artists as $artist){
				if ($count >= self::ARTISTS_PER_FILE){
					fclose($f);
					$f = self::getNextFile();
					$count = 0;
				}
				fwrite($f, "\t".'<li data-artist=\'{"id":"'.$artist['id'].'"}\'>'.htmlspecialchars($artist['name'])."<div class=\"actionhandler\"></div></li>\n");
				$count++;
			}
			fclose($f);
		}
	}
	
	public static function getNextFile(){
		$filename = sprintf(self::$filename, self::$nbfiles);
		self::$nbfiles++;
		return fopen(dirname(__FILE__).'/'.self::REL_PATH.$filename, "w");
	}
	
	public static function printMenu($i=0, $with_ul=true){
		$filename = sprintf(self::$filename, $i);
		$bfileexists = true;
		if (!file_exists(dirname(__FILE__).'/'.self::REL_PATH.$filename)){
			$bfileexists = false;
			if($i === 0){
				echo '<span>La base contient trop d\'artistes, veuillez utiliser le moteur de recherche rapide ci-dessus.</span>';
			}
		}
		if ($with_ul) echo "<ul>";
		if ($bfileexists){
			include sprintf(dirname(__FILE__).'/'.self::REL_PATH.$filename, $i);
		}
		if ($with_ul) echo "</ul>";
	}
	
	public static function sendMenu($i){
		$i = (int)$i;
		$filename = sprintf(self::$filename, $i);
		if (!file_exists(dirname(__FILE__).'/'.self::REL_PATH.$filename))
			return false;
		$fp = fopen(dirname(__FILE__).'/'.self::REL_PATH.$filename, 'rb');
		fpassthru($fp);
		exit;
	}
}
