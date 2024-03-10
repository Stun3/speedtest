<?php
header('Content-type: text/xml');
$xml = file_get_contents('config.xml');
echo $xml;
?>
