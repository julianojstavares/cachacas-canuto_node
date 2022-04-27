/*
  Warnings:

  - Added the required column `precoUnitario` to the `items_sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "items_sales" ADD COLUMN     "precoUnitario" DECIMAL(10,2) NOT NULL;
