<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

//create connection
$conn = new mysqli("localhost", "root", "", "hci-prototype");
$q="SELECT * FROM drafts WHERE name='" . $_GET['name'] . "';";
$result = $conn->query($q);

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	if ($outp != "") {$outp .= "";}
    $outp .= '{"name":"'  . $rs["name"] . '",';
    $outp .= '"numParticipants":"'   . $rs["numParticipants"]        . '",';
	$outp .= '"maxParticipants":"'  . $rs["maxParticipants"] . '",';
	$outp .= '"newRequests":"'  . $rs["newRequests"] . '",';
	$outp .= '"description":"'  . $rs["description"] . '",';
	$outp .= '"startDate":"'  . $rs["startDate"] . '",';
	$outp .= '"endDate":"'  . $rs["endDate"] . '",';
	$outp .= '"duration":"'  . $rs["duration"] . '",';
	$outp .= '"location":"'  . $rs["location"] . '",';
    $outp .= '"contactInfo":"'. $rs["contactInfo"]     . '"}'; 
}
$outp .="";

$conn->close();

echo($outp);
?>