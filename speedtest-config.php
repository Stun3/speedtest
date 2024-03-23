<?php
header('Content-type: text/xml');
$xml = file_get_contents('https://stun3.github.io/speedtest/config.xml');
echo $xml;
?>
