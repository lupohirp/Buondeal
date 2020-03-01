<?php
error_reporting(0);
// include our OAuth2 Server object
require_once __DIR__ . '/BD_OAUTH_SERVER.php';
require_once($_SERVER['DOCUMENT_ROOT'] . '/../database.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/../utils.php');
require_once '../utils/JSON_Response/json_responder.php';
require_once '../utils/Logs/LoggerFactory.php';

// $data = json_decode(decodeString(explode(" ", file_get_contents("php://input"), -1)));
$data = json_decode(file_get_contents("php://input"));
if (!(isset($data->username) && isset($data->password))) {
    bd_log("Bad Request ", "e", basename(__FILE__));
    echo json_response(400);
}

try {
    bd_log(" Sto staccando il token.... ", "e", basename(__FILE__));
    $username = $data->username;
    $password = explode(' ', base64_decode($data->password));

    $passwordDecoded = decodeString($password);
    $passwordDecoded = md5($passwordDecoded);

    $db   = new Database();
    $conn = $db->getConnection();

    $sql = "SELECT COUNT(1) FROM users where username=:username AND password=:password";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":username", $username, PDO::PARAM_STR);
    $stmt->bindParam(":password", $passwordDecoded, PDO::PARAM_STR);

    if ($stmt->execute()) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (($row["COUNT(1)"]) <= 0) {
            echo json_response(401);
            return;
        }
    } else {
       return $stmt->errorInfo();
        return;
    }


    // Handle a request for an OAuth2.0 Access Token and send the response to the client
    $server->handleTokenRequest(OAuth2\Request::createFromGlobals())->send();
} catch (Exception $e) {
    echo json_response($e->getMessage(), 500);
}
