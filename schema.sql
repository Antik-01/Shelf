-- ================================================================
-- Shelf - Storage Management System
-- Database Schema for MySQL
-- ================================================================
-- Note: If using Spring Boot with spring.jpa.hibernate.ddl-auto=update,
-- these tables will be created automatically. This file is for reference.
-- ================================================================

CREATE DATABASE IF NOT EXISTS shelf_db;
USE shelf_db;

-- Rooms table
CREATE TABLE IF NOT EXISTS rooms (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    created_at  DATETIME     NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Shelves table
CREATE TABLE IF NOT EXISTS shelves (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    room_id     BIGINT       NOT NULL,
    created_at  DATETIME     NOT NULL,

    CONSTRAINT fk_shelf_room
        FOREIGN KEY (room_id) REFERENCES rooms(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Boxes table
CREATE TABLE IF NOT EXISTS boxes (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    shelf_id    BIGINT       NOT NULL,
    created_at  DATETIME     NOT NULL,

    CONSTRAINT fk_box_shelf
        FOREIGN KEY (shelf_id) REFERENCES shelves(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Items table
CREATE TABLE IF NOT EXISTS items (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    category    VARCHAR(100),
    quantity    INT          NOT NULL DEFAULT 1,
    box_id      BIGINT       NOT NULL,
    created_at  DATETIME     NOT NULL,

    CONSTRAINT fk_item_box
        FOREIGN KEY (box_id) REFERENCES boxes(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
