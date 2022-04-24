import { Request, Response } from "express";
import { ClearProductsUseCase } from "./clearProductsUseCase";


export class ClearProductsController {

    async handle(request: Request, response: Response) {

        const clearProductsUseCase = new ClearProductsUseCase();

        const result = await clearProductsUseCase.execute();

        return response.json(result);

    }

}