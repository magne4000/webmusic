<?php
//Not secured for the moment (pretty useless to secure the cache generation ...)
require_once "../app/utils.php";
$message = null;
if (isset($_GET['regenerate']) && $_GET['regenerate']){
	require "../app/cache.inc.php";
	Cache::generateMenu();
	$message = "Menu regénéré.";
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
<p><?php if(!is_null($message)) echo $message; ?></p>
<ul>
	<li><a href="<?php echo get_current_rel_url(); ?>?regenerate=1">Regénérer le menu</a></li>
</ul>
</body>
</html>