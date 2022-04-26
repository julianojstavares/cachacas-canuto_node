import { prisma } from "../../../../database/prismaClient";
import { PopulateClientsUseCase } from "../populate/populateClientsUseCase";
import { SearchClientsUseCase } from "./searchClientsUseCase";

describe('Search clients', () => {

    const searchClientsUseCase = new SearchClientsUseCase();
    

    beforeAll(async () => {

        let clients = await prisma.clients.count();

        if(clients === 0) {

            const populateClientsUseCase = new PopulateClientsUseCase();
            
            await populateClientsUseCase.execute();

            clients = await prisma.clients.count();

        }

        expect(clients).toBeGreaterThan(0);

    })

    test('Should return all clients', async() => {

        const result = await searchClientsUseCase.execute({});

        expect(result.length).toBeGreaterThan(0);

    })

    test('Should return clients by id', async() => {

        const result = await searchClientsUseCase.execute({ id: '0463c6c9-dbe7-447f-a27d-72a977108d19' });

        expect(result.length).toBe(1);

    })

    test('Should return clients by name', async() => {

        const result = await searchClientsUseCase.execute({ nome: 'lucas' });

        expect(result.length).toBe(1);

    })

    test('Should return clients by birth date ascending order', async() => {

        const result = await searchClientsUseCase.execute({ nascimento: 'asc' });

        expect(result[0].dataNascimento).toStrictEqual(new Date('1725-04-13'));

    })

    test('Should return clients by birth date range', async() => {

        const result = await searchClientsUseCase.execute({ dataInicial: '1980', dataFinal: '1990' });

        expect(result.length).toBe(2);

    })

    afterAll(async () => {

        await prisma.clients.deleteMany({});

        let clients = await prisma.clients.count();

        expect(clients).toBe(0);

    })

})