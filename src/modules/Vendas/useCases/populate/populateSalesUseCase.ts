import axios from "axios";
import { prisma } from "../../../../database/prismaClient";
import jsonVendas from "../../../../database/Vendas.json";

export class PopulateSalesUseCase {

    async execute() {

        // const { data } = await axios.get('https://firebasestorage.googleapis.com/v0/b/testemonomytobackend/o/Vendas.json?alt=media&token=792a67d4-d0d0-4b9a-a099-86165322ce2a');

        jsonVendas.forEach(async (element:any) => {

            const venda = await prisma.sales.create({

               data: {

                   data: new Date(element.Data),
                   clientRelation: {
                       connect: {
                           id: element.IdCliente
                       }
                   },
               }

            });

            element.Itens.forEach(async (item:any) => {

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


            })

        })

        const sales = await prisma.sales.findMany();

        return sales;

    }

}

