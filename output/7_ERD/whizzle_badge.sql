-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: j8a805.p.ssafy.io    Database: whizzle
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `badge`
--

DROP TABLE IF EXISTS `badge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `badge` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `original_name` varchar(255) DEFAULT NULL,
  `saved_path` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKrrnct7nb549kmwwgwb1gd2r9c` (`description`),
  UNIQUE KEY `UK_o6c30913lb4s950tk4w07kelc` (`saved_path`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badge`
--

LOCK TABLES `badge` WRITE;
/*!40000 ALTER TABLE `badge` DISABLE KEYS */;
INSERT INTO `badge` VALUES (1,'환영합니다!! 이제 꼭 맞는 위스키를 찾아볼까요?','first_preference.png','images/badges/first_preference.png','https://half-moon-bear.s3.ap-northeast-2.amazonaws.com/images/badges/first_preference.png'),(2,'매일 색다른 위스키도 찾아볼 수 있어요! 오늘은 어떤 위스키가 좋을까~','first_daily.png','images/badges/first_daily.png','https://half-moon-bear.s3.ap-northeast-2.amazonaws.com/images/badges/first_daily.png'),(3,'1번째 위스키를 킵하셨군요. 위스키 넌 내꺼야!','first_keep.png','images/badges/first_keep.png','https://half-moon-bear.s3.ap-northeast-2.amazonaws.com/images/badges/first_keep.png'),(4,'10번째 위스키를 킵하셨습니다! 이 중에서 취향에 맞는 위스키는 무엇일까요?','tenth_keep.png','images/badges/tenth_keep.png','https://half-moon-bear.s3.ap-northeast-2.amazonaws.com/images/badges/tenth_keep.png'),(5,'1번째 다이어리 작성을 축하합니다. 앞으로 달아오를 달력이 기대되네요!','first_diary.png','images/badges/first_diary.png','https://half-moon-bear.s3.ap-northeast-2.amazonaws.com/images/badges/first_diary.png'),(6,'벌써 5번째 다이어리를 작성했습니다! 내일은 어떤 새로운 위스키를 마셔볼까요?','fifth_diary.png','images/badges/fifth_diary.png','https://half-moon-bear.s3.ap-northeast-2.amazonaws.com/images/badges/fifth_diary.png'),(7,'무려 20번째 다이어리! 어떤 위스키가 가장 매력있었나요?','twentyth_diary.png','images/badges/twentyth_diary.png','https://half-moon-bear.s3.ap-northeast-2.amazonaws.com/images/badges/twentyth_diary.png'),(8,'1번째 리뷰 작성 완료! 더 마음에 드는 위스키를 찾아볼까요?','first_review.png','images/badges/first_review.png','https://half-moon-bear.s3.ap-northeast-2.amazonaws.com/images/badges/first_review.png'),(9,'5번째 리뷰 작성 완료! 리뷰리뷰리뷰리뷰리뷰','fifth_review.png','images/badges/fifth_review.png','https://half-moon-bear.s3.ap-northeast-2.amazonaws.com/images/badges/fifth_review.png'),(10,'20번째 리뷰 작성 완료! 이제 위스키에 정통하셨네요!','twentyth_review.png','images/badges/twentyth_review.png','https://half-moon-bear.s3.ap-northeast-2.amazonaws.com/images/badges/twentyth_review.png'),(11,'알코올 농도 50% 돌파! 하지만 음주운전은 안 돼요!','level_50.png','images/badges/level_50.png','https://half-moon-bear.s3.ap-northeast-2.amazonaws.com/images/badges/level_50.png'),(12,'알코올 농도 60% 돌파! 저도 함께 마시고 싶어요!','level_60.png','images/badges/level_60.png','https://half-moon-bear.s3.ap-northeast-2.amazonaws.com/images/badges/level_60.png');
/*!40000 ALTER TABLE `badge` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-05 16:04:19
