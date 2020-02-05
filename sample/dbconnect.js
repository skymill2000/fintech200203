var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'q1w2e3r4',
  database : 'fintech',
  port : "3306"
});
 
connection.connect();

var sqlResult;

connection.query('', function (error, results, fields) {
});
 
console.log(sqlResult);

connection.end();
