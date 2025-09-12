-- =============================================
-- MIVVO MySQL Database Creation Script
-- Generated from Prisma Schema
-- =============================================

-- Create database (optional - run this if you need to create the database)
-- CREATE DATABASE IF NOT EXISTS mivvo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE mivvo;

-- Drop tables if they exist (in correct order due to foreign keys)
DROP TABLE IF EXISTS `ReportAccess`;
DROP TABLE IF EXISTS `Report`;
DROP TABLE IF EXISTS `Payment`;
DROP TABLE IF EXISTS `Session`;
DROP TABLE IF EXISTS `Account`;
DROP TABLE IF EXISTS `User`;

-- =============================================
-- Create User table
-- =============================================
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `credits` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Create Account table
-- =============================================
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `Account_provider_providerAccountId_key` (`provider`, `providerAccountId`),
    KEY `Account_userId_fkey` (`userId`),
    CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Create Session table
-- =============================================
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `Session_sessionToken_key` (`sessionToken`),
    KEY `Session_userId_fkey` (`userId`),
    CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Create Payment table
-- =============================================
CREATE TABLE `Payment` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `credits` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    KEY `Payment_userId_fkey` (`userId`),
    CONSTRAINT `Payment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Create Report table
-- =============================================
CREATE TABLE `Report` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL COMMENT 'free or premium',
    `vin` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    `data` LONGTEXT NOT NULL COMMENT 'JSON stringified report data',
    PRIMARY KEY (`id`),
    KEY `Report_userId_fkey` (`userId`),
    CONSTRAINT `Report_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Create ReportAccess table
-- =============================================
CREATE TABLE `ReportAccess` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `reportId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL COMMENT 'free or premium',
    `purchasedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiresAt` DATETIME(3) NULL,
    `credits` INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    UNIQUE KEY `ReportAccess_userId_reportId_key` (`userId`, `reportId`),
    KEY `ReportAccess_userId_fkey` (`userId`),
    KEY `ReportAccess_reportId_fkey` (`reportId`),
    CONSTRAINT `ReportAccess_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `ReportAccess_reportId_fkey` FOREIGN KEY (`reportId`) REFERENCES `Report` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================
-- Create Indexes for better performance
-- =============================================

-- User table indexes
CREATE INDEX `idx_user_email` ON `User` (`email`);
CREATE INDEX `idx_user_created_at` ON `User` (`createdAt`);

-- Account table indexes
CREATE INDEX `idx_account_user_id` ON `Account` (`userId`);
CREATE INDEX `idx_account_provider` ON `Account` (`provider`);

-- Session table indexes
CREATE INDEX `idx_session_user_id` ON `Session` (`userId`);
CREATE INDEX `idx_session_expires` ON `Session` (`expires`);

-- Payment table indexes
CREATE INDEX `idx_payment_user_id` ON `Payment` (`userId`);
CREATE INDEX `idx_payment_created_at` ON `Payment` (`createdAt`);
CREATE INDEX `idx_payment_provider` ON `Payment` (`provider`);

-- Report table indexes
CREATE INDEX `idx_report_user_id` ON `Report` (`userId`);
CREATE INDEX `idx_report_vin` ON `Report` (`vin`);
CREATE INDEX `idx_report_type` ON `Report` (`type`);
CREATE INDEX `idx_report_created_at` ON `Report` (`createdAt`);

-- ReportAccess table indexes
CREATE INDEX `idx_report_access_user_id` ON `ReportAccess` (`userId`);
CREATE INDEX `idx_report_access_report_id` ON `ReportAccess` (`reportId`);
CREATE INDEX `idx_report_access_type` ON `ReportAccess` (`type`);
CREATE INDEX `idx_report_access_purchased_at` ON `ReportAccess` (`purchasedAt`);
CREATE INDEX `idx_report_access_expires_at` ON `ReportAccess` (`expiresAt`);

-- =============================================
-- End of MySQL Setup Script
-- =============================================
