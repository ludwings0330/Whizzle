set foreign_key_checks = 0;

CREATE TABLE `badge` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `original_name` varchar(255) DEFAULT NULL,
  `saved_path` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKrrnct7nb549kmwwgwb1gd2r9c` (`description`),
  UNIQUE KEY `UK_o6c30913lb4s950tk4w07kelc` (`saved_path`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `diary` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint NOT NULL,
  `date` date NOT NULL,
  `emotion` varchar(255) NOT NULL,
  `drink_level` varchar(255) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `is_deleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK4uk9o366grmoq9hf6t72d8vi` (`member_id`,`date`),
  CONSTRAINT `FKbyluyva0mxnf5jitf297oxlxd` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `drink` (
  `diary_id` bigint NOT NULL,
  `whisky_id` bigint NOT NULL,
  `is_deleted` bit(1) NOT NULL DEFAULT b'0',
  `drink_order` tinyint NOT NULL,
  PRIMARY KEY (`diary_id`,`whisky_id`),
  KEY `FKp5nudwyrs90m5nc5e02wm1l3g` (`whisky_id`),
  CONSTRAINT `FK9jjmteyubw8r7v5qr9prt5pca` FOREIGN KEY (`diary_id`) REFERENCES `diary` (`id`),
  CONSTRAINT `FKp5nudwyrs90m5nc5e02wm1l3g` FOREIGN KEY (`whisky_id`) REFERENCES `whisky` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `keep` (
  `member_id` bigint NOT NULL,
  `whisky_id` bigint NOT NULL,
  `created_date_time` datetime NOT NULL,
  PRIMARY KEY (`member_id`,`whisky_id`),
  KEY `FKm317mj8malugs0qh6fgilpr6v` (`whisky_id`),
  KEY `keep_created_date_time_index` (`created_date_time` DESC),
  CONSTRAINT `FKf23fg2s6piq3468wf092i7j78` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `FKm317mj8malugs0qh6fgilpr6v` FOREIGN KEY (`whisky_id`) REFERENCES `whisky` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `likes` (
  `review_id` bigint NOT NULL,
  `member_id` bigint NOT NULL,
  `created_date_time` datetime NOT NULL,
  PRIMARY KEY (`review_id`,`member_id`),
  KEY `fk_member_idx` (`member_id`),
  CONSTRAINT `fk_member_like` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_review` FOREIGN KEY (`review_id`) REFERENCES `review` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `member` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `provider` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `original_name` varchar(255) DEFAULT NULL,
  `saved_path` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `level` float NOT NULL DEFAULT '40',
  `is_active` bit(1) NOT NULL DEFAULT b'1',
  `created_date_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `member_has_badge` (
  `member_id` bigint NOT NULL,
  `badge_id` bigint NOT NULL,
  `created_date_time` datetime NOT NULL,
  PRIMARY KEY (`member_id`,`badge_id`),
  KEY `fk_badge_idx` (`badge_id`),
  CONSTRAINT `fk_badge` FOREIGN KEY (`badge_id`) REFERENCES `badge` (`id`),
  CONSTRAINT `fk_member` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `member_level_log` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint NOT NULL,
  `action` varchar(255) NOT NULL,
  `level` float NOT NULL,
  `created_date_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKc1ec36xvj8t8ftxclrdt5sku8` (`member_id`),
  CONSTRAINT `FKc1ec36xvj8t8ftxclrdt5sku8` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `preference` (
  `member_id` bigint NOT NULL,
  `age` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `price_tier` tinyint NOT NULL,
  `body` tinyint DEFAULT NULL,
  `floral` tinyint DEFAULT NULL,
  `fruity` tinyint DEFAULT NULL,
  `herbal` tinyint DEFAULT NULL,
  `oily` tinyint DEFAULT NULL,
  `peaty` tinyint DEFAULT NULL,
  `rich` tinyint DEFAULT NULL,
  `salty` tinyint DEFAULT NULL,
  `smoky` tinyint DEFAULT NULL,
  `spicy` tinyint DEFAULT NULL,
  `sweet` tinyint DEFAULT NULL,
  `tart` tinyint DEFAULT NULL,
  `vanilla` tinyint DEFAULT NULL,
  `created_date_time` datetime NOT NULL,
  `modified_date_time` datetime DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  CONSTRAINT `FKg1k85wg4bngr1y82ahkbyyj2y` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `review` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `whisky_id` bigint NOT NULL,
  `member_id` bigint NOT NULL,
  `rating` float NOT NULL,
  `content` longtext,
  `like_count` int NOT NULL DEFAULT '0',
  `is_deleted` bit(1) NOT NULL DEFAULT b'0',
  `created_date_time` datetime NOT NULL,
  `modified_date_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKk0ccx5i4ci2wd70vegug074w1` (`member_id`),
  KEY `FKf6x97qa9hwnm1vnvprr080i68` (`whisky_id`),
  KEY `index4` (`like_count`),
  KEY `index5` (`created_date_time`),
  CONSTRAINT `FKf6x97qa9hwnm1vnvprr080i68` FOREIGN KEY (`whisky_id`) REFERENCES `whisky` (`id`),
  CONSTRAINT `FKk0ccx5i4ci2wd70vegug074w1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `review_image` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `review_id` bigint NOT NULL,
  `original_name` varchar(255) DEFAULT NULL,
  `saved_path` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `image_order` tinyint NOT NULL,
  `is_deleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`),
  KEY `FK16wp089tx9nm0obc217gvdd6l` (`review_id`),
  CONSTRAINT `FK16wp089tx9nm0obc217gvdd6l` FOREIGN KEY (`review_id`) REFERENCES `review` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `whisky` (
  `id` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `price_tier` tinyint NOT NULL,
  `location` varchar(255) NOT NULL,
  `abv` float NOT NULL,
  `category` varchar(255) NOT NULL,
  `review_count` int NOT NULL DEFAULT '0',
  `avg_rating` float NOT NULL DEFAULT '0',
  `cask_type` varchar(255) DEFAULT NULL,
  `body` tinyint DEFAULT NULL,
  `floral` tinyint DEFAULT NULL,
  `fruity` tinyint DEFAULT NULL,
  `herbal` tinyint DEFAULT NULL,
  `oily` tinyint DEFAULT NULL,
  `peaty` tinyint DEFAULT NULL,
  `rich` tinyint DEFAULT NULL,
  `salty` tinyint DEFAULT NULL,
  `smoky` tinyint DEFAULT NULL,
  `spicy` tinyint DEFAULT NULL,
  `sweet` tinyint DEFAULT NULL,
  `tart` tinyint DEFAULT NULL,
  `vanilla` tinyint DEFAULT NULL,
  `original_name` varchar(255) DEFAULT NULL,
  `saved_path` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `saved_model` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `saved_date_time` datetime NOT NULL,
  `precision` float DEFAULT NULL,
  `recall` float DEFAULT NULL,
  `auc` float DEFAULT NULL,
  `mrr` float DEFAULT NULL,
  `is_used` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

set foreign_key_checks = 1;
