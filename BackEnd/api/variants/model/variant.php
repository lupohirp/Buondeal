<?php
require_once '../../../utils/JSON_Response/json_responder.php';
require_once '../../../utils/Logs/LoggerFactory.php';

class Variant
{
    // connessione al database e nome della tabella
    private $conn;
    private $nome_tabella = "variants";


    // propriet�  dell'oggetto
    public $id;
    public $title;
    public $description;
    public $price;
    public $discount_price;
    public $quantity;
    public $product_id;

    public function __construct(
        $db,
        $id = null,
        $title = null,
        $description = null,
        $price = null,
        $discount_price = null,
        $quantity = null,
        $product_id = null
    ) {
        $this->conn = $db;

        $this->id = $id;
        $this->title = $title;
        $this->description  = $description;
        $this->price  = $price;
        $this->discount_price  = $discount_price;
        $this->quantity = $quantity;
        $this->product_id = $product_id;
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
            $sql = "INSERT INTO " . $this->nome_tabella . " SET title=:title,description=:description,
                                                            price =:price,discount_price=:discount_price,
                                                            quantity=:quantity,product_id=:product_id";
            $stmt = $this->conn->prepare($sql);

            $stmt->bindParam(":title", $this->title, PDO::PARAM_STR);
            $stmt->bindParam(":description", $this->description, PDO::PARAM_STR);
            $stmt->bindParam(":price", $this->price, PDO::PARAM_STR);
            $stmt->bindParam(":discount_price", $this->discount_price, PDO::PARAM_STR);
            $stmt->bindParam(":quantity", $this->quantity, PDO::PARAM_STR);
            $stmt->bindParam(":product_id", $this->product_id, PDO::PARAM_STR);

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
