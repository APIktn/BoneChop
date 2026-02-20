/*
  Warnings:

  - You are about to alter the column `CreateDateTime` on the `tbl_mas_users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `UpdateDateTime` on the `tbl_mas_users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `CreateDateTime` on the `tbl_trs_product_header` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `UpdateDateTime` on the `tbl_trs_product_header` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `CreateDateTime` on the `tbl_trs_product_line` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `UpdateDateTime` on the `tbl_trs_product_line` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `ExpiresAt` on the `token` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `AbsoluteExp` on the `token` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `tbl_mas_users` MODIFY `CreateDateTime` DATETIME NOT NULL,
    MODIFY `UpdateDateTime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `tbl_trs_product_header` MODIFY `CreateDateTime` DATETIME NOT NULL,
    MODIFY `UpdateDateTime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `tbl_trs_product_image` MODIFY `ProductImageId` TEXT NULL;

-- AlterTable
ALTER TABLE `tbl_trs_product_line` MODIFY `Note` TEXT NULL,
    MODIFY `CreateDateTime` DATETIME NOT NULL,
    MODIFY `UpdateDateTime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `token` MODIFY `ExpiresAt` DATETIME NOT NULL,
    MODIFY `AbsoluteExp` DATETIME NOT NULL;
