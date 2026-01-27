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
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `sobrenome` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `turno` enum('manha','tarde') NOT NULL,
  `tipo` enum('admin','user','moderador') DEFAULT 'user',
  `status` enum('pendente','aprovado','bloqueado') DEFAULT 'pendente',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `session_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Admin',NULL,'adminmaster@gmail.com','$2b$10$W/XMQGEKlz6hxkHsopFS0OUFJyxq52Nc1ti7tjD6Q5ZCYo0pmLzVq','manha','admin','aprovado','2026-01-11 03:35:15','2026-01-27 09:26:50','YUjwlrJXUQE7sAxDH2qkXlbP01Rmc4ap'),(2,'Joel','Carlos','joelcarlos@gmail.com','$2b$10$HmGyKR9dHBPSMyGBgoC7pukvoLPcxa/qU1Es0rTpdfH93i2MeLcdW','tarde','moderador','aprovado','2026-01-11 03:36:38','2026-01-12 16:15:24','N1hsHAuCCxhx_IrLwDmzxMyb2apa3O1q'),(4,'Daniel','Rico','danielrico@gmail.com','$2b$10$osCHWyiTrFdcxp6xwOkb7OnhLblzH0sYpIwA/.lqR1.a0fi3cKq1C','manha','user','aprovado','2026-01-11 03:39:59','2026-01-17 13:25:38','wpvLKhJWT270mo0_bp2iUB0Cm237WAsg'),(5,'Nestor','Silva','nestorsilva@gmail.com','$2b$10$qvQ7wcboPu4qu3npDyng1OCsqzKu6.Y2Iqzu/wT0gLe2L1A48AYhy','tarde','user','aprovado','2026-01-12 16:51:35','2026-01-27 09:31:37','pBdu3VIvssWrJd7ERyjgcB1t0c4Q5UVa'),(7,'Beta ','Lito','betalito@gmail.com','$2b$10$ufo26P3IQGpqVyf8l69O9.6E7XR1j20ou5qKdXgl1BAR/.aoR72c.','manha','user','aprovado','2026-01-19 21:39:35','2026-01-27 08:22:58','Rguj0ZOjP05Husu69rj_oz8I_QLCA2pv');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
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
