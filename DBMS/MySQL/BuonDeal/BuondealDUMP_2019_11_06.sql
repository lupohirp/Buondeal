-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 06, 2019 at 10:52 PM
-- Server version: 5.7.17
-- PHP Version: 7.1.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `buondeal`
--

-- --------------------------------------------------------

--
-- Table structure for table `anag_categories`
--

CREATE TABLE `anag_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `anag_categories`
--

INSERT INTO `anag_categories` (`id`, `name`) VALUES
(1, 'Abbigliamento'),
(2, 'Alimentari'),
(4, 'Bellezza'),
(9, 'Casa e cucina'),
(8, 'Elettronica e accessori'),
(10, 'Giardino e giardinaggio'),
(18, 'Giochi e giocattoli'),
(11, 'Grandi elettrodomestici'),
(12, 'Illuminazione'),
(7, 'Informatica e accessori'),
(20, 'Orologi'),
(3, 'Prima infanzia'),
(5, 'Prodotti Media'),
(13, 'Salute e cura della persona'),
(14, 'Scarpe e borse'),
(15, 'Software e videogiochi'),
(16, 'Sport e tempo libero'),
(17, 'Strumenti musicali e DJ');

-- --------------------------------------------------------

--
-- Table structure for table `anag_forwarders`
--

CREATE TABLE `anag_forwarders` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `anag_forwarders`
--

INSERT INTO `anag_forwarders` (`id`, `name`) VALUES
(8, 'BRT'),
(4, 'GLS'),
(7, 'Nexive'),
(1, 'Poste Italiane'),
(2, 'SDA'),
(0, 'Spedizione Gratuita'),
(6, 'TNT'),
(5, 'UPS');

-- --------------------------------------------------------

--
-- Table structure for table `anag_subcategories`
--

CREATE TABLE `anag_subcategories` (
  `id` int(11) NOT NULL,
  `categories_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `anag_subcategories`
--

INSERT INTO `anag_subcategories` (`id`, `categories_id`, `name`) VALUES
(1, 1, 'Bluse e camicie'),
(2, 1, 'abiti da uomo'),
(3, 1, 'abiti e gonne'),
(4, 1, ' jeans, pantaloni e pantaloncini'),
(5, 1, ' t-shirt'),
(6, 1, 'polo e maglie senza maniche'),
(7, 1, 'giacche e cappotti'),
(8, 1, 'abbigliamento premaman'),
(9, 1, 'lingerie e intimo'),
(10, 1, 'costumi da bagno'),
(11, 1, ' calze, collanti e leggings');

-- --------------------------------------------------------

--
-- Table structure for table `anag_variants`
--

