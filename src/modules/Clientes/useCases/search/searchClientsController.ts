import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { SearchClientsUseCase } from "./searchClientsUseCase";

export class SearchClientsController {

    async handle(request: Request, response: Response){

        let query = request.query;

        let id = query.id as string;
        let nome = query.nome as string;
        let nascimento = query.nascimento as Prisma.SortOrder;
        let dataInicial = query.dataInicial as string;
        let dataFinal = query.dataFinal as string;

        const searchClientsUseCase = new SearchClientsUseCase();

        const result = await searchClientsUseCase.execute({ id, nome, nascimento, dataInicial, dataFinal });

        return response.json(result);

    }

}