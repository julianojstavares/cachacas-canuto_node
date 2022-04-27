import { prisma } from "../../../../database/prismaClient";
import { PopulateClientsUseCase } from "../../../Clientes/useCases/populate/populateClientsUseCase";
import { PopulateProductsUseCase } from "../../../Produtos/useCases/populate/populateProductsUseCase";
import { PopulateSalesUseCase } from "../../../Vendas/useCases/populate/populateSalesUseCase";
import { SalesProductsUseCase } from "./salesProductsUseCase";

describe('Return total value e amount sold by product', () => {

    jest.setTimeout(20 * 1000);

    let clients: number;

    let products: number;

    let sales: number;

    let salesByProduct: any;

    const salesProductsUseCase = new SalesProductsUseCase();

    enum OrderBy {
        valor = "valor",
        quantidade = "quantidade",
    }

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


    test('The size of the sales list per product must be equal to the number of products', async () => {
        
        salesByProduct = await salesProductsUseCase.execute({});

        expect(salesByProduct.length).toEqual(products);

    })

    test('Should return total value and amount sold by product', async () => {

        for (const product of salesByProduct) {

            expect(product.valorTotalVendido).toBeGreaterThan(0);

            expect(product.quantidadeTotalVendida).toBeGreaterThan(0);

        }

    })

    test('Should return total value and amount sold by product, order by value desc', async () => {

        salesByProduct = await salesProductsUseCase.execute({ orderBy: OrderBy.valor, order: "desc" });

        let first = salesByProduct[0].valorTotalVendido;
        let second = salesByProduct[1].valorTotalVendido;

        expect(first).toBeGreaterThan(second);

    })

    test('Should return total value and amount sold by product, order by amount desc', async () => {

        salesByProduct = await salesProductsUseCase.execute({ orderBy: OrderBy.quantidade, order: "desc" });

        let first = salesByProduct[0].quantidadeTotalVendida;
        let second = salesByProduct[1].quantidadeTotalVendida;

        expect(first).toBeGreaterThan(second);

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
