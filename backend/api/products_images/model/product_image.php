<?php
require_once '../../../utils/JSON_Response/json_responder.php';
require_once '../../../utils/Logs/LoggerFactory.php';


class ProductImage
{
    // connessione al database e nome della tabella
    private $conn;
    private $nome_tabella = "products_images_variants_details";


    // propriet�  dell'oggetto
    public $id;
    public $product_id;
    public $variant_id;
    public $image_path;
    public $zoomed_path;

    public function __construct(
        $db,
        $id = null,
        $product_id = null,
        $variant_id = null,
        $image_path = null,
        $zoomed_path = null
    ) {
        $this->conn = $db;

        $this->id = $id;
        $this->product_id = $product_id;
        $this->variant_id = $variant_id;
        $this->image_path = $image_path;
        $this->zoomed_path = $zoomed_path;
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


    public function getFromVariantId()
    {
        try {
            $sql = "SELECT * FROM " . $this->nome_tabella . " WHERE variant_id=:variant_id";
            $stmt           = $this->conn->prepare($sql);

            $stmt->bindParam(":variant_id", $this->variant_id, PDO::PARAM_INT);
        
            if ($stmt -> execute()) {
                return  $stmt->fetchAll(PDO::FETCH_OBJ);
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
            $sql = "SELECT * FROM " . $this->nome_tabella . " WHERE product_id=:product_id";
            $stmt           = $this->conn->prepare($sql);

            $stmt->bindParam(":product_id", $this->product_id, PDO::PARAM_INT);
        
            if ($stmt -> execute()) {
                return  $stmt->fetchAll(PDO::FETCH_OBJ);
            } else {
                bd_log("Errore durante il fetch dei dati : " .implode(":",$stmt->errorInfo()), "e", basename(__FILE__));
                return false;
            }
        } catch (Exception $e) {
            echo json_response($e->getMessage(), 500);
        }
    }

    public function insert()
    {
        try {
            $sql = "INSERT INTO " . $this->nome_tabella . " SET product_id=:product_id,variant_id=:variant_id,image_path=:image_path,zoomed_path=:zoomed_path";
            $stmt = $this->conn->prepare($sql);

            $stmt->bindParam(":product_id", $this->product_id, PDO::PARAM_INT);
            $stmt->bindParam(":variant_id", $this->variant_id, PDO::PARAM_INT);
            $stmt->bindParam(":image_path", $this->image_path, PDO::PARAM_STR);
            $stmt->bindParam(":zoomed_path", $this->zoomed_path, PDO::PARAM_STR);

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
}
