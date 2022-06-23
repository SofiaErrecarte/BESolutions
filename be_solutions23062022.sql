-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Jun 23, 2022 at 11:36 AM
-- Server version: 5.7.37
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `be_solutions`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `subtotal` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `subtotal`, `user_id`, `supplier_id`, `created_at`, `updated_at`, `state`) VALUES
(1, 900, 2, 1, NULL, '22/6/2022 15:46:43', 1),
(2, 2260, 1, 2, NULL, '17/6/2022 12:33:22', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cart_product`
--

CREATE TABLE `cart_product` (
  `id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart_product`
--

INSERT INTO `cart_product` (`id`, `cart_id`, `product_id`, `quantity`) VALUES
(9, 2, 1, 1),
(10, 2, 2, 1),
(13, 1, 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'test', '22/2/2022 19:40:39', NULL),
(2, 'dsada', '8/4/2022 18:21:02', NULL),
(3, 'dsada', '8/4/2022 18:21:04', NULL),
(4, 'test', '8/4/2022 18:21:14', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `delivery`
--

CREATE TABLE `delivery` (
  `id` int(11) NOT NULL,
  `code` varchar(45) NOT NULL,
  `shipper` varchar(45) NOT NULL,
  `shipperCellphone` text,
  `shipperAddress` text,
  `estimatedDeliveryDate` date DEFAULT NULL,
  `priceId` int(11) DEFAULT NULL,
  `created_at` varchar(11) DEFAULT NULL,
  `updated_at` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `delivery`
--

INSERT INTO `delivery` (`id`, `code`, `shipper`, `shipperCellphone`, `shipperAddress`, `estimatedDeliveryDate`, `priceId`, `created_at`, `updated_at`) VALUES
(1, 'AAA', '1', NULL, NULL, '2022-06-01', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `operations`
--

CREATE TABLE `operations` (
  `id` int(11) NOT NULL,
  `code` varchar(45) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `comment` varchar(45) DEFAULT NULL,
  `total` int(11) DEFAULT '0',
  `delivery_id` int(11) DEFAULT NULL,
  `cart_id` int(11) NOT NULL,
  `state_id` int(11) NOT NULL DEFAULT '1',
  `created_at` varchar(45) DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `operations`
--

INSERT INTO `operations` (`id`, `code`, `date`, `comment`, `total`, `delivery_id`, `cart_id`, `state_id`, `created_at`, `updated_at`) VALUES
(1, '#AAAAA', NULL, NULL, 200, 1, 1, 1, NULL, '18/6/2022 10:42:44'),
(3, '#AAA1', '2022-01-26', NULL, 3130, 1, 2, 1, '22/6/2022 17:12:32', '22/6/2022 17:20:02');

-- --------------------------------------------------------

--
-- Table structure for table `operation_to_state`
--

CREATE TABLE `operation_to_state` (
  `id` int(11) NOT NULL,
  `comment` text,
  `date` date NOT NULL,
  `operation_id` int(11) NOT NULL,
  `state_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `priceCities`
--

CREATE TABLE `priceCities` (
  `id` int(11) NOT NULL,
  `cp_origen` varchar(45) NOT NULL,
  `cp_destino` varchar(45) NOT NULL,
  `origen` varchar(45) NOT NULL,
  `destino` varchar(45) NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `priceCities`
--

INSERT INTO `priceCities` (`id`, `cp_origen`, `cp_destino`, `origen`, `destino`, `price`) VALUES
(1, '2741', '2000', 'Salto', 'Rosario', 870),
(2, '2777', '3000', 'Pergamino', 'Rosario', 600),
(3, 'C1004', 'B5000', 'Palermo', 'Cordoba ', 1300),
(4, '2000', '2741', 'Rosario', 'Salto', 870);

-- --------------------------------------------------------

--
-- Table structure for table `prices`
--

CREATE TABLE `prices` (
  `id` int(11) NOT NULL,
  `precio` int(11) NOT NULL,
  `fecha` varchar(45) NOT NULL,
  `id_product` int(11) NOT NULL,
  `created_at` varchar(200) NOT NULL,
  `updated_at` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `prices`
--

INSERT INTO `prices` (`id`, `precio`, `fecha`, `id_product`, `created_at`, `updated_at`) VALUES
(1, 680, '2022-12-04', 1, '12/4/2022 19:21:03', NULL),
(2, 1580, '2022-12-04', 2, '12/4/2022 19:21:17', NULL),
(3, 450, '2022-12-04', 3, '12/4/2022 19:21:26', NULL),
(5, 432, '2022-12-04 00:00:00.000', 4, '27/4/2022 09:59:36', NULL),
(6, 432, '2022-12-04 00:00:00.000', 28, '27/4/2022 09:59:42', NULL),
(7, 432, '2022-12-04 00:00:00.000', 29, '27/4/2022 10:07:11', NULL),
(8, 432, '2022-12-04 00:00:00.000', 30, '27/4/2022 10:08:08', NULL),
(9, 432, '2022-04-27 13:12:16.000', 31, '27/4/2022 10:12:16', NULL),
(10, 432, '2022-04-27 13:22:55.000', 35, '27/4/2022 10:22:55', NULL),
(11, 123, '2022-05-11 21:52:37.000', 5, '11/5/2022 18:52:37', NULL),
(150, 10, '2022-10-02 00:00:00.000', 1, '27/4/2022 09:35:56', '9/6/2022 17:25:05');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `stock` int(11) NOT NULL DEFAULT '0',
  `image` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `stock`, `image`, `user_id`, `brand_id`, `created_at`, `updated_at`) VALUES
(1, 'Lote de Madera', 'Lote de Madera por kilo', 6, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-59YMfFJr-KhcLvB-MbcCEek1sChUpMFMYn2R60sbzeTt_ZvBov33E-BfIPyUIpy8i2o&usqp=CAU', 1, NULL, NULL, '17/6/2022 12:33:22'),
(2, 'Neumatico', 'Neumatico', 10, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzwqvr0Z9EKasiZJBjowv1MWhhEsxNueRJNeS3z_DiNLt7mhGXDGTOdTiFyklE39Ff-TQ&usqp=CAU', 1, NULL, NULL, '17/6/2022 12:32:33'),
(3, 'Carton', 'Carton por 5 Kilos', 5, 'https://www.cyecsa.com/wp-content/uploads/2019/01/49343416_343979532996839_7056526319802122240_n.jpg', 2, NULL, NULL, '22/6/2022 15:46:43'),
(4, 'Aserrin', 'Aserrin por 3 kilos', 4, 'https://previews.123rf.com/images/puthuchon/puthuchon1409/puthuchon140900208/32095806-fondos-de-aserr%C3%ADn-de-madera-.jpg', 2, NULL, NULL, '17/6/2022 11:47:43');

-- --------------------------------------------------------

--
-- Table structure for table `products_categories`
--

CREATE TABLE `products_categories` (
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `state`
--

CREATE TABLE `state` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `state`
--

INSERT INTO `state` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'EN PREPARACIÓN', NULL, NULL, NULL),
(2, 'EN CAMINO ', NULL, NULL, NULL),
(3, 'ENTREGADA', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `razonsocial` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `cuitcuil` varchar(45) NOT NULL,
  `direccion` varchar(45) NOT NULL,
  `estado` varchar(11) NOT NULL DEFAULT 'INACTIVO',
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'CUSTOMER',
  `birthday` date DEFAULT NULL,
  `cp` varchar(45) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `razonsocial`, `username`, `password`, `cuitcuil`, `direccion`, `estado`, `email`, `role`, `birthday`, `cp`, `image`, `created_at`, `updated_at`) VALUES
(1, 'ErrecarteSRL', 'sofiaetest', '$2b$10$rixgNKB8Yr8wHmpLDaaDROHYc7PdRTKaiVZ.95ngC9fGkCACABPcO', '1234567892', 'Paraguay 1586', 'ACTIVO', 'sofia@gmail.com', 'ADMIN', NULL, '2741', 'null', '18/5/2022 11:53:11', NULL),
(2, 'SalinSA\n', 'sol', '$2b$10$kJxVlxEONcdDi/PZ/uULq.vq7NqSu4khMi4jcYgFXCNgpFMR2S1zK', '12345789', 'Cordoba 1500', 'ACTIVO', 'sol@gmail.com', 'CUSTOMER', '2000-10-09', '2000', 'test.com', '18/5/2022 11:41:08', '18/5/2022 17:32:55');

-- --------------------------------------------------------

--
-- Table structure for table `use_customers`
--

CREATE TABLE `use_customers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `use_customers`
--

INSERT INTO `use_customers` (`id`, `name`, `lastName`, `phone`, `created_at`, `updated_at`) VALUES
(1, 'sofia', 'errecarte', '2474687596', '11/1/2022 12:05:53', '11/1/2022 12:13:29'),
(2, 'camila', 'errecarte', '2474687596', '11/1/2022 12:11:35', NULL),
(3, 'marcelo', 'errecarte', '2474687596', '11/1/2022 19:42:10', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `cart_product`
--
ALTER TABLE `cart_product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `delivery`
--
ALTER TABLE `delivery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `operations`
--
ALTER TABLE `operations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `priceCities`
--
ALTER TABLE `priceCities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prices`
--
ALTER TABLE `prices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_1530a6f15d3c79d1b70be98f2be` (`brand_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `products_categories`
--
ALTER TABLE `products_categories`
  ADD PRIMARY KEY (`product_id`,`category_id`),
  ADD KEY `IDX_f2c76a4306a82c696d620f81f0` (`product_id`),
  ADD KEY `IDX_19fe0fe8c2fcf1cbe1a80f639f` (`category_id`);

--
-- Indexes for table `state`
--
ALTER TABLE `state`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cuitcuil` (`cuitcuil`);

--
-- Indexes for table `use_customers`
--
ALTER TABLE `use_customers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cart_product`
--
ALTER TABLE `cart_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `delivery`
--
ALTER TABLE `delivery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `operations`
--
ALTER TABLE `operations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `priceCities`
--
ALTER TABLE `priceCities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `prices`
--
ALTER TABLE `prices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `state`
--
ALTER TABLE `state`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `use_customers`
--
ALTER TABLE `use_customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FK_1530a6f15d3c79d1b70be98f2be` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `products_categories`
--
ALTER TABLE `products_categories`
  ADD CONSTRAINT `FK_19fe0fe8c2fcf1cbe1a80f639f1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_f2c76a4306a82c696d620f81f08` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
