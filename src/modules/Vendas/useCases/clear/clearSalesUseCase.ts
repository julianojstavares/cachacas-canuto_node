import { prisma } from "../../../../database/prismaClient";

export class ClearSalesUseCase {

    async execute() {

        await prisma.itemsSold.deleteMany();
        await prisma.sales.deleteMany();

        const nSales = await prisma.sales.count();

        const clearSuccess = {
            status: "Successfully Cleaned",
            message: `${nSales} vendas no banco de dados`,
        }

        return clearSuccess;

    }

}