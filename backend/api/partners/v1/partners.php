<?php
error_reporting(0);
require_once($_SERVER['DOCUMENT_ROOT'] . '/../database.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/../utils.php');
require_once '../model/partner.php';
require_once '../../../utils/JSON_Response/json_responder.php';
require_once '../../../utils/Logs/LoggerFactory.php';

$method = $_SERVER['REQUEST_METHOD'];


require_once  $_SERVER['DOCUMENT_ROOT'] . '/backend/authorization/BD_OAUTH_SERVER.php';


switch ($method) {


  case 'GET':

  try {
      if (!$server->verifyResourceRequest(OAuth2\Request::createFromGlobals())) {
          echo $server->getResponse()->send();
          break;
      }

      if (!(isset($_GET['userid']))) {
          echo json_response('Campi non settati', 400);
          return;
      }

      bd_log("Raccolta richiesta GET", "i", basename(__FILE__));
      $db = new Database();
      $conn = $db->getConnection();

      $request_user_id = $_GET['userid'];
      $userid = $request_user_id;
    
      $partner = new Partner($conn, $userid);
      $partner = $partner->getByUserId();

      bd_log("Partner Recuperato : " . $partner, "i", basename(__FILE__));

      echo json_response(encodeString(json_encode($partner)), 200);
  } catch (Exception $e) {
      bd_log("Errore generico" . $e->getMessage(), "e", basename(__FILE__));
      echo json_response($e->getMessage(), 500);
  }


  break;

  case 'POST':

      try {
          if (!$server->verifyResourceRequest(OAuth2\Request::createFromGlobals())) {
              echo $server->getResponse()->send();
              break;
          }

          bd_log("Raccolta richiesta POST", "i", basename(__FILE__));
          $db = new Database();
          $data = json_decode(decodeString(explode(" ", file_get_contents("php://input"))));
          if (is_null($data)) {
              parse_str(file_get_contents("php://input"), $data);
              $data= (object)decodeString($data);
          }

          $conn = $db->getConnection();
          $conn -> beginTransaction();
          $userid = $data->userid;
          $owner =  $data->owner;
          $company_name =  $data->company_name;
          $fiscal_code = $data->fiscal_code;
          $vat = $data->vat;
          $activity_sector = $data->activity_sector;
          $address_legal = $data->address_legal;
          $postal_code_legal = $data->postal_code_legal;
          // $company_email = $data->company_email;
          $telephone_number = $data->telephone_number;
          $address_operative = $data->address_operative;
          $postal_code_operative = $data->postal_code_operative;
          $partner_type = $data->partner_type;

          $partner = new Partner($conn, $userid, $owner, $company_name, $fiscal_code, $vat, $activity_sector, $address_legal, $postal_code_legal, $telephone_number, $address_operative, $postal_code_operative, $partner_type);
          $stmt = $partner->insert();
          if($stmt) {
              $conn->commit();
              bd_log("Inserimento del partner avvenuto con successo" . $stmt, "i", basename(__FILE__));
              echo json_response(encodeString("true"), 200);
          } else {
              $conn->rollBack();
              bd_log("Errore durante l'inserimento del Partner" . $stmt[2], "e", basename(__FILE__));
              echo json_response($stmt, 500);
              return;
          }
      } catch (Exception $e) {
          $conn->rollBack();
          bd_log("Errore generico" . $e->getMessage(), "e", basename(__FILE__));
          echo json_response($e->getMessage(), 500);
      }

      break;
}
