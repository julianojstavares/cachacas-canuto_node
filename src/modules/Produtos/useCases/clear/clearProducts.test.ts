import { prisma } from "../../../../database/prismaClient";
import { ClearProductsUseCase } from "./clearProductsUseCase";


describe("Clear data on table products", () => {

    beforeAll(async () => {

        const data = await prisma.products.count();
        if (data < 1) {

            await prisma.products.create({
                data: {
                    id: "1",
                    nome: "Produto 1",
                    classificacao: "Classificação 1",
                    marca: "Marca 1",
                    precoAtual: 1,
                    regiao: "Região 1",
                    teorAlcoolico: 1,
                }
            });

        }

    })

    test("should return a status of successfully cleaned", async () => {

        const clearProductsUseCase = new ClearProductsUseCase();

        const products = await clearProductsUseCase.execute();

        expect(products.status).toBe("Successfully Cleaned");

    })


})