To create the DB:
CREATE TABLE `Organizations` (
    `id` CHAR(36) NOT null default (uuid()),
    `name` VARCHAR(255) NOT NULL,
    `logo` VARCHAR(255) NOT NULL,
    `theme` VARCHAR(255) NOT NULL,
    `color` VARCHAR(255) NOT NULL,
    `logo_wxh` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `Groups` (
    `id` CHAR(36) NOT NULL default (uuid()),
    `organization` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `groups_organization_foreign` FOREIGN KEY (`organization`) REFERENCES `Organizations`(`id`)
);

CREATE TABLE `Users` (
    `id` CHAR(36) NOT NULL default (uuid()),
    `name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `type` SMALLINT NOT NULL,
    `organization` CHAR(36) NOT NULL,
    `group` CHAR(36) NULL,
    `image` VARCHAR(255),
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `users_organization_foreign` FOREIGN KEY (`organization`) REFERENCES `Organizations`(`id`),
    CONSTRAINT `users_group_foreign` FOREIGN KEY (`group`) REFERENCES `Groups`(`id`)
);

CREATE TABLE `Authorization_types` (
    `id` CHAR(36) NOT NULL default (uuid()),
    `organization` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `authorization_types_organization_foreign` FOREIGN KEY (`organization`) REFERENCES `Organizations`(`id`)
);

CREATE TABLE `Authorizations` (
    `id` CHAR(36) NOT NULL default (uuid()),
    `child` CHAR(36) NOT NULL,
    `type` CHAR(36) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `authorizations_child_foreign` FOREIGN KEY (`child`) REFERENCES `Users`(`id`),
    CONSTRAINT `authorizations_type_foreign` FOREIGN KEY (`type`) REFERENCES `Authorization_types`(`id`)
);

CREATE TABLE `Authorizations_date` (
    `id` CHAR(36) NOT NULL default (uuid()),
    `date` DATE NOT NULL,
    `authorization` CHAR(36) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `authorizations_date_authorization_foreign` FOREIGN KEY (`authorization`) REFERENCES `Authorizations`(`id`)
);

CREATE TABLE `Children_dependencies` (
    `id` CHAR(36) NOT NULL default (uuid()),
    `child` CHAR(36) NOT NULL,
    `parent` CHAR(36) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `children_dependencies_child_foreign` FOREIGN KEY (`child`) REFERENCES `Users`(`id`),
    CONSTRAINT `children_dependencies_parent_foreign` FOREIGN KEY (`parent`) REFERENCES `Users`(`id`)
);
