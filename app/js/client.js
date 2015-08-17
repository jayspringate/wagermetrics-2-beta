'use strict';

var gamesList = document.getElementById('gamesList');

var request = require('request');

request
  .get('/api/games')
  .end(function(err, res) {
    if (err) return console.log(err);
    var games = JSON.parse(res.text);

    games.forEach(function(game) {
      var gameEl = document.createElement('li');
      gameEl.innerHTML = game.name;
      gamesList.appendChild(gameEl);

    });
  });