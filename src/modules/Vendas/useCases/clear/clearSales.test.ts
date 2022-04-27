import { prisma } from "../../../../database/prismaClient";
import { ClearSalesUseCase } from "./clearSalesUseCase";

describe("Clear table sales", () => {

    test("Should have data in table sales", async () => {

        let salesData = await prisma.sales.count();

        if(salesData < 1) {

            await prisma.sales.create({
                data: {
                    id: "1",
                    data: new Date("2020-01-01"),
                    clientRelation: {
                        connectOrCreate: {
                            where: {
                                id: "1",
                            },
                            create: {
                                id: "1",
                                nome: "Cliente 1",
                                dataNascimento: new Date("2020-01-01"),
                            }
                        }
                    },
                    itensVendidos: {
                        connectOrCreate: {
                            where: {
                                id: "1",
                            },
                            create: {
                                id: "1",
                                precoUnitario: 1,
                                quantidade: 1,
                                productRelation: {
                                    connectOrCreate: {
                                        where: {
                                            id: "1",
                                        },
                                        create: {
                                            id: "1",
                                            nome: "Produto 1",
                                            classificacao: "Classificação 1",
                                            marca: "Marca 1",
                                            precoAtual: 1,
                                            regiao: "Região 1",
                                            teorAlcoolico: 1,
                                        }
                                    }
                                }
                            }
                        }
                    },
                }
            });

        }

        salesData = await prisma.sales.count();

        expect(salesData).toBeGreaterThan(0);

    })

    test("Should clear table sales", async () => {

        const clearSalesUseCase = new ClearSalesUseCase();
        
        await clearSalesUseCase.execute();
        
        const salesData = await prisma.sales.count();
        
        expect(salesData).toBe(0);

    })

    test("Should clear table items sold", async () => {

        const itemsData = await prisma.itemsSold.count();
        
        expect(itemsData).toBe(0);

    })

    afterAll(async () => {

        await prisma.clients.deleteMany({});
            
        const clientsData = await prisma.clients.count();
        
        expect(clientsData).toBe(0);

        await prisma.products.deleteMany({});
            
        const productsData = await prisma.products.count();
        
        expect(productsData).toBe(0);

    })




})