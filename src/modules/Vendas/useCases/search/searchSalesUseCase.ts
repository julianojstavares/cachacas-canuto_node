import { prisma } from "../../../../database/prismaClient";

interface ISearchSales {

    nomeCliente?: string;
    nomeProduto?: string;
    pagina?: number;
    itensPorPagina?: number;
    dataInicial?: string;
    dataFinal?: string;

}

export class SearchSalesUseCase {

    async execute({ nomeCliente, nomeProduto, pagina, itensPorPagina, dataInicial, dataFinal }: ISearchSales) {

        let where: any = {};
        
        let orderBy: any = {};
        orderBy.data = 'desc';

        const paginaAtual = pagina || 1;
        const ipp = itensPorPagina || 5;
        const offset = (paginaAtual - 1) * ipp;       

        if (nomeCliente) where.clientRelation = { nome: { contains: nomeCliente, mode: 'insensitive' } };
        
        if (nomeProduto) where.itensVendidos = { some: { productRelation: { nome: { contains: nomeProduto, mode: 'insensitive' } } }};

        if(dataInicial && dataFinal) where.data = { gte: new Date(dataInicial), lte: new Date(dataFinal) };

        const include = { clientRelation: true, itensVendidos: { include: { productRelation: true } } };

        const sales = await prisma.sales.findMany({ 
            where,
            skip: offset, 
            take: ipp, 
            include,
            orderBy 
        });

        const salesFilter = await prisma.sales.findMany({
            where,
            include,
            orderBy
        });

        let data = {
            data: sales,
            meta: {
                ordenadoPor: "data, desc",
                pagina: paginaAtual,
                itensListados: sales.length,
                itensFiltrados: salesFilter.length,
                totalVendas: await prisma.sales.count(),
            }
        }

        return data
    }

}