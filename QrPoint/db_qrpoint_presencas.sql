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
-- Table structure for table `presencas`
--

DROP TABLE IF EXISTS `presencas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `presencas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `qrId` int DEFAULT NULL,
  `data` date NOT NULL,
  `horaEntrada` time DEFAULT NULL,
  `horaSaida` time DEFAULT NULL,
  `status` enum('pontual','atrasado','falta') NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_presenca_dia` (`userId`,`data`),
  KEY `presencas_ibfk_2` (`qrId`),
  CONSTRAINT `presencas_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `presencas_ibfk_2` FOREIGN KEY (`qrId`) REFERENCES `qrcodes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presencas`
--

LOCK TABLES `presencas` WRITE;
/*!40000 ALTER TABLE `presencas` DISABLE KEYS */;
INSERT INTO `presencas` VALUES (70,5,31,'2026-01-19','00:32:03','00:33:45','pontual','2026-01-19 23:32:03','2026-01-19 23:33:45'),(71,7,31,'2026-01-19','00:35:22','00:55:46','pontual','2026-01-19 23:35:22','2026-01-19 23:55:46'),(72,5,32,'2026-01-20','12:51:48','12:53:03','atrasado','2026-01-20 11:51:48','2026-01-20 11:53:03'),(73,4,NULL,'2026-01-20',NULL,NULL,'falta','2026-01-20 11:54:00','2026-01-20 11:54:00'),(74,7,NULL,'2026-01-20',NULL,NULL,'falta','2026-01-20 11:54:00','2026-01-20 11:54:00');
/*!40000 ALTER TABLE `presencas` ENABLE KEYS */;
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
