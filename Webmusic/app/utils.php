<?php
/**
 * Format an int to a human readable duration
 * @param $duration : duration in seconds
 */
function format_duration($duration){
	$isNegative = $duration < 0;
	$duration = abs($duration);
	if ($duration >= 3600)
	$duration = sprintf("%d:%02d:%02d", $duration/3600, ($duration%3600)/60, $duration%60);
	else
	$duration = sprintf("%02d:%02d", $duration/60, $duration%60);
	$duration = ($isNegative ? '-' : '') . $duration;
	return $duration;
}

function url_exists($url) {
	error_reporting(E_STRICT);
	$handle = curl_init();
	if (false === $handle){
		return false;
	}
	curl_setopt($handle, CURLOPT_HEADER, false);
	curl_setopt($handle, CURLOPT_FAILONERROR, true);
	curl_setopt($handle, CURLOPT_HTTPHEADER, Array("User-Agent: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.15) Gecko/20080623 Firefox/2.0.0.15") );
	curl_setopt($handle, CURLOPT_NOBODY, true);
	curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
	if (strpos($url, 'https') === 0){
		if (isset($_SERVER['PHP_AUTH_USER'])){
			curl_setopt($handle, CURLOPT_USERPWD, $_SERVER['PHP_AUTH_USER'].':'.$_SERVER['PHP_AUTH_PW']);
		}
		curl_setopt($handle, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
		curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($handle, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)");
	}
	curl_setopt($handle, CURLOPT_URL, $url);
	$connectable = curl_exec($handle);
	curl_close($handle);
	return $connectable !== FALSE;
}

function get_current_rel_url() {
	$pageURL = 'http';
	if ($_SERVER["SERVER_PORT"] == '443'){
		$pageURL .= 's';
	}
	$pageURL .= "://";
	if ($_SERVER["SERVER_PORT"] != "80") {
		$pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
	} else {
		$pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
	}
	return parse_url($pageURL, PHP_URL_PATH);
}