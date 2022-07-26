-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Jul 26, 2022 at 02:51 AM
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
  `user_id` int(11) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  `state` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `subtotal`, `user_id`, `supplier_id`, `created_at`, `updated_at`, `state`) VALUES
(1, 0, 2, NULL, NULL, '5/7/2022 20:44:53', 1),
(2, 923, 1, 2, NULL, '5/7/2022 21:08:07', 1),
(3, 0, 3, NULL, '25/7/2022 21:50:13', NULL, NULL);

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
(30, 2, 4, 2),
(32, 2, 5, 1);

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
(1, 'Madera', '22/2/2022 19:40:39', NULL),
(2, 'Vidrio', '8/4/2022 18:21:02', NULL),
(3, 'Plastico', '8/4/2022 18:21:04', NULL),
(4, 'Papel/Carton', '8/4/2022 18:21:14', NULL),
(5, 'Acero', '3/7/2022 20:22:41', NULL),
(6, 'Textil', '3/7/2022 20:22:53', NULL),
(7, 'Aparatos electrónicos', '3/7/2022 20:23:00', NULL),
(8, 'Pilas/Baterías', '3/7/2022 20:23:13', NULL),
(9, 'Caucho', '3/7/2022 21:20:36', NULL),
(10, 'Otros', '3/7/2022 20:23:44', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `delivery`
--

CREATE TABLE `delivery` (
  `id` int(11) NOT NULL,
  `code` varchar(45) DEFAULT NULL,
  `estimatedDeliveryDate` varchar(45) DEFAULT NULL,
  `realDeliveryDate` varchar(45) DEFAULT NULL,
  `priceId` int(11) DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `delivery`
--

INSERT INTO `delivery` (`id`, `code`, `estimatedDeliveryDate`, `realDeliveryDate`, `priceId`, `created_at`, `updated_at`) VALUES
(1, 'AAA', '2022-06-01', NULL, 1, NULL, NULL),
(2, 'BBB', '2022-06-01', NULL, 2, NULL, NULL),
(3, NULL, NULL, NULL, 1, '28/6/2022 14:41:38', NULL),
(4, 'test3', NULL, NULL, 1, '28/6/2022 14:42:06', NULL),
(5, NULL, NULL, NULL, 1, '30/6/2022 15:36:59', NULL),
(6, NULL, '2022-07-07', NULL, 1, '30/6/2022 15:38:17', NULL),
(7, NULL, '7/7/2022', NULL, 1, '30/6/2022 15:40:06', NULL),
(8, NULL, '7/7/2022', NULL, 4, '30/6/2022 17:09:53', NULL),
(9, NULL, '7/7/2022', NULL, 4, '30/6/2022 17:13:06', NULL),
(10, NULL, '7/7/2022', NULL, 1, '30/6/2022 19:36:35', NULL),
(11, NULL, '7/7/2022', NULL, 1, '30/6/2022 19:37:47', NULL),
(12, NULL, '7/7/2022', NULL, 1, '30/6/2022 19:40:07', NULL),
(13, NULL, '7/7/2022', NULL, 1, '30/6/2022 19:41:32', NULL),
(14, NULL, '7/7/2022', NULL, 1, '30/6/2022 19:51:40', NULL),
(15, NULL, '7/7/2022', NULL, 1, '30/6/2022 19:54:44', NULL),
(16, NULL, '7/7/2022', NULL, 1, '30/6/2022 19:56:13', NULL),
(17, NULL, '7/7/2022', NULL, 1, '30/6/2022 20:15:49', NULL),
(18, NULL, '7/7/2022', NULL, 4, '30/6/2022 20:23:38', NULL),
(19, NULL, '12/7/2022', NULL, 4, '5/7/2022 20:38:41', NULL),
(20, NULL, '12/7/2022', NULL, 4, '5/7/2022 20:44:53', NULL),
(21, NULL, '12/7/2022', NULL, 1, '5/7/2022 20:45:18', NULL);

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
  `state_id` int(11) NOT NULL DEFAULT '1',
  `created_at` varchar(45) DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  `subtotal` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `paid` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `operations`
--

INSERT INTO `operations` (`id`, `code`, `date`, `comment`, `total`, `delivery_id`, `state_id`, `created_at`, `updated_at`, `subtotal`, `user_id`, `supplier_id`, `paid`) VALUES
(1, '#AAAAA', NULL, NULL, 1720, 1, 3, '22/6/2022 19:11:00', '25/7/2022 23:38:32', 850, 2, 1, 1),
(3, '#AAA1', '2022-01-26', NULL, 3130, 2, 3, '22/6/2022 17:12:32', '22/6/2022 17:20:02', 100, 1, 2, 1),
(19, NULL, NULL, NULL, 904, 17, 3, '30/6/2022 20:15:49', '25/7/2022 23:44:16', 34, 1, 2, 0),
(20, NULL, NULL, NULL, 1550, 18, 2, '30/6/2022 20:23:38', '25/7/2022 23:49:43', 680, 2, 1, 0),
(22, NULL, NULL, NULL, 2450, 20, 1, '5/7/2022 20:44:53', NULL, 1580, 2, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `operation_product`
--

CREATE TABLE `operation_product` (
  `id` int(11) NOT NULL,
  `operation_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `operation_product`
--

INSERT INTO `operation_product` (`id`, `operation_id`, `product_id`, `quantity`) VALUES
(1, 1, 3, 1),
(2, 1, 4, 1),
(19, 19, 7, 1),
(20, 20, 1, 1),
(21, 22, 2, 1);

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
  `price` float NOT NULL,
  `shipper` varchar(45) DEFAULT NULL,
  `shipperCellphone` varchar(45) DEFAULT NULL,
  `shipperAddress` varchar(45) DEFAULT NULL,
  `days` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `priceCities`
--

INSERT INTO `priceCities` (`id`, `cp_origen`, `cp_destino`, `origen`, `destino`, `price`, `shipper`, `shipperCellphone`, `shipperAddress`, `days`) VALUES
(1, '2741', '2000', 'Salto', 'Rosario', 870, NULL, NULL, NULL, 7),
(2, '2777', '3000', 'Pergamino', 'Rosario', 600, NULL, NULL, NULL, 7),
(3, 'C1004', 'B5000', 'Palermo', 'Cordoba ', 1300, NULL, NULL, NULL, 7),
(4, '2000', '2741', 'Rosario', 'Salto', 870, NULL, NULL, NULL, 7);

-- --------------------------------------------------------

--
-- Table structure for table `prices`
--

CREATE TABLE `prices` (
  `id` int(11) NOT NULL,
  `precio` int(11) NOT NULL,
  `fecha` varchar(45) NOT NULL,
  `id_product` int(11) NOT NULL DEFAULT '0',
  `created_at` varchar(200) NOT NULL,
  `updated_at` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `prices`
--

INSERT INTO `prices` (`id`, `precio`, `fecha`, `id_product`, `created_at`, `updated_at`) VALUES
(1, 680, '24/5/2022', 1, '12/4/2022 19:21:03', '24/6/2022 13:29:47'),
(2, 1580, '2022-12-04', 2, '12/4/2022 19:21:17', NULL),
(3, 450, '2022-12-04', 3, '12/4/2022 19:21:26', NULL),
(4, 133, '2022-12-04 00:00:00.000', 7, '27/4/2022 10:07:11', NULL),
(5, 400, '2022-12-04 00:00:00.000', 4, '27/4/2022 09:59:36', NULL),
(6, 432, '2022-12-04 00:00:00.000', 5, '27/4/2022 09:59:42', NULL),
(7, 432, '2022-12-04 00:00:00.000', 6, '27/4/2022 10:07:11', NULL),
(8, 23, '25/7/2022', 8, '25/7/2022 22:40:05', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `stock` int(11) NOT NULL DEFAULT '0',
  `image` text,
  `state` varchar(45) NOT NULL DEFAULT 'PENDIENTE',
  `user_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `stock`, `image`, `state`, `user_id`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 'Lote de Madera', 'Lote de Madera por kilo', 2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-59YMfFJr-KhcLvB-MbcCEek1sChUpMFMYn2R60sbzeTt_ZvBov33E-BfIPyUIpy8i2o&usqp=CAU', 'APROBADO', 1, 1, NULL, '30/6/2022 20:23:34'),
(2, 'Neumatico', 'Neumatico', 8, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzwqvr0Z9EKasiZJBjowv1MWhhEsxNueRJNeS3z_DiNLt7mhGXDGTOdTiFyklE39Ff-TQ&usqp=CAU', 'APROBADO', 1, 9, NULL, '29/6/2022 12:58:49'),
(3, 'Carton', 'Carton por 5 Kilos', 0, 'https://www.cyecsa.com/wp-content/uploads/2019/01/49343416_343979532996839_7056526319802122240_n.jpg', 'APROBADO', 2, 4, NULL, '25/7/2022 23:14:07'),
(4, 'Aserrin', 'Aserrin de madera por 3 kilos', 2, 'https://previews.123rf.com/images/puthuchon/puthuchon1409/puthuchon140900208/32095806-fondos-de-aserr%C3%ADn-de-madera-.jpg', 'APROBADO', 2, 1, NULL, '30/6/2022 20:33:52'),
(5, 'Laminas de Acero', 'Laminas de Acero', 29, 'http://metalium.mx/img/productos/lamina%20perfil%20rectangular.jpg', 'APROBADO', 2, 5, '30/6/2022 17:54:09', '30/6/2022 20:11:14'),
(6, 'Pilas', 'Pilas', 120, 'https://t1.uc.ltmcdn.com/es/posts/2/7/5/como_reciclar_las_pilas_usadas_23572_600.jpg', 'APROBADO', 1, 8, '30/6/2022 17:56:11', '25/7/2022 23:13:56'),
(7, 'Lamina de Policarbonato', 'Placa Policarbonato Compacto Lexan Cristal 4 Mm', 22, 'https://centrosider.com.ar/wp-content/uploads/2021/02/Placa-Policarbonato-Alveolar-Cristal-58-x-21-Mts.jpg', 'APROBADO', 2, 3, '30/6/2022 17:57:12', '30/6/2022 20:14:03'),
(8, 'gfdsg', 'sdfg', 3, 'https://gestanconteco.com/wp-content/uploads/2020/04/refined-wood-6X32YLH.jpg', 'PENDIENTE', 2, 3, '25/7/2022 22:40:05', '25/7/2022 23:15:21');

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
(3, 'ENTREGADO', NULL, NULL, NULL),
(4, 'PENDIENTE ', NULL, NULL, NULL),
(5, 'APROBADO', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `razonsocial` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 NOT NULL,
  `cuitcuil` varchar(45) NOT NULL,
  `direccion` varchar(150) NOT NULL,
  `ciudad` varchar(150) NOT NULL,
  `provincia` varchar(150) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `estado` varchar(11) NOT NULL DEFAULT 'INACTIVO',
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'CUSTOMER',
  `cp` varchar(45) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_at` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `razonsocial`, `username`, `password`, `cuitcuil`, `direccion`, `ciudad`, `provincia`, `phone`, `estado`, `email`, `role`, `cp`, `image`, `created_at`, `updated_at`) VALUES
(1, 'ErrecarteSRL', 'sofiaetest', '$2b$10$rixgNKB8Yr8wHmpLDaaDROHYc7PdRTKaiVZ.95ngC9fGkCACABPcO', '1234567892', 'Paraguay 1586', 'Salto', 'Buenos Aires', '2474684963', 'ACTIVO', 'sofia@gmail.com', 'ADMIN', '2741', 'null', '18/5/2022 11:53:11', NULL),
(2, 'SalinSA\n', 'MariaSolSalin', '$2b$10$kJxVlxEONcdDi/PZ/uULq.vq7NqSu4khMi4jcYgFXCNgpFMR2S1zK', '12345789', 'Cordoba 1500', 'Rosario', 'Santa Fe', '2474684496', 'ACTIVO', 'sol@gmail.com', 'CUSTOMER', '2000', 'test.com', '18/5/2022 11:41:08', '29/6/2022 15:14:25'),
(3, 'fasss', 'sol@gmail.com', '$2b$10$roxYSTvDcxHz4tvSFem3TeX2rae4JM7.U1oP8i8/a96fGtOoKFZcu', '111', 'paraguay 1586', 'Rosario', 'Santa Fe', '02474684963', 'INACTIVO', 'hola@g.com', 'CUSTOMER', '2000', NULL, '25/7/2022 21:50:13', NULL);

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
-- Indexes for table `operation_product`
--
ALTER TABLE `operation_product`
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
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cart_product`
--
ALTER TABLE `cart_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `delivery`
--
ALTER TABLE `delivery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `operations`
--
ALTER TABLE `operations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `operation_product`
--
ALTER TABLE `operation_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `priceCities`
--
ALTER TABLE `priceCities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `prices`
--
ALTER TABLE `prices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `state`
--
ALTER TABLE `state`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `use_customers`
--
ALTER TABLE `use_customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
