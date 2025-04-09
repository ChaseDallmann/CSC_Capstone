-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 08, 2025 at 09:13 PM
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
-- Table structure for table `chatTranscript`
--

CREATE TABLE `chatTranscript` (
  `chatTranscriptID` int NOT NULL,
  `sender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `receiver` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('JOIN','MESSAGE','LEAVE') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `timestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chatTranscript`
--

INSERT INTO `chatTranscript` (`chatTranscriptID`, `sender`, `receiver`, `message`, `status`, `timestamp`) VALUES
(1, 'Chase Dallmann', 'customerService', 'Hello', 'MESSAGE', '2025-03-26 07:47:01'),
(2, 'Chase Dallmann', 'Chase Dallmann', 'test', 'MESSAGE', '2025-03-26 07:49:09'),
(3, 'Chase Dallmann', 'Chase Dallmann', 'Now', 'MESSAGE', '2025-03-26 07:49:39'),
(4, 'Chase Dallmann', 'Chase Dallmann', 'testing', 'MESSAGE', '2025-03-26 07:50:53'),
(5, 'Chase Dallmann', 'customer', 'Hello', 'MESSAGE', '2025-03-26 07:54:44'),
(6, 'Chase Dallmann', 'customer', 'How are you?', 'MESSAGE', '2025-03-26 07:54:50'),
(7, 'John Doe', 'John Doe', 'I need assistance', 'MESSAGE', '2025-03-26 07:55:47'),
(8, 'Chase Dallmann', 'customer', 'Okay', 'MESSAGE', '2025-03-26 07:55:54'),
(9, 'Chase Dallmann', 'customer', 'Hello there', 'MESSAGE', '2025-03-26 13:09:15'),
(10, 'Chase Dallmann', 'customer', 'Hello', 'MESSAGE', '2025-03-26 13:20:22'),
(11, 'Trial User', 'Trial User', 'Hello', 'MESSAGE', '2025-03-26 19:05:29'),
(12, 'Trial User', 'Trial User', 'I want to buy some tea', 'MESSAGE', '2025-03-26 19:05:37'),
(13, 'Trial User', 'Trial User', 'Hello', 'MESSAGE', '2025-03-26 19:08:02'),
(14, 'Chase Dallmann', 'Chase Dallmann', 'Hello', 'MESSAGE', '2025-03-26 20:12:21'),
(15, 'Chase Dallmann', 'Chase Dallmann', 'Can i buy some tea?', 'MESSAGE', '2025-03-26 20:12:29');

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
-- Table structure for table `orderDetails`
--

CREATE TABLE `orderDetails` (
  `orderDetailID` int NOT NULL,
  `orderID` int NOT NULL COMMENT 'fk',
  `productID` int NOT NULL COMMENT 'fk',
  `qty` int NOT NULL,
  `orderPrice` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderDetails`
--

INSERT INTO `orderDetails` (`orderDetailID`, `orderID`, `productID`, `qty`, `orderPrice`) VALUES
(1, 1, 2, 1, 3.99),
(2, 2, 2, 1, 13.49),
(3, 4, 4, 1, 13.99),
(4, 4, 5, 3, 23.99);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderID` int NOT NULL,
  `userID` int NOT NULL COMMENT 'fk',
  `orderDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `totalAmount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `status` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderID`, `userID`, `orderDate`, `totalAmount`, `status`) VALUES
(1, 35, '2025-04-02 07:49:48', 3.99, 'pending'),
(2, 35, '2025-04-03 10:40:37', 13.49, 'completed'),
(3, 35, '2025-04-07 12:24:52', 74.99, 'processing'),
(4, 35, '2025-04-07 12:25:11', 74.99, 'processing');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_token`
--

CREATE TABLE `password_reset_token` (
  `id` bigint NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `userID` int NOT NULL,
  `expiryDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `password_reset_token`
--

