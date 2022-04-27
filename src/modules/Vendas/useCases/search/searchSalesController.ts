import { Request, Response } from "express";
import { SearchSalesUseCase } from "./searchSalesUseCase";

export class SearchSalesController {

    async handle(request: Request, response: Response) {

        let query = request.query;

        let nomeCliente = query.nomeCliente as string;
        let nomeProduto = query.nomeProduto as string;
        let pagina = Number(query.pagina);
        let itensPorPagina = Number(query.itensPorPagina);
        let dataInicial = query.dataInicial as string;
        let dataFinal = query.dataFinal as string;

        const searchSalesUseCase = new SearchSalesUseCase();
        
        const result = await searchSalesUseCase.execute({ 
            nomeCliente, 
            nomeProduto, 
            pagina, 
            itensPorPagina,
            dataInicial,
            dataFinal 
        });

        return response.json(result);

    }


}