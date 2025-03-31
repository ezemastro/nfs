-- nfs.organizations definition

CREATE TABLE `organizations` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `name` varchar(255) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `theme` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `logo_wxh` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- nfs.authorization_types definition

CREATE TABLE `authorization_types` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `organization` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `authorization_types_organization_foreign` (`organization`),
  CONSTRAINT `authorization_types_organization_foreign` FOREIGN KEY (`organization`) REFERENCES `organizations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- nfs.`groups` definition

CREATE TABLE `groups` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `organization` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `groups_organization_foreign` (`organization`),
  CONSTRAINT `groups_organization_foreign` FOREIGN KEY (`organization`) REFERENCES `organizations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- nfs.users definition

CREATE TABLE `users` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `type` smallint NOT NULL,
  `organization` char(36) NOT NULL,
  `group` char(36) DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_organization_foreign` (`organization`),
  KEY `users_group_foreign` (`group`),
  CONSTRAINT `users_group_foreign` FOREIGN KEY (`group`) REFERENCES `groups` (`id`),
  CONSTRAINT `users_organization_foreign` FOREIGN KEY (`organization`) REFERENCES `organizations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- nfs.authorizations definition

CREATE TABLE `authorizations` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `child` char(36) NOT NULL,
  `type` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `authorizations_child_foreign` (`child`),
  KEY `authorizations_type_foreign` (`type`),
  CONSTRAINT `authorizations_child_foreign` FOREIGN KEY (`child`) REFERENCES `users` (`id`),
  CONSTRAINT `authorizations_type_foreign` FOREIGN KEY (`type`) REFERENCES `authorization_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- nfs.authorizations_dates definition

CREATE TABLE `authorizations_dates` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `date` date NOT NULL,
  `authorization` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `authorizations_date_authorization_foreign` (`authorization`),
  CONSTRAINT `authorizations_date_authorization_foreign` FOREIGN KEY (`authorization`) REFERENCES `authorizations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- nfs.children_dependencies definition

CREATE TABLE `children_dependencies` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `child` char(36) NOT NULL,
  `parent` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `children_dependencies_child_foreign` (`child`),
  KEY `children_dependencies_parent_foreign` (`parent`),
  CONSTRAINT `children_dependencies_child_foreign` FOREIGN KEY (`child`) REFERENCES `users` (`id`),
  CONSTRAINT `children_dependencies_parent_foreign` FOREIGN KEY (`parent`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;