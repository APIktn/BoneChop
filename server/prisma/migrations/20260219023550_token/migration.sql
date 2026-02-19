/*
  Warnings:

  - You are about to alter the column `CreateDateTime` on the `tbl_mas_users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `UpdateDateTime` on the `tbl_mas_users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `CreateDateTime` on the `tbl_trs_product_header` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `UpdateDateTime` on the `tbl_trs_product_header` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `CreateDateTime` on the `tbl_trs_product_line` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `UpdateDateTime` on the `tbl_trs_product_line` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `tbl_mas_users` MODIFY `CreateDateTime` DATETIME NOT NULL,
    MODIFY `UpdateDateTime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `tbl_trs_product_header` MODIFY `CreateDateTime` DATETIME NOT NULL,
    MODIFY `UpdateDateTime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `tbl_trs_product_line` MODIFY `CreateDateTime` DATETIME NOT NULL,
    MODIFY `UpdateDateTime` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `tbl_trs_token` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `UserId` INTEGER NOT NULL,
    `TokenHash` VARCHAR(255) NOT NULL,
    `ExpiresAt` DATETIME(3) NOT NULL,
    `CreateBy` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `tbl_trs_token_UserId_idx`(`UserId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_trs_token` ADD CONSTRAINT `tbl_trs_token_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `tbl_mas_users`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
