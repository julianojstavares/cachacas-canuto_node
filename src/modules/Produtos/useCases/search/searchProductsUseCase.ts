import { prisma } from "../../../../database/prismaClient";

interface ISearchProducts {

    id?: string;
    nome?: string;
    teorMaximo?: number
    teorMinimo?: number

}

export class SearchProductsUseCase {

    async execute({ id, nome, teorMaximo, teorMinimo  }: ISearchProducts) {

        let where: any = {};
        let orderBy: any = {};

        if(id) where.id = id;
        if(nome) where.nome = { contains: nome, mode: 'insensitive' };
        if(teorMaximo && teorMinimo) {
            
            orderBy.teorAlcoolico = 'desc';
            where.teorAlcoolico = { gte: teorMinimo, lte: teorMaximo };

        }else{
            orderBy.nome = 'asc';
        }


        return await prisma.products.findMany({ where, orderBy });
    }

}