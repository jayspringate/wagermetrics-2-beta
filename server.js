'use strict';

var express = require('express');
var app = express();

// process.env.APP_SECRET = process.env.APP_SECRET || 'unicornrainbow'; //need to watch video about this

var gameRoutes = express.Router();

app.use(express.static(__dirname + '/build'));

require('./routes/game-routes')(gameRoutes);

app.use('/api', gameRoutes);

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port ' + (process.env.PORT || 3000));
});