<?php
require_once '../../../utils/JSON_Response/json_responder.php';
require_once '../../../utils/Logs/LoggerFactory.php';

class Variant
{
    // connessione al database e nome della tabella
    private $conn;
    private $nome_tabella = "deals_variants";


    // propriet�  dell'oggetto
    public $variant_id;
    public $price;
    public $discount_price;
    public $quantity;
    public $deal_id;
    public $url;
    public $start_variant_date;
    public $end_variant_date;

    public function __construct(
        $db,
        $variant_id = null,
        $price = null,
        $discount_price = null,
        $quantity = null,
        $deal_id = null,
        $url = null,
        $start_variant_date = null,
        $end_variant_date = null
    ) {
        $this->conn = $db;

        $this->variant_id = $variant_id;
        $this->price  = $price;
        $this->discount_price  = $discount_price;
        $this->quantity = $quantity;
        $this->deal_id = $deal_id;
        $this->url = $url;
        $this->start_variant_date = $start_variant_date;
        $this->end_variant_date = $end_variant_date;
        
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



    public function insert()
    {
        try {
            $sql = "INSERT INTO " . $this->nome_tabella . " SET
                                                            price =:price,discount_price=:discount_price,
                                                            quantity=:quantity,deal_id=:deal_id,
                                                            redirectUrl=:redirectUrl,
                                                            start_variant_date=:start_variant_date,
                                                            end_variant_date=:end_variant_date";
            $stmt = $this->conn->prepare($sql);

            $stmt->bindParam(":price", $this->price, PDO::PARAM_STR);
            $stmt->bindParam(":discount_price", $this->discount_price, PDO::PARAM_STR);
            $stmt->bindParam(":quantity", $this->quantity, PDO::PARAM_STR);
            $stmt->bindParam(":deal_id", $this->deal_id, PDO::PARAM_STR);
            $stmt->bindParam(":redirectUrl", $this->url, PDO::PARAM_STR);
            $stmt->bindParam(":start_variant_date", $this->start_variant_date, PDO::PARAM_INT);
            $stmt->bindParam(":end_variant_date", $this->end_variant_date, PDO::PARAM_INT);

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
