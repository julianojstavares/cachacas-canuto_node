import { prisma } from "../../../../database/prismaClient";
import { PopulateProductsUseCase } from "./populateProductsUseCase";

describe("Populate table products", () => {

    beforeAll(async () => {

        const data = await prisma.products.count();

        if (data > 0) await prisma.products.deleteMany({});

        expect(data).toBe(0);

    })

    test("should return a list of products", async () => {

        const populateProductsUseCase = new PopulateProductsUseCase();

        const products = await populateProductsUseCase.execute();

        expect(products.length).toBeGreaterThan(0);

    });
    
    afterAll(async () => {

        let data = await prisma.products.count();

        while (data > 0) {

            await prisma.products.deleteMany({});

            data = await prisma.products.count();

        }

        expect(data).toBe(0);

    })

})