INSERT INTO `password_reset_token` (`id`, `token`, `userID`, `expiryDate`) VALUES
(4, 'e73c9ad1-9030-40d6-b466-bc2ff8097f9c', 35, '2025-04-08 23:58:32');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `productID` int NOT NULL,
  `productName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `productDescription` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `price` float(5,2) NOT NULL,
  `imageURL` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `productInventory` int NOT NULL,
  `categoryid` int NOT NULL,
  `manufacturerid` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`productID`, `productName`, `productDescription`, `price`, `imageURL`, `productInventory`, `categoryid`, `manufacturerid`) VALUES
(1, 'Boba Tea', 'A delicious boba tea', 10.99, 'https://insanelygoodrecipes.com/wp-content/uploads/2023/05/Refreshing-Boba-Milk-Tea-with-Pearls.jpg', 10, 2, 1),
(2, 'Organic Turmeric', 'Loose Leaf 2 OZ', 11.99, 'https://static.trotcdn.com/images/1000/V20245_2.jpg', 10, 2, 1),
(3, 'Organic Earl Grey', 'Loose Leaf 2 OZ', 14.99, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.YLWIAJb-2IC3PxfUznIzJgHaE7%26pid%3DApi&f=1&ipt=8d60c862465f0b505fb6d48da32d340311efc806c03be9a8633c9cc750a806d5&ipo=images', 10, 1, 1),
(4, 'Vanilla', 'Loose Leaf 2 OZ', 12.99, 'https://www.kroger.com/product/images/large/back/0007231000165', 10, 1, 1),
(5, 'Organic Oolong', 'Loose Leaf 2 OZ', 16.99, 'https://n4.sdlcdn.com/imgs/h/2/3/Teafloor-Organic-Oolong-Tea-Loose-SDL775610821-2-2f99c.jpg', 10, 4, 1),
(6, 'Organic Royal Oolong', 'Loose Leaf 2 OZ', 14.99, 'https://www.organicfacts.net/wp-content/uploads/oolongtea-1.jpg', 10, 4, 1),
(7, 'Mutan White', 'Loose Leaf 1.5 OZ ', 11.00, 'https://uptownteashop.com/cdn/shop/files/uptown-tea-shop-fb-organic-mutan-white-tea_1500x.jpg?v=1710343364', 10, 3, 3),
(8, 'Chamomile Tea Bags', '8 OZ', 7.99, 'https://www.bestofhungary.co.uk/cdn/shop/files/ChamomileTeaBags.jpg?crop=center&height=1500&v=1716715128&width=1500', 10, 5, 2),
(9, 'Pu-erh Loose Leaf', '8 OZ', 12.99, 'https://cdn.shopify.com/s/files/1/0164/3912/products/pu-erh_loose_copy_grande.jpg?v=1405907665', 10, 6, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int NOT NULL,
  `role` enum('CUSTOMER','CUSTOMER_SERVICE') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
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
(1, 'CUSTOMER', 'Natasha', 'Czaplewski', 'czaplewn@csp.edu', '123 Main Street', 'Winona', 'Minnesota', 55987, 'admin'),
(11, 'CUSTOMER', 'FRYPD', 'RKROL', 'VI938@hotmail.com', '732 QQRX', 'VMMVF', 'NFE', 28785, 'QDXBU395'),
(13, 'CUSTOMER', 'REOPK', 'OAUVT', 'WZ567@hotmail.com', '163 TWNS', 'QCNKR', 'BYZ', 93872, 'KRZTM782'),
(15, 'CUSTOMER', 'NZMEM', 'HZXMY', 'ZN289@yahoo.com', '496 LWJP', 'NNYSF', 'RUP', 67386, 'IFOVZ038'),
(17, 'CUSTOMER', 'UPLSN', 'LTRGA', 'ZQ929@hotmail.com', '256 DNIQ', 'GFHGB', 'RCB', 70480, 'DMWBP584'),
(19, 'CUSTOMER', 'IOGKY', 'XEIDG', 'WX881@aol.com', '511 EKNW', 'EHCFY', 'SXO', 90761, 'TEWKS239'),
(27, 'CUSTOMER_SERVICE', 'Chase', 'Test', 'test123@csp.edu', '', '', 'MN', 55449, '$2a$10$jgA2/T/iCH3kornkHbOzLu0kRPKDmFLlZSazE5jxBDNkbxKVs3rnK'),
(28, 'CUSTOMER', 'Chase', 'Dallmann', 'testuser@csp.edu', '11720 Vermillion St Ne Unit D', 'Blaine', 'MN', 55449, '$2a$10$BdPlZ4fgbbHu3TtdinBF0eL/JZ4VojF77aymvdoYU.jwVOarg0kfi'),
(29, 'CUSTOMER_SERVICE', 'Test', 'User', 'testuser@yahoo.com', '1234 Fake St ', 'Blaine', 'MN', 55449, '$2a$10$cE/yLg6XNmvSVHSiknyVX.7iql3sNtcsfY0ZhraTH/7/2brVnLAGW'),
(30, 'CUSTOMER', 'John', 'Doe', 'trial@aceteas.com', '1234 Fake St Unit D', 'MINNEAPOLIS', 'MN', 55112, '$2a$10$Woaw7TYtdUzXrSbtVvwEC.Ay0gISsohakq3RloxZx6lmBbkfADpqO'),
(31, 'CUSTOMER', 'John', 'Doe', 'fake@csp.edu', '', '', 'MN', 55449, '$2a$10$EeMQ6XFfNIxBMa28mQf8xeVx4v.yFREo7fpRQvkvtWycFmz1n/GwW'),
(33, 'CUSTOMER', 'Chase', 'Test', 'trial@test.com', '1234 Fake St Unit D', 'MINNEAPOLIS', 'MN', 55113, '$2a$10$BoU.vRlFGmk2oXvCkKHHpu2mIPJbP3VJuMNLkjuoJ1UK9OZd9sdMS'),
(35, 'CUSTOMER_SERVICE', 'Chase', 'Dallmann', 'dallmanc@csp.edu', '11720 Vermillion St Ne Unit D ', 'Blaine', 'MN', 55449, '$2a$10$XAVUSi2XXP4ADK8Wg1HD5uwoZnAMDyYdqLSXmwO0ZZqVtycXm2hyG'),
(36, 'CUSTOMER', 'Chase', 'Dallmann', 'blastoff@csp.edu', '11720 Vermillion St Ne D', 'Blaine', 'MN', 55449, '$2a$10$XAVUSi2XXP4ADK8Wg1HD5uwoZnAMDyYdqLSXmwO0ZZqVtycXm2hyG');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryID`);

