var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'mysql-295b-ncalifornia.ceo9kcyisxyy.us-west-1.rds.amazonaws.com',
  user     : 'rdsmysql295b',
  port 	   :  4396,	
  password : 'Welcome$jsu',
  database : 'mysql295bdb'
});

connection.connect();

//connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
connection.query('SELECT * from employees', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows);
});

connection.end();

