-- DropForeignKey
ALTER TABLE "items_sales" DROP CONSTRAINT "items_sales_productId_fkey";

-- DropForeignKey
ALTER TABLE "items_sales" DROP CONSTRAINT "items_sales_salesId_fkey";

-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_clientsId_fkey";

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items_sales" ADD CONSTRAINT "items_sales_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items_sales" ADD CONSTRAINT "items_sales_salesId_fkey" FOREIGN KEY ("salesId") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;
