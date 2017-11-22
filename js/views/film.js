function aboutFilm(id){
  $.ajax({
    url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/movies/"+id,
    type: "GET",
    success: function(result){
        console.log(result);
        $('body').append($('<div id="LoginModal" style="z-index:100" class="infoModal">')
          .append($('<div class="modal-content" style="max-width: 400px; padding:0px;">')
            .append($('<div id="Content">'))));
      }
  });
}

function drawSessionsSelection(movie){
  $.ajax({
    url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/session?where=time%3E"+parseInt(new Date().getTime())+"%20AND%20movie%3D'"+movie+"'",
    type: "GET",
    success: function(result){
      console.log(result);
      $('body').append($('<div id="CinemaModal" style="z-index:100" class="infoModal">')
        .append($('<div class="modal-content" style="padding:0px;">')
          .append($('<div id="Content">'))));
        var first = true;
      result.forEach((element)=>{
        if(first){
          var date = new Date(element.time);
          $('#Content').append($('<h3>').html("Ближайший сеанс: "+addZero(date.getDate())+" "+getMonth(date.getMonth())+" "+addZero(date.getHours())+':'+addZero(date.getMinutes())))
          .append($('<div class="cinemaHall zal1">'));
          drawCinema(first.room == 1, element.objectId);
          $('#Content')
          .append($('<h4>').html("Цена билета: "+element.price+" &#8381;"))
          .append($('<button class="panel-btn" onclick="buyTickets(\''+element.objectId+'\')">').html('Купить билеты'));
          first = false;
        $('#Content')
        .append($('<h4>').html("Другие сеансы"));
        }

      });
    }
  })
}

function buyTickets(id)
{
    $.each($('.seat.bay'), function(key, item) {
      var json = {
        row:$(item).data().row,
        seat:$(item).data().seat,
        session:id
      };

      $.ajax({
        url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/tickets",
        contentType:"application/json",
        type: "POST",
        dataType: "json",
        data: JSON.stringify(json),
        success: function(d){
          console.log("Билеты куплены:"+d);
          $(item).removeClass('seat bay').addClass('bought');
          $(item).click(false);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          var Message = ("Status: " + textStatus+".Error: " + errorThrown);
          console.log(Message);
        }
      });
    });
}
