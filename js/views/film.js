var chooseStars = 0;
function aboutFilm(id){
  $.ajax({
    url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/movies/"+id,
    type: "GET",
    success: function(result){
      $.ajax({
        url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/comments?where=movie%3D'"+id+"'",
        type: "GET",
        success: function(result){
          result.forEach((element)=>{
            $('.comments-list').append($('<div class="comment-body">')
              .append($('<span>').html(element.username))
              .append($('<span>').html(element.mark+"/10"))
              .append($('<div class="red-line">'))
              .append($('<div>').html(element.comment)));
          })
        }
      });


      console.log(result);
      $('body').append($('<div id="CinemaModal" style="z-index:100;" class="infoModal">')
        .append($('<div class="modal-content" style="padding:0px; margin:20px auto; border:1px solid #5d0505">')
          .append($('<div id="Сontent" style="display:inline-flex; margin:20px">')
            .append($('<div style="width:320px; text-align:center;">')
              .html('<img class="poster" style="box-shadow: 0px 8px 16px 2px #5d0505;" src="https://api.backendless.com/F4938450-8412-F432-FF30-7FF933EE1300/9D5C7C66-9B9D-35B7-FF7F-5EB8144C5C00/files/images/'+result.objectId+'.jpg"/>'))
            .append($('<div>')
              .append($('<div class="group about-group">')
                .append($('<p class="property" >')
                  .html('Название: ')
                .append($('<t class="prop-value">')
                  .html(result.name))))
              .append($('<div class="group about-group">')
                .append($('<p class="property" >')
                  .html('Жанр: ')
                .append($('<t class="prop-value">')
                  .html(result.category))))
              .append($('<div class="group about-group">')
                .append($('<p class="property" >')
                  .html('Страна: ')
                .append($('<t class="prop-value">')
                  .html(result.country))))
              .append($('<div class="group about-group">')
                .append($('<p class="property" >')
                  .html('Продолжительность: ')
                .append($('<t class="prop-value">')
                  .html(result.length))))
              .append($('<div class="group about-group">')
                .append($('<p class="property" >')
                  .html('Просмотров: ')
                .append($('<t class="prop-value">')
                  .html(result.views))))
              .append($('<div class="group about-group">')
                .append($('<p class="property" >')
                  .html('Рейтинг: ')
                .append($('<t class="prop-value" id="mark">')
                  .html(result.mark+"/10"))))))));
        $('.modal-content').append($('<div style="margin:20px;">')
          .html(result.description))
        .append($('<div class="red-line">'));

        if(getCookie('username') == undefined){
          $('.modal-content').append($('<div class="comment-box">')
            .html('Для оценки и комментирования необходима аутентификация.'));
        }
        else {
          var stars = $('<div class="star-selection">');
          stars.append($('<span class="title">').html('Оценить: '))

          var commentBox = $('<div class="group">')
            .append($('<textarea id="comment" "class="textEditArea" name="description" placeholder="Комментарий" style="background:rgba(93,5,5,0.5); display:unset;width:unset;font-size:unset;max-width:unset;min-width:unset;min-width:460px;max-width:460px; color:white;" rows="5" cols="60" >'))
            .append($('<div style="height:50px;">').append($('<button class=" session-btn" style="position:absolute;right:40px;" onclick="postComment(\''+result.objectId+'\')" type="button">')
              .append($('<span>')
                .html('Опубликовать'))));

          for(var i =0; i < 10;i++){
            stars.append($('<i class="material-icons star" id="'+i+'-star">').html('star_border'));
          }
          $('.modal-content')
          .append($('<h3>').html('Добавить комментарий'))
          .append($('<div class="comment-box">')
            .append(stars)
            .append(commentBox));

        }

        $('.modal-content')
        .append($('<div class="red-line">'))
        .append($('<h3>').html('Отзывы'));
        .append($('<div class="comments-list">'));




        $('.star').click((e)=>{
          chooseStars = e.target.id[0];
          $('.star').each((index, element)=>{
              if(chooseStars >= element.id[0]){
                $(element).html('star');
              }
              else{
                $(element).html('star_border');
              }
          });
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

function postComment(movieId){
  var json={
    movie: movieId,
    userId:getCookie('userId'),
    username:getCookie('username'),
    mark:chooseStars,
    comment:$('#comment').val()
  }

  $.ajax({
    url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/comments",
    contentType:"application/json",
    type: "POST",
    dataType: "json",
    data: JSON.stringify(json),
    success: function(d){
      $.ajax({
        url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/comments?where=movie%3D'"+movieId+"'",
        type: "GET",
        success: function(result){
          var count = 0;
          var mark = 0;
          result.forEach((element)=>{
            mark += parseInt(element.mark);
            count++;
          });
          value = parseInt((mark/count).toFixed(2));
          console.log(value);
          var updateMark ={
            mark: value,
            marks: count
          }

          $.ajax({
            url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/movies/"+movieId,
            contentType:"application/json",
            type: "PUT",
            dataType: "json",
            data: JSON.stringify(updateMark),
            success: function(d){
              $('#mark').html(value);
            }
          });
        }
      });
    }
  });
}
