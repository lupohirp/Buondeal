<?php
require_once '../../../utils/JSON_Response/json_responder.php';
require_once '../../../utils/Logs/LoggerFactory.php';

class Confirm
{
    // connessione al database e nome della tabella
    private $conn;
    private $nome_tabella = "confirm";


    // propriet�  dell'oggetto
    public $id;
    public $userid;
    public $keyhash;
    public $enabled;

    public function __construct($db, $userid = null, $keyhash = null, $enabled = null)
    {
        $this->conn = $db;

        $this->userid = $userid;
        $this->keyhash = $keyhash;
        $this->enabled  = $enabled;
    }



    public function getWithUserId()
    {
        try {
            $sql = "SELECT enabled FROM " . $this->nome_tabella . " WHERE userid=:userid";
            $stmt           = $this->conn->prepare($sql);
            $stmt->bindParam(":userid", $this->userid, PDO::PARAM_INT);

            if ($stmt->execute()) {
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                return $row;
            } else {
                bd_log("Errore durante il fetch dei dati : " .implode(":",$stmt->errorInfo()), "e", basename(__FILE__));
               return false;
            }
        } catch (Exception $e) {
            echo json_response($e->getMessage(), 500);
        }
    }

    public function getWithUserIdAndHashKey()
    {
        try {
            $sql = "SELECT COUNT(1) FROM " . $this->nome_tabella . " WHERE userid=:userid AND keyhash=:keyhash";
            $stmt           = $this->conn->prepare($sql);
            $stmt->bindParam(":userid", $this->userid, PDO::PARAM_INT);
            $stmt->bindParam(":keyhash", $this->keyhash, PDO::PARAM_STR);

            if ($stmt->execute()) {
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                if (($row["COUNT(1)"]) <= 0) {
                    echo json_response(403);
                }
            } else {
                bd_log("Errore durante il fetch dei dati : " .implode(":",$stmt->errorInfo()), "e", basename(__FILE__));
               return false;
            }
        } catch (Exception $e) {
            echo json_response($e->getMessage(), 500);
        }
    }



    public function update()
    {
        // require_once  '../../../authorization/BD_OAUTH_SERVER.php';
        //
        // if (!$server->verifyResourceRequest(OAuth2\Request::createFromGlobals())) {
        //     $server->getResponse()->send();
        //     echo json_response(401);
        // }

        try {
            $sql = "UPDATE " . $this->nome_tabella . " SET enabled = 1 WHERE keyhash=:keyhash";
            $stmt           = $this->conn->prepare($sql);
            $stmt->bindParam(":keyhash", $this->keyhash, PDO::PARAM_STR);
            $stmt -> execute();
            if ($stmt ->rowCount() >0) {
                return true;
            } else {
                return false;
            }
        } catch (Exception $e) {
            echo json_response($e->getMessage(), 500);
        }
    }



    public function insert()
    {
        try {
            $sql = "INSERT INTO " . $this->nome_tabella . " SET userid=:userid, keyhash=:keyhash";
            $stmt = $this->conn->prepare($sql);


            $stmt->bindParam(":userid", $this->userid, PDO::PARAM_INT);
            $stmt->bindParam(":keyhash", $this->keyhash, PDO::PARAM_STR);

            if ($stmt->execute()) {
                return true;
            } else {
                bd_log("Errore durante il fetch dei dati : " .implode(":",$stmt->errorInfo()), "e", basename(__FILE__));
               return false;
            }
        } catch (Exception $e) {
            echo json_response($e->getMessage(), 500);
        }
    }
}
