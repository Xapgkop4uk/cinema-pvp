function drawFilmRedactor(section = 0){
  $('body .layout').empty();

  drawAdminNav('Редактор фильмов');

  $('.layout').append('<div class="filmRedactorMenu"><li class="list-header">Категории</li><li class="selected"> <span onclick="drawFilmRedactor(0)">Добавить сеанс</span></li><li class=""><span onclick="drawFilmRedactor(1)">Удалить сеанс</span></li><li class="">        <span onclick="drawFilmRedactor(2)">Добавить фильм</span></li><li class"">   <span onclick="drawFilmRedactor(3)">Редактировать фильм</span></li></div>');

  $('li.selected').removeClass('selected');
  $('.filmRedactorMenu >li').eq(section+1).addClass("selected");
  switch (section) {
    case 1:
      drawRemovingSession();
      break;
    case 2:
      drawAddingMovie();
      break;
    case 3:
      drawRemovingMovie();
      break;
    default:
      drawAddingSession();
      break;
  }
};

function drawRemovingSession(){
  $.ajax({
    url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/session",
    type: "GET",
    success: function(result){
      var table =$('<table>')
        .append($('<tr>')
          .append($('<th>')
            .html('Фильм'))
          .append($('<th>')
            .html('Дата'))
          .append($('<th>')
            .html('Время'))
          .append($('<th>')
            .html('Стоимость'))
          .append($('<th>')
            .html('<button type="button" class="btn" onclick="deleteSession()"> <span class="labelTableButton">Удалить Все</span></button>')));
      result.forEach((element)=>{
        var date = new Date(element.time);
        var row = $('<tr id="'+element.objectId+'">')
          .append($('<td>')
            .html(element.movie))
          .append($('<td>')
            .html((addZero(date.getMonth()+1))+'/'+addZero(date.getDate())+'/'+addZero(date.getFullYear().toString().substr(-2))))
          .append($('<td>')
            .html(addZero(date.getHours())+':'+addZero(date.getMinutes())))
          .append($('<td>')
            .html(element.price))
          .append($('<td>')
            .html('<button type="button" class="btn" onclick="deleteSession('+"'"+element.objectId+"'" +')"><span class="labelTableButton">Удалить</span></button>'));
        table.append(row);
        })
      right = right.append(table);
    }
  });



  var right = $('<div class="right">').append('<li class="list-header"><span style="margin:20px;">Удаление сеансов</div>');
  $('.layout').append(right);
}

function drawAddingSession(){

  $('.right').remove();

  var right = $('<div class="right">').append('<div><li style="  padding: 13px 0px;" class="list-header"><span style="margin:20px;">Добавление сеанса</span><p class="tooltip-admin" style="left: 320px;" text="Для ввода нескольких значений используйте запятую"><b class="info-sign">ⓘ</b></p> </div></div>');

  var select = $('<select name="movie" id="movie">')
      .append($('<option value="" disabled>').html('Фильм'));

  $.ajax({
    url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/movies",
    type: "GET",
    success: function(result){
      result.forEach((element)=>{
        select.append('<option value="'+element.name+ '">'+element.name+'</option>');
      });

      $('.sel').each(function() {
        $(this).children('select').css('display', 'none');
        var $current = $(this);
        $(this).find('option').each(function(i) {
          if (i == 0) {
            $current.prepend($('<div>', {
              class: $current.attr('class').replace(/sel/g, 'sel__box')
            }));

            var placeholder = $(this).text();
            $current.prepend($('<span>', {
              class: $current.attr('class').replace(/sel/g, 'sel__placeholder'),
              text: placeholder,
              'data-placeholder': placeholder
            }));

            return;
          }

          $current.children('div').append($('<span>', {
            class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
            text: $(this).text()
          }));
        });
      });

      // Toggling the `.active` state on the `.sel`.
      $('.sel').click(function() {
        $(this).toggleClass('active');
      });

      // Toggling the `.selected` state on the options.
      $('.sel__box__options').click(function() {
        var txt = $(this).text();
        var index = $(this).index();

        $(this).siblings('.sel__box__options').removeClass('selected');
        $(this).addClass('selected');

        var $currentSel = $(this).closest('.sel');
        $currentSel.children('.sel__placeholder').text(txt);
        $currentSel.children('select').prop('selectedIndex', index + 1);
      });
    }
  });

  var container = $('<div>').append($('<form class="admin-form">')
      .append($('<div class="group">')
        .append($('<div class="sel">')
          .append(select)))
      .append($('<div class="group">')
        .append($('<input type="text" name="date" required>'))
        .append($('<span class="bar bar-adm">'))
        .append($('<label class="label-text">')
          .html('Дата')))
      .append($('<div class="group">')
        .append($('<input type="text" name="time" required>'))
        .append($('<span class="bar bar-adm">'))
        .append($('<label class="label-text">')
          .html('Время')))
      .append($('<div class="group">')
        .append($('<input type="text" name="price" required>'))
        .append($('<span class="bar bar-adm">'))
        .append($('<label class="label-text">')
          .html('Цена'))
      .append($('<button class="btn btn-admin" onclick="addSession(this.form)" type="button">')
        .append($('<span>')
          .html('Добавить')))));
    right.append(container);

    $('.layout').append(right);
};

