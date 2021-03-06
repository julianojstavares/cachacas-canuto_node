import { prisma } from "../../../../database/prismaClient";
import { PopulateClientsUseCase } from "../../../Clientes/useCases/populate/populateClientsUseCase";
import { PopulateProductsUseCase } from "../../../Produtos/useCases/populate/populateProductsUseCase";
import { PopulateSalesUseCase } from "./populateSalesUseCase";


describe("Populate table sales", () => {
    
    jest.setTimeout(20 * 1000);
    
    beforeAll(async () => {

        const nClients = await prisma.clients.count();

        const nProducts = await prisma.products.count();
        
        if(nClients < 1)
        {
            const populateClientsUseCase = new PopulateClientsUseCase();
            await populateClientsUseCase.execute();
        }
    
        if(nProducts < 1)
        {
            const populateProductsUseCase = new PopulateProductsUseCase();
            await populateProductsUseCase.execute();
        }
    })

    test("should table clients and products have data", async () => {

        const nClients = await prisma.clients.count();
        expect(nClients).toBeGreaterThan(0);

        const nProducts = await prisma.products.count();
        expect(nProducts).toBeGreaterThan(0);

    })

    test("should table sales don't have data", async () => {

        let nSales = await prisma.sales.count();

        if(nSales > 0)
        {
            await prisma.itemsSold.deleteMany({});
            await prisma.sales.deleteMany({});
            nSales = await prisma.sales.count();
        }

        expect(nSales).toBe(0);

    })
    
    test("should return a list of sales", async () => {
        
        const populateSalesUseCase = new PopulateSalesUseCase();
        
        const sales = await populateSalesUseCase.execute();

        expect(sales).toBe("2508 vendas foram registradas");

    });

    afterAll(async () => {
        
        await prisma.itemsSold.deleteMany({});
        await prisma.sales.deleteMany({});
        await prisma.clients.deleteMany({});
        await prisma.products.deleteMany({});

    })


})