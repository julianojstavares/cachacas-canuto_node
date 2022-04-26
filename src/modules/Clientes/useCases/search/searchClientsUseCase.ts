import { Prisma } from "@prisma/client";
import { prisma } from "../../../../database/prismaClient";

interface ISearchClients {

    id?: string;
    nome?: string;
    nascimento?: Prisma.SortOrder;
    dataInicial?: string;
    dataFinal?: string;

}

export class SearchClientsUseCase {

    async execute({ id, nome, nascimento, dataInicial, dataFinal  }: ISearchClients) {

        let where: any = {};
        let orderBy: any = {};

        if(id) where.id = id;
        if(nome) where.nome = { contains: nome, mode: 'insensitive' };
        if(nascimento) orderBy.dataNascimento = nascimento;
        if(dataInicial && dataFinal) where.dataNascimento = { gte: new Date(dataInicial), lte: new Date(dataFinal) };

        return await prisma.clients.findMany({ where, orderBy });


    }
    
}