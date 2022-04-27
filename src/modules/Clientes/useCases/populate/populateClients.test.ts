import { prisma } from '../../../../database/prismaClient';
import { PopulateClientsUseCase } from "./populateClientsUseCase";

describe("Populate Clients", () => {

    beforeAll(async () => {
        
        let data = await prisma.clients.count();

        while (data > 0) {

            await prisma.clients.deleteMany({});

            data = await prisma.clients.count();

        }

    })

    test("should return a list of clients", async () => {

        const populateClientsUseCase = new PopulateClientsUseCase();

        const clients = await populateClientsUseCase.execute();
        
        expect(clients.length).toBeGreaterThan(0);

    });

    afterAll(async () => {
            
        let data = await prisma.clients.count();

        while (data > 0) {

            await prisma.clients.deleteMany({});

            data = await prisma.clients.count();

        }
    
    })

})