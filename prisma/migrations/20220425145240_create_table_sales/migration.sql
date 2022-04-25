-- CreateTable
CREATE TABLE "sales" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "clientsId" TEXT NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items_sales" (
    "id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "salesId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "items_sales_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items_sales" ADD CONSTRAINT "items_sales_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items_sales" ADD CONSTRAINT "items_sales_salesId_fkey" FOREIGN KEY ("salesId") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
