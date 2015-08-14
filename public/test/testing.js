  
$(function () {
$table = $('#resultTable');
    $('#click').on('click', function () {
        $(gameData).each(function () {
            $table += "<tr>";
            $table += "<td>" + this.teams + "</td>";
            $table += "<td>" + this.odds + "</td>";
            $table += "<td>" + this.score + "</td>";
            $table += "</tr>";
         });
            $('body').append($table);
     });
        
 });

