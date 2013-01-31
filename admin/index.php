<?php require "handle.php"; ?>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="shortcut icon" type="image/png" href="../images/favicon.png" />
<link rel="stylesheet" type="text/css" href="../css/global.css" />
<link rel="stylesheet" type="text/css" href="css/jquery-ui-1.10.0.custom.css" />
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.10.0.min.js"></script>
<script type="text/javascript" src="js/utils.js"></script>
<script type="text/javascript" src="js/jquery.store.js"></script>
</head>
<body>
<p><?php if(!is_null($message)) echo $message; ?></p>
<ul>
	<li><a href="<?php echo get_current_rel_url(); ?>?regenerate=1">Regénérer le menu</a></li>
</ul>
</body>
</html>