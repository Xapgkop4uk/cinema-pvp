var firsHall = [20,18,16,14,12,10];
var secondHall = [16,16,16,16,16,16];

function drawCinema(first, id){

  $.ajax({
    url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/tickets?where=session%3D'"+id+"'",
    type: "GET",
    success: function(result){
      result.forEach((element)=>{
        $('#'+element.row+'x'+element.seat).removeClass('seat').addClass('bought');
      });
    }
  });

  var cinemaHall = {
      row:first==1? firsHall:secondHall
    };

  cinemaHallMap = '';
  var rows = cinemaHall.row.length;

  $.each(cinemaHall.row, (row, numberOfSeats)=> {
    cinemaHallRow = '';

    for (i = 1; i <= numberOfSeats; i++) {
      cinemaHallRow += '<div id="'+rows+'x'+i+'" class="seat" data-row="' + rows + '" data-seat="' + i + '">&nbsp;'+i+'</div>';
    }

    cinemaHallMap +='<div class="rowNumber">'+rows+' </div>'+ cinemaHallRow + '<div class="passageBetween">&nbsp;</div>';
    rows--;
  });

  $('.zal1').html(cinemaHallMap);

  $('.seat').on('click', function(e) {
    $(e.currentTarget).toggleClass('bay');
  });
}
