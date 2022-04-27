import { prisma } from "../../../../database/prismaClient";
import { PopulateProductsUseCase } from "../../../Produtos/useCases/populate/populateProductsUseCase";
import { PopulateSalesUseCase } from "../../../Vendas/useCases/populate/populateSalesUseCase";
import { PopulateClientsUseCase } from "../populate/populateClientsUseCase";
import { SalesClientsUseCase } from "./salesClientsUseCase";

describe('Fetch and filter all sales and all products sold in each sale for each customer', () => {
    
    jest.setTimeout(20 * 1000);

    const salesClientsUseCase = new SalesClientsUseCase();

    let clients: number;

    let products: number;

    let sales: number;

    let salesByClient: any;

    test('Should have data in clients table', async () => {

        clients = await prisma.clients.count();

        if (clients === 0) {

            const populateClientsUseCase = new PopulateClientsUseCase();

            await populateClientsUseCase.execute();

            clients = await prisma.clients.count();

        }

        expect(clients).toBeGreaterThan(0);

    })

    test('Should have data in products table', async () => {

        products = await prisma.products.count();

        if (products === 0) {

            const populateProductsUseCase = new PopulateProductsUseCase();

            await populateProductsUseCase.execute();

            products = await prisma.products.count();

        }

        expect(products).toBeGreaterThan(0);

    })

    test('Should have data in sales table', async () => {

        sales = await prisma.sales.count();

        if (sales === 0) {

            const populateSalesUseCase = new PopulateSalesUseCase();

            await populateSalesUseCase.execute();

            sales = await prisma.sales.count();

        }

        expect(sales).toBeGreaterThan(0);

    })

    test('Should return a list of sales per customer, with all customers', async () => {

        salesByClient = await salesClientsUseCase.execute({});

        expect(salesByClient.length).toEqual(clients);
        
    })

    test('Should return, for each customer, the total of how many sales occurred', async () => {

        for (let index = 0; index < salesByClient.length; index++) {
            
            const sale = salesByClient[index];
            expect(sale.totalVendas).toBeGreaterThanOrEqual(0);
            
        }

    })

    test('Should return, for each customer, all products sold or not', async () => {

        for (let index = 0; index < salesByClient.length; index++) {
            
            const sale = salesByClient[index];
            expect(sale.produtos.length).toBeGreaterThanOrEqual(products);
            
        }
        
    })

    test('Should return, for each customer, the sum of the quantity of each product sold', async () => {

        for (let index = 0; index < salesByClient.length; index++) {
            
            const sale = salesByClient[index];

            for (let index2 = 0; index2 < sale.produtos.length; index2++) {

                const product = sale.produtos[index2];
                expect(product.somaQuantidadeVendidaProduto).toBeGreaterThanOrEqual(0);

            }
            
        }

    })

    test('Should return, for each customer, the sum of the sales value of each product', async () => {

        for (let index = 0; index < salesByClient.length; index++) {
            
            const sale = salesByClient[index];

            for (let index2 = 0; index2 < sale.produtos.length; index2++) {

                const product = sale.produtos[index2];
                expect(product.somaValorVendidoProduto).toBeGreaterThanOrEqual(0);

            }
            
        }
        
    })

    test('Should sort the best-selling products, listed in descending order, within a ranked range', async () => {

        salesByClient = await salesClientsUseCase.execute({ classificados: 3 });

        let first = salesByClient[0].produtos[0].somaQuantidadeVendidaProduto

        let second = salesByClient[0].produtos[1].somaQuantidadeVendidaProduto

        expect(first).toBeGreaterThan(second);

        for (let index = 0; index < salesByClient.length; index++) {
            
            const sale = salesByClient[index];
            expect(sale.produtos.length).toBeGreaterThanOrEqual(1);
            
        }

    })

    test('Should sort only the best-selling product, for each client', async () => {

        salesByClient = await salesClientsUseCase.execute({ classificados: 1 });

        for (let index = 0; index < salesByClient.length; index++) {
            
            const sale = salesByClient[index];
            expect(sale.produtos.length).toEqual(1);
            
        }

    })

    test('Should sort only the best-selling product, for each client, in a range date', async () => {

        salesByClient = await salesClientsUseCase.execute({ 
            classificados: 1, 
            dataInicial: '2021', 
            dataFinal: '2022' 
        });

        expect(salesByClient[0].nomeCliente).toBe("João Canabrava");
        expect(salesByClient[0].totalVendas).toBe(48);

        expect(salesByClient[0].produtos[0].nomeProduto).toBe("Cachaça Caninha 51 200ml");
        expect(salesByClient[0].produtos[0].somaQuantidadeVendidaProduto).toBe(51);
        expect(salesByClient[0].produtos[0].somaValorVendidoProduto).toBe(167.49);

        for (let index = 0; index < salesByClient.length; index++) {
            
            const sale = salesByClient[index];
            expect(sale.produtos.length).toEqual(1);

            
        }

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