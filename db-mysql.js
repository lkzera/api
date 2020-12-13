var mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'nodejs'
});

exports.pool = pool;

exports.QuerySelect = (table,colunas,condition,callback) =>{

    let cols = colunas.length > 0 ? colunas : '*';
    if(!condition){
        condition = 'where 1 = 1'
    }

    pool.getConnection((err,conn)=>{
        if(err) return callback(err,null);

        conn.query('select ' + cols + ' from ' + table + ' '  + condition,(error,rows)=>{
            conn.release();

            if(error) return callback(error,null);

            callback(null,rows);
        })
    })

}

exports.Query = (query, callback) =>{
    pool.getConnection((err,conn)=>{
        if(err) return callback(err,null,true);

        conn.query(query,(error,rows)=>{
            conn.release();

            if(error) return callback(error,null,true);

            callback(null,rows,false);
        })
    })
}