-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: zara
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roadaddr` varchar(200) DEFAULT NULL,
  `detailaddr` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `addname` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `members_id` int NOT NULL,
  `tel` varchar(13) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `postcode` char(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_address_members1_idx` (`members_id`),
  CONSTRAINT `fk_address_members1` FOREIGN KEY (`members_id`) REFERENCES `members` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '관리자 비밀번호',
  `name` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '관리자 이름',
  `email` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '관리자 이메일',
  `tel` varchar(13) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '관리자 전화번호',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'zara','관리자','zara@naver.com','01012121212'),(2,'admin','김관리','admin@zara.com','01034343434');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `c_depth1`
--

DROP TABLE IF EXISTS `c_depth1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `c_depth1` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '카테고리 일련번호',
  `depth1` varchar(200) NOT NULL COMMENT '1depth 카테고리',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `c_depth1`
--

LOCK TABLES `c_depth1` WRITE;
/*!40000 ALTER TABLE `c_depth1` DISABLE KEYS */;
INSERT INTO `c_depth1` VALUES (2,'Woman'),(3,'Man'),(4,'Boy'),(5,'Girl');
/*!40000 ALTER TABLE `c_depth1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `c_depth2`
--

DROP TABLE IF EXISTS `c_depth2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `c_depth2` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '카테고리 일련번호',
  `depth2` varchar(200) DEFAULT NULL COMMENT 'depth2 카테고리',
  `depth1_id` int NOT NULL COMMENT '부모 카테고리 일련번호',
  PRIMARY KEY (`id`),
  KEY `fk_category2_category11_idx` (`depth1_id`),
  CONSTRAINT `fk_category2_category11` FOREIGN KEY (`depth1_id`) REFERENCES `c_depth1` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `c_depth2`
--

LOCK TABLES `c_depth2` WRITE;
/*!40000 ALTER TABLE `c_depth2` DISABLE KEYS */;
INSERT INTO `c_depth2` VALUES (30,'Top',2),(31,'Bottom',2),(32,'Shoes',2),(34,'Top',3),(35,'Bottom',3),(36,'Shoes',3),(37,'Top',4),(38,'Bottom',4),(39,'Shoes',4),(40,'Top',5),(41,'Bottom',5),(42,'Shoes',5);
/*!40000 ALTER TABLE `c_depth2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '일련번호',
  `members_id` int NOT NULL COMMENT '회원 일련번호',
  `amount` int NOT NULL COMMENT '수량',
  `result` enum('Y','N') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N' COMMENT '배송 여부',
  `indate` date NOT NULL COMMENT '장바구니에 담은 날짜',
  `product_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '상품 이름',
  `product_size` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '상품 사이즈',
  `product_color` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '상품 색깔',
  `product_id` int NOT NULL COMMENT '상품 일련번호',
  PRIMARY KEY (`id`),
  KEY `fk_member_product_members1_idx` (`members_id`),
  CONSTRAINT `fk_member_product_members1` FOREIGN KEY (`members_id`) REFERENCES `members` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '일련번호',
  `qna_id` int NOT NULL COMMENT 'QnA 게시글 일련번호',
  `origin_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '파일 이름 원본',
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '업로드 된 경로',
  `type` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '파일 형식',
  `size` int NOT NULL COMMENT '파일크기',
  `reg_date` datetime NOT NULL COMMENT '등록일시',
  `edit_date` datetime NOT NULL COMMENT '변경일시',
  PRIMARY KEY (`id`),
  KEY `fk_file_qna1_idx` (`qna_id`),
  CONSTRAINT `fk_file_qna1` FOREIGN KEY (`qna_id`) REFERENCES `qna` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '일련번호',
  `name` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '이름',
  `email` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '이메일',
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '비밀번호',
  `gender` enum('M','F') CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '성별',
  `birthdate` datetime NOT NULL COMMENT '생년월일',
  `tel` varchar(13) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '연락처(''-''제외)',
  `postcode` char(5) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '우편번호',
  `roadaddr` varchar(200) DEFAULT NULL,
  `detailaddr` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '상세주소',
  `is_out` enum('Y','N') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N' COMMENT '탈퇴여부',
  `reg_date` datetime NOT NULL COMMENT '가입일시',
  `edit_date` datetime NOT NULL COMMENT '변경일시',
  `company` varchar(100) DEFAULT NULL COMMENT '회사명',
  `crn` int DEFAULT NULL COMMENT '사업자 등록번호',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (5,'김당근','carrot@naver.com','111','F','2023-01-04 00:00:00','01011112222',NULL,NULL,NULL,'N','2023-01-06 18:00:28','2023-01-06 18:00:28',NULL,NULL),(6,'김감자','potato@naver.com','222','M','2021-02-11 00:00:00','01033334444','12345','감자동 123-45','감자번지','N','2023-01-06 18:01:23','2023-01-06 18:01:23',NULL,NULL);
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '일련번호',
  `title` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '답변 드립니다.' COMMENT '제목',
  `content` longblob NOT NULL COMMENT '내용',
  `reg_date` datetime NOT NULL COMMENT '작성일시',
  `edit_date` datetime NOT NULL COMMENT '변경일시',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` VALUES (2,'공지사항 테스트',_binary '<p>공지사항테스트입니다</p>','2023-01-10 16:17:52','2023-01-10 16:17:52'),(3,'당근',_binary '<p>공지사항 검색 테스트</p>','2023-01-10 16:47:44','2023-01-10 16:47:44'),(4,'감자나라감자공지',_binary '<p>감자를 많이 튀기자</p><p>감자를 계속 튀기자</p>','2023-01-11 16:07:14','2023-01-11 16:40:34');
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '상품 코드',
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '상품 이름',
  `price` int NOT NULL COMMENT '가격',
  `dsc` longblob COMMENT '상품 설명',
  `use_amount` enum('Y','N') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'Y' COMMENT '판매 여부',
  `reg_date` date NOT NULL COMMENT '등록일',
  `depth2_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_category21_idx` (`depth2_id`),
  CONSTRAINT `fk_product_category21` FOREIGN KEY (`depth2_id`) REFERENCES `c_depth2` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (23,'레이스 탑',89000,_binary '<p>조절 가능한 가느다란 어깨끈이 달린 부드러운 톤온톤 레이스 아플리케가 매치된 브이넥 탑.</p>','Y','2023-01-15',30),(24,'감자',20000,_binary '<p>ddd</p>','Y','2023-01-15',30),(25,'감자',89000,_binary '<p>dddd</p>','Y','2023-01-15',35);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_detail`
