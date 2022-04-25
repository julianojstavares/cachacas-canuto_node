import { prisma } from '../../../../database/prismaClient';
import { PopulateClientsUseCase } from "./populateClientsUseCase";

describe("Populate Clients", () => {

    beforeAll(async () => {
        
        const data = await prisma.clients.count();

        if (data > 0) await prisma.clients.deleteMany({});

    })

    test("should return a list of clients", async () => {

        const populateClientsUseCase = new PopulateClientsUseCase();

        const clients = await populateClientsUseCase.execute();
        
        expect(clients.length).toBeGreaterThan(0);

    });

    afterAll(async () => {
            
            await prisma.clients.deleteMany({});
    
    })

})