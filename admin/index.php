<?php
require_once "../app/include.php";
require_once "../app/utils.php";
?><!DOCTYPE html>
<html lang="fr">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="shortcut icon" type="image/png" href="../images/favicon.png" />
<link rel="stylesheet" type="text/css" href="../css/global.css" />
<link rel="stylesheet" type="text/css" href="../css/jquery-ui-1.10.0.custom.css" />
<script type="text/javascript" src="../js/jquery.min.js"></script>
<script type="text/javascript" src="../js/jquery-ui-1.10.0.min.js"></script>
<script type="text/javascript" src="../js/jquery.ajaxprogress.js"></script>
<script type="text/javascript" src="../js/utils.js"></script>
<script type="text/javascript" src="../js/jquery.store.js"></script>
<script type="text/javascript" src="../js/admin.js"></script>
</head>
<body>
	<header>Webmusic - Administration</header>
	<div id="body2" class="admin">
		<div id="body2_wrapper">
			<div class="pane">
				<ul>
					<li><a href="#tabs-cache">Cache</a></li>
					<li><a href="#tabs-db">Base de données</a></li>
				</ul>
				<div id="tabs-cache">
					<div class="container">
						<button class="minimal progress" data-href="<?php echo get_current_rel_url(); ?>../ajax/admin/cache.php?cache=1">Regénérer le menu</button>
						<pre class="progress"></pre>
					</div>
				</div>
				<div id="tabs-db">
					<div class="container">
						<button class="minimal progress" data-href="<?php echo get_current_rel_url(); ?>../ajax/admin/scanner.php?scan=1">Mise à jour de la base de données</button>
						<pre class="progress"></pre>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
