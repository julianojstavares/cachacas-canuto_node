import { Request, Response } from "express";
import { PopulateProductsUseCase } from "./populateProductsUseCase";


export class PopulateProductsController {

    async handle(request: Request, response: Response) {

        const populateProductsUseCase = new PopulateProductsUseCase();

        const result = await populateProductsUseCase.execute();

        return response.json(result);

    }


}