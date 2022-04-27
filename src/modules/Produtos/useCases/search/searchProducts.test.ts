import { prisma } from "../../../../database/prismaClient";
import { PopulateProductsUseCase } from "../populate/populateProductsUseCase";
import { SearchProductsUseCase } from "./searchProductsUseCase";


describe('Search Products', () => {

    const searchProductsUseCase = new SearchProductsUseCase();

    beforeAll(async () => {

        let products = await prisma.products.count();

        if (products === 0) {

            const populateProductsUseCase = new PopulateProductsUseCase();

            await populateProductsUseCase.execute();

            products = await prisma.products.count();

        }

        expect(products).toBeGreaterThan(0);

    })

    test('Should return all products', async () => {

        const result = await searchProductsUseCase.execute({});

        expect(result.length).toBeGreaterThan(0);

    })

    test('Should return products by id', async () => {

        const result = await searchProductsUseCase.execute({ id: '6837dbda-3868-45dc-84ec-81e70156cb1f' });

        expect(result.length).toBe(1);

    })

    test('Should return products by name', async () => {

        const result = await searchProductsUseCase.execute({ nome: 'canuto' });

        expect(result.length).toBe(1);

    })

    test('Should return products by alcohol content range', async () => {

        const result = await searchProductsUseCase.execute({ teorMaximo: 38, teorMinimo: 1 });

        expect(result.length).toBe(1);

    })

    afterAll(async () => {

        await prisma.products.deleteMany({});

        let products = await prisma.products.count();

        expect(products).toBe(0);

    })

})