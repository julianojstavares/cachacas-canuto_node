-- AlterTable
ALTER TABLE "items_sales" ALTER COLUMN "idProduto" DROP NOT NULL,
ALTER COLUMN "idVenda" DROP NOT NULL;

-- AlterTable
ALTER TABLE "sales" ALTER COLUMN "idCliente" DROP NOT NULL;