CREATE TABLE `anag_variants` (
  `id` int(11) NOT NULL,
  `categories_id` int(11) NOT NULL,
  `subcategories_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `anag_variants`
--

INSERT INTO `anag_variants` (`id`, `categories_id`, `subcategories_id`, `name`) VALUES
(1, 1, 1, 'Taglia'),
(2, 1, 1, 'Colore'),
(3, 1, 6, 'Taglia'),
(4, 1, 6, 'Colore');

-- --------------------------------------------------------

--
-- Table structure for table `anag_variants_values`
--

CREATE TABLE `anag_variants_values` (
  `id` int(11) NOT NULL,
  `id_anag_variants` int(11) NOT NULL,
  `name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `confirm`
--

CREATE TABLE `confirm` (
  `id` int(11) NOT NULL,
  `userid` bigint(20) NOT NULL,
  `keyhash` varchar(1000) NOT NULL DEFAULT '',
  `enabled` varchar(100) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `confirm`
--

INSERT INTO `confirm` (`id`, `userid`, `keyhash`, `enabled`) VALUES
(3, 3, 'OTAgNTYgODggNjQgNjkgNjEgNjIgNjQgOTAgNTYgODggNjQgNjkgNjEgNjIgNjQgODMgOTcgMCA1NiA2NCA2OSA1NCA1MiA2MSAwIDEzIDUxIDEgMTMgNDEgNTEg', '1'),
(8, 8, 'MCA1NSA1NCA1NCA1NSA2OCA5IDIyIDY0IDk5IDU5IDU1IDY0IDczIDY0IDY2IDY4IDkgMzkgNTYgOTcgNTkgOSA3MSAxOCA1OSA3MyAzOSA5MCAxMDcgMCA1OSA2OCA3MyA1NiA1NCA2NCAwIDEzIDUzIDEgMTMgNDEgNTMg', '0'),
(16, 25, 'MCA1NSA1NCA1NCA1NSA2OCA5IDIyIDY0IDk5IDU5IDU1IDY0IDczIDY0IDY2IDY4IDkgMzkgNTYgOTcgNTkgOSA3MSAxOCA1OSA3MyAzOSA5MCAxMDcgMCA1OSA2OCA3MyA1NiA1NCA2NCAwIDEzIDUzIDEgMTMgNDEgNTMg', '0');

-- --------------------------------------------------------

--
-- Table structure for table `partners`
--

CREATE TABLE `partners` (
  `id` bigint(20) NOT NULL,
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
  `partner_type` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `partners_confirmation_status`
--

CREATE TABLE `partners_confirmation_status` (
  `id` bigint(20) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `partners_confirmation_status`
--

INSERT INTO `partners_confirmation_status` (`id`, `description`) VALUES
(1, 'Richiesta inserita'),
(2, 'Richiesta in valutazione'),
(3, 'Richiesta evasa'),
(4, 'Richiesta rifiutata');

-- --------------------------------------------------------

--
-- Table structure for table `partners_type`
--

CREATE TABLE `partners_type` (
  `id` bigint(20) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `partners_type`
--

INSERT INTO `partners_type` (`id`, `description`) VALUES
(1, 'Ditta'),
(2, 'Professionista'),
(3, 'Societá ');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `userid` bigint(11) NOT NULL,
  `categories_id` int(11) NOT NULL,
  `subcategories_id` int(11) NOT NULL,
  `description` varchar(5000) DEFAULT NULL,
  `is_draft` tinyint(1) NOT NULL DEFAULT '0',
  `title` varchar(45) NOT NULL DEFAULT '',
  `is_free_shipment` tinyint(1) NOT NULL,
  `start_sold_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `userid`, `categories_id`, `subcategories_id`, `description`, `is_draft`, `title`, `is_free_shipment`, `start_sold_date`) VALUES
(77, 3, 1, 1, '<h2 style=\"fontstyle:italic;\">TEST_VARIANTE!!!! DESCRIZIONE FIGHISSIMA!</h2>\n', 0, 'TEST_VARIANTI', 1, '2019-10-16'),
(83, 3, 1, 1, '<h1 style=\"fontstyle: italic;\">CIAOOOOOOOOOOO!</h1>\n\n<p>nbsp;</p>\n\n<p>nbsp;</p>\n\n<p>Vuoi conquistare tutte le femmine di Avellino con questa maglietta superfiga?</p>\n\n<p>nbsp;</p>\n\n<p>DA OGGI PUOI!nbsp;</p>\n\n<p>nbsp;</p>\n\n<p>Potrati fare l#39;ombrellino ai platani, oppure al corso....e tutte le donne cadranno ai tuoi piedi!!!</p>\n', 0, 'Maglietta SuperFiga!', 1, '2019-10-17'),
(84, 3, 1, 1, '<h1>CIAOOOOOOOOOOO!</h1>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>Vuoi conquistare tutte le femmine di Avellino con questa maglietta superfiga?</p>\n\n<p>&nbsp;</p>\n\n<p>DA OGGI PUOI!</p>\n\n<p>&nbsp;</p>\n\n<p>Potrati fare l&#39;ombrellino ai platani, oppure al corso....e tutte le donne cadranno ai tuoi piedi!!!</p>\n', 0, 'AAAAAAAAAAAAAAAAAa', 1, '2019-10-19'),
(86, 3, 1, 1, '<blockquote>\n<p>QUESTO E&#39; un test per WEBP!</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<div style=\"background:#eeeeee;border:1px solid #cccccc;padding:5px 10px;\">HAI CAPIto BRUTTO STRONZO?????</div>\n</blockquote>\n', 0, 'TEST_WEBP', 1, '2019-10-26'),
(88, 3, 1, 1, '<div style=\"background:#eeeeee;border:1px solid #cccccc;padding:5px 10px;\">STRONZO E&#39; UN TEST PER BUONDEALLLLLL!!!!</div>\n\n<div style=\"background:#eeeeee;border:1px solid #cccccc;padding:5px 10px;\">&nbsp;</div>\n\n<div style=\"background:#eeeeee;border:1px solid #cccccc;padding:5px 10px;\">&nbsp;</div>\n\n<div style=\"background:#eeeeee;border:1px solid #cccccc;padding:5px 10px;\">&nbsp;</div>\n\n<div style=\"background:#eeeeee;border:1px solid #cccccc;padding:5px 10px;\">HAI CAPITO STRONZOOOOOOOOOOOOOOOOO</div>\n', 0, 'TEST_WEBP', 1, '2019-10-26'),
(89, 3, 1, 1, '<p>sdasdsadassd</p>\n', 0, 'AAA', 1, '2019-10-26'),
(90, 3, 1, 1, '<p>AAAAAAAAAAAAAAAAAASSSSSSSSSSSSSSSSS</p>\n', 0, 'AAAAA', 1, '2019-10-26'),
(91, 3, 1, 1, '<p>fgdgdgfd</p>\n', 0, 'AAA', 1, '2019-10-26'),
(92, 3, 1, 1, '<p>dsadsa</p>\n', 0, 'adax', 1, '2019-10-26'),
(93, 3, 1, 1, '<p>asa</p>\n', 0, 'AAA', 1, '2019-10-26'),
(94, 3, 1, 1, '<p>asa</p>\n', 0, 'AAA', 1, '2019-10-26');

-- --------------------------------------------------------

--
-- Table structure for table `products_images`
--

CREATE TABLE `products_images` (
  `id` bigint(20) NOT NULL,
  `product_id` int(20) NOT NULL,
  `image_path` varchar(200) NOT NULL,
  `zoomed_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products_images`
--

INSERT INTO `products_images` (`id`, `product_id`, `image_path`, `zoomed_path`) VALUES
(79, 77, 'images/77/0.jpg', 'images/77/0_big.jpg'),
(80, 77, 'images/77/1.jpg', 'images/77/1_big.jpg'),
(81, 83, 'images/83/0.jpg', 'images/83/0_big.jpg'),
(82, 83, 'images/83/1.jpg', 'images/83/1_big.jpg'),
(83, 86, 'images/86/0.webp', 'images/86/0_big.webp'),
(84, 86, 'images/86/1.webp', 'images/86/1_big.webp'),
(85, 86, 'images/86/2.webp', 'images/86/2_big.webp'),
(86, 88, 'images/88/0.webp', 'images/88/0_big.webp'),
(87, 88, 'images/88/1.webp', 'images/88/1_big.webp'),
(88, 88, 'images/88/2.webp', 'images/88/2_big.webp'),
(89, 88, 'images/88/3.webp', 'images/88/3_big.webp'),
(90, 89, 'images/89/0.webp', 'images/89/0_big.webp'),
(91, 89, 'images/89/1.webp', 'images/89/1_big.webp'),
(92, 89, 'images/89/2.webp', 'images/89/2_big.webp'),
(93, 89, 'images/89/3.webp', 'images/89/3_big.webp'),
(94, 90, 'images/90/0.webp', 'images/90/0_big.webp'),
(95, 90, 'images/90/1.webp', 'images/90/1_big.webp'),
(96, 90, 'images/90/2.webp', 'images/90/2_big.webp'),
(97, 90, 'images/90/3.webp', 'images/90/3_big.webp'),
(98, 91, 'images/91/0.webp', 'images/91/0_big.webp'),
(99, 91, 'images/91/1.webp', 'images/91/1_big.webp'),
(100, 91, 'images/91/2.webp', 'images/91/2_big.webp'),
(101, 91, 'images/91/3.webp', 'images/91/3_big.webp'),
(102, 92, 'images/92/0.webp', 'images/92/0_big.webp'),
(103, 92, 'images/92/1.webp', 'images/92/1_big.webp'),
(104, 92, 'images/92/2.webp', 'images/92/2_big.webp'),
(105, 92, 'images/92/3.webp', 'images/92/3_big.webp'),
(106, 93, 'images/93/0.webp', 'images/93/0_big.webp'),
(107, 93, 'images/93/1.webp', 'images/93/1_big.webp'),
(108, 93, 'images/93/2.webp', 'images/93/2_big.webp'),
(109, 93, 'images/93/3.webp', 'images/93/3_big.webp');

-- --------------------------------------------------------

--
-- Table structure for table `products_shipments`
--

CREATE TABLE `products_shipments` (
  `id` int(11) NOT NULL,
  `forwarder_id` int(11) NOT NULL,
  `products_id` int(11) NOT NULL,
  `shipmentCost` int(11) NOT NULL,
  `deliveryExtimatedTime` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products_shipments`
--

INSERT INTO `products_shipments` (`id`, `forwarder_id`, `products_id`, `shipmentCost`, `deliveryExtimatedTime`) VALUES
(1, 0, 83, 0, 12),
(2, 0, 84, 0, 45),
(4, 0, 86, 0, 45),
(6, 0, 88, 0, 45),
(7, 0, 89, 0, 45),
(8, 0, 90, 0, 45),
(9, 0, 91, 0, 45),
(10, 0, 92, 0, 45),
(11, 0, 93, 0, 45),
(12, 0, 94, 0, 45);

-- --------------------------------------------------------

--
-- Table structure for table `products_variants`
--

CREATE TABLE `products_variants` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `product_id` int(11) NOT NULL,
  `variant_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products_variants`
--

INSERT INTO `products_variants` (`id`, `title`, `product_id`, `variant_id`) VALUES
(47, 'Verde', 77, 2),
(48, 'Rossa', 77, 2),
(49, 'L', 77, 1),
(50, 'S', 77, 1),
(60, 'Rosso', 83, 2),
(61, 'L', 83, 1),
(62, 'Verde', 83, 2),
(63, 'L', 84, 1),
(65, 'L', 86, 1),
(67, 'L', 88, 1),
(68, 'L', 89, 1),
(69, 'L', 90, 1),
(70, 'L', 91, 1),
(71, 'L', 92, 1),
(72, 'L', 93, 1),
(73, 'as', 94, 1);

-- --------------------------------------------------------

--
-- Table structure for table `products_variants_details`
--

CREATE TABLE `products_variants_details` (
  `detail_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `discount_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `products_variants_map`
--

CREATE TABLE `products_variants_map` (
  `variant_id` int(11) NOT NULL,
  `detail_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `description`) VALUES
(1, 'Administrator'),
(2, 'Manager'),
(3, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `role` bigint(20) NOT NULL DEFAULT '3'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `name`, `surname`, `role`) VALUES
(3, 'pakilodi', 'e86e3156f563511b98847a6fdaf80160', 'pakilodi@gmail.com', 'pasquale', 'lodise', 3),
(25, 'mrccristofaro', '2dc92a1e6cc393833b5f2e3cc3177cd5', 'lodise.pasquale@gmail.com', 'marco', 'Cristofaro', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `anag_categories`
--
ALTER TABLE `anag_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `anag_forwarders`
--
ALTER TABLE `anag_forwarders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Nome` (`name`);

--
-- Indexes for table `anag_subcategories`
--
ALTER TABLE `anag_subcategories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `categories_id` (`categories_id`);

--
-- Indexes for table `anag_variants`
--
ALTER TABLE `anag_variants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categories_id` (`categories_id`),
  ADD KEY `subcategories_id` (`subcategories_id`);

--
-- Indexes for table `anag_variants_values`
--
ALTER TABLE `anag_variants_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_anag_variants` (`id_anag_variants`);

--
-- Indexes for table `confirm`
--
ALTER TABLE `confirm`
  ADD PRIMARY KEY (`id`),
  ADD KEY `confirm_users_fk` (`userid`);

--
-- Indexes for table `partners`
--
ALTER TABLE `partners`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `partners_un` (`userid`),
  ADD KEY `partners_partners_type_fk` (`partner_type`);

--
-- Indexes for table `partners_confirmation_status`
--
ALTER TABLE `partners_confirmation_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `partners_type`
--
ALTER TABLE `partners_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `FK_USERS_PRODUCTS_idx` (`userid`),
  ADD KEY `categories_id` (`categories_id`),
  ADD KEY `subcategories_id` (`subcategories_id`);

--
-- Indexes for table `products_images`
--
ALTER TABLE `products_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products_shipments`
--
ALTER TABLE `products_shipments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `forwarder_id` (`forwarder_id`),
  ADD KEY `products_id` (`products_id`);

--
-- Indexes for table `products_variants`
--
ALTER TABLE `products_variants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `variant_id` (`variant_id`);

--
-- Indexes for table `products_variants_details`
--
ALTER TABLE `products_variants_details`
  ADD PRIMARY KEY (`detail_id`);

--
-- Indexes for table `products_variants_map`
--
ALTER TABLE `products_variants_map`
  ADD KEY `detail_id` (`detail_id`),
  ADD KEY `variant_id` (`variant_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_un1` (`id`),
  ADD UNIQUE KEY `users_un2` (`username`),
  ADD UNIQUE KEY `users_un3` (`email`),
  ADD KEY `users_roles_fk` (`role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `anag_categories`
--
ALTER TABLE `anag_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `anag_forwarders`
--
ALTER TABLE `anag_forwarders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `anag_subcategories`
--
ALTER TABLE `anag_subcategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `anag_variants`
--
ALTER TABLE `anag_variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `anag_variants_values`
--
ALTER TABLE `anag_variants_values`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `confirm`
--
ALTER TABLE `confirm`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `partners`
--
ALTER TABLE `partners`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `partners_confirmation_status`
--
ALTER TABLE `partners_confirmation_status`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `partners_type`
--
ALTER TABLE `partners_type`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;
--
-- AUTO_INCREMENT for table `products_images`
--
ALTER TABLE `products_images`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;
--
-- AUTO_INCREMENT for table `products_shipments`
--
ALTER TABLE `products_shipments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `products_variants`
--
ALTER TABLE `products_variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `anag_subcategories`
--
ALTER TABLE `anag_subcategories`
  ADD CONSTRAINT `anag_subcategories_ibfk_1` FOREIGN KEY (`categories_id`) REFERENCES `anag_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `anag_variants`
--
ALTER TABLE `anag_variants`
  ADD CONSTRAINT `anag_variants_ibfk_1` FOREIGN KEY (`categories_id`) REFERENCES `anag_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `anag_variants_ibfk_2` FOREIGN KEY (`subcategories_id`) REFERENCES `anag_subcategories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `anag_variants_values`
--
ALTER TABLE `anag_variants_values`
  ADD CONSTRAINT `anag_variants_values_ibfk_1` FOREIGN KEY (`id_anag_variants`) REFERENCES `anag_variants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `confirm`
--
ALTER TABLE `confirm`
  ADD CONSTRAINT `confirm_users_fk` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `partners`
--
ALTER TABLE `partners`
  ADD CONSTRAINT `partners_partners_type_fk` FOREIGN KEY (`partner_type`) REFERENCES `partners_type` (`id`),
  ADD CONSTRAINT `partners_users_fk` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FK_USERS_PRODUCTS` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categories_id`) REFERENCES `anag_categories` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`subcategories_id`) REFERENCES `anag_subcategories` (`id`);

--
-- Constraints for table `products_images`
--
ALTER TABLE `products_images`
  ADD CONSTRAINT `products_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products_shipments`
--
ALTER TABLE `products_shipments`
  ADD CONSTRAINT `products_shipments_ibfk_1` FOREIGN KEY (`forwarder_id`) REFERENCES `anag_forwarders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_shipments_ibfk_2` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products_variants`
--
ALTER TABLE `products_variants`
  ADD CONSTRAINT `products_variants_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_variants_ibfk_2` FOREIGN KEY (`variant_id`) REFERENCES `anag_variants` (`id`);

--
-- Constraints for table `products_variants_map`
--
ALTER TABLE `products_variants_map`
  ADD CONSTRAINT `products_variants_map_ibfk_1` FOREIGN KEY (`detail_id`) REFERENCES `products_variants_details` (`detail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_variants_map_ibfk_2` FOREIGN KEY (`variant_id`) REFERENCES `products_variants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_roles_fk` FOREIGN KEY (`role`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
