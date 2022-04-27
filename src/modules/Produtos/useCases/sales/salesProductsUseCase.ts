import { prisma } from "../../../../database/prismaClient";
import { Prisma } from "@prisma/client";

interface ISalesProducts {

    orderBy?: OrderBy;
    order?: Prisma.SortOrder;

}

enum OrderBy {
    valor = "valor",
    quantidade = "quantidade",
}

interface IProduct {

    nome: string;
    valorTotalVendido: number;
    quantidadeTotalVendida: number;

}

export class SalesProductsUseCase {

    async execute({ orderBy, order } : ISalesProducts) {

        const products = await prisma.products.findMany({});

        let mostSold : IProduct[] = [];

        await Promise.all(products.map(async (product) => {

            const produto = await prisma.itemsSold.aggregate({

                where: {
                    productRelation: {
                        nome: product.nome
                    }
                },
                _sum: {
                    precoUnitario: true,
                    quantidade: true,
                },

            })

            mostSold.push({
                nome: product.nome,
                valorTotalVendido: Number(produto._sum.precoUnitario),
                quantidadeTotalVendida: Number(produto._sum.quantidade),
            });

        }));

        if (orderBy === OrderBy.valor) {
    
            if (order === Prisma.SortOrder.asc) {

                return mostSold.sort((a, b) => a.valorTotalVendido - b.valorTotalVendido);
                
            } else {
                
                return mostSold.sort((a, b) => b.valorTotalVendido - a.valorTotalVendido);

            }

        } 

        if (orderBy === OrderBy.quantidade) {

            if (order === Prisma.SortOrder.asc) {

                return mostSold.sort((a, b) => a.quantidadeTotalVendida - b.quantidadeTotalVendida);

            } else {

                return mostSold.sort((a, b) => b.quantidadeTotalVendida - a.quantidadeTotalVendida);
            }

        } 

    }

}