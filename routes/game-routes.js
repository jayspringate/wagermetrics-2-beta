'use strict';

var Sql = require('sequelize');
var sql = new Sql(process.env.DATABASE_URL, {dialect: 'postgres', dialectOptions: {ssl: true}});
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