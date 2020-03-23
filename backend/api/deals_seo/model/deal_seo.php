<?php
require_once '../../../utils/JSON_Response/json_responder.php';
require_once '../../../utils/Logs/LoggerFactory.php';

class SEO
{
    // connessione al database e nome della tabella
    private $conn;
    private $nome_tabella = "deals_seo";


    // propriet�  dell'oggetto
    public $id;
    public $deal_id;
    public $seo_title;
    public $seo_description;

    public function __construct(
        $db,
        $id = null,
        $deal_id = null,
        $seo_title = null,
        $seo_description = null
    ) {
        $this->conn = $db;

        $this->id = $id;
        $this->deal_id = $deal_id;
        $this->seo_title  = $seo_title;
        $this->seo_description  = $seo_description;
    }

    
    public function delete()
    {
        // try {
        //     $sql = "DELETE FROM " . $this->nome_tabella . " WHERE id =: id";
        //     $stmt = $this->conn->prepare($sql);


        //     $stmt->bindParam(":id", $this->id, PDO::PARAM_INT);
        
        //     if ($stmt->execute()) {
        //         return true;
        //     } else {
        //        return $stmt->errorInfo();
        //     }
        // } catch (Exception $e) {
        //     echo json_response($e->getMessage(), 500);
        // }
    }


    public function update()
    {
        // try {
        //     $sql = "UPDATE " . $this->nome_tabella . " SET userid=:userid,title=:title,categories =: categories,description =:description,is_draft =:is_draft WHERE id=:id";
        //     $stmt           = $this->conn->prepare($sql);

        //     $stmt->bindParam(":userid", $this->userid, PDO::PARAM_INT);
        //     $stmt->bindParam(":title", $this->title, PDO::PARAM_STR);
        //     $stmt->bindParam(":categories", $this->categories, PDO::PARAM_STR);
        //     $stmt->bindParam(":description", $this->description, PDO::PARAM_STR);
        //     $stmt->bindParam(":is_draft", $this->is_draft, PDO::PARAM_BOOL);

        //     $stmt->bindParam(":id", $this->id, PDO::PARAM_INT);
            
        //     $stmt -> execute();
        //     if ($stmt ->rowCount() >0) {
        //         return true;
        //     } else {
        //        return $stmt->errorInfo();
        //     }
        // } catch (Exception $e) {
        //     echo json_response($e->getMessage(), 500);
        // }
    }

    public function insert()
    {
        try {
            $sql = "INSERT INTO " . $this->nome_tabella . " SET deal_id=:deal_id ,
                                                            seo_title=:seo_title , 
                                                            seo_description=:seo_description";
            $stmt = $this->conn->prepare($sql);
            
            $stmt->bindParam(":deal_id", $this->deal_id, PDO::PARAM_INT);
            $stmt->bindParam(":seo_title", $this->seo_title, PDO::PARAM_STR);
            $stmt->bindParam(":seo_description", $this->seo_description, PDO::PARAM_STR);
            
            if ($stmt->execute()) {
                return true;
            } else {
                bd_log("Errore durante il salvataggio dei dati : " .implode(":",$stmt->errorInfo()), "e", basename(__FILE__));
                return false;
            }
        } catch (Exception $e) {
            echo json_response($e->getMessage(), 500);
        }
    }

    public function getFromDealId()
    {
        try {
            $sql = "SELECT * FROM " . $this->nome_tabella . " WHERE deal_id=:deal_id";
            $stmt           = $this->conn->prepare($sql);

            $stmt->bindParam(":deal_id", $this->deal_id, PDO::PARAM_INT);
        
            if ($stmt -> execute()) {
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
