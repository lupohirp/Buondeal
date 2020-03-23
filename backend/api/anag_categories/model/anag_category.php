<?php
require_once '../../../utils/JSON_Response/json_responder.php';
require_once '../../../utils/Logs/LoggerFactory.php';

class Anag_category
{
    // connessione al database e nome della tabella
    private $conn;
    private $nome_tabella = "anag_categories";


    // propriet�  dell'oggetto
    public $id;
    public $name;

    public function __construct($db, $id = null, $name = null)
    {
        $this->conn = $db;

        $this->id = $id;
        $this->name = $name;
    }


    
    public function getCategoryFromId()
    {
        try {
            $sql = "SELECT * FROM " . $this->nome_tabella . " WHERE id=:id";
            $stmt           = $this->conn->prepare($sql);
            $stmt->bindParam(":id", $this->id, PDO::PARAM_INT);

            if ($stmt->execute()) {
                return $stmt->fetch(PDO::FETCH_OBJ);
            } else {
                bd_log("Errore durante il fetch dei dati : " .implode(":",$stmt->errorInfo()), "e", basename(__FILE__));
               return false;
            }
        } catch (Exception $e) {
            echo json_response($e->getMessage(), 500);
        }
    }

    public function getAll()
    {
        try {
            $sql = "SELECT * FROM " . $this->nome_tabella;
            $stmt           = $this->conn->prepare($sql);

            if ($stmt->execute()) {
                return $stmt->fetchAll(PDO::FETCH_OBJ);
            } else {
                bd_log("Errore durante il fetch dei dati : " .implode(":",$stmt->errorInfo()), "e", basename(__FILE__));
               return false;
            }
        } catch (Exception $e) {
            echo json_response($e->getMessage(), 500);
        }
    }
}
