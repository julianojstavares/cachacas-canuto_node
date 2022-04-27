-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "classificacao" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "teorAlcoolico" INTEGER NOT NULL,
    "regiao" TEXT NOT NULL,
    "precoAtual" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
