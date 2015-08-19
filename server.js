'use strict';

var express = require('express');
var app = express();
var pg = require('pg');

process.env.APP_SECRET = process.env.APP_SECRET || 'unicornrainbow';

// pg.connect(process.env.DATABASE_URL, function(err, client) {
//   if (err) throw err;
//   console.log('Connected to postgres! Getting schemas...');

//   client
//     .query('SELECT table_schema,table_name FROM information_schema.tables;')
//     .on('row', function(row) {
//       console.log(JSON.stringify(row));
//     });
// });

var gameRoutes = express.Router();

app.use(express.static(__dirname + '/build'));

require('./routes/game-routes')(gameRoutes);

app.use('/api', gameRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port ' + (process.env.PORT || 3000));
});