var mysql = require('mysql');
const erros = require('./routes/erros');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'preto1234',
  database        : 'projetoLkz'
});

exports.pool = pool;

exports.QuerySelect = (table,colunas,condition,callback) =>{

    let cols = colunas.length > 0 ? colunas : '*';
    if(!condition){
        condition = 'where 1 = 1'
    }

    pool.getConnection((err,conn)=>{
        if(err) return callback(err,null);

        conn.query('select ' + cols + ' from ' + table + ' '  + condition, (error,rows) => {
            conn.release();

            if(error) return callback(error,null);

            callback(null,rows);
        })
    })

}

exports.Query = (query) =>{
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,conn)=>{
            if(err){
                reject(err)
            }
            else{
                conn.query(query,(error,rows)=>{
                    conn.release();
                    if(error){
                        reject(error);
                    } 
                    else{
                        resolve([rows,rows.affectedRows]);
                    }
                })
            }
        })
    })
}
