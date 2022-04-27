import { prisma } from "../../../../database/prismaClient";
import { PopulateClientsUseCase } from "../../../Clientes/useCases/populate/populateClientsUseCase";
import { PopulateProductsUseCase } from "../../../Produtos/useCases/populate/populateProductsUseCase";
import { PopulateSalesUseCase } from "../populate/populateSalesUseCase";
import { SearchSalesUseCase } from "./searchSalesUseCase";

describe('Search sales', () => {

    jest.setTimeout(20 * 1000);

    const searchSalesUseCase = new SearchSalesUseCase();

    test('Should have data in clients table', async () => {

        let clients = await prisma.clients.count();

        if (clients === 0) {

            const populateClientsUseCase = new PopulateClientsUseCase();

            await populateClientsUseCase.execute();

            clients = await prisma.clients.count();

        }

        expect(clients).toBeGreaterThan(0);

    })

    test('Should have data in products table', async () => {

        let products = await prisma.products.count();

        if (products === 0) {

            const populateProductsUseCase = new PopulateProductsUseCase();

            await populateProductsUseCase.execute();

            products = await prisma.products.count();

        }

        expect(products).toBeGreaterThan(0);

    })

    test('Should have data in sales table', async () => {

        let sales = await prisma.sales.count();

        if (sales === 0) {

            const populateSalesUseCase = new PopulateSalesUseCase();

            await populateSalesUseCase.execute();

            sales = await prisma.sales.count();

        }

        expect(sales).toBeGreaterThan(0);

    })

    test('Should return first 5 sales order by date', async () => {

        const result = await searchSalesUseCase.execute({});

        expect(result.meta.itensListados).toBe(5);

        expect(result.meta.ordenadoPor).toBe('data, desc');

        expect(result.meta.itensFiltrados).toBe(2508);

        expect(result.meta.totalVendas).toBe(2508);

    })

    test('Should return sales by client name', async () => {

        const result = await searchSalesUseCase.execute({ nomeCliente: 'lucas' });

        expect(result.meta.itensFiltrados).toBe(82);

    })

    test('Should return sales by product name', async () => {

        const result = await searchSalesUseCase.execute({ nomeProduto: 'princesa' });

        expect(result.meta.itensFiltrados).toBe(311);

    })

    test('Should return sales by date range', async () => {

        const result = await searchSalesUseCase.execute({ dataInicial: '2021', dataFinal: '2022' });

        expect(result.meta.itensFiltrados).toBe(183);

    })
    
    afterAll(async () => {

        await prisma.clients.deleteMany({});

        let clients = await prisma.clients.count();

        expect(clients).toBe(0);

        await prisma.products.deleteMany({});

        let products = await prisma.products.count();

        expect(products).toBe(0);

        await prisma.itemsSold.deleteMany({});

        let itemsSold = await prisma.itemsSold.count();

        expect(itemsSold).toBe(0);

        await prisma.sales.deleteMany({});

        let sales = await prisma.sales.count();

        expect(sales).toBe(0);

    })

})