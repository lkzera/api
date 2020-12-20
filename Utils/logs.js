exports.gravaLog = (message) => {
    let messagem = formataMensagem(message);
    return new Promise((resolve, reject) => {

        const fs = require('fs');
        let date = new Date(Date.now()).toLocaleDateString().replace(/[^\w\s]/gi, '_');

        fs.access(`./Logs/${date}.text`, fs.F_OK, (err) => {
            if (err) {
                fs.writeFile(`./Logs/${date}.text`, messagem, (err) => {
                    if (err) {
                        reject(false);
                    } else {
                        resolve(true);
                    }
                })
            }
            else {
                fs.appendFile(`./Logs/${date}.text`, '\n' + messagem, (err) => {
                    if (err) {
                        reject(false);
                    } else {
                        resolve(true);
                    }
                })
            }
        });
    })
}

function formataMensagem(message) {
    let log = new Date(Date.now()).toLocaleString();

    if (message.code || message.errno) {
        log += ' ---> Erro no banco: ' + message.code + ' Número do erro: ' + message.errno;

        if (message.sqlMessage)
            log += ' SqlMessage: ' + message.sqlMessage;

        if (message.sql)
            log += ' SQL: ' + message.sql;
    }
    else{
        log += ' --> Comando executado com sucesso: ' + message.Query
    }
    return log;
    
}