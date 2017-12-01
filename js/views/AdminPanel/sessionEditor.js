function drawSessionRedactor(section){
  $('body .layout').empty();

  drawAdminNav('Редактор сеансов');

  $('.layout').append($('<div class="filmRedactorMenu">')
    .append($('<li class="list-header">')
      .html('Категории'))
    .append($('<li class="selected">')
      .append($('<span onclick="drawSessionRedactor(0)">')
        .html('Отмена бронирования'))));

  $('li.selected').removeClass('selected');
  $('.filmRedactorMenu >li').eq(section+1).addClass("selected");
  switch (section) {
    default:
      drawRemovingTickets();
      break;
  }
};

function drawRemovingTickets(){

  var sessions ={};

  $('.right').remove();

   var right = $('<div class="right">')
    .append($('<div>')
      .append($('<li class="list-header">')
        .append($('<span style="margin:20px;">')
          .html('Отмена бронирования'))))
    .append($('<h3 style="color:black">')
      .html('Поиск сеанса'));

  $.ajax({
    url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/movies",
    type: "GET",
    success: function(result){
      var select = $('<div class="sel sel1" style="margin:20px;">');
      var selectBox = $('<div class="sel__box">');
      var content='';
      var first = true;
      result.forEach((element)=>{

        selectBox.append($('<span class="sel__box__options sel-film">').html(element.name));
        if(first){
          select.append($('<span class="sel__placeholder" data-placeholder="Фильм">Фильм</span>'));
          first = false;
        }
      });
      right.append(select.append(selectBox));

      $('.sel1').click(function() {
        $(this).toggleClass('active');
      });

      $('.sel-film').click(function() {
        var txt = $(this).text();
        var index = $(this).index();
        $(this).siblings('.sel__box__options').removeClass('selected');
        $(this).addClass('selected');

        var currentSel = $(this).closest('.sel1');
        currentSel.children('.sel__placeholder').text(txt);

        $.ajax({
          url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/session?where=time%3E"+parseInt(new Date().getTime()+18000)+"%20AND%20movie%3D'"+txt+"'&sortBy=time",
          type: "GET",
          success: function(result){
            $('.sel2').remove();
            var select2 = $('<div class="sel sel2" style="margin:20px;">');
            var selectBox2 = $('<div class="sel__box">');
            var titleDate='';
            var content='';

            select2.append($('<span class="sel__placeholder" data-placeholder="Дата">Дата</span>'));

            result.forEach((element)=>{
              var date = new Date(element.time);
              if(titleDate != addZero(date.getDate())+" "+getMonth(date.getMonth())){
                titleDate = addZero(date.getDate())+" "+getMonth(date.getMonth());
                selectBox2.append($('<span class="sel__box__options sel-session">').html(titleDate));
                sessions[titleDate]=[];
              }
              var titleTime = addZero(date.getHours())+':'+addZero(date.getMinutes());
              sessions[titleDate][titleTime] = element;

            });

            console.log(sessions);
            right.append(select2.append(selectBox2));

            $('.sel2').click(function() {
              $(this).toggleClass('active');
            });

            $('.sel-session').click(function() {
              var txt = $(this).text();
              var index = $(this).index();
              $(this).siblings('.sel__box__options').removeClass('selected');
              $(this).addClass('selected');

              console.log(txt);
              var currentSel = $(this).closest('.sel2');
              currentSel.children('.sel__placeholder').text(txt);
            });
          }
      });
    });
  }
});

  $('.layout').append(right);
}
