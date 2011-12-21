<?php
require_once dirname(__FILE__).'/../app/Config.php';
$ini_array = parse_ini_file(dirname(__FILE__).'/../app/webmusic.conf', true);
Config::set($ini_array);

/**
 * Artist
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @package    ##PACKAGE##
 * @subpackage ##SUBPACKAGE##
 * @author     ##NAME## <##EMAIL##>
 * @version    SVN: $Id: Builder.php 7490 2010-03-29 19:53:27Z jwage $
 */
class Artist extends BaseArtist
{
	private static function _getAll($filter = null){
		$q = Doctrine_Query::create()
		->select('ar.id, ar.name')
		->from('Artist ar')
		->orderBy('ar.name');
		
		if ($filter !== null){
			$joinedToAlbum = false;
			$joinedToTrack = false;
				
			if (is_array($filter)){
				foreach ($filter as $key => $val){
					if ($key === "album"){
						if (!$joinedToAlbum){
							$q->leftJoin('ar.Album al')
							->whereIn('al.id', $val);
							$joinedToAlbum = true;
						}
					}
					elseif ($key === "genre"){
						if (!$joinedToAlbum){
							$q->leftJoin('ar.Album al');
							$joinedToAlbum = true;
						}
						if (!$joinedToTrack){
							$q->leftJoin('al.Track t');
							$joinedToTrack = true;
						}
						$q->leftJoin('t.Genre g')
						->whereIn('g.id', $val);
					}
					elseif ($key === "year"){
						if (!$joinedToAlbum){
							$q->leftJoin('ar.Album al');
							$joinedToAlbum = true;
						}
						if (!$joinedToTrack){
							$q->leftJoin('al.Track t');
							$joinedToTrack = true;
						}
						$q->whereIn('t.year', $val);
					}
				}
			}
		}
		return $q;
	}
	
	public static function getAll($filter = null){
		$q = self::_getAll($filter);
		return $q->fetchArray();
	}
	
	public static function search($term, $filter = null){
		$q = self::_getAll($filter);
		$q->where('ar.name LIKE ?', $term.'%');
		$q->orWhere('ar.name LIKE ?', '% '.$term.'%')->limit(Config::get('cache', 'maxitems'));
		return $q->fetchArray();
	}
	
	public static function getAlbums(){
		$q = Doctrine_Query::create()
			->select('ar.id, ar.name, al.id, al.name')
		    ->from('Artist ar')
		    ->leftJoin('ar.Album al')
		    ->orderBy('ar.name, al.name');
		
		return $q->execute(array(), Doctrine_Core::HYDRATE_ARRAY);
	}
}