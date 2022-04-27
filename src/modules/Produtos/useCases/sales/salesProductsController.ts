import { Request, Response } from "express";
import { SalesProductsUseCase } from "./salesProductsUseCase";
import { Prisma } from "@prisma/client";

enum OrderBy {
    quantidade,
    valor,
}


export class SalesProductsController {

    async handle(request: Request, response: Response) {

        let query = request.query;
        let queryOrderBy = query.orderBy as any;
        let queryOrder = query.order as any;

        let orderBy = queryOrderBy ?? OrderBy.quantidade;
        let order = queryOrder ?? Prisma.SortOrder.asc;

        let salesProductsUseCase = new SalesProductsUseCase();

        const result = await salesProductsUseCase.execute({ orderBy, order });

        return response.json(result);

    }


}