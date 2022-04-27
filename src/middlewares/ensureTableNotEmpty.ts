import { PrismaClient } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prismaClient";

export const ensureTableNotEmpty = (table:string) => {

    return async (request: Request, response: Response, next: NextFunction) => {
        
        try{

            // @ts-ignore
            let tableData = await prisma[table].count();
            
            if (tableData == 0)
            {
                throw new Error();
            }

            return next();

        } 
        catch (error){
            return response.status(400).json({ error: `Não há dados na tabela ${table}` });
        }

      }

}
