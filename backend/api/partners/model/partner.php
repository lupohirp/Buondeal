<?php
require_once '../../../utils/JSON_Response/json_responder.php';
require_once '../../../utils/Logs/LoggerFactory.php';

class Partner
{
    // connessione al database e nome della tabella
    private $conn;
    private $nome_tabella = "partners";


    // propriet�  dell'oggetto
    public $id;
    public $userid;
    public $owner;
    public $company_name;
    public $fiscal_code;
    public $vat;
    public $activity_sector;
    public $address_legal;
    public $postal_code_legal;
    public $telephone_number;
    public $address_operative;
    public $postal_code_operative;
    public $partner_type;


    public function __construct(
        $db,
        $userid = null,
        $owner = null,
        $company_name = null,
        $fiscal_code = null,
        $vat = null,
        $activity_sector = null,
        $address_legal = null,
        $postal_code_legal = null,
        $telephone_number = null,
        $address_operative = null,
        $postal_code_operative = null,
        $partner_type = null
    ) {
        $this->conn = $db;

        $this->userid = $userid;
        $this->owner = $owner;
        $this->company_name  = $company_name;
        $this->fiscal_code  = $fiscal_code;
        $this->vat  = $vat;
        $this->activity_sector  = $activity_sector;
        $this->address_legal  = $address_legal;
        $this->postal_code_legal  = $postal_code_legal;
        $this->telephone_number  = $telephone_number;
        $this->address_operative  = $address_operative;
        $this->postal_code_operative  = $postal_code_operative;
        $this->partner_type = $partner_type;
    }

    public function insert()
    {
        $sql = "INSERT INTO " . $this->nome_tabella . " SET userid=:userid, owner=:owner, company_name=:company_name,fiscal_code=:fiscal_code,vat=:vat,activity_sector=:activity_sector,
                    address_legal=:address_legal,postal_code_legal =:postal_code_legal,telephone_number=:telephone_number, address_operative=:address_operative, postal_code_operative=:postal_code_operative, partner_type=:partner_type";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":userid", $this->userid, PDO::PARAM_INT);
        $stmt->bindParam(":owner", $this->owner, PDO::PARAM_STR);
        $stmt->bindParam(":company_name", $this->company_name, PDO::PARAM_STR);
        $stmt->bindParam(":fiscal_code", $this->fiscal_code, PDO::PARAM_STR);
        $stmt->bindParam(":vat", $this->vat, PDO::PARAM_STR);
        $stmt->bindParam(":activity_sector", $this->activity_sector, PDO::PARAM_STR);
        $stmt->bindParam(":address_legal", $this->address_legal, PDO::PARAM_STR);
        $stmt->bindParam(":postal_code_legal", $this->postal_code_legal, PDO::PARAM_STR);
        $stmt->bindParam(":telephone_number", $this->telephone_number, PDO::PARAM_STR);
        $stmt->bindParam(":address_operative", $this->address_operative, PDO::PARAM_STR);
        $stmt->bindParam(":postal_code_operative", $this->postal_code_operative, PDO::PARAM_STR);
        $stmt->bindParam(":partner_type", $this->partner_type, PDO::PARAM_STR);


        if ($stmt->execute()) {
            return true;
        } else {
            print_r($stmt->errorInfo());
            return false;
        }
    }


    public function getByUserId()
    {
        $sql = "SELECT * FROM " . $this->nome_tabella . " WHERE userid=:userid";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":userid", $this->userid, PDO::PARAM_INT);

        if ($stmt->execute()) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($row) {
                return $row;
            } else {
                return null;
            }
        } else {
            print_r($stmt->errorInfo());
            return false;
        }
    }
}
