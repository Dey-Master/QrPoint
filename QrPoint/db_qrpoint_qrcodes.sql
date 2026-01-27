-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_qrpoint
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `qrcodes`
--

DROP TABLE IF EXISTS `qrcodes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qrcodes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) DEFAULT NULL,
  `data` date NOT NULL,
  `horaInicio` time NOT NULL,
  `horaFim` time NOT NULL,
  `qrPath` varchar(255) NOT NULL,
  `createdBy` int NOT NULL,
  `status` enum('pendente','ativo','expirado') DEFAULT 'pendente',
  `turnos` set('manha','tarde') NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  KEY `createdBy` (`createdBy`),
  CONSTRAINT `qrcodes_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qrcodes`
--

LOCK TABLES `qrcodes` WRITE;
/*!40000 ALTER TABLE `qrcodes` DISABLE KEYS */;
INSERT INTO `qrcodes` VALUES (31,'666f3523-dd7e-4753-a699-ef645eb1a751','2026-01-20','00:18:00','01:18:00','/uploads/qr_666f3523-dd7e-4753-a699-ef645eb1a751.png',1,'expirado','manha','2026-01-19 23:17:28','2026-01-20 11:27:00'),(32,'9cab334f-dfd7-4310-8394-1214a7241a33','2026-01-20','12:50:00','12:55:00','/uploads/qr_9cab334f-dfd7-4310-8394-1214a7241a33.png',1,'expirado','tarde','2026-01-20 11:49:53','2026-01-20 11:55:00'),(35,'6929ea2b-9617-454f-a0b9-78994bb0416b','2026-01-27','12:00:00','16:00:00','/uploads/qr_6929ea2b-9617-454f-a0b9-78994bb0416b.png',1,'pendente','tarde','2026-01-27 09:34:31','2026-01-27 09:34:31');
/*!40000 ALTER TABLE `qrcodes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-27 10:53:25