function drawAddingMovie(){
  $('.right').remove();

  var right = $('<div class="right">').append('<li class="list-header"><span style="margin:20px;">Добавление фильма</div>');
  $('.layout').append(right);

  var container = $('<div>').append($('<form class="admin-form">')
      .append($('<div class="group">')
        .append($('<input type="text" name="name" required>'))
        .append($('<span class="bar bar-adm">'))
        .append($('<label class="label-text">')
          .html('Название')))
      .append($('<div class="group">')
        .append('<div class="file-input">            <label id="click">              <i class="material-icons upload" style="position:absolute;font-size: 30px;color: #1a1f23;border: 1px solid black;z-index: 2;  box-shadow: 0 1px 4px rgba(0, 0, 0,0.4);">file_upload</i>              <input id="file_input_file" class="none" type="file" accept=".jpg, .jpeg, .png" name="image">            </label>            <div style="position: absolute;top: -8px;">              <input id="picture" name="movie" required="" readonly="" type="text">              <span class="bar bar-adm"></span>              <label id="label-picture"class="label-text">Постер</label>            </div>          </div>'))
      .append($('<div class="group">')
        .append($('<textarea name="comment" placeholder="Описание" rows="5" cols="35">'))
      .append($('<button class="btn btn-admin" onclick="addMovie(this.form)" type="button">')
        .append($('<span>')
          .html('Добавить')))));
    right.append(container);

    $('#file_input_file').change(()=>{
      $('#picture').val($('#file_input_file').val());
      $('#label-picture').css('top','-15px');
      $('#label-picture').css('font-size','14px');
    });


}

function drawRemovingMovie(){

  $.ajax({
    url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/movies",
    type: "GET",
    success: function(result){
      var table =$('<table>')
        .append($('<tr>')
          .append($('<th>')
            .html('Постер'))
          .append($('<th>')
            .html('Название'))
          .append($('<th>')
            .html('Комментарий'))
          .append($('<th>')
            .html('Оценка'))
          .append($('<th>')
            .html('Оценок'))
          .append($('<th>')
            .html('Просмотров'))
          .append($('<th>')));
      result.forEach((element)=>{
        var date = new Date(element.time);
        var row = $('<tr id="'+element.objectId+'">')
          .append($('<td class="change" id="change-poster">')
            .html('<img class="poster" src="https://api.backendless.com/F4938450-8412-F432-FF30-7FF933EE1300/9D5C7C66-9B9D-35B7-FF7F-5EB8144C5C00/files/images/'+element.objectId+'.jpg"/>'))
          .append($('<td class="change" onclick="showEditModal(this)" id="change-movie-name">')
            .html(element.name))
          .append($('<td class="change"  onclick="showEditModal(this)" id="change-movie-comment">')
            .html(element.comment))
          .append($('<td>')
            .html(element.mark))
          .append($('<td>')
            .html(element.marks))
          .append($('<td>')
            .html(element.views))
          .append($('<td>')
            .html('<button type="button" class="btn" onclick="deleteMovie('+"'"+element.objectId+"'" +')"><span class="labelTableButton">Удалить</span></button>')
            .append('<button type="button" class="btn" onclick="editMovie('+"'"+element.objectId+"'" +')"><span class="labelTableButton">Применить</span></button>'));
        table.append(row);
      });
      right = right.append(table);
    }
  });
  var right = $('<div class="right">').append('<li class="list-header"><span style="margin:20px;">Редактирование фильмов</div>');

  $('.layout').append(right);
}
