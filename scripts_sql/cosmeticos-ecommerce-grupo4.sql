-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 24-Jun-2021 às 11:36
-- Versão do servidor: 5.7.31
-- versão do PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `projeto`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(100) COLLATE utf8_bin NOT NULL,
  `productId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userName`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Extraindo dados da tabela `cart`
--

INSERT INTO `cart` (`id`, `userName`, `productId`) VALUES
(11, 'teste3', 149),
(2, 'teste6', NULL),
(3, 'teste7', NULL),
(4, 'teste8', NULL),
(5, 'teste3', 150),
(6, 'teste3', 150),
(7, 'teste3', 150),
(8, 'teste3', 150),
(9, 'teste3', 150),
(10, 'teste3', 150),
(12, 'teste3', 149);

-- --------------------------------------------------------

--
-- Estrutura da tabela `login`
--

DROP TABLE IF EXISTS `login`;
CREATE TABLE IF NOT EXISTS `login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `username` varchar(255) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usertype` char(5) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `password` (`password`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Extraindo dados da tabela `login`
--

INSERT INTO `login` (`id`, `name`, `username`, `password`, `created_at`, `usertype`) VALUES
(1, 'teste kaique', 'teste1', '$2b$12$H5v4y14CHqSoGNL4UWazSeXe96pwnfHy18MFyDu6K5/6g9swHGSlO', '2021-06-17 16:27:05', 'admin'),
(2, 'teste32', 'teste2', '$2b$12$FyY5UkE6CMiifEJGlE/Rx.9CQ7kXuBZamLFb/CWu8wA0rHuyLGyku', '2021-06-17 22:50:11', 'admin'),
(3, 'TESTE3COMPRADOR', 'teste3', '$2b$12$wLFEfq0pPH6pMk48PQ7gRO.hpPT3Rhn9ztBBIRhokU6CN/TCml4ZO', '2021-06-19 17:13:21', 'buyer'),
(4, 'teste4', 'teste4', '$2b$12$btEkyUulVHQwexuWvCPx0eDW209DLAxmKZvPgPx/ttMgXPLHPxd2i', '2021-06-21 15:56:43', 'buyer'),
(5, 'teste5', 'teste5', '$2b$12$7yxcqY.G6SHydR8i6b/ZwOvyis1KpEYRbkAD6v0bftsQ.1.Z430cK', '2021-06-21 16:15:11', 'buyer'),
(9, 'teste6', 'teste6', '$2b$12$x7T/Bcuu8O/iAJRe7rE.4.T6dDfQ5SEuHpgki4x7c7FNVoS/7JORK', '2021-06-21 16:23:05', 'buyer'),
(10, 'teste7', 'teste7', '$2b$12$g4HcYahw4DWhzggm0GDDLuOBv0ixIm2bG5iRp5Lj3QuooM0F84HvS', '2021-06-21 16:24:17', 'buyer'),
(11, 'teste8', 'teste8', '$2b$12$3FjCFnoQS274qFvYlBBVB.wwxi0t50Np0a8GR7CSemKtLOnnd/TTy', '2021-06-21 16:24:59', 'buyer');

-- --------------------------------------------------------

--
-- Estrutura da tabela `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `type` varchar(255) COLLATE utf8_bin NOT NULL,
  `img` varchar(300) COLLATE utf8_bin NOT NULL,
  `description` varchar(300) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=155 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Extraindo dados da tabela `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `type`, `img`, `description`) VALUES
(154, 'teste5', '22.00', 'Acessórios', 'PRODUTO1.png', 'teste'),
(149, '1111', '88.00', '2', 'ESMALTE9.jpg', 'teste hhhhhh'),
(150, 'ESMALTE5', '21.00', '2', 'PINCEL6.jpg', 'teste funciona meu deus');

-- --------------------------------------------------------

--
-- Estrutura da tabela `types`
--

DROP TABLE IF EXISTS `types`;
CREATE TABLE IF NOT EXISTS `types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `label` varchar(100) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Extraindo dados da tabela `types`
--

INSERT INTO `types` (`id`, `name`, `label`) VALUES
(1, 'makeup', 'Maquiagem'),
(2, 'glaze', 'Esmalte'),
(3, 'perfume', 'Perfume'),
(4, 'accessories', 'Acessórios');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
