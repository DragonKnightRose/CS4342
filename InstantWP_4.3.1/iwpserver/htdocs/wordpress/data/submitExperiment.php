<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

//create connection
$conn = new mysqli("localhost", "root", "", "hci-prototype");
$postdata = file_get_contents("php://input");
$json=json_decode($postdata,true);
#$results=$conn->query("SELECT * FROM drafts WHERE name='" . $json["name"] . "'");
#$results=json_decode($results,true);

var_dump($_POST);
var_dump($json);
#var_dump($results);
#echo($results["num_rows"]);
echo($json["name"]);
echo("\n");

$sql="INSERT INTO experiments (name, description, startDate, endDate, duration, location, contactInfo, numParticipants, maxParticipants, newRequests, questionLink, additionalDocs, requiredScore) VALUES('" . $json["name"] . "', '" . $json["description"] . "', '"  . $json["startDate"]."', '"  . $json["endDate"]."', '"  . $json["duration"]."', '"  . $json["location"]."', '" . $json["contactInfo"]."', '" . $json["numParticipants"]."', '" . $json["maxParticipants"]."', '" . $json["newRequests"]."', '" . $json["questionLink"]."', '" . $json["additionalDocs"]."', '" . $json["requiredScore"]."')";
$conn->query($sql);
$sql="DELETE FROM drafts WHERE name='".$json["name"]."'";
$conn->query($sql);
echo($sql);
?>