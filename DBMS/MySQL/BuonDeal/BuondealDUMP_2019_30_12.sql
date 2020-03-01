-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 30, 2019 at 07:50 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `products_images_variants_details`
--

CREATE TABLE `products_images_variants_details` (
  `id` bigint(20) NOT NULL,
  `product_id` int(20) NOT NULL,
  `variant_id` int(11) NOT NULL,
  `image_path` varchar(200) NOT NULL,
  `zoomed_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(17, 8, 115, 11, 1),
(18, 0, 116, 0, 1),
(19, 8, 117, 11, 1);

-- --------------------------------------------------------

--
-- Table structure for table `products_variants`
--

CREATE TABLE `products_variants` (
  `variant_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `discount_price` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `products_variants_details`
--

CREATE TABLE `products_variants_details` (
  `detail_id` int(11) NOT NULL,
  `anag_variants_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products_variants_details`
--

INSERT INTO `products_variants_details` (`detail_id`, `anag_variants_id`, `title`) VALUES
(15, 1, 'M'),
(16, 2, 'Giallo'),
(17, 1, 'L'),
(18, 2, 'Blu'),
(19, 1, 'M'),
(20, 2, 'Verde'),
(21, 1, 'mm'),
(22, 1, 'weq'),
(23, 1, 'fff'),
(24, 1, 'ddd'),
(25, 1, 'M'),
(26, 1, 'M'),
(27, 1, '11'),
(28, 1, 'fr'),
(29, 1, 'fgd'),
(30, 1, 'aaa'),
(31, 1, '1');

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
-- Indexes for table `products_images_variants_details`
--
ALTER TABLE `products_images_variants_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `products_images_variants_details_ibfk_1` (`variant_id`);

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
  ADD PRIMARY KEY (`variant_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products_variants_details`
--
ALTER TABLE `products_variants_details`
  ADD PRIMARY KEY (`detail_id`),
  ADD KEY `anag_variants_id` (`anag_variants_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;
--
-- AUTO_INCREMENT for table `products_images_variants_details`
--
ALTER TABLE `products_images_variants_details`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `products_shipments`
--
ALTER TABLE `products_shipments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT for table `products_variants`
--
ALTER TABLE `products_variants`
  MODIFY `variant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;
--
-- AUTO_INCREMENT for table `products_variants_details`
--
ALTER TABLE `products_variants_details`
  MODIFY `detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
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
-- Constraints for table `products_images_variants_details`
--
ALTER TABLE `products_images_variants_details`
  ADD CONSTRAINT `products_images_variants_details_ibfk_1` FOREIGN KEY (`variant_id`) REFERENCES `products_variants` (`variant_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_images_variants_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `products_variants_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products_variants_details`
--
ALTER TABLE `products_variants_details`
  ADD CONSTRAINT `products_variants_details_ibfk_1` FOREIGN KEY (`anag_variants_id`) REFERENCES `anag_variants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products_variants_map`
--
ALTER TABLE `products_variants_map`
  ADD CONSTRAINT `products_variants_map_ibfk_2` FOREIGN KEY (`variant_id`) REFERENCES `products_variants` (`variant_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_variants_map_ibfk_3` FOREIGN KEY (`detail_id`) REFERENCES `products_variants_details` (`detail_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_roles_fk` FOREIGN KEY (`role`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
