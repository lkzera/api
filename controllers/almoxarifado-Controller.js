const dbMysql = require('../db-mysql');
const jwt = require('jsonwebtoken');

exports.get = async (req, res, next) => {
    try {
        const result = await dbMysql.Query('select * from slv_almoxarifados');

        if (result) {
            res.status(200).send({
                Response: result,
                Message: '',
                Success: false
            });
        } else {
            res.status(400).send({
                Response: [],
                Message: 'Não almoxarifado pode ser encontrado',
                Success: false

            })
        }
    } catch (error) {
        res.status(400).send({
            Response: [],
            Message: error,
            Success: false
        });
    }
}

exports.getId = async (req, res, next) => {
    try {

        let filter;

        if (req.query.descricao) {
            filter = 'where descricao = ' + `'${req.query.descricao}'`;
        }
        else {
            filter = `where cod_almox = ${req.query.id}`;
        }

        const result = await dbMysql.Query("select * from slv_almoxarifados " + filter);

        if (result) {
            return res.status(200).send({
                Response: result,
                Message: '',
                Success: false
            });
        } else {
            return res.status(400).send({
                Response: [],
                Message: 'Não almoxarifado pode ser encontrado',
                Success: false

            })
        }
    } catch (error) {
        res.status(400).send({
            Response: [],
            Message: error,
            Success: false
        });
    }
}

exports.put = async (req, res, next) => {

    try {
        if (!req.body) {
            return res.status(400).send({
                Response: [],
                Message: 'É necessário preencher o body',
                Success: false
            });
        }

        const result = await dbMysql.Query(`update from slv_almoxarifados 
        set cod_almox = '${req.body.codigo}',
         descricao = '${req.body.descricao}'
        where cod_almox = '${req.params.id}'
         and not exists (select 1 from slv_almoxarifados where cod_almox = '${req.body.codigo}')`);

        if (result.affectedRows = 0) {
            return res.status(400).send({
                Response: [],
                Message: 'Não foi possível realizar atualização do cadastro',
                Success: false
            });
        }
        else{
            return res.status(200).send({
                Response: [],
                Message: 'Cadastro atualizado com sucesso',
                Success: true
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