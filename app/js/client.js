'use strict';

var playerList = document.getElementById('playerList');

var request = require('request');

request
  .get('/api/players')
  .end(function(err, res) {
    if (err) return console.log(err);
    var players = JSON.parse(res.text);

    players.forEach(function(player) {
      var playerEl = document.createElement('li');
      playerEl.innerHTML = player.name;
      playerList.appendChild(playerEl);

    });
  });