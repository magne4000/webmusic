<?php require "handle.php"; ?>
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