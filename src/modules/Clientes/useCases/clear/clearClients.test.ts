import { prisma } from "../../../../database/prismaClient";
import { ClearClientsUseCase } from "./clearClientsUseCase";

describe("Clear data on table clients", () => {

    beforeAll(async () => {

        const data = await prisma.clients.count();
        if (data < 1) {

            await prisma.clients.create({
                data: {
                   id: "1",
                   nome: "Cliente 1",
                   dataNascimento: new Date("2020-01-01"),      
                }
            });

        }

    })

    test("should return a status of successfully cleaned", async () => {
            
            const clearClientsUseCase = new ClearClientsUseCase();
    
            const clients = await clearClientsUseCase.execute();
    
            expect(clients.status).toBe("Successfully Cleaned");
    
    })

})