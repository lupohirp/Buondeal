<?php
require_once '../../../utils/JSON_Response/json_responder.php';
require_once '../../../utils/Logs/LoggerFactory.php';

class Product
{
    // connessione al database e nome della tabella
    private $conn;
    private $nome_tabella = "products";


    // propriet�  dell'oggetto
    public $id;
    public $userid;
    public $category_id;
    public $subcategory_id;
    public $title;
    public $description;
    public $is_draft;
    public $is_free_shipment;
    public $start_sold_date;
    public $images;
    public $variants;

    public function __construct(
        $db,
        $id = null,
        $userid = null,
        $title = null,
        $category_id = null,
        $subcategory_id = null,
        $description = null,
        $is_draft = null,
        $is_free_shipment = null,
        $start_sold_date = null,
        $images = null,
        $variants = null
    ) {
        $this->conn = $db;

        $this->id = $id;
        $this->userid = $userid;
        $this->title  = $title;
        $this->category_id = $category_id;
        $this->subcategory_id = $subcategory_id;
        $this->description  = $description;
        $this->is_draft  = $is_draft;
        $this->is_free_shipment = $is_free_shipment;
        $this->start_sold_date = $start_sold_date;
        $this->images = $images;
        $this->variants = $variants;
    }

    
    public function delete()
    {
        try {
            $sql = "DELETE FROM " . $this->nome_tabella . " WHERE id =:id";
            $stmt = $this->conn->prepare($sql);


            $stmt->bindParam(":id", $this->id, PDO::PARAM_INT);
        
            if ($stmt->execute()) {
                return true;
            } else {
                bd_log("Errore durante la cancellazione dei dati : " .implode(":",$stmt->errorInfo()), "e", basename(__FILE__));
                return false;
            }
        } catch (Exception $e) {
            echo json_response($e->getMessage(), 500);
        }
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
            $sql = "INSERT INTO " . $this->nome_tabella . " SET userid=:userid ,
                                                                title=:title , 
                                                                categories_id=:categories_id ,
                                                                subcategories_id=:subcategories_id, 
                                                                description=:description, 
                                                                is_draft=:is_draft,
                                                                is_free_shipment=:is_free_shipment,
                                                                start_sold_date=:start_sold_date";
            $stmt = $this->conn->prepare($sql);
            
            $stmt->bindParam(":userid", $this->userid, PDO::PARAM_INT);
            $stmt->bindParam(":title", $this->title, PDO::PARAM_STR);
            $stmt->bindParam(":categories_id", $this->category_id, PDO::PARAM_INT);
            $stmt->bindParam(":subcategories_id", $this->subcategory_id, PDO::PARAM_INT);
            $stmt->bindParam(":description", $this->description, PDO::PARAM_STR);
            $stmt->bindParam(":is_draft", $this->is_draft, PDO::PARAM_BOOL);
            $stmt->bindParam(":is_free_shipment", $this->is_free_shipment, PDO::PARAM_BOOL);
            $stmt->bindParam(":start_sold_date", $this->start_sold_date, PDO::PARAM_STR);


            
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


    public function getFromUserId()
    {
        try {
            $sql = "SELECT * FROM " . $this->nome_tabella . " WHERE userid=:userid";
            $stmt           = $this->conn->prepare($sql);
            $stmt->bindParam(":userid", $this->userid, PDO::PARAM_INT);

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

    public function getFromProductId()
    {
        try {
            $sql = "SELECT * FROM " . $this->nome_tabella . " WHERE id=:id";
            $stmt           = $this->conn->prepare($sql);
            $stmt->bindParam(":id", $this->id, PDO::PARAM_INT);
    
            if ($stmt->execute()) {
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                return $row;
            }
        } catch (Exception $e) {
            echo json_response($e->getMessage(), 500);
        }
    }
}
