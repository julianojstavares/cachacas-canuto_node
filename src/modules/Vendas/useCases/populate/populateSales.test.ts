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
    
    test("should return a list of sales", async () => {
        
        const populateSalesUseCase = new PopulateSalesUseCase();
        
        const sales = await populateSalesUseCase.execute();

        expect(sales.length).toBeGreaterThan(0);

        const venda = await prisma.sales.findFirst({
            include: {
                clientRelation: true,
                itensVendidos: true,
            }
        })

    });

    afterAll(async () => {
        
        await prisma.itemsSold.deleteMany({});
        await prisma.sales.deleteMany({});
        await prisma.clients.deleteMany({});
        await prisma.products.deleteMany({});

    })


})