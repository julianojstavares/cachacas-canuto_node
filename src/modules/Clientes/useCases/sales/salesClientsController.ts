import { Request, Response } from "express";
import { SalesClientsUseCase } from "./salesClientsUseCase";

export class SalesClientsController {

    async handle(request: Request, response: Response){

        let query = request.query;

        let dataInicial = query.dataInicial as string;
        let dataFinal = query.dataFinal as string;
        let classificados = Number(query.classificados);

        const salesClientsUseCase = new SalesClientsUseCase();

        const result = await salesClientsUseCase.execute({ dataInicial, dataFinal, classificados });

        return response.json(result);

    }


}