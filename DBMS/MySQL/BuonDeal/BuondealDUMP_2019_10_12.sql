-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: buondeal
-- ------------------------------------------------------
-- Server version	5.7.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `anag_forwarders`
--

DROP TABLE IF EXISTS `anag_forwarders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `anag_forwarders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Nome` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anag_forwarders`
--

LOCK TABLES `anag_forwarders` WRITE;
/*!40000 ALTER TABLE `anag_forwarders` DISABLE KEYS */;
INSERT INTO `anag_forwarders` VALUES (8,'BRT'),(4,'GLS'),(7,'Nexive'),(1,'Poste Italiane'),(2,'SDA'),(6,'TNT'),(5,'UPS');
/*!40000 ALTER TABLE `anag_forwarders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confirm`
--

DROP TABLE IF EXISTS `confirm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `confirm` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` bigint(20) NOT NULL,
  `keyhash` varchar(1000) NOT NULL DEFAULT '',
  `enabled` varchar(100) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `confirm_users_fk` (`userid`),
  CONSTRAINT `confirm_users_fk` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confirm`
--

LOCK TABLES `confirm` WRITE;
/*!40000 ALTER TABLE `confirm` DISABLE KEYS */;
INSERT INTO `confirm` VALUES (3,3,'OTAgNTYgODggNjQgNjkgNjEgNjIgNjQgOTAgNTYgODggNjQgNjkgNjEgNjIgNjQgODMgOTcgMCA1NiA2NCA2OSA1NCA1MiA2MSAwIDEzIDUxIDEgMTMgNDEgNTEg','1'),(8,8,'MCA1NSA1NCA1NCA1NSA2OCA5IDIyIDY0IDk5IDU5IDU1IDY0IDczIDY0IDY2IDY4IDkgMzkgNTYgOTcgNTkgOSA3MSAxOCA1OSA3MyAzOSA5MCAxMDcgMCA1OSA2OCA3MyA1NiA1NCA2NCAwIDEzIDUzIDEgMTMgNDEgNTMg','0'),(16,25,'MCA1NSA1NCA1NCA1NSA2OCA5IDIyIDY0IDk5IDU5IDU1IDY0IDczIDY0IDY2IDY4IDkgMzkgNTYgOTcgNTkgOSA3MSAxOCA1OSA3MyAzOSA5MCAxMDcgMCA1OSA2OCA3MyA1NiA1NCA2NCAwIDEzIDUzIDEgMTMgNDEgNTMg','0');
/*!40000 ALTER TABLE `confirm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partners`
--

DROP TABLE IF EXISTS `partners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `partners` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userid` bigint(20) NOT NULL,
  `owner` varchar(100) NOT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `fiscal_code` varchar(100) NOT NULL,
  `vat` varchar(100) NOT NULL,
  `activity_sector` bigint(20) NOT NULL,
  `address_legal` varchar(100) NOT NULL,
  `postal_code_legal` varchar(100) NOT NULL,
  `telephone_number` varchar(100) DEFAULT NULL,
  `address_operative` varchar(100) NOT NULL,
  `postal_code_operative` varchar(100) NOT NULL,
  `partner_type` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `partners_un` (`userid`),
  KEY `partners_partners_type_fk` (`partner_type`),
  CONSTRAINT `partners_partners_type_fk` FOREIGN KEY (`partner_type`) REFERENCES `partners_type` (`id`),
  CONSTRAINT `partners_users_fk` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partners`
--

LOCK TABLES `partners` WRITE;
/*!40000 ALTER TABLE `partners` DISABLE KEYS */;
/*!40000 ALTER TABLE `partners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partners_confirmation_status`
--

DROP TABLE IF EXISTS `partners_confirmation_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `partners_confirmation_status` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partners_confirmation_status`
--

LOCK TABLES `partners_confirmation_status` WRITE;
/*!40000 ALTER TABLE `partners_confirmation_status` DISABLE KEYS */;
INSERT INTO `partners_confirmation_status` VALUES (1,'Richiesta inserita'),(2,'Richiesta in valutazione'),(3,'Richiesta evasa'),(4,'Richiesta rifiutata');
/*!40000 ALTER TABLE `partners_confirmation_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partners_type`
--

DROP TABLE IF EXISTS `partners_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `partners_type` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partners_type`
--

LOCK TABLES `partners_type` WRITE;
/*!40000 ALTER TABLE `partners_type` DISABLE KEYS */;
INSERT INTO `partners_type` VALUES (1,'Ditta'),(2,'Professionista'),(3,'Societá ');
/*!40000 ALTER TABLE `partners_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` bigint(11) NOT NULL,
  `categories` varchar(200) NOT NULL DEFAULT '',
  `description` varchar(200) DEFAULT NULL,
  `is_draft` tinyint(1) NOT NULL DEFAULT '0',
  `title` varchar(45) NOT NULL DEFAULT '',
  `is_free_shipment` tinyint(1) NOT NULL,
  `start_sold_date` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `FK_USERS_PRODUCTS_idx` (`userid`),
  CONSTRAINT `FK_USERS_PRODUCTS` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (4,3,'Categoria 4 che setterá marco...,Categoria 4 che setterá marco...,Categoria 1 che setterá marco...','<p><em>sssss</em></p>\n',0,'aaaaa',0,'0000-00-00'),(6,3,'Categoria 4 che setterá marco...,Categoria 4 che setterá marco...,Categoria 1 che setterá marco...','<p><em>sssss</em></p>\n',0,'aaaaa',0,'0000-00-00'),(7,3,'Categoria 4 che setterá marco...,Categoria 4 che setterá marco...,Categoria 1 che setterá marco...','<p><em>sssss</em></p>\n',0,'aaaaa',0,'0000-00-00'),(8,3,'Categoria 4 che setterá marco...,Categoria 4 che setterá marco...,Categoria 1 che setterá marco...','<p><em>sssss</em></p>\n',0,'aaaaa',0,'0000-00-00'),(9,3,'Categoria 4 che setterá marco...,Categoria 4 che setterá marco...,Categoria 1 che setterá marco...','<p><em>sssss</em></p>\n',0,'aaaaa',0,'0000-00-00'),(10,3,'Categoria 4 che setterá marco...,Categoria 4 che setterá marco...,Categoria 1 che setterá marco...','<p><em>sssss</em></p>\n',0,'aaaaa',0,'0000-00-00'),(11,3,'Categoria 4 che setterá marco...,Categoria 4 che setterá marco...,Categoria 1 che setterá marco...','<p><em>sssss</em></p>\n',0,'aaaaa',0,'0000-00-00'),(12,3,'Categoria 4 che setterá marco...,Categoria 4 che setterá marco...,Categoria 1 che setterá marco...','<p><em>sssss</em></p>\n',0,'aaaaa',0,'0000-00-00'),(13,3,'Categoria 4 che setterá marco...,Categoria 4 che setterá marco...,Categoria 1 che setterá marco...','<p><em>sssss</em></p>\n',0,'aaaaa',0,'0000-00-00'),(14,3,'Categoria 4 che setterá marco...,Categoria 4 che setterá marco...,Categoria 1 che setterá marco...','<p><em>sssss</em></p>\n',0,'aaaaa',0,'0000-00-00'),(15,3,'Categoria 4 che setterá marco...,Categoria 4 che setterá marco...,Categoria 1 che setterá marco...','<p><em>sssss</em></p>\n',0,'aaaaa',0,'0000-00-00'),(16,3,'Categoria 4 che setterá marco...,Categoria 4 che setterá marco...,Categoria 1 che setterá marco...','<p><em>sssss</em></p>\n',0,'aaaaa',0,'0000-00-00'),(17,3,'Categoria 4 che setterá marco...,Categoria 4 che setterá marco...,Categoria 1 che setterá marco...','<p><em>sssss</em></p>\n',0,'aaaaa',0,'0000-00-00'),(19,3,'Categoria 5 che setterá marco...,Categoria 4 che setterá marco...,Categoria 2 che setterá marco...','<p><em>aaaaa</em></p>\n',0,'aa123',0,'0000-00-00'),(20,3,'Categoria 4 che setterá marco...,Categoria 2 che setterá marco...,Categoria 3 che setterá marco...','<p><em>aaaaaaaa</em></p>\n',0,'TEST_COMPRESSIONE',0,'0000-00-00'),(28,3,'Categoria 3 che setterá marco...,Categoria 3 che setterá marco...,Categoria 4 che setterá marco...','<p><em>aaaaaa</em></p>\n',0,'TEST_SPEDIZIONI_1',0,'0000-00-00'),(29,3,'Categoria 3 che setterá marco...,Categoria 3 che setterá marco...,Categoria 4 che setterá marco...','<p><em>aaaaaa</em></p>\n',0,'TEST_SPEDIZIONI_1',0,'0000-00-00'),(33,3,'Categoria 2 che setterá marco...,Categoria 3 che setterá marco...','<p>sadsassa</p>\n',0,'adsada',0,'2019-09-06'),(34,3,'Categoria 1 che setter marco...,Categoria 2 che setter marco...,Categoria 3 che setter marco...','pdffsf/pn',0,'TEST_VISUALIZZAZIONE',0,'2019-10-02'),(39,3,'Categoria 2 che setter marco...,Categoria 4 che setter marco...,Categoria 3 che setter marco...','pCIAOCIAOCIAOCIAO/pn',0,'TEST_VENDITA_2',0,'2019-10-12'),(40,3,'Categoria 2 che setter marco...,Categoria 4 che setter marco...,Categoria 3 che setter marco...','pCIAOCIAOCIAOCIAO/pn',0,'TEST_VENDITA_2',0,'2019-10-12');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_images`
--

DROP TABLE IF EXISTS `products_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `products_images` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `product_id` int(20) NOT NULL,
  `image_path` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `products_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_images`
--

LOCK TABLES `products_images` WRITE;
/*!40000 ALTER TABLE `products_images` DISABLE KEYS */;
INSERT INTO `products_images` VALUES (1,19,'C:/Users/lodisepa/EasyPHP-Devserver-17/eds-www/images/19/'),(2,20,'C:/Users/lodisepa/EasyPHP-Devserver-17/eds-www/images/20/'),(3,34,'C:/Program Files (x86)/EasyPHP-Devserver-17/eds-www/images/34/'),(4,34,'C:/Program Files (x86)/EasyPHP-Devserver-17/eds-www/images/34/'),(5,34,'C:/Program Files (x86)/EasyPHP-Devserver-17/eds-www/images/34/'),(6,34,'C:/Program Files (x86)/EasyPHP-Devserver-17/eds-www/images/34/'),(7,34,'C:/Program Files (x86)/EasyPHP-Devserver-17/eds-www/images/34/'),(8,39,'Resource id #56'),(9,39,'Resource id #58'),(10,39,'Resource id #60'),(11,39,'Resource id #62'),(12,40,'C:/Program Files (x86)/EasyPHP-Devserver-17/eds-www/images/40/0.png'),(13,40,'C:/Program Files (x86)/EasyPHP-Devserver-17/eds-www/images/40/1.png'),(14,40,'C:/Program Files (x86)/EasyPHP-Devserver-17/eds-www/images/40/2.png'),(15,40,'C:/Program Files (x86)/EasyPHP-Devserver-17/eds-www/images/40/3.png');
/*!40000 ALTER TABLE `products_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_shipments`
--

DROP TABLE IF EXISTS `products_shipments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `products_shipments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `forwarder_id` int(11) NOT NULL,
  `products_id` int(11) NOT NULL,
  `shipmentCost` int(11) NOT NULL,
  `deliveryExtimatedTime` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `forwarder_id` (`forwarder_id`),
  KEY `products_id` (`products_id`),
  CONSTRAINT `products_shipments_ibfk_1` FOREIGN KEY (`forwarder_id`) REFERENCES `anag_forwarders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_shipments_ibfk_2` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_shipments`
--

LOCK TABLES `products_shipments` WRITE;
/*!40000 ALTER TABLE `products_shipments` DISABLE KEYS */;
INSERT INTO `products_shipments` VALUES (1,1,28,12,11),(2,1,29,12,11),(3,4,33,23,11),(4,7,34,44,23),(5,7,39,12,45),(6,7,40,12,45);
/*!40000 ALTER TABLE `products_shipments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_variants`
--

DROP TABLE IF EXISTS `products_variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `products_variants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `price` decimal(10,0) NOT NULL,
  `discount_price` decimal(10,0) NOT NULL,
  `quantity` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `products_variants_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_variants`
--

LOCK TABLES `products_variants` WRITE;
/*!40000 ALTER TABLE `products_variants` DISABLE KEYS */;
INSERT INTO `products_variants` VALUES (1,'AA1','AA1',12,11,12,16),(2,'AA1','AA1',12,11,12,17),(4,'as2','as2',12,12,12,19),(5,'Titolo_TEST_','Titolo_TEST_',11,11,12,20),(11,'TEST_VARIANTE_1','TEST_VARIANTE_1',11,2,12,28),(12,'TEST_VARIANTE_1','TEST_VARIANTE_1',11,2,12,29),(13,'sadsasad','sdadsadsads',12,12,1,33),(14,'ssss','ssss',12,11,23,34),(15,'prima variante','descrizione prima variante',13,12,5,39),(16,'prima variante','descrizione prima variante',13,12,5,40);
/*!40000 ALTER TABLE `products_variants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrator'),(2,'Manager'),(3,'User');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `role` bigint(20) NOT NULL DEFAULT '3',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_un1` (`id`),
  UNIQUE KEY `users_un2` (`username`),
  UNIQUE KEY `users_un3` (`email`),
  KEY `users_roles_fk` (`role`),
  CONSTRAINT `users_roles_fk` FOREIGN KEY (`role`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'pakilodi','e86e3156f563511b98847a6fdaf80160','pakilodi@gmail.com','pasquale','lodise',3),(25,'mrccristofaro','2dc92a1e6cc393833b5f2e3cc3177cd5','lodise.pasquale@gmail.com','marco','Cristofaro',3);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-12  9:36:44
