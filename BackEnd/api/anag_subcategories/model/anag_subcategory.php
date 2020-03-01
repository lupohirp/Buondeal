<?php
require_once '../../../utils/JSON_Response/json_responder.php';
require_once '../../../utils/Logs/LoggerFactory.php';

class Anag_subcategory
{
    // connessione al database e nome della tabella
    private $conn;
    private $nome_tabella = "anag_subcategories";


    // propriet�  dell'oggetto
    public $id;
    public $categories_id;
    public $name;

    public function __construct($db, $id = null, $name = null, $categories_id = null)
    {
        $this->conn = $db;

        $this->id = $id;
        $this->categories_id = $categories_id;
        $this->name = $name;
    }


    public function getSubCategoryFromId()
    {
        try {
            $sql = "SELECT * FROM " . $this->nome_tabella . " WHERE id=:id";
            $stmt           = $this->conn->prepare($sql);
            $stmt->bindParam(":id", $this->id, PDO::PARAM_INT);

            if ($stmt->execute()) {
                $row = $stmt->fetch(PDO::FETCH_OBJ);
                return $row;
            } else {
                bd_log("Errore durante il fetch dei dati : " .implode(":",$stmt->errorInfo()), "e", basename(__FILE__));
               return false;
            }
        } catch (Exception $e) {
            echo json_response($e->getMessage(), 500);
        }
    }

    public function getSubCategoriedFromCategory()
    {
        try {
            $sql = "SELECT * FROM " . $this->nome_tabella . " WHERE categories_id=:categories_id";
            $stmt           = $this->conn->prepare($sql);
            $stmt->bindParam(":categories_id", $this->categories_id, PDO::PARAM_INT);

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
