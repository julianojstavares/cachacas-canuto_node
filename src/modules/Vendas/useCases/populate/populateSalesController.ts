import { Request, Response } from "express";
import { PopulateSalesUseCase } from "./populateSalesUseCase";

export class PopulateSalesController {

    async handle(request: Request, response: Response) {

        const populateSalesUseCase = new PopulateSalesUseCase();

        const result = await populateSalesUseCase.execute();

        return response.json(result);

    }

}