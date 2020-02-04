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

connection.query('SELECT * FROM fintech.user', function (error, results, fields) {
  if (error) throw error;
  sqlResult = results;
  for(var i = 0; i < results.length; i ++){
      var member = results[i];
      console.log(member.email)
  }
});
 
console.log(sqlResult);

connection.end();
