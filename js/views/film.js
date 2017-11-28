function aboutFilm(id){
  $.ajax({
    url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/movies/"+id,
    type: "GET",
    success: function(result){
        console.log(result);
        $('body').append($('<div id="CinemaModal" style="z-index:100;" class="infoModal">')
          .append($('<div class="modal-content" style="padding:0px; margin:0 auto;">')
            .append($('<div id="Content" style="display:inline-flex;">')
              .append($('<div style="width:320px; text-align:center;">')
                .html('<img class="poster" src="https://api.backendless.com/F4938450-8412-F432-FF30-7FF933EE1300/9D5C7C66-9B9D-35B7-FF7F-5EB8144C5C00/files/images/'+result.objectId+'.jpg"/>'))
              .append($('<div>')
                .append($('<div class="group" style="display:inline-flex; margin-bottom:0">')
                  .append($('<p class="property" >')
                    .html('Название:'))
                  .append($('<p class="prop-value">')
                    .html(result.name)))
                .append($('<div class="group" style="display:inline-flex; margin-bottom:0">')
                  .append($('<p class="property" >')
                    .html('Жанр:'))
                  .append($('<p class="prop-value">')
                    .html(result.name)))))));
      }
  });
}

function drawSessionsSelection(movie){
  $.ajax({
    url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/session?where=time%3E"+parseInt(new Date().getTime())+"%20AND%20movie%3D'"+movie+"'&sortBy=time",
    type: "GET",
    success: function(result){
      console.log(result);
      var titleDate='';
      $('body').append($('<div id="CinemaModal" style="z-index:100;" class="infoModal">')
        .append($('<div class="modal-content" style="padding:0px; margin:0 auto;">')
          .append($('<div id="Content">'))));
      var first = true;
      if(result.length==0)
      {
        $('#Content')
        .append($('<h4>').html("В данный момент сеансы для данного фильма отсутствуют."))
        .append($('<h4>').html("Пожалуйста, попробуйте позднее."));
      }
      else {
        result.forEach((element)=>{
          console.log(element.room);
          if(first){
            var date = new Date(element.time);
            $('#Content').append($('<h3>').html("Ближайший сеанс: "+addZero(date.getDate())+" "+getMonth(date.getMonth())+" "+addZero(date.getHours())+':'+addZero(date.getMinutes())))
            .append($('<div class="cinemaHall zal1">'));
            drawCinema(element.room, element.objectId);
            $('#Content')
            .append($('<h4>').html("Цена билета: "+element.price+" &#8381;"))
            .append($('<button class="panel-btn" onclick="buyTickets(\''+element.objectId+'\')">').html('Купить билеты'));
            first = false;
          $('#Content')
          .append($('<h4>').html("Другие сеансы"));
          }
          else{
              date = new Date(element.time);
              if(titleDate != addZero(date.getDate())+" "+getMonth(date.getMonth())){
                titleDate = addZero(date.getDate())+" "+getMonth(date.getMonth());
                $('#Content')
                .append($('<div>')
                  .append($('<div class="session-date">')
                    .append($('<span class="date-title">')
                      .html(titleDate)))
                    .append($('<div class="sessions-list">')));
              }
              $('.sessions-list').last()
              .append($('<button class="session-btn"  onclick="drawSelectedSession(\''+element.movie+'\',\''+element.objectId+'\')">').html(addZero(date.getHours())+':'+addZero(date.getMinutes())));

          }
        });
      }
      $('.modal-content').click(function(e){
        e.stopPropagation();
      });

      $('#CinemaModal').on('click', function (e) {
        $('#CinemaModal').remove();
      });
    }
  })
}

function drawSelectedSession(movie,id){
  $('#Content').empty();

  $.ajax({
    url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/session/"+id,
    type: "GET",
      success: function(element){
        var date = new Date(element.time);
        $('#Content').append($('<h3>').html("Выбранный сеанс: "+addZero(date.getDate())+" "+getMonth(date.getMonth())+" "+addZero(date.getHours())+':'+addZero(date.getMinutes())))
        .append($('<div class="cinemaHall zal1">'));
        drawCinema(element.room, element.objectId);
        $('#Content')
        .append($('<h4>').html("Цена билета: "+element.price+" &#8381;"))
        .append($('<button class="panel-btn" onclick="buyTickets(\''+element.objectId+'\')">').html('Купить билеты'));
        $('#Content')
        .append($('<h4>').html("Другие сеансы"));


        $.ajax({
          url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/session?where=time%3E"+parseInt(new Date().getTime())+"%20AND%20movie%3D'"+movie+"'&sortBy=time",
          type: "GET",
          success: function(result){
            console.log(result);
            var titleDate='';
              result.forEach((element)=>{
                console.log(element.room);
                if(element.objectId!= id){
                    date = new Date(element.time);
                    if(titleDate != addZero(date.getDate())+" "+getMonth(date.getMonth())){
                      titleDate = addZero(date.getDate())+" "+getMonth(date.getMonth());
                      $('#Content')
                      .append($('<div>')
                        .append($('<div class="session-date">')
                          .append($('<span class="date-title">')
                            .html(titleDate)))
                          .append($('<div class="sessions-list">')));
                    }
                    $('.sessions-list').last()
                    .append($('<button class="session-btn"  onclick="drawSelectedSession(\''+element.movie+'\',\''+element.objectId+'\')">').html(addZero(date.getHours())+':'+addZero(date.getMinutes())));
                  }
              });
            $('.modal-content').click(function(e){
              e.stopPropagation();
            });

            $('#CinemaModal').on('click', function (e) {
              $('#CinemaModal').remove();
            });
          }
        });
  }
  });
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
