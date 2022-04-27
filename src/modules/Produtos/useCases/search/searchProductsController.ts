import { Request, Response } from "express";
import { SearchProductsUseCase } from "./searchProductsUseCase";

export class SearchProductsController {

    async handle(request: Request, response: Response){

        let query = request.query;

        let id = query.id as string;
        let nome = query.nome as string;
        let teorMinimo = Number(query.teorMinimo)?? 1;
        let teorMaximo = Number(query.teorMaximo) ?? 100;

        const searchProductsUseCase = new SearchProductsUseCase();

        const result = await searchProductsUseCase.execute({ id, nome, teorMaximo, teorMinimo });

        return response.json(result);

    }


}