import axios from "axios";

interface IClientes {
    id: string;
    nome: string;
    dataNascimento: string;
}

export class PopulateClientsUseCase {

    async execute(){

        const { data } = await axios.get('https://firebasestorage.googleapis.com/v0/b/testemonomytobackend/o/Clientes.json?alt=media&token=2fb4fc55-5299-4dfc-9059-d2ddb4ec67ab');

        let clientes = Array<IClientes>();

        data.forEach((cliente:any) => {

            clientes.push({
                id: Object.values(cliente)[0] as string,
                nome: Object.values(cliente)[1] as string,
                dataNascimento: Object.values(cliente)[2] as string
            });

        })

        const regex = /[^-\d]/g;

        clientes.forEach((cliente:IClientes) => {

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
            
            console.log(cliente.dataNascimento);

        })

    
        return clientes;

    }

}