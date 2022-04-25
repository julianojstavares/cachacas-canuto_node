import { Sales } from "@prisma/client";
import axios from "axios";
import { prisma } from "../../../../database/prismaClient";

interface IVenda {
    
    Id: string;
    IdCliente: string;
    Data: Date;
    Itens: [{
        Id: string;
        Quantidade: number;
    }];

}

export class PopulateSalesUseCase {

    async execute() {

        const { data } = await axios.get('https://firebasestorage.googleapis.com/v0/b/testemonomytobackend/o/Vendas.json?alt=media&token=792a67d4-d0d0-4b9a-a099-86165322ce2a');

        data.forEach(async (element:IVenda) => {

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

