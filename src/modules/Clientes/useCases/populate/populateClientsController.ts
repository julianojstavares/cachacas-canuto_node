import { Request, Response } from "express";
import { PopulateClientsUseCase } from "./populateClientsUseCase";

export class PopulateClientsController {

    async handle(request:Request, response:Response) {

        const populateClientsUseCase = new PopulateClientsUseCase();

        const result = await populateClientsUseCase.execute();

        return response.json(result);

    }

}