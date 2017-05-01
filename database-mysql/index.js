var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : env('DB_HOST', 'us-cdbr-iron-east-03.cleardb.net'),
  user     : env('DB_USERNAME', 'bda8b33bc1ad11'),
  password : env('DB_PASSWORD', 'cbbe9291'),
  database : env('DB_DATABASE', 'heroku_49b867008747083')
});

var selectAll = function(callback) {
  connection.query('SELECT * FROM songs', function(err, results, fields) {
    if (err) {
      throw err;
    }
    callback(null, results);
  });
};

var insertData = function(rating, tempo, key_id, average_changes_per_measure) {
  console.log('the rating', rating);
  if (rating < 10 && rating > 0) {
    connection.query(`INSERT INTO songs (rating, tempo, key_id, average_changes_per_measure) VALUES ("${rating}", "${tempo}", "${key_id}", "${average_changes_per_measure}")`, function(err, results) {
      if (err) throw err;
    });
  } else {
    connection.query(`INSERT INTO songs (tempo, key_id, average_changes_per_measure) VALUES ("${tempo}", "${key_id}", "${average_changes_per_measure}")`, function(err, results) {
      if (err) throw err;
    });
  }
}

module.exports.selectAll = selectAll;
module.exports.insertData = insertData;