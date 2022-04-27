import { prisma } from "../../../../database/prismaClient";

interface ISalesClients {

    dataInicial?: string;
    dataFinal?: string;
    classificados?: number;

}

interface IRelatorio {

    nomeCliente?: string;
    totalVendas?: number;
    produtos?: IMaisVendidos[];
}

interface IMaisVendidos {
    nomeProduto?: string;
    somaQuantidadeVendidaProduto?: number;
    somaValorVendidoProduto?: number;
}

export class SalesClientsUseCase {

    async execute({ dataInicial, dataFinal, classificados }: ISalesClients) {


        let dateClause = {};

        if(dataInicial && dataFinal) {
            dateClause = { gte: new Date(dataInicial), lte: new Date(dataFinal) };
        }

        let sales : IRelatorio[] = [];
        let mostSold : IMaisVendidos[] = [];

        const clientes = await prisma.clients.findMany({
            select:{
                nome: true,
            }
        })

        const produtos = await prisma.products.findMany({
            select: {
                nome: true,
            }
        })

        for (let i = 0; i < clientes.length; i++) {

            const cliente = clientes[i];

            const totalVendas = await prisma.sales.count({
                where: {
                    clientRelation: {
                        nome: cliente.nome,
                    },
                    data: dateClause,
                }
            })

            for (let j = 0; j < produtos.length; j++) {

                const quantidade = await prisma.itemsSold.aggregate({

                    where: {
                        saleRelation: {
                            clientRelation: {
                                nome: clientes[i].nome
                            },
                            data: dateClause,
                        },
                        productRelation: {
                            nome: produtos[j].nome
                        }
                    },
                    _sum: {
                        quantidade: true
                    },

                })

                const totalVendido = await prisma.itemsSold.aggregate({

                    where: {
                        saleRelation: {
                            clientRelation: {
                                nome: clientes[i].nome
                            },
                            data: dateClause,
                        },
                        productRelation: {
                            nome: produtos[j].nome
                        }
                    },
                    _sum: {
                        precoUnitario: true
                    },

                })

                mostSold.push({
                    nomeProduto: produtos[j].nome,
                    somaQuantidadeVendidaProduto: Number(quantidade._sum.quantidade),
                    somaValorVendidoProduto: Number(totalVendido._sum.precoUnitario)
                });

            }

            mostSold.sort((a,b) => b.somaQuantidadeVendidaProduto! - a.somaQuantidadeVendidaProduto!);

            let ranking;

            if (classificados) {
                ranking = mostSold.slice(0, classificados);
            }else{
                ranking = mostSold;
            }

            sales.push({

                nomeCliente: clientes[i].nome,
                totalVendas: Number(totalVendas),
                produtos: ranking,
            })

            mostSold = [];

          }

          sales.sort((a,b) => b.totalVendas! - a.totalVendas!);

        return sales;        

    }    

}

