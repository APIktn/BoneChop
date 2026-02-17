-- CreateTable
CREATE TABLE `tbl_mas_users` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `UserCode` VARCHAR(20) NOT NULL,
    `UserName` VARCHAR(150) NULL,
    `UserEmail` VARCHAR(150) NOT NULL,
    `Password` VARCHAR(150) NOT NULL,
    `FirstName` VARCHAR(150) NOT NULL,
    `LastName` VARCHAR(150) NOT NULL,
    `Address` TEXT NOT NULL,
    `Tel` VARCHAR(20) NOT NULL,
    `Profile_Image` TEXT NOT NULL,
    `Upload_Image` TEXT NULL,
    `CreateBy` VARCHAR(20) NOT NULL,
    `CreateDateTime` DATETIME NOT NULL,
    `UpdateBy` VARCHAR(20) NOT NULL,
    `UpdateDateTime` DATETIME NOT NULL,

    UNIQUE INDEX `tbl_mas_users_UserCode_key`(`UserCode`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_trs_product_header` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `ProductCode` VARCHAR(150) NOT NULL,
    `ProductName` VARCHAR(255) NOT NULL,
    `ProductDes` TEXT NOT NULL,
    `CreateBy` VARCHAR(20) NOT NULL,
    `CreateDateTime` DATETIME NOT NULL,
    `UpdateBy` INTEGER NOT NULL,
    `UpdateDateTime` DATETIME NOT NULL,

    UNIQUE INDEX `tbl_trs_product_header_ProductCode_key`(`ProductCode`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_trs_product_image` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `IdRef` INTEGER NOT NULL,
    `ImageType` VARCHAR(50) NOT NULL,
    `ProductImage` TEXT NOT NULL,
    `ProductImageId` TEXT NOT NULL,
    `CreateBy` VARCHAR(20) NOT NULL,
    `CreateDateTime` DATE NOT NULL,
    `UpdateBy` VARCHAR(20) NOT NULL,
    `UpdateDateTime` DATE NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_trs_product_line` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `IdRef` INTEGER NOT NULL,
    `LineNo` INTEGER NOT NULL,
    `Size` VARCHAR(150) NOT NULL,
    `Price` DECIMAL(10, 2) NOT NULL,
    `Amount` INTEGER NOT NULL,
    `Note` TEXT NOT NULL,
    `CreateBy` VARCHAR(20) NOT NULL,
    `CreateDateTime` DATETIME NOT NULL,
    `UpdateBy` VARCHAR(20) NOT NULL,
    `UpdateDateTime` DATETIME NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_trs_product_image` ADD CONSTRAINT `tbl_trs_product_image_IdRef_fkey` FOREIGN KEY (`IdRef`) REFERENCES `tbl_trs_product_header`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_trs_product_line` ADD CONSTRAINT `tbl_trs_product_line_IdRef_fkey` FOREIGN KEY (`IdRef`) REFERENCES `tbl_trs_product_header`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
