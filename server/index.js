var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
// var db = require('../database-mysql');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: false
}))

// app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/songData', function (req, res) {
  console.log(1234356786);
  res.end();
  // db.selectAll(function(err, data) {
  //   if (err) {
  //     res.sendStatus(500);
  //   } else {
  //     var totalRating = 0;
  //     var totalTempo = 0;
  //     var totalSongsWithRatings = 0;
  //     data.forEach(item => {
  //       totalTempo += item.tempo;
  //       if (item.rating) {
  //         totalRating += item.rating
  //         totalSongsWithRatings++;
  //       }
  //     });
  //     var result = {
  //       length: data.length,
  //       totalRating: totalRating,
  //       totalSongsWithRatings: totalSongsWithRatings,
  //       totalTempo: totalTempo
  //     }
  //     res.json(result);
  //   }
  // });
});

app.post('/songData', function(req, res) {
  var rawData = '';
  req.on('data', function(data) {
    rawData += data;
  });
  req.on('end', function(data) {
    var data = JSON.parse(rawData.toString('utf-8'));
    console.log(data);
    db.insertData(data[0], data[1], data[2], data[3])
  });
});


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

