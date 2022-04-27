import { Request, Response } from "express";
import { ClearSalesUseCase } from "./clearSalesUseCase";

export class ClearSalesController {

    async handle(request: Request, response: Response) {

        const clearSalesUseCase = new ClearSalesUseCase();

        const result = await clearSalesUseCase.execute();

        return response.json(result);

    }


}