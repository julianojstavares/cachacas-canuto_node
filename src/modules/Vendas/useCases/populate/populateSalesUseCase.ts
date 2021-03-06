import axios from "axios";
import { prisma } from "../../../../database/prismaClient";
import jsonVendas from "../../../../database/Vendas.json";

export class PopulateSalesUseCase {

    async execute() {

        // const { data } = await axios.get('https://firebasestorage.googleapis.com/v0/b/testemonomytobackend/o/Vendas.json?alt=media&token=792a67d4-d0d0-4b9a-a099-86165322ce2a');

        async function saveData() {
            
            await Promise.all(jsonVendas.map(async (element) => {

                let venda = await prisma.sales.create({

                    data: {

                        id: element.Id,
                        data: new Date(element.Data),
                        clientRelation: {
                            connect: {
                                id: element.IdCliente
                            }
                        }
                        
                    }
     
                 });

                 await Promise.all(element.Itens.map(async (item) => {

                    await prisma.itemsSold.create({

                        data: {
    
                            quantidade: item.Quantidade,
                            precoUnitario: item.PrecoUnitario,
                            saleRelation: {
                                connect: {
                                    id: venda.id
                                }
                            },
                            productRelation: {
                                connect: {
                                    id: item.Id
                                }
                            }
    
                        }
    
                    });
    

                 }));

            }));

        }

        await saveData();

        const nSales = await prisma.sales.count();

        return `${nSales} vendas foram registradas`;

    }

}

