var request = require('superagent');
require('./requirements.js');

var gamesList = document.getElementById('gamesList');

var games = [];

request
  .get('/api/games')
  .end(function(err, res) {
    if (err) return console.log(err);
    games = JSON.parse(res.text);
  });

$(function() {

  $('#testClick').on('click', function() {
    var property = [];
    var selection = [];
    var element;
    var filteredGames = games;
    var winCount = 0;
    var lossCount = 0;
    var pushCount = 0;
    var overCount = 0;
    var underCount = 0;
    var pushTotalCount = 0;
    var roiSpreadNet = 0;
    var roiOverNet = 0;
    var roiUnderNet = 0;
    var roiTotalWagered = 0;

    //remove classes and empty elements to reset click
    $(".selected").removeClass("selected");
    $("td[id*='Roi']").removeClass();
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
      return $($("select")[index]).val() != "blank";
    }).addClass("selected");

    $(".selected").each(function(index) {
      property.push($(this).attr('id'));
      selection.push($(this).val());
    });

    property.forEach(function(propElement, propIndex, propArr) {
      filteredGames = filteredGames.filter(function(filtElement, filtIndex, filtArr) {
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
      for (var i = 0; i < filteredGames.length; i++) {
        if (filteredGames[i].atsGrade == "W") {
          winCount++;
          roiSpreadNet++;
          roiTotalWagered += 1.1;
        } else if (filteredGames[i].atsGrade == "L") {
          lossCount++;
          roiSpreadNet -= 1.1;
          roiTotalWagered += 1.1;
        } else {
          pushCount++;
          roiTotalWagered += 1.1;
        }
      }
    }

    gradeCount();

    function totalGradeCount() {
      for (var i = 0; i < filteredGames.length; i++) {
        if (filteredGames[i].totalGrade == "O") {
          overCount++;
          roiOverNet++;
          roiUnderNet -= 1.1;
        } else if (filteredGames[i].totalGrade == "U") {
          underCount++;
          roiUnderNet++;
          roiOverNet -= 1.1;
        } else {
          pushTotalCount++;
        }
      }
    }

    totalGradeCount();

    var tableBuild = function() {
      var $tableHead,
        percentWin,
        percentOver,
        percentUnder;

      var spreadRoi = {varName: 'spreadRoi'};
      var overRoi = {varName: 'overRoi'};
      var underRoi = {varName: 'underRoi'};

      var $team = $('.selected:eq(0) option:selected').val();

      function runCalcs(aCount, bCount, cCount) {

        function calc() {
          return Math.round(100 * (aCount / (bCount + cCount) * 10)) / 10;
        }

        if (isNaN(calc(aCount, bCount, cCount))) {
          return "N/A";
        } else {
          return calc(aCount, bCount, cCount) + "%";
        }
      }

      percentWin = runCalcs(winCount, winCount, lossCount);
      percentOver = runCalcs(overCount, overCount, underCount);
      percentUnder = runCalcs(underCount, underCount, overCount);
      spreadRoi.val = runCalcs(roiSpreadNet, roiTotalWagered, 0);
      overRoi.val = runCalcs(roiOverNet, roiTotalWagered, 0);
      underRoi.val = runCalcs(roiUnderNet, roiTotalWagered, 0);

      function roiColor(field) {
        if (parseFloat(field.val.split('%')[0]) > 0) {
          $('#' + field.varName).addClass('green');
        } else if (parseFloat(field.val.split('%')[0]) < 0) {
          $('#' + field.varName).addClass('red');
        }
      }

      roiColor(spreadRoi);
      roiColor(overRoi);
      roiColor(underRoi);

      $tableHead = $('.selected option:selected').text();
      $('#tableInfo').text($tableHead);
      $('#record').text(winCount + "-" + lossCount + "-" + pushCount);
      $('#winPercent').text(percentWin);
      $('#spreadRoi').text(spreadRoi.val);
      $('#overCount').text(overCount);
      $('#underCount').text(underCount);
      $('#pushCount').text(pushTotalCount);
      $("#overPercent").text(percentOver);
      $('#underPercent').text(percentUnder);
      $('#overRoi').text(overRoi.val);
      $('#underRoi').text(underRoi.val);

      $('#teamLogo').addClass($team).addClass('flipInX').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
        function() {
          $(this).removeClass('flipInX');
        });

    };

    tableBuild();

    var $table = $('#gamesTable');
    $(filteredGames).each(function(index, value) {
      if (index === 100) {
        return false;
      }

      $table += "<tr class='temp'>";
      $table += "<td>" + this.date.split('T')[0] + "</td>";
      $table += "<td>" + this.team + "</td>";
      $table += "<td>" + this.teamCourt.toUpperCase() + "</td>";
      $table += "<td>" + this.opponent + "</td>";
      $table += "<td>" + this.teamScore + '-' + this.opponentScore + "</td>";
      $table += "<td>" + this.suGrade + "</td>";
      $table += "<td>" + this.spreadClose + ' (' + this.spreadOpen + ')' + "</td>";
      $table += "<td>" + this.spreadMove + "</td>";
      $table += "<td>" + this.atsGrade + "</td>";
      $table += "<td>" + this.totalClose + ' (' + this.totalOpen + ')' + "</td>";
      $table += "<td>" + this.totalMove + "</td>";
      $table += "<td>" + this.totalGrade + "</td>";
      $table += "</tr>";
    });
    $('#gamesTable').append($table);
    $('#gamesTable').addClass('resultsTable');

  });
});
