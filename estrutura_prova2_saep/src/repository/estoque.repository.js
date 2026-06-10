import pool from "../config/db.js";

class EstoqueReository {
    constructor(pool) {

        this.pool = pool

    }

    async buscarProdutoPornome(nome) {
        return [produtoExistente] = await this.pool.execute(
            "SELECT * FROM produto WHERE nome = ?",
            [nome])

    }
    async produtoExiste(nome) {
        return [produtoExistente] = await this.pool.execute(
            "SELECT id_produto FROM produto WHERE nome = ?",
            [nome])

    }
    async buscarProdutos() {
        return [produtoExistente] = await this.pool.execute(
            "SELECT * FROM produto ")

    }

    async cadastro({ nome, valor, entrada, quantidade, minimo, maximo }) {

        return await this.pool.execute(
            `INSERT INTO produto
      (nome, quantidade_estoque, valor_unitario, data_cadastro, minimo_estoque, maximo_estoque)
      VALUES (?, ?, ?, ?, ?, ?)`,
            [nome, quantidade, valor, entrada, minimo, maximo]
        );
    }


    async listarSaida() {

        return [rows] = await this.pool.execute(
            `SELECT p.nome, m.quantidade, m.datetime_movimentacao, u.nome AS "responsavel"
       FROM movimentacao m
       INNER JOIN produto p ON p.id_produto = m.id_produto
       INNER JOIN usuario u ON u.id_usuario = m.id_usuario
       WHERE m.tipo = 'SAIDA'
       ORDER BY m.datetime_movimentacao DESC`
        )
    }

    async buscarQuahtidade(conn, id_produto) {

        return await conn.execute("SELECT quantidade_estoque FROM produto WHERE id_produto = ? FOR UPDATE",
            [id_produto])

    }


    async inserirMovimentacao(conn, { tipo, quantidade, id_produto }) {

        return await conn.execute(
            "INSERT INTO movimentacao (tipo, quantidade, id_produto, datetime_movimentacao) VALUES (?, ?, ?, NOW())",
            [tipo, quantidade, id_produto]
        );


    }


    async inserirEstoque(conn, { quantidadeTotal, id_produto }) {

        return await conn.execute(
            "UPDATE produto SET quantidade_estoque = ? WHERE id_produto = ?",
            [quantidadeTotal, id_produto]
        );
    }

    async deletarProduto(id_produto) {

        return await this.pool.execute("DELETE FROM produto WHERE id_produto = ?", [
            id_produto
        ]);
    }

    async deletarMovimentacao(id) {

        return await this.pool.execute(
            "DELETE FROM movimentacao WHERE id_movimentacao = ?",
            [id]
        );
    }




}

export const estoqueReository = new EstoqueReository(pool)