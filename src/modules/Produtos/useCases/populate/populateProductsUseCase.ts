import axios from "axios";
import { prisma } from "../../../../database/prismaClient";
import { Decimal } from "@prisma/client/runtime";
import jsonProdutos from "../../../../database/Produtos.json";

interface IProduto {
    id: string;
    marca: string;
    classificacao: string;
    nome: string;
    teorAlcoolico: number;
    regiao: string;
    precoAtual: string;
}

export class PopulateProductsUseCase {

    async execute() {

        // const { data } = await axios.get('https://firebasestorage.googleapis.com/v0/b/testemonomytobackend/o/Catalogo.json?alt=media&token=b1e62709-c1a1-4b39-94ef-596c0fb65030');

        let produtos = Array<IProduto>();

        jsonProdutos.forEach((produto) => {

            const precoString = Object.values(produto)[6];
            const preco = parseFloat(precoString).toFixed(2);

            produtos.push({
                id: Object.values(produto)[0],
                marca: Object.values(produto)[1],
                classificacao: Object.values(produto)[2],
                nome: Object.values(produto)[3],
                teorAlcoolico: Number(Object.values(produto)[4]),
                regiao: Object.values(produto)[5],
                precoAtual: preco,
            });

        })

        produtos.forEach(async element => {

            await prisma.products.create({
                data: {
                    id: element.id,
                    marca: element.marca,
                    classificacao: element.classificacao,
                    nome: element.nome,
                    teorAlcoolico: element.teorAlcoolico,
                    regiao: element.regiao,
                    precoAtual: new Decimal(element.precoAtual),
                }
            });


        })

        return produtos;

    }

}