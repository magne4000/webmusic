<?php
//TODO only admin
if (isset($_GET['scan']) && $_GET['scan']){
    require_once "../../app/include.php";
    require_once "../../app/utils.php";
    require_once "../../app/yield.php";
    require_once "../../getid3/getid3.php";
    
    function clean_tag($tag, $allow_none=false, $type='string', $default=null, $max_len=1024){
        if (is_null($default) && !$allow_none){
            if ($type == "string"){
                $default = 'Unknown';
            } elseif ($type == "integer"){
                $default = 0;
            }
        }
        if (empty($tag)){
            if (!$allow_none){
                return $default;
            }else{
                return null;
            }
        }
        if ($type == 'integer' && !preg_match("/\d{1,32}/", $tag)){
            return $default;
        }
        return trim(substr($tag, 0, $max_len));
    }

    function get_first($a, $key, $lower_priority=array()){
        if (array_key_exists($key, $a)){

            if (!is_array($a[$key])){
                return $a[$key];
            }
            $ret = null;
            foreach($a[$key] as $val){
                $ret = $val;
                if (!in_array($val, $lower_priority)){
                    break;
                }
            }
            return $ret;
        }
        return null;
    }
    
    function geturipath($path){
        $root = str_replace('\\', '/', Config::get('scanner', 'root'));
        $root_url = Config::get('scanner', 'root_url');
        return $root_url . str_replace($root, "", $path);
    }

    function prepare_write_to_db($info, $order='insert'){
        $path = clean_tag(get_first($info, 'filenamepath'));
        $uripath = geturipath($path);
        $name = clean_tag(get_first($info['comments'], 'title'));
        $artist = clean_tag(get_first($info['comments'], 'artist'));
        $genre = clean_tag(get_first($info['comments'], 'genre', array('Other')));
        $album = clean_tag(get_first($info['comments'], 'album'));
        $duration = clean_tag(get_first($info, 'playtime_seconds'), false, 'integer');
        $year = clean_tag(get_first($info['comments'], 'year'), true, 'integer', null, 4);
        $bitrate = clean_tag(get_first($info['audio'], 'bitrate') / 1000, true);
        $frequency = clean_tag(get_first($info['audio'], 'sample_rate'), true);
        $trackno = clean_tag(get_first($info['comments'], 'track_number'), false, 'integer');
        if ($order == 'insert'){
            insert_db($path, $uripath, $name, $artist, $genre, $album, $duration, $year, $bitrate, $frequency, $trackno);
            yield("$uripath inserted into database");
        }elseif ($order == 'update'){
            update_db($path, $uripath, $name, $artist, $genre, $album, $duration, $year, $bitrate, $frequency, $trackno);
            yield("$uripath updated");
        }else{
            throw new Exception('Invalid order "' . $order . '". Authorized values are "insert" and "update".');
        }
    }
    
    function update_db($path, $uripath, $name, $artist, $genre, $album, $duration, $year, $bitrate, $frequency, $trackno){
        $t = Doctrine::getTable('Track')->findOneByPath($path);
        $t->name = $name;
        $t->Album = Album::getUnique(Artist::getUnique($artist, true), $album, true);
        $t->Genre = Genre::getUnique($genre, true);
        $t->duration = $duration;
        $t->year = $year;
        $t->bitrate = $bitrate;
        $t->frequency = $frequency;
        $t->trackno = $trackno;
        $t->last_updated = date("Y-m-d H:i:s");
        $t->save();
    }

    function insert_db($path, $uripath, $name, $artist, $genre, $album, $duration, $year, $bitrate, $frequency, $trackno){
        $t = new Track();
        $t->path = $path;
        $t->uripath = $uripath;
        $t->name = $name;
        $t->Album = Album::getUnique(Artist::getUnique($artist, true), $album, true);
        $t->Genre = Genre::getUnique($genre, true);
        $t->duration = $duration;
        $t->year = $year;
        $t->bitrate = $bitrate;
        $t->frequency = $frequency;
        $t->trackno = $trackno;
        $t->last_updated = date("Y-m-d H:i:s");
        $t->save();
    }

    function delete_from_db($current_tracks){
        $ids = array(); //Array of ids to delete
        foreach($current_tracks as $trackpath=>$val){
            $ids[] = $val['id'];
        }
        if (!empty($ids)){
            $delete = Doctrine::getTable('Track')->findBy('id', $ids);
            $delete->delete();
            yield("Outdated entries deleted from database.");
        }
    }

    set_time_limit(0);

    //Getting current database state
    yield("Retrieving database state.");
    $optionsRet = array(
            "path" => "path",
            "id" => "id",
            "last_updated" => "last_updated"
    );
    $tracks = Track::getAll($optionsRet, null, null, null);
    yield("Database state retrieved.");
    $current_tracks = array();
    foreach($tracks as $track){
        $d = new DateTime($track['t_last_updated']);
        $current_tracks[$track['t_path']] = array(
            'timestamp' => $d->getTimestamp(),
            'id' => $track['t_id']
        );
    }
    //Recursive scan of the directory to update database
    $getID3 = new getID3();
    $getID3->encoding = 'UTF-8';
    $root = str_replace('\\', '/', Config::get('scanner', 'root'));
    $ext = Config::getAsArray('scanner', 'ext');
    $dir = new RecursiveDirectoryIterator($root);
    $it = new RecursiveIteratorIterator($dir, RecursiveIteratorIterator::CHILD_FIRST);
    foreach ($it as $fileObject){
        $path = str_replace('\\', '/', $fileObject->getPathname());
        if (is_file($path) && in_array(substr(strrchr($path,'.'), 1), $ext)){
            $info = $getID3->analyze($path);
            $mtime = filemtime($path);
            getid3_lib::CopyTagsToComments($info);
            if (array_key_exists($path, $current_tracks)){
                if ($current_tracks[$path]['timestamp'] < $mtime){
                    prepare_write_to_db($info, 'update');
                }
            }else{
                prepare_write_to_db($info, 'insert');
            }
            unset($current_tracks[$path]);
        }
    }
    delete_from_db($current_tracks);
    yield("Done.");
}