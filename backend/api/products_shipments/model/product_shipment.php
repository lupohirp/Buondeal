<?php
require_once '../../../utils/JSON_Response/json_responder.php';
require_once '../../../utils/Logs/LoggerFactory.php';

class Shipment
{
    // connessione al database e nome della tabella
    private $conn;
    private $nome_tabella = "products_shipments";


    // propriet�  dell'oggetto
    public $id;
    public $forwarder_id;
    public $products_id;
    public $deliveryExtimatedTime;
    public $shipmentCost;

    public function __construct(
        $db,
        $id = null,
        $forwarder_id = null,
        $products_id = null,
        $deliveryExtimatedTime = null,
        $shipmentCost = null
    ) {
        $this->conn = $db;

        $this->id = $id;
        $this->forwarder_id = $forwarder_id;
        $this->products_id  = $products_id;
        $this->deliveryExtimatedTime  = $deliveryExtimatedTime;
        $this->shipmentCost  = $shipmentCost;
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
            $sql = "INSERT INTO " . $this->nome_tabella . " SET forwarder_id=:forwarder_id ,
                                                            products_id=:products_id , 
                                                            deliveryExtimatedTime=:deliveryExtimatedTime , 
                                                            shipmentCost=:shipmentCost";
            $stmt = $this->conn->prepare($sql);
            
            $stmt->bindParam(":forwarder_id", $this->forwarder_id, PDO::PARAM_INT);
            $stmt->bindParam(":products_id", $this->products_id, PDO::PARAM_INT);
            $stmt->bindParam(":deliveryExtimatedTime", $this->deliveryExtimatedTime, PDO::PARAM_INT);
            $stmt->bindParam(":shipmentCost", $this->shipmentCost, PDO::PARAM_INT);
            
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
