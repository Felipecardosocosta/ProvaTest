import { estoqueReository } from "../repository/estoque.repository"

im

class EstoqueServices {
    constructor(estoqueReository) {

        this.repository = estoqueReository

    }


    async cadastrar({ nome, valor, entrada, quantidade, minimo, maximo }) {
        if (
            !nome ||
            valor === undefined ||
            !entrada ||
            quantidade === undefined ||
            minimo === undefined ||
            maximo === undefined
        ) {
            return { mensagem: "Preencha todos os campos!" };
        }


        const [produtoExistente] = await estoqueReository.produtoExiste(nome)


        if (produtoExistente.length > 0) {
            return "Produto ja cadastrado!";
        }

        await estoqueReository.cadastro({ nome, quantidade: Number(quantidade), valor: Number(valor), entrada, minimo: Number(minimo), maximo: Number(maximo) }
        );

        return { mensagem: "Produto cadastrado com sucesso!" };



    }
}



export const estoqueServices = new EstoqueServices(estoqueReository)