
exports.gravaLog = (message) => {
    let messagem = formataMensagem(message);
    return new Promise((resolve, reject) => {

        const fs = require('fs');
        let date = new Date(Date.now()).toLocaleDateString().replace(/[^\w\s]/gi,'_');

        fs.access(`./Logs/${date}.text`, fs.F_OK, (err) => {
            if (err){
                fs.writeFile(`./Logs/${date}.text`,messagem,(err) =>{
                    if(err){
                        reject(false);
                    }else{
                        resolve(true);
                    }
                })
            }
            else {
                fs.appendFile(`./Logs/${date}.text`,'\n' + messagem,(err) =>{
                    if(err){
                        reject(false);
                    }else{
                        resolve(true);
                    }
                })
            }
        });
    })
}

function formataMensagem(message){
    let log = new Date(Date.now()).toLocaleString();
    return log + ' -> ' + message.toString();
}