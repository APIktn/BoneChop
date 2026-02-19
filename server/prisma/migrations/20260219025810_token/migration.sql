/*
  Warnings:

  - You are about to alter the column `CreateDateTime` on the `tbl_mas_users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `UpdateDateTime` on the `tbl_mas_users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `CreateDateTime` on the `tbl_trs_product_header` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `UpdateDateTime` on the `tbl_trs_product_header` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `CreateDateTime` on the `tbl_trs_product_line` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `UpdateDateTime` on the `tbl_trs_product_line` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `tbl_trs_token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tbl_trs_token` DROP FOREIGN KEY `tbl_trs_token_UserId_fkey`;

-- AlterTable
ALTER TABLE `tbl_mas_users` MODIFY `CreateDateTime` DATETIME NOT NULL,
    MODIFY `UpdateDateTime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `tbl_trs_product_header` MODIFY `CreateDateTime` DATETIME NOT NULL,
    MODIFY `UpdateDateTime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `tbl_trs_product_line` MODIFY `CreateDateTime` DATETIME NOT NULL,
    MODIFY `UpdateDateTime` DATETIME NOT NULL;

-- DropTable
DROP TABLE `tbl_trs_token`;

-- CreateTable
CREATE TABLE `Token` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `UserId` INTEGER NOT NULL,
    `TokenHash` VARCHAR(191) NOT NULL,
    `ExpiresAt` DATETIME(3) NOT NULL,
    `AbsoluteExp` DATETIME(3) NOT NULL,
    `CreateBy` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Token_UserId_idx`(`UserId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `tbl_mas_users`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
