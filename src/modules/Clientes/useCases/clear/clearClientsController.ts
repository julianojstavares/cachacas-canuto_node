import { Request, Response } from "express";
import { ClearClientsUseCase } from "./clearClientsUseCase";

export class ClearClientsController {

    async handle(request:Request, response:Response) {

        const clearClientsUseCase = new ClearClientsUseCase();

        const result = await clearClientsUseCase.execute();

        return response.json(result);

    }

}