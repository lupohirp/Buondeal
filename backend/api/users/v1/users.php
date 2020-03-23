<?php
error_reporting(0);
require_once($_SERVER['DOCUMENT_ROOT'] . '/../database.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/../utils.php');

require_once '../../confirm/model/confirm.php';
require_once '../model/user.php';
require_once '../../../utils/BDMailer/BDMailer.php';
require_once '../../../utils/Logs/LoggerFactory.php';
require_once '../../../utils/JSON_Response/json_responder.php';

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {

case 'GET':
bd_log("Raccolta richiesta GET", "i", basename(__FILE__));
    try {
        if (!(isset($_GET['username']) && isset($_GET['password']))) {
            echo json_response(400);
            return;
        }

        $db = new Database();
        $conn = $db->getConnection();
        $username = $_GET['username'];
        $password = $_GET['password'];
        $password = explode(' ', base64_decode($password));
        $password = decodeString($password);

        $id = null;
        $email = null;
        $name = null;
        $surname = null;

        $password = md5($password);
        $user = new User($conn, $id, $username, $password, $email, $name, $surname);

        $user = $user->login();

        if (is_null($user)) {
            $user = new User($conn, $id, $username, $password, $email, $name, $surname);
            $user -> email = $username;
            $user = $user->loginByEmail();
        }

        bd_log("User Recuperato : [" . $user['username'] . "]", "i", basename(__FILE__));
        echo json_response(encodeString(json_encode($user)), 200);
    } catch (Exception $e) {
        //$conn->rollBack();
        bd_log("Errore durante il recupero dello User" . $e->getMessage(), "i", basename(__FILE__));
        echo json_response($e->getMessage(), 500);
    }

        break;
case 'POST':
    try {
        bd_log("Raccolta richiesta POST", "i", basename(__FILE__));
        $db = new Database();
        $data = json_decode(decodeString(explode(" ", file_get_contents("php://input"))));
        if (is_null($data)) {
            parse_str(file_get_contents("php://input"), $data);
            $data= (object)decodeString($data);
        }
        $conn = $db->getConnection();
        $conn -> beginTransaction();
        $username = $data->username;
        $password =  md5($data->password);
        $email = $data->email;
        $name = $data->name;
        $surname = $data->surname;
        $user = new User($conn, $id, $username, $password, $email, $name, $surname);
        $stmt = $user->insert();
        if($stmt) {
            bd_log("User Inserito con Successo", "i", basename(__FILE__));
            $LAST_ID = $conn->lastInsertId();

            //create a random key

            $keyhash = $username . $email . date('mY');
            $keyhash = encodeString($keyhash);
            $keyhash = base64_encode($keyhash);

            //add confirm row
            $confirm = new Confirm($conn, $LAST_ID, $keyhash, 0);
            $stmt = $confirm->insert();


            if($stmt) {
                bd_log("Confirm Inserita con Successo", "i", basename(__FILE__));
                $bdMailer = new BDMailer(0);
                $bdMailer -> sendConfirmationEmail($keyhash, $email);
                $conn -> commit();
                echo json_response(encodeString("true"), 200);
            } else {
                $conn->rollBack();
                bd_log("Errore durante l'inserimento della Confirm " . $stmt[2], "e", basename(__FILE__));
               return $stmt->errorInfo();

            }
        } else {
            $conn->rollBack();
            bd_log("Errore durante l'inserimento dello User " . $stmt[2] , "e", basename(__FILE__));
           return $stmt->errorInfo();

        }
    } catch (Exception $e) {
        $conn->rollBack();
        bd_log("Errore generico" . $e->getMessage(), "e", basename(__FILE__));
        echo json_response($e->getMessage(), 500);
    }

    break;

case 'PUT': {
  try {
      require_once  $_SERVER['DOCUMENT_ROOT'] . '/backend/authorization/BD_OAUTH_SERVER.php';

      if (!$server->verifyResourceRequest(OAuth2\Request::createFromGlobals())) {
          echo $server->getResponse()->send();
          break;
      }

      $db = new Database();
      $data =  json_decode(decodeString(file_get_contents("php://input")));
      if (is_null($data)) {
          parse_str(file_get_contents("php://input"), $data);
          $data= (object)decodeString($data);
      }

      $conn = $db->getConnection();
      $conn -> beginTransaction();

      $id = $data->id;
      $username = $data->username;
      $password = explode(' ', base64_decode($data->password));
      $password = decodeString($password);
      $password = md5($password);
      $email = $data->email;
      $name = $data->name;
      $surname = $data->surname;
      $user = new User($conn, $id, $username, $password, $email, $name, $surname);

      $stmt = $user->update();

      if($stmt) {
          $conn -> commit();
          echo json_response(encodeString(json_encode($stmt)), 200);
      } else {
          $conn->rollBack();
      }
  } catch (Exception $e) {
      $conn->rollBack();
      echo json_response($e->getMessage(), 500);
  }
}
 break;
}
