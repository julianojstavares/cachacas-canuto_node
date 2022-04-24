import { prisma } from "../../../../database/prismaClient";
import { PopulateProductsUseCase } from "./populateProductsUseCase";

describe("Populate table products", () => {

    beforeAll(async () => {

        const data = await prisma.products.count();

        if (data > 0) await prisma.products.deleteMany({});

    })

    test("should return a list of products", async () => {

        const populateProductsUseCase = new PopulateProductsUseCase();

        const products = await populateProductsUseCase.execute();

        console.log(products);

        expect(products[0].precoAtual).toBe("110.00");
        
        expect(products.length).toBeGreaterThan(0);

    });


})