var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'data'
});

var keys = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

for (var i = 0; i < keys.length; i++) {
  connection.query(`INSERT INTO song_keys (key_name) VALUES ("${keys[i]}")`);
}

connection.query('SELECT * from song_keys', function(err, results) {
  console.log(err, results);
});