<?php
$ON = false;
if($ON){
	if (isset($_POST['textStatus'], $_POST['responseText'])){
		$textStatus = $_POST['textStatus'];
		$responseText = $_POST['responseText'];
		$message = "textStatus : " . $textStatus . "\n"
				.  "responseText : " . $responseText;
		mail("mail@mail.com", "Debug message from Riv'Player", $message);
	}
}