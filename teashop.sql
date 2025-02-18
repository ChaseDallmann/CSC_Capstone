-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 18, 2025 at 01:25 AM
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
  `category_id` int NOT NULL,
  `categoryName` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `categoryDescription` varchar(200) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `categoryName`, `categoryDescription`) VALUES
(1, 'Black Tea', 'A dark, bold type of tea. It dries for a long time to give it a dark look and potent aroma. Potential benefits include decreased risk of heart attack, blood pressure, and lower cholesterol.'),
(2, 'Green Tea', 'Green tea is a lighter tea that has a more delicate somewhat grassy flavor. Potential benefits include improved alertness, less headaches, and weight loss.'),
(3, 'White Tea', 'White tea has a sweet aroma with a soft flavor. Potential health benefits include reduced cholesterol levels, lower stress, healthy skin, and an increased metabolism.'),
(4, 'Oolong Tea', 'Oolong is similar to green tea with a lighter oxidation process. Potential health benefits include reduced chronic diseases, increased metabolism, and antioxidants.'),
(5, 'Herbal Tea', 'Herbal tea is made of herbs, fruit, and spices. There are various health benefits of herbal tea that are dependent on the ingredients used.'),
(6, 'Pu-erh Tea', 'Pu-erh tea comes from the Yunnan province in China and has a rich, earthy flavor. Potential health benefits include an increased metabolism, anti-cancer properties, and boosted liver function.');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int NOT NULL,
  `firstName` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `lastName` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(60) COLLATE utf8mb4_general_ci NOT NULL,
  `streetAddress` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `city` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `state` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `zipcode` int NOT NULL,
  `password` varchar(20) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_id`, `firstName`, `lastName`, `email`, `streetAddress`, `city`, `state`, `zipcode`, `password`) VALUES
(1, 'Natasha', 'Czaplewski', 'czaplewn@csp.edu', '123 Main Street', 'Winona', 'Minnesota', 55987, 'example1');

-- --------------------------------------------------------

--
-- Table structure for table `manufacturer`
--

CREATE TABLE `manufacturer` (
  `manufacturer_id` int NOT NULL,
  `manufacturerName` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `manufacturerURL` varchar(150) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `manufacturer`
--

INSERT INTO `manufacturer` (`manufacturer_id`, `manufacturerName`, `manufacturerURL`) VALUES
(1, 'Full Leaf Tea Co.', 'https://fullleafteacompany.com/'),
(2, 'San Francisco Herb Co.', 'https://www.sfherb.com/'),
(3, 'Harney & Sons', 'https://www.harney.com/');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
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
  `product_id` int NOT NULL,
  `productDescription` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `price` float(5,2) NOT NULL,
  `productInventory` int NOT NULL,
  `category_id` int NOT NULL COMMENT 'fk',
  `manufacturer_id` int NOT NULL COMMENT 'fk'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `productDescription`, `price`, `productInventory`, `category_id`, `manufacturer_id`) VALUES
(1, 'Organic Loose Leaf Tea, 1 OZ', 10.99, 10, 2, 1),
(2, 'Organic Turmeric Loose Leaf 2 OZ', 11.99, 10, 2, 1),
(3, 'Organic Earl Grey Loose Leaf 2 OZ', 14.99, 10, 1, 1),
(4, 'Vanilla Loose Leaf 2 OZ', 12.99, 10, 1, 1),
(5, 'Organic Oolong Loose Leaf 2 OZ', 16.99, 10, 4, 1),
(6, 'Organic Royal Oolong Loose Leaf 2 OZ', 14.99, 10, 4, 1),
(7, 'Mutan White Loose Leaf 1.5 OZ ', 11.00, 10, 3, 3),
(8, 'Chamomile Tea Bags 8 OZ', 7.99, 10, 5, 2),
(9, 'Pu-erh Loose Leaf 8 OZ', 12.99, 10, 6, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `manufacturer`
--
ALTER TABLE `manufacturer`
  ADD PRIMARY KEY (`manufacturer_id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
