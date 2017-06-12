// var mysql = require('mysql');

// var pool = mysql.createPool({
//     connectionLimit: 100, //important
//     host: 'us-cdbr-iron-east-04.cleardb.net',
//     user: 'b7bc811003ac32',
//     password: '199107c9',
//     database: 'ad_34455fa6477c646',
//     debug: false
// });

// function getConnection(callback) {
//     pool.getConnection(function(err, connection) {
//         if (err) {
//             connection.release();
//             console.log({ "code": 100, "status": "Error in connection database" });
//             return;
//         }

//         console.log('connected as id ' + connection.threadId);

//         callback(connection);

//         connection.on('error', function(err) {
//             console.log({ "code": 100, "status": "Error in connection database" });
//             return;
//         });
//     });
// }

// function query(sql, persist, callback) {
//     getConnection(function(connection){
//         connection.query(sql, persist, function(err, rows) {
//             connection.release();
//             if (!err) {
//                 callback(rows);
//             }
//         });
//     });
// }

// exports.query = query;
