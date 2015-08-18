'use strict';

var request = require('superagent');
require("script!./jquery.js");
require('./../css/style.css');
require('./../css/base.css');
require('./../css/modules.css');
require('./../css/reset.css');
require('./../css/layout1.css');
require('./../css/animate.min.css');
require('file!./../img/basketball.jpg');
require('file!./../img/bk.gif');
require('file!./../img/bos.gif');
require('file!./../img/cha.gif');
require('file!./../img/chi.gif');
require('file!./../img/cle.gif');
require('file!./../img/dal.gif');
require('file!./../img/den.gif');
require('file!./../img/det.gif');
require('file!./../img/gs.gif');
require('file!./../img/hou.gif');
require('file!./../img/ind.gif');
require('file!./../img/lac.gif');
require('file!./../img/lal.gif');
require('file!./../img/mem.gif');
require('file!./../img/mia.gif');
require('file!./../img/mil.gif');
require('file!./../img/min.gif');
require('file!./../img/nba.gif');
require('file!./../img/no.gif');
require('file!./../img/ny.gif');
require('file!./../img/okc.gif');
require('file!./../img/orl.gif');
require('file!./../img/phi.gif');
require('file!./../img/phx.gif');
require('file!./../img/por.gif');
require('file!./../img/sa.gif');
require('file!./../img/sac.gif');
require('file!./../img/tor.gif');
require('file!./../img/uta.gif');
require('file!./../img/was.gif');

var gamesList = document.getElementById('gamesList');

var games = [];

request
  .get('/api/games')
  .end(function(err, res) {
    if (err) return console.log(err);
    games = JSON.parse(res.text);
  });

$(function () {

  $('#testClick').on('click', function () {
    var property          = [];
    var selection         = [];
    var element;
    var filteredGames     = games;   //this used to be gameData from gameDataArray
    var winCount          = 0;
    var lossCount         = 0;
    var pushCount         = 0;
    var overCount         = 0;
    var underCount        = 0;
    var pushTotalCount    = 0;

//remove classes and empty elements to reset click
    $(".selected").removeClass("selected");
    $('.temp').empty();
    if ($('#team').val() != 'blank') {
      $('#teamLogo').removeClass();
    } else {
      $('#teamLogo').addClass('nba').addClass('flipInX').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
          function() {
            $(this).removeClass('flipInX');
          });
    }

    $("select").filter(function(index) {
        return $($("select")[index]).val()!="blank";
    }).addClass("selected");

    $(".selected").each(function(index) {
      property.push($(this).attr('id'));
      selection.push($(this).val());
    });

    property.forEach(function (propElement, propIndex, propArr) {
     filteredGames = filteredGames.filter(function (filtElement, filtIndex, filtArr) {
        if (filtElement[propElement] == selection[propIndex]) {
          return filtElement;
        }
      });
    });

    filteredGames = filteredGames.sort(function(a, b) {
      a = new Date(a.date);
      b = new Date(b.date);
      if (a < b) {
        return 1;
      } else if (a > b) {
        return -1;
      } else {
        return 0;
      }
    });

    function gradeCount() {
      for (var i=0; i < filteredGames.length; i++) {
        if (filteredGames[i].atsGrade == "W") {
          winCount++;
        } else if (filteredGames[i].atsGrade == "L") {
          lossCount++;
        } else {
          pushCount++;
        }
      }
    }

    gradeCount();

    function totalGradeCount() {
      for (var i=0; i < filteredGames.length; i++) {
        if (filteredGames[i].totalGrade == "O") {
          overCount++;
        } else if (filteredGames[i].totalGrade == "U") {
          underCount++;
        } else {
          pushTotalCount++;
        }
      }
    }

    totalGradeCount();

    var tableBuild = function () {
      var $tableHead,
          percentWin,
          percentOver,
          percentUnder;

      var $homeTeam = $('.selected:eq(0) option:selected').val();
      var $awayTeam = $('.selected:eq(1) option:selected').val();

      var winPercentage = function () {
        var numberCheck = Math.round(100 * (winCount/(winCount + lossCount) * 10)) /10;
        if (isNaN(numberCheck)) {
          percentWin = "N/A";
        } else {
          percentWin = numberCheck + "%";
        }
      };

      var overPercentage = function () {
        var overCheck = Math.round(100 * (overCount/(overCount + underCount) * 10)) /10;
        if (isNaN(overCheck)) {
          percentOver = "N/A";
        } else {
          percentOver = overCheck + "%";
        }
      };

      var underPercentage = function () {
        var underCheck = Math.round(100 * (underCount/(underCount + overCount) * 10)) /10;
        if (isNaN(underCheck)) {
          percentUnder = "N/A";
        } else {
          percentUnder = underCheck + "%";
        }
      };

      winPercentage();
      overPercentage();
      underPercentage();

      $tableHead = $('.selected option:selected').text();
      $('#tableInfo').text($tableHead);
      $('#record').text(winCount + "-" + lossCount + "-" + pushCount);
      $('#winPercent').text(percentWin);
      $('#overCount').text(overCount);
      $('#underCount').text(underCount);
      $("#overPercent").text(percentOver);
      $('#underPercent').text(percentUnder);
      $('#pushCount').text(pushTotalCount);

      $('#teamLogo').addClass($homeTeam).addClass('flipInX').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
          function() {
            $(this).removeClass('flipInX');
          });

    };
    tableBuild();
        var $table = $('#gamesTable');
        $(filteredGames).each(function () {
          $table += "<tr class='temp'>";
          $table += "<td>" + this.date.split('T')[0] + "</td>";
          $table += "<td>" + this.team + "</td>";
          $table += "<td>" + this.teamCourt.toUpperCase() + "</td>";
          $table += "<td>" + this.opponent + "</td>";
          $table += "<td>" + this.teamScore + '-' + this.opponentScore + "</td>";
          $table += "<td>" + this.suGrade + "</td>";
          $table += "<td>" + this.spreadClose + ' (' + this.spreadOpen + ')' + "</td>";
          $table += "<td>" + this.atsGrade + "</td>";
          $table += "<td>" + this.totalClose + ' (' + this.totalOpen + ')' + "</td>";
          $table += "<td>" + this.totalGrade + "</td>";
          $table += "</tr>";
         });
            $('#gamesTable').append($table);
            $('#gamesTable').addClass('resultsTable');

  });
});

