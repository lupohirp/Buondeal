<?php
error_reporting(0);

require_once($_SERVER['DOCUMENT_ROOT'] . '/../database.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/../utils.php');

require_once '../model/confirm.php';
require_once '../../../utils/JSON_Response/json_responder.php';
require_once '../../../utils/Logs/LoggerFactory.php';


$method = $_SERVER['REQUEST_METHOD'];

if (empty($_GET['id']) && empty($_GET['key'])) {
    echo json_response(400);
    return;
}
switch ($method) {
case 'GET':
bd_log("Raccolta richiesta GET", "i", basename(__FILE__));
    try {
        if (!empty($_GET['id'])) {
            bd_log("Verificando Confirm....", "i", basename(__FILE__));

            $db = new Database();
            $conn = $db->getConnection();
            $id = $_GET['id'];
            $keyhash = null;
            $enabled = null;

            $confirm = new Confirm($conn, $id, $keyhash, $enabled);

            $stmt = $confirm->getWithUserId();

            bd_log("Risultato Query [isEnabled] = " . $stmt["enabled"], "i", basename(__FILE__));

            echo json_response(encodeString(json_encode($stmt)), 200);
        } elseif (!empty($_GET['key'])) {
            $db = new Database();
            $conn = $db->getConnection();
            $keyhash = $_GET['key'];

            bd_log("Confermando Email....", "i", basename(__FILE__));

            $confirm = new Confirm($conn, $id, $keyhash, $enabled);

            $stmt = $confirm->update();

            bd_log("Risultato Update" .   $stmt, "i", basename(__FILE__));


            echo json_response(encodeString(json_encode($stmt)), 200);
        }
    } catch (Exception $e) {
        bd_log("Errore Generico :  " . $e->getMessage(), "i", basename(__FILE__));
        echo json_response($e->getMessage(), 500);
    }

        break;
    }
