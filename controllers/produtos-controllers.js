const { response } = require('express');
const dbMysql = require('../db-mysql');
const jwt = require('jsonwebtoken');

//Get all products
exports.get = async (req, res, next) => {
    try {
        const result = await dbMysql.Query('select * from slv_produtos order by descricao asc');
        return res.status(200).send({
            Response: result,
            Message: '',
            Success: true
        })
    } catch (error) {
        return res.status(400).send({
            Response: [],
            Message: error,
            Success: false
        })
    }
}

//get product of id
exports.getId = async (req, res, next) => {
    try {
        const result = await dbMysql.Query(`select * from slv_produtos where codigo = '${req.params.codigo}'`);

        return res.status(200).send({
            Response: result,
            Message: '',
            Success: true
        });
    } catch (error) {
        return res.status(400).send({
            Response: [],
            Message: errror,
            Success: false
        });
    }
}

//Update product of id
exports.putId = async (req, res, next) => {

    if (!req.params.codigo) {
        return res.status(400).send({
            Responde: [],
            Message: 'É necessário informar um código de produto!',
            Success: false
        });
    }

    try {
        const result = await dbMysql.Query(`update slv_produtos
         set descricao = '${req.body.descricao}',  
         peso = ${req.body.peso}, 
         cubagem = ${req.body.cubagem},
         unidade_medida = '${req.body.unidade_medida}',
         unidade_medida_emb = '${req.body.unidade_medida_emb}',
         controla_validade = ${req.body.controla_validade},
         tipo_controle_lote = ${req.body.tipo_controle_lote},
         preco_unit = ${req.body.preco_unit},
         ativo = ${req.body.ativo}
         where codigo = '${req.params.codigo}'
         `);

        if (result.affectedRows > 0) {
            return res.status(200).send({
                Response: [],
                Message: 'Produto ' + req.params.codigo + ' atualizado com sucesso!',
                Success: true
            });
        }
        else {
            return res.status(400).send({
                Response: [],
                Message: 'Produto ' + req.params.codigo + ' não encontrado!!',
                Success: false
            });
        }

    } catch (error) {
        return res.status(400).send({
            Response: [],
            Message: error,
            Success: false
        });
    }
}

//Delete product of Id
exports.delete = async (req, res, next) => {
    try {
        const result = await dbMysql.Query(`delete from slv_produtos where codigo = '${req.params.codigo}'`);

        if (result.affectedRows > 0) {
            return res.status(200).send({
                Response: [],
                Message: 'Produto ' + req.params.codigo + ' deletado com sucesso!!',
                Success: true
            })
        }
        else {
            return res.status(400).send({
                Response: [],
                Message: 'Produto não encontrado: ' + req.params.codigo,
                Success: false
            })
        }

    } catch (error) {
        return res.status(400).send({
            Response: [],
            Message: error,
            Success: false
        })
    }
}

//Insert product
exports.post = async (req, res, next) => {

    const product = req.body;

    if (!product)
        return res.status(400).send({
            Response: [],
            Message: 'Json body está em um formato inválido',
            Success: false
        });

    try {
        const result = await dbMysql.Query(`insert into slv_produtos values (
            '${product.codigo}',
            '${product.descricao}',
            ${product.peso},
            ${product.cubagem},
            '${product.unidade_medida}',
            '${product.unidade_medida_emb}',
            ${product.controla_validade},
            ${product.tipo_controle_lote},
            ${product.preco_unit},
            sysdate(),
            ${product.ativo}
        )`);

        return res.status(200).send({
            Response: [],
            Message: 'Produto ' + product.codigo + ' inserido com sucesso!!',
            Success: true
        })


    } catch (error) {
        return res.status(400).send({
            Response: [],
            Message: error,
            Success: false
        })
    }

}