--

DROP TABLE IF EXISTS `product_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_detail` (
  `product_id` int NOT NULL COMMENT '상품 코드',
  `detail_id` int NOT NULL AUTO_INCREMENT COMMENT '디테일한 상품 코드',
  `size` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '상품 사이즈',
  `color` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '색깔',
  `use_amount` enum('Y','N') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'Y' COMMENT '판매 여부',
  `reg_date` date NOT NULL COMMENT '등록일',
  PRIMARY KEY (`detail_id`),
  KEY `fk_product_detail_product1_idx` (`product_id`),
  CONSTRAINT `fk_product_detail_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_detail`
--

LOCK TABLES `product_detail` WRITE;
/*!40000 ALTER TABLE `product_detail` DISABLE KEYS */;
INSERT INTO `product_detail` VALUES (23,26,'S (KR 55)','lightBlue','Y','2023-01-15'),(23,27,'L (KR 77)','lightBlue','Y','2023-01-15'),(23,28,'M (KR 66)','lightBlue','Y','2023-01-15'),(23,29,'XL (KR 88)','lightBlue','Y','2023-01-15');
/*!40000 ALTER TABLE `product_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_img`
--

DROP TABLE IF EXISTS `product_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_img` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '일련번호',
  `color` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '상품 색깔',
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '파일 경로',
  `origin_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '원본 파일명',
  `product_id` int NOT NULL COMMENT '상품 일련번호',
  PRIMARY KEY (`id`),
  KEY `fk_product_img_product1_idx` (`product_id`),
  CONSTRAINT `fk_product_img_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_img`
--

LOCK TABLES `product_img` WRITE;
/*!40000 ALTER TABLE `product_img` DISABLE KEYS */;
INSERT INTO `product_img` VALUES (37,'lightBlue','/img/1673786745965.jpg','1-lightBlue-7.jpg',23),(38,'lightBlue','/img/1673786745955.jpg','1-lightBlue-5.jpg',23),(39,'lightBlue','/img/1673786745960.jpg','1-lightBlue-6.jpg',23),(40,'lightBlue','/img/1673786745936.jpg','1-lightBlue-1.jpg',23),(41,'lightBlue','/img/1673786745939.jpg','1-lightBlue-2.jpg',23),(42,'lightBlue','/img/1673786745944.jpg','1-lightBlue-3.jpg',23),(43,'lightBlue','/img/1673786745951.jpg','1-lightBlue-4.jpg',23);
/*!40000 ALTER TABLE `product_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qna`
--

DROP TABLE IF EXISTS `qna`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qna` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '일련번호',
  `title` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '제목',
  `content` longblob NOT NULL COMMENT '내용',
  `reg_date` datetime NOT NULL COMMENT '작성일시',
  `edit_date` datetime NOT NULL COMMENT '변경일시',
  `qna_type` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '문의 종류(상품문의, 배송문의 등)',
  `answer` longblob COMMENT '답변',
  `answer_date` datetime DEFAULT NULL COMMENT '답변한 날짜',
  `members_id` int DEFAULT NULL COMMENT '회원 일련번호',
  PRIMARY KEY (`id`),
  KEY `fk_qna_members_idx` (`members_id`),
  CONSTRAINT `fk_qna_members` FOREIGN KEY (`members_id`) REFERENCES `members` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qna`
--

LOCK TABLES `qna` WRITE;
/*!40000 ALTER TABLE `qna` DISABLE KEYS */;
INSERT INTO `qna` VALUES (6,'문의',_binary '문의내용','2023-01-09 10:47:59','2023-01-09 10:47:59','상품문의',NULL,NULL,6),(7,'문의수정',_binary '문의수정내용','2023-01-09 10:52:18','2023-01-09 11:12:06','배송문의',_binary '답변드립니다','2023-01-09 11:12:23',6),(9,'문의3수정',_binary '<p>문의내용문의내용문의내용</p><p>수정</p><p>수정</p><p>수정</p><p>수정1</p><p>수정2</p><p>수정3</p>','2023-01-09 11:20:07','2023-01-10 14:27:21','배송문의',_binary '<p>답변추가테스트</p>','2023-01-10 17:40:22',5),(15,'문의작성',_binary '<p>문의를</p><p>작성</p><p>합니다</p>','2023-01-10 14:27:57','2023-01-10 14:27:57','상품문의',NULL,NULL,5),(16,'실험1',_binary '<p>실험</p><p>실험</p>','2023-01-10 14:46:35','2023-01-10 14:46:35','상품문의',_binary '<p>작성한 공지!!!!!!!</p>','2023-01-11 16:08:41',5),(17,'실험2',_binary '<p>실험</p><p>실험</p><p>실험</p>','2023-01-10 14:46:54','2023-01-10 14:46:54','상품문의',NULL,NULL,5),(18,'실험3',_binary '<p>실험</p><p>실험</p><p>실험</p>','2023-01-10 14:47:08','2023-01-10 14:47:08','배송문의',NULL,NULL,5),(19,'실험4',_binary '<p>실험</p><p>실험</p><p>실험</p>','2023-01-10 14:47:24','2023-01-10 14:47:24','배송문의',NULL,NULL,5),(20,'감자',_binary '<p>찐감자</p><p>삶은감자</p><p>튀긴감자</p>','2023-01-11 13:01:33','2023-01-11 16:33:05','상품문의',NULL,NULL,5);
/*!40000 ALTER TABLE `qna` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('E_2cDszjieOeCeaJGwjL85i31_CxCD3_',1673881946,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"login\":{\"id\":1,\"password\":\"zara\",\"name\":\"관리자\",\"email\":\"zara@naver.com\",\"tel\":\"01012121212\"}}'),('_Socl0papgFQwc0luqS4TvFsCNIZ5yBT',1673792382,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"login\":{\"id\":1,\"password\":\"zara\",\"name\":\"관리자\",\"email\":\"zara@naver.com\",\"tel\":\"01012121212\"}}'),('_jUTKY5cz4N3gYApxiGjj1vE9Eea3nXK',1673787029,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"login\":{\"id\":1,\"password\":\"zara\",\"name\":\"관리자\",\"email\":\"zara@naver.com\",\"tel\":\"01012121212\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stats`
--

DROP TABLE IF EXISTS `stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stats` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '고유 번호 PK키',
  `date` date NOT NULL COMMENT '날짜',
  `profit` int NOT NULL COMMENT '하루 누적 매출',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stats`
--

LOCK TABLES `stats` WRITE;
/*!40000 ALTER TABLE `stats` DISABLE KEYS */;
/*!40000 ALTER TABLE `stats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userorder`
--

DROP TABLE IF EXISTS `userorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userorder` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '일련번호',
  `order_no` int NOT NULL COMMENT '주문번호',
  `amount` int NOT NULL COMMENT '수량',
  `price` int NOT NULL COMMENT '가격',
  `product_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '상품 이름',
  `product_size` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '상품 사이즈',
  `product_color` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '상품 색깔',
  `product_id` int NOT NULL COMMENT '상품 일련번호',
  PRIMARY KEY (`id`),
  KEY `fk_userorder_user_order1_idx` (`order_no`),
  CONSTRAINT `fk_userorder_user_order1` FOREIGN KEY (`order_no`) REFERENCES `userorder_info` (`order_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userorder`
--

LOCK TABLES `userorder` WRITE;
/*!40000 ALTER TABLE `userorder` DISABLE KEYS */;
/*!40000 ALTER TABLE `userorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userorder_info`
--

DROP TABLE IF EXISTS `userorder_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userorder_info` (
  `order_no` int NOT NULL COMMENT '주문번호',
  `date` date NOT NULL COMMENT '주문 날짜',
  `postcode` char(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '우편번호',
  `addr` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '배송 주소',
  `receive_name` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '수령자 이름',
  `receive_tel` varchar(13) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '수령자 전화번호',
  `result` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '배송 상태',
  `members_id` int DEFAULT NULL COMMENT '회원 일련번호',
  PRIMARY KEY (`order_no`),
  KEY `fk_userorder_info_members1_idx` (`members_id`),
  CONSTRAINT `fk_userorder_info_members1` FOREIGN KEY (`members_id`) REFERENCES `members` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userorder_info`
--

LOCK TABLES `userorder_info` WRITE;
/*!40000 ALTER TABLE `userorder_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `userorder_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-16  0:18:07