--
-- Indexes for table `chatTranscript`
--
ALTER TABLE `chatTranscript`
  ADD PRIMARY KEY (`chatTranscriptID`);

--
-- Indexes for table `manufacturer`
--
ALTER TABLE `manufacturer`
  ADD PRIMARY KEY (`manufacturerID`);

--
-- Indexes for table `orderDetails`
--
ALTER TABLE `orderDetails`
  ADD PRIMARY KEY (`orderDetailID`),
  ADD KEY `fk_order` (`orderID`),
  ADD KEY `fk_orderdetail_product` (`productID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderID`),
  ADD KEY `fk_customer` (`userID`);

--
-- Indexes for table `password_reset_token`
--
ALTER TABLE `password_reset_token`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_token` (`token`),
  ADD KEY `fk_user` (`userID`);

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
-- AUTO_INCREMENT for table `chatTranscript`
--
ALTER TABLE `chatTranscript`
  MODIFY `chatTranscriptID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `manufacturer`
--
ALTER TABLE `manufacturer`
  MODIFY `manufacturerID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orderDetails`
--
ALTER TABLE `orderDetails`
  MODIFY `orderDetailID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `password_reset_token`
--
ALTER TABLE `password_reset_token`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `productID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orderDetails`
--
ALTER TABLE `orderDetails`
  ADD CONSTRAINT `fk_order` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`),
  ADD CONSTRAINT `fk_orderdetail_product` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_customer` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`);

--
-- Constraints for table `password_reset_token`
--
ALTER TABLE `password_reset_token`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE;

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
