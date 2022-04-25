/*
  Warnings:

  - You are about to drop the column `productId` on the `items_sales` table. All the data in the column will be lost.
  - You are about to drop the column `salesId` on the `items_sales` table. All the data in the column will be lost.
  - You are about to drop the column `clientsId` on the `sales` table. All the data in the column will be lost.
  - Added the required column `idProduto` to the `items_sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idVenda` to the `items_sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idCliente` to the `sales` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "items_sales" DROP CONSTRAINT "items_sales_productId_fkey";

-- DropForeignKey
ALTER TABLE "items_sales" DROP CONSTRAINT "items_sales_salesId_fkey";

-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_clientsId_fkey";

-- AlterTable
ALTER TABLE "items_sales" DROP COLUMN "productId",
DROP COLUMN "salesId",
ADD COLUMN     "idProduto" TEXT NOT NULL,
ADD COLUMN     "idVenda" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sales" DROP COLUMN "clientsId",
ADD COLUMN     "idCliente" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items_sales" ADD CONSTRAINT "items_sales_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items_sales" ADD CONSTRAINT "items_sales_idVenda_fkey" FOREIGN KEY ("idVenda") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;
