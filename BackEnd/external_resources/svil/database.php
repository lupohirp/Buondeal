<?php

class Database{
  private $host = "localhost";
  private $db_name = "buondeal";
  private $username = "buondeal";
  private $password = "a123";
  public $conn;

  public function getConnection(){
    $this->conn = null;
    try{
        $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
        $this->conn->exec("set names utf8");
    }catch(PDOException $exception){
        echo "Connection error: " . $exception->getMessage();
    }
	
	$this->conn->setAttribute(PDO::ATTR_AUTOCOMMIT,0);
    return $this->conn;
 }


  }


?>