const mysql  = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root@dmin',
    database: 'fruitBilling'
});

// let sql = "SELECT * FROM fruitDetails";

// pool.execute(sql, function(err, result){
//     if(err) throw err;
//     console.log(result);
// })

module.exports = pool.promise();