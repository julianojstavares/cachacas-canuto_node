import { prisma } from "../../../../database/prismaClient";

export class ClearClientsUseCase {

    async execute() {

        await prisma.clients.deleteMany();

        const nClients = await prisma.clients.count();

        const clearSuccess = {
            status: "Successfully Cleaned",
            message: `${nClients} clientes no banco de dados`,
          }
      
          return clearSuccess; 

    }


}