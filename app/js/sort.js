$(function () {
		
	$('#testClick').on('click', function () {
		var property 					= [];
		var selection 				= [];
		var element;
		var filteredGames 		= gameData;
		var winCount 					= 0;
		var lossCount 				= 0;
		var pushCount 				= 0;
		var overCount 				= 0;
		var underCount 				= 0;
		var pushTotalCount 		= 0;

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
    	property[index] = $(this).attr('id');
    	selection[index] = $(this).val();
    });

    for (i=0; i < property.length; i++) {
      function gameFilter(element) {
    		if (element[property[i]] == selection[i]) {
    		return element;
    	}
    }
    filteredGames = filteredGames.filter(gameFilter);
    }

  	function gradeCount() {
  		for (i=0; i < filteredGames.length; i++) {
  			if (filteredGames[i].grade == "win") {
  				winCount++;
  			} else if (filteredGames[i].grade == "loss") {
  				lossCount++;
  			} else {
  				pushCount++;
  			}
  		}
  		
  	};
    gradeCount();

  	function totalGradeCount() {
  		for (i=0; i < filteredGames.length; i++) {
  			if (filteredGames[i].totalGrade == "over") {
  				overCount++;
  			} else if (filteredGames[i].totalGrade == "under") {
  				underCount++;
  			} else {
  				pushTotalCount++;
  			}
  		}
  	};

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
        $table = $('#gamesTable');
        $(filteredGames).each(function () {
              $table += "<tr class='temp'>";
              $table += "<td>" + this.opponent + "</td>";
              $table += "<td>" + this.grade.toUpperCase() + "</td>";
              $table += "<td>" + this.score + "</td>";
              $table += "<td>" + this.odds + "</td>";
              $table += "<td>" + this.court.toUpperCase() + "</td>";
              $table += "</tr>";
         });
            $('#gamesTable').append($table);
            $table.addClass('resultsTable');

  });
});
								
		
