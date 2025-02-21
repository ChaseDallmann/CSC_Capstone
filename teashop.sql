-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 21, 2025 at 04:42 PM
-- Server version: 8.0.39
-- PHP Version: 8.2.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `teashop`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `categoryID` int NOT NULL,
  `categoryName` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `categoryDescription` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`categoryID`, `categoryName`, `categoryDescription`) VALUES
(1, 'Black Tea', 'A dark, bold type of tea. It dries for a long time to give it a dark look and potent aroma. Potential benefits include decreased risk of heart attack, blood pressure, and lower cholesterol.'),
(2, 'Green Tea', 'Green tea is a lighter tea that has a more delicate somewhat grassy flavor. Potential benefits include improved alertness, less headaches, and weight loss.'),
(3, 'White Tea', 'White tea has a sweet aroma with a soft flavor. Potential health benefits include reduced cholesterol levels, lower stress, healthy skin, and an increased metabolism.'),
(4, 'Oolong Tea', 'Oolong is similar to green tea with a lighter oxidation process. Potential health benefits include reduced chronic diseases, increased metabolism, and antioxidants.'),
(5, 'Yellow Tea', 'Yellow tea is rare and has a mild taste similar to green and white tea. Potential health benefits include anti-inflammatory properties, antioxidants, and anti-cancer characteristics.'),
(6, 'Pu-erh Tea', 'Pu-erh tea comes from the Yunnan province in China and has a rich, earthy flavor. Potential health benefits include an increased metabolism, anti-cancer properties, and boosted liver function.'),
(11, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customerID` int NOT NULL,
  `firstName` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `lastName` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `streetAddress` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `zipcode` int NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customerID`, `firstName`, `lastName`, `email`, `streetAddress`, `city`, `state`, `zipcode`, `password`) VALUES
(1, 'Natasha', 'Czaplewski', 'czaplewn@csp.edu', '123 Main Street', 'Winona', 'Minnesota', 55987, 'example1'),
(11, 'FRYPD', 'RKROL', 'VI938@hotmail.com', '732 QQRX', 'VMMVF', 'NFE', 28785, 'QDXBU395'),
(13, 'REOPK', 'OAUVT', 'WZ567@hotmail.com', '163 TWNS', 'QCNKR', 'BYZ', 93872, 'KRZTM782'),
(15, 'NZMEM', 'HZXMY', 'ZN289@yahoo.com', '496 LWJP', 'NNYSF', 'RUP', 67386, 'IFOVZ038'),
(17, 'UPLSN', 'LTRGA', 'ZQ929@hotmail.com', '256 DNIQ', 'GFHGB', 'RCB', 70480, 'DMWBP584'),
(19, 'IOGKY', 'XEIDG', 'WX881@aol.com', '511 EKNW', 'EHCFY', 'SXO', 90761, 'TEWKS239');

-- --------------------------------------------------------

--
-- Table structure for table `manufacturer`
--

CREATE TABLE `manufacturer` (
  `manufacturerID` int NOT NULL,
  `manufacturerName` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `manufacturerURL` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `manufacturer`
--

INSERT INTO `manufacturer` (`manufacturerID`, `manufacturerName`, `manufacturerURL`) VALUES
(1, 'DOPMO', '12345@test.com');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int NOT NULL,
  `customer_id` int NOT NULL COMMENT 'fk',
  `product_id` int NOT NULL COMMENT 'fk',
  `quantity` int NOT NULL,
  `total` float(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `productID` int NOT NULL,
  `productName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `productDescription` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `price` float(5,2) NOT NULL,
  `productInventory` int NOT NULL,
  `categoryid` int NOT NULL,
  `manufacturerid` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`productID`, `productName`, `productDescription`, `price`, `productInventory`, `categoryid`, `manufacturerid`) VALUES
(1, 'Boba Tea', 'A delicious boba tea', 10.99, 0, 11, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryID`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customerID`);

--
-- Indexes for table `manufacturer`
--
ALTER TABLE `manufacturer`
  ADD PRIMARY KEY (`manufacturerID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `fk_customer` (`customer_id`),
  ADD KEY `fk_product` (`product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productID`),
  ADD KEY `fk_category` (`categoryid`),
  ADD KEY `fk_manufacturer` (`manufacturerid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `categoryID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customerID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `manufacturer`
--
ALTER TABLE `manufacturer`
  MODIFY `manufacturerID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `productID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customerID`),
  ADD CONSTRAINT `fk_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`productID`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `fk_category` FOREIGN KEY (`categoryid`) REFERENCES `category` (`categoryID`),
  ADD CONSTRAINT `fk_manufacturer` FOREIGN KEY (`manufacturerid`) REFERENCES `manufacturer` (`manufacturerID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
