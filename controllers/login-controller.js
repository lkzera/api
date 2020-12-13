const { response } = require('express');
const dbMysql = require('../db-mysql');

exports.get = (req, res, next) => {
    dbMysql.QuerySelect('slv_usuarios', ['id_usuario', 'nome', 'email', 'ativo'], null, (err, rows) => {
        if (err) return res.status(500).send({
            error: err
        })

        res.status(200).send({
            data: rows
        })
    })
}

exports.getId = async (req, res, next) => {

    try {
        const result = await dbMysql.Query('select * from slv_usuarios where id_usuario = ' + req.params.id);
        return res.status(200).send({
            Response: result,
            Message: '',
            Sucess: true
        });
    } catch (error) {
        res.status(400).send({
            Response: [],
            Message: error,
            Sucess: false
        });
    };
}

exports.post = async (req, res, next) => {

    const users = req.body;
    let cont = 0;
    let msgError = [];
    for (usuario of users) {
        try {
            const result = await dbMysql.Query("INSERT INTO SLV_USUARIOS(nome,senha,email,dthr,ativo) VALUES('" + usuario.nome + "','" + usuario.senha + "','" + usuario.email + "', sysdate(), 1)");
            cont++;
        } catch (error) {
            msgError.push(error);
        }
    };

    if (cont === 0) {
        res.status(400).send({
            response: [],
            Message: msgError,
            Sucess: false
        })
    } else {
        res.status(200).send({
            Sesponse: [],
            Message: cont + ' usuários inseridos com sucesso!',
            Sucess: true
        })
    };
}


exports.delete = async (req, res, next) => {

    try {
        const result = await dbMysql.Query('delete from slv_usuarios where id_usuario = ' + req.params.id);
        if(result.affectedRows > 0){
            res.status(200).send({
                Response: [],
                Message: result.affectedRows + ' Usuário deletado com sucesso !',
                Sucess: true
            });
        }
        else{
            res.status(200).send({
                Response: [],
                Message: 'usuário não encontrado no sistema',
                Sucess: false
            });
        }
    } catch (error) {
        res.status(400).send({
            Response: [],
            Message: error,
            Sucess: false
        });
    };
}