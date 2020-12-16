const { response } = require('express');
const dbMysql = require('../db-mysql');
const jwt = require('jsonwebtoken');


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

    const infoLogin = req.body;
    if (!infoLogin.email || !infoLogin.senha) {
        return res.status(400).send({
            Response: [],
            Message: 'Não é possível mandar os campos email ou senha nulos!',
            Sucess: false
        });
    }
    try {

        const result = await dbMysql.Query(`SELECT * FROM slv_usuarios WHERE email = '${infoLogin.email}' and senha = '${infoLogin.senha}'`);
        
        if (result[0].nome.length > 0) {

            let token = jwt.sign({
                id_usuario: result[0].id_usuario,
                email: result[0].email
            },
                process.env.JWT,
                {
                    expiresIn: "1h"
                });

                const update = await dbMysql.Query(`UPDATE SLV_USUARIOS SET token = '${token}' WHERE id_usuario = ${result[0].id_usuario}`);

            return res.status(200).send({
                Response: [{
                    Token: token,
                    id_usuario: result[0].id_usuario,
                    email: result[0].email
                }],
                Message: 'Usuário logado com sucesso',
                Sucess: true
            });
        }
        else {
            return res.status(400).send({
                Response: [],
                Message: 'Usuário ou senha inválidos',
                Sucess: false
            });
        }

    } catch (error) {
        res.status(400).send({
            Response: [],
            Message: error,
            Sucess: false
        });
    }

};
// exports.post = async (req, res, next) => {

//     const users = req.body;
//     let cont = 0;
//     let msgError = [];
//     for (usuario of users) {
//         try {
//             const result = await dbMysql.Query("INSERT INTO SLV_USUARIOS(nome,senha,email,dthr,ativo) VALUES('" + usuario.nome + "','" + usuario.senha + "','" + usuario.email + "', sysdate(), 1)");
//             cont++;
//         } catch (error) {
//             msgError.push(error);
//         }
//     };

//     if (cont === 0) {
//         res.status(400).send({
//             response: [],
//             Message: msgError,
//             Sucess: false
//         })
//     } else {
//         res.status(200).send({
//             Sesponse: [],
//             Message: cont + ' usuários inseridos com sucesso!',
//             Sucess: true
//         })
//     };
// }


exports.delete = async (req, res, next) => {

    try {
        const result = await dbMysql.Query('delete from slv_usuarios where id_usuario = ' + req.params.id);
        if (result.affectedRows > 0) {
            res.status(200).send({
                Response: [],
                Message: result.affectedRows + ' Usuário deletado com sucesso !',
                Sucess: true
            });
        }
        else {
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