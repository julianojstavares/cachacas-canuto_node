import { prisma } from "../../../../database/prismaClient";


export class ClearProductsUseCase {

    async execute() {

        await prisma.products.deleteMany();

        const nProducts = await prisma.products.count();

        const clearSuccess = {
            status: "Successfully Cleaned",
            message: `${nProducts} produtos no banco de dados`,
        }

        return clearSuccess;

    }

}