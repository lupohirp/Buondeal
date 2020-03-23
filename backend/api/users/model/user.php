<?php
require_once '../../../utils/JSON_Response/json_responder.php';
require_once '../../../utils/Logs/LoggerFactory.php';


class User
{
    // connessione al database e nome della tabella
    private $conn;
    private $nome_tabella = "users";


    // propriet�  dell'oggetto
    public $id;
    public $username;
    public $password;
    public $email;
    public $name;
    public $surname;

    public function __construct($db, $id=null, $username=null, $password=null, $email=null, $name=null, $surname=null)
    {
        $this->conn = $db;
        $this->id =$id;
        $this->username = $username;
        $this->password = $password;
        $this->email    = $email;
        $this->name     = $name;
        $this->surname  = $surname;
    }

    public function insert()
    {
        try {
            $sql = "INSERT INTO " . $this->nome_tabella . " SET username=:username, password=:password, email=:email, name=:name,surname=:surname";


            $stmt           = $this->conn->prepare($sql);
            $this->username = htmlspecialchars(strip_tags($this->username));
            $this->password = htmlspecialchars(strip_tags($this->password));
            $this->email    = htmlspecialchars(strip_tags($this->email));
            $this->name     = htmlspecialchars(strip_tags($this->name));
            $this->surname  = htmlspecialchars(strip_tags($this->surname));



            $stmt->bindParam(":username", $this->username, PDO::PARAM_STR);
            $stmt->bindParam(":password", $this->password, PDO::PARAM_STR);
            $stmt->bindParam(":email", $this->email, PDO::PARAM_STR);
            $stmt->bindParam(":name", $this->name, PDO::PARAM_STR);
            $stmt->bindParam(":surname", $this->surname, PDO::PARAM_STR);


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

    public function update()
    {
        try {
            $sql = "UPDATE " . $this->nome_tabella . " SET username=:username, password=:password, email=:email, name=:name,surname=:surname WHERE id=:id";


            $stmt           = $this->conn->prepare($sql);

            $stmt->bindParam(":id", $this->id, PDO::PARAM_INT);
            $stmt->bindParam(":username", $this->username, PDO::PARAM_STR);
            $stmt->bindParam(":password", $this->password, PDO::PARAM_STR);
            $stmt->bindParam(":email", $this->email, PDO::PARAM_STR);
            $stmt->bindParam(":name", $this->name, PDO::PARAM_STR);
            $stmt->bindParam(":surname", $this->surname, PDO::PARAM_STR);

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

    public function login()
    {
        try {
            $sql = "SELECT * FROM " . $this->nome_tabella . " WHERE username=:username AND password=:password";


            $stmt           = $this->conn->prepare($sql);

            $stmt->bindParam(":username", $this->username, PDO::PARAM_STR);
            $stmt->bindParam(":password", $this->password, PDO::PARAM_STR);

            if ($stmt->execute()) {
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($row) {
                    return $row;
                } else {
                    return null;
                }
            }
        } catch (Exception $e) {
            echo json_response($e->getMessage(), 500);
        }
    }

    public function loginByEmail()
    {
        try {
            $sql = "SELECT * FROM " . $this->nome_tabella . " WHERE email=:email AND password=:password";

            $stmt           = $this->conn->prepare($sql);

            $this->email    = htmlspecialchars(strip_tags($this->email));
            $stmt->bindParam(":email", $this->email, PDO::PARAM_STR);
            $stmt->bindParam(":password", $this->password, PDO::PARAM_STR);

            if ($stmt->execute()) {
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($row) {
                    return $row;
                } else {
                    return null;
                }
            }
        } catch (Exception $e) {
            echo json_response($e->getMessage(), 500);
        }
    }
}
