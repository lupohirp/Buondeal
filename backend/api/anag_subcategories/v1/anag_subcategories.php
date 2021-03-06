<?php
error_reporting(0);
require_once($_SERVER['DOCUMENT_ROOT'] . '/../database.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/../utils.php');
require_once '../model/anag_subcategory.php';
require_once '../../../utils/Logs/LoggerFactory.php';
require_once  $_SERVER['DOCUMENT_ROOT'] . '/backend/authorization/BD_OAUTH_SERVER.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
case 'GET':

if (!$server->verifyResourceRequest(OAuth2\Request::createFromGlobals())) {
    echo $server->getResponse()->send();
    break;
}

if (empty($_GET['cat_id'])) {
    echo json_response(400);
    return;
}

    bd_log("Raccolta richiesta GET", "i", basename(__FILE__));
    $db = new Database();
    $conn = $db->getConnection();

    $id = null;
    $name = null;
    $category_id = $_GET['cat_id'];

    $anag_subcategory = new Anag_subcategory($conn, $id, $name, $category_id);
    $stmt = $anag_subcategory->getSubCategoriedFromCategory();

    if($stmt) {
        echo json_response(encodeString(json_encode($stmt)), 200);
    } else {
        bd_log("Errore durante il recupero dei product" . $stmt[2], "e", basename(__FILE__));
        echo json_response($stmt, 500);
        return;
    }

    break;

}
