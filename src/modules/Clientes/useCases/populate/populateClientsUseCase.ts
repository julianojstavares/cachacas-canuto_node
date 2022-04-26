import axios from "axios";
import { prisma } from "../../../../database/prismaClient";
import jsonClientes from "../../../../database/Clientes.json";

interface ICliente {
    id: string;
    nome: string;
    dataNascimento: string;
}

export class PopulateClientsUseCase {

    async execute(){

        // const { data } = await axios.get('https://firebasestorage.googleapis.com/v0/b/testemonomytobackend/o/Clientes.json?alt=media&token=2fb4fc55-5299-4dfc-9059-d2ddb4ec67ab');

        let clientes = Array<ICliente>();

        jsonClientes.forEach((cliente) => {

            clientes.push({
                id: Object.values(cliente)[0],
                nome: Object.values(cliente)[1],
                dataNascimento: Object.values(cliente)[2]
            });

        })

        const regex = /[^-\d]/g;

        clientes.forEach((cliente:ICliente) => {

            cliente.dataNascimento = cliente.dataNascimento.replace(regex, '-').replace('--', '-');

            if(!Date.parse(cliente.dataNascimento)){
                let [dia, mes, ano] = cliente.dataNascimento.split('-');
                mes = mes.length === 1 ? `0${mes}` : mes;
                dia = dia.length === 1 ? `0${dia}` : dia;
                const data = [ano, mes, dia].join('-');
                cliente.dataNascimento = data;
            }

            let [ano, mes, dia] = cliente.dataNascimento.split('-');
            
            if(dia.length > 2) {
                let temp = ano;
                ano = dia;
                dia = temp;
            }
            
            mes = mes.length === 1 ? `0${mes}` : mes;
            dia = dia.length === 1 ? `0${dia}` : dia;
            
            cliente.dataNascimento = `${ano}-${mes}-${dia}`;

        })

        async function saveData () {
            await Promise.all(clientes.map(async (item) => {
              await prisma.clients.create({
                data: {
                    nome: item.nome,
                    dataNascimento: new Date(item.dataNascimento)
                }
              })
            }));
        }
        
        await saveData();

        const clientesCadastrados = await prisma.clients.findMany();
    
        return clientesCadastrados;

    }

}