<?php
require_once "login.php";
require_once "../app/utils.php";
if (isset($_POST['user']) && isset($_POST['password'])){
    login($_POST['user'], $_POST['password']);
}
?><!DOCTYPE html>
<html lang="fr">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="shortcut icon" type="image/png" href="../images/favicon.png" />
<link rel="stylesheet" type="text/css" href="../css/global.css" />
<link rel="stylesheet" type="text/css" href="../css/jquery-ui-1.10.0.custom.css" />
<script type="text/javascript" src="../js/jquery.min.js"></script>
<script type="text/javascript" src="../js/jquery-ui-1.10.0.min.js"></script>
<script type="text/javascript" src="../js/jquery.easy.notification.js"></script>
<script type="text/javascript" src="../js/jquery.ajaxprogress.js"></script>
<script type="text/javascript" src="../js/utils.js"></script>
<script type="text/javascript" src="../js/jquery.store.js"></script>
<script type="text/javascript" src="../js/admin.js"></script>
<title>Webmusic - Administration</title>
</head>
<body>
	<header>Webmusic - Administration</header>
	<div id="body2" class="admin">
		<div id="body2_wrapper">
		<?php if (isLogged()){ ?>
			<div class="pane">
				<ul>
					<li><a href="#tabs-cache">Cache</a></li>
					<li><a href="#tabs-db">Base de données</a></li>
				</ul>
				<div id="tabs-cache">
					<div class="container">
						<button class="progress" data-href="<?php echo get_current_rel_url(); ?>../ajax/admin/cache.php?cache=1">Regénérer le menu</button>
						<pre class="progress"></pre>
					</div>
				</div>
				<div id="tabs-db">
					<div class="container">
						<button class="progress" data-href="<?php echo get_current_rel_url(); ?>../ajax/admin/scanner.php?scan=1">Mise à jour de la base de données</button>
						<pre class="progress"></pre>
					</div>
				</div>
			</div>
		<?php }else{
            if (!canlogin()){ // Can't login because no user set in config file ?>
                <div class="error ui-widget">
                    <div class="ui-state-error ui-corner-all">
                        <p>In order to be able to login, you must set a login and password in the webmusic.conf file.</p>
                    </div>
                </div>
<?php       }else{
                if(isset($_POST['user'])){ // Wrong credentials ?>
                <div class="error ui-widget">
                    <div class="ui-state-error ui-corner-all">
                        <p>Wrong user or password.</p>
                    </div>
                </div>
<?php           }
                // then login prompt ?>
                <div class="ui-widget">
                    <form method="post">
                        <fieldset class="ui-widget-content">
                            <legend>Login</legend>
                            <div class="line"><label for="user">User</label><input id="user" name="user" type="text" autofocus /></div>
                            <div class="line"><label for="password">Password</label><input id="password" name="password" type="password" /></div>
                            <div class="line"><input type="submit" id="login" value="Login" /></div>
                        </fieldset>
                    </form>
                </div>
<?php       }
		} ?>
		</div>
	</div>
</body>
</html>