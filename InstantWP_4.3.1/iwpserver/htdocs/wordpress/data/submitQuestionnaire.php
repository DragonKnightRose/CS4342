<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

//create connection
//$conn = new mysqli("localhost", "root", "", "hci-prototype");
//$q="SELECT * FROM experiments WHERE name='" . $_GET['name'] . "';";
//$result = $conn->query($q);

$postdata = file_get_contents("php://input");
//$json=json_decode($postdata,true);

$filename = "questionnaire/".$_GET['name']."Questionnaire.json";
$file = fopen($filename, w);

fwrite($file, $postdata);
fclose($file);

?>