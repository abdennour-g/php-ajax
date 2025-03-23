<?php
include('entities.php');
header("Content-Type: application/json; charset=UTF-8");
$bdd = new PDO('mysql:host=localhost;dbname=myData', 'root', '') or die('<br>' . var_dump($bdd->errorInfo()));
$clients = [];
$row = $bdd->prepare('select * from client') or die('<br>' . var_dump($bdd->errorInfo()));
$row->execute();
while ($d = $row->fetchObject()) {
	array_push($clients, new Client($d->id, $d->name, $d->email));
}
echo json_encode($clients, JSON_UNESCAPED_UNICODE);
if (isset($_POST['request'])) {
	if ($_POST['request'] == 'add') {
		$stmt = $bdd->prepare('insert into client(name, email) values (?,?)');
		$stmt->bindParam(1, $_POST['name'], PDO::PARAM_STR);
		$stmt->bindParam(2, $_POST['email'], PDO::PARAM_STR);
		$stmt->execute();
	}
	if ($_POST['request'] == 'update') {
		$stmt = $bdd->prepare('update client set name=? , email=? where id=?');
		$stmt->bindParam(1, $_POST['name'], PDO::PARAM_STR);
		$stmt->bindParam(2, $_POST['email'], PDO::PARAM_STR);
		$stmt->bindParam(3, $_POST['id'], PDO::PARAM_STR);
		$stmt->execute();
	}
	if ($_POST['request'] == 'delete') {
		$stmt = $bdd->prepare('delete from client where id=?');
		$stmt->bindParam(1, $_POST['id'], PDO::PARAM_STR);
		$stmt->execute();
	}
}
