'use strict';

var Sql = require('sequelize');
var sql = new Sql('wagermetrics_dev', 'wagermetrics_dev', 'prince', {
  dialect: 'postgres'
});
var Game = require('../models/Game');
var bodyparser = require('body-parser');

module.exports = function(router) {

  router.use(bodyparser.json());

  router.get('/games', function(req, res) {
    sql.sync()
    .then(function() {
      Game.all()
      .then(function(data) {
        res.json(data);
      })
      .error(function(err) {
        console.log(err);
        res.status(500).json({msg: 'server error'});
      });
    });
  });
};