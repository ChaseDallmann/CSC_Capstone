-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 02, 2025 at 02:37 AM
-- Server version: 8.0.39
-- PHP Version: 8.2.25

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
  `categoryName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `categoryDescription` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`categoryID`, `categoryName`, `categoryDescription`) VALUES
(1, 'Black Tea', 'A dark, bold type of tea. It dries for a long time to give it a dark look and potent aroma. Potential benefits include decreased risk of heart attack, blood pressure, and lower cholesterol.'),
(2, 'Green Tea', 'Green tea is a lighter tea that has a more delicate somewhat grassy flavor. Potential benefits include improved alertness, less headaches, and weight loss.'),
(3, 'White Tea', 'White tea has a sweet aroma with a soft flavor. Potential health benefits include reduced cholesterol levels, lower stress, healthy skin, and an increased metabolism.'),
(4, 'Oolong Tea', 'Oolong is similar to green tea with a lighter oxidation process. Potential health benefits include reduced chronic diseases, increased metabolism, and antioxidants.'),
(5, 'Herbal Tea', 'Herbal tea is made of herbs, fruit, and spices. There are various health benefits of herbal tea that are dependent on the ingredients used.'),
(6, 'Pu-erh Tea', 'Pu-erh tea comes from the Yunnan province in China and has a rich, earthy flavor. Potential health benefits include an increased metabolism, anti-cancer properties, and boosted liver function.');

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
(1, 'Full Leaf Tea Co.', 'https://fullleafteacompany.com/'),
(2, 'San Francisco Herb Co.', 'https://www.sfherb.com/'),
(3, 'Harney & Sons', 'https://www.harney.com/');

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
  `productDescription` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `price` float(5,2) NOT NULL,
  `productInventory` int NOT NULL,
  `categoryid` int NOT NULL,
  `manufacturerid` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`productID`, `productName`, `productDescription`, `price`, `productInventory`, `categoryid`, `manufacturerid`) VALUES
(1, 'Boba Tea', 'A delicious boba tea', 10.99, 10, 2, 1),
(2, 'Organic Turmeric', 'Loose Leaf 2 OZ', 11.99, 10, 2, 1),
(3, 'Organic Earl Grey', 'Loose Leaf 2 OZ', 14.99, 10, 1, 1),
(4, 'Vanilla', 'Loose Leaf 2 OZ', 12.99, 10, 1, 1),
(5, 'Organic Oolong', 'Loose Leaf 2 OZ', 16.99, 10, 4, 1),
(6, 'Organic Royal Oolong', 'Loose Leaf 2 OZ', 14.99, 10, 4, 1),
(7, 'Mutan White', 'Loose Leaf 1.5 OZ ', 11.00, 10, 3, 3),
(8, 'Chamomile Tea Bags', '8 OZ', 7.99, 10, 5, 2),
(9, 'Pu-erh Loose Leaf', '8 OZ', 12.99, 10, 6, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int NOT NULL,
  `role` enum('customer','customerService') COLLATE utf8mb4_general_ci NOT NULL,
  `firstName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `lastName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `streetAddress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `zipcode` int NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `role`, `firstName`, `lastName`, `email`, `streetAddress`, `city`, `state`, `zipcode`, `password`) VALUES
(1, 'customerService', 'Natasha', 'Czaplewski', 'czaplewn@csp.edu', '123 Main Street', 'Winona', 'Minnesota', 55987, 'admin'),
(11, 'customer', 'FRYPD', 'RKROL', 'VI938@hotmail.com', '732 QQRX', 'VMMVF', 'NFE', 28785, 'QDXBU395'),
(13, 'customer', 'REOPK', 'OAUVT', 'WZ567@hotmail.com', '163 TWNS', 'QCNKR', 'BYZ', 93872, 'KRZTM782'),
(15, 'customer', 'NZMEM', 'HZXMY', 'ZN289@yahoo.com', '496 LWJP', 'NNYSF', 'RUP', 67386, 'IFOVZ038'),
(17, 'customer', 'UPLSN', 'LTRGA', 'ZQ929@hotmail.com', '256 DNIQ', 'GFHGB', 'RCB', 70480, 'DMWBP584'),
(19, 'customer', 'IOGKY', 'XEIDG', 'WX881@aol.com', '511 EKNW', 'EHCFY', 'SXO', 90761, 'TEWKS239');

--
-- Indexes for dumped tables
--

-- Table structure for table `chatTranscript`
CREATE TABLE `chatTranscript` (
  `chatTranscriptID` int NOT NULL,
  `sender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `receiver` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('JOIN', 'MESSAGE', 'LEAVE') COLLATE utf8mb4_general_ci NOT NULL,
  `timestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Indexes for table `chatTranscript`
ALTER TABLE `chatTranscript`
  ADD PRIMARY KEY (`chatTranscriptID`);

-- AUTO_INCREMENT for table `chatTranscript`
ALTER TABLE `chatTranscript`
  MODIFY `chatTranscriptID` int NOT NULL AUTO_INCREMENT;


--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryID`);

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
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `categoryID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `manufacturer`
--
ALTER TABLE `manufacturer`
  MODIFY `manufacturerID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `productID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_customer` FOREIGN KEY (`customer_id`) REFERENCES `user` (`userID`),
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
