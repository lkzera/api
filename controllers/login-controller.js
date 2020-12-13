const { response } = require('express');
const dbMysql = require('../db-mysql');

exports.get = (req, res, next) => {
    dbMysql.QuerySelect('slv_usuarios', ['nome'], (err, rows) => {
        if (err) return res.status(500).send({
            error: err
        })

        res.status(200).send({
            data: rows
        })
    })
}

exports.getId = (req, res, next) => {
    dbMysql.Query('select * from slv_usuarios where id = ' + req.params.id, (erroMsg, result, erro) => {
        if (erro) return res.status(400).send({
            error: erroMsg
        })

        if (result.length == 0) {
            result = {
                Message: 'Usuário: ' + req.params.id + ' não encontrado'
            }
        }

        res.status(200).send({
            data: result
        })
    })
}

exports.post = (req, res, next) => {

    if (!req.body) {
        return res.status(400).send({
            Message: 'Não foi possível realizar nenhuma ação'
        })
    }
    let cont = 0;
    let msgError = '';
    for (var usuario in req.body) {
        dbMysql.Query("INSERT INTO SLV_USUARIOS(nome,senha,email) VALUES('" + usuario.nome + "','" + usuario.senha + "','" + usuario.email + "')", (msgErro, result, erro) => {
            res.status(400).send({
                data: [],
                Message: 'Erro ao inserir usuários, ' + msgErro
            });
        })
    }
    if (cont === 0) {
        return res.status(400).send({
            data: [],
            Message: 'Erro ao inserir usuários, ' + msgError
        });
    }
    res.status(200).send({
        data: [],
        Message: cont + ' usuários inseridos com sucesso!'
    });
}