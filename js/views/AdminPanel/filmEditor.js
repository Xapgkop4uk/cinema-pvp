function drawFilmRedactor(section){
  $('body .layout').empty();

  drawAdminNav('Редактор фильмов');

  $('.layout').append($('<div class="filmRedactorMenu">')
    .append($('<li class="list-header">')
      .html('Категории'))
    .append($('<li class="selected">')
      .append($('<span onclick="drawFilmRedactor(0)">')
        .html('Добавить сеанс')))
    .append($('<li class="">')
      .append($('<span onclick="drawFilmRedactor(1)">')
        .html('Удалить сеанс')))
    .append($('<li class="">')
      .append($('<span onclick="drawFilmRedactor(2)">')
        .html('Добавить фильм')))
    .append($('<li class="">')
      .append($('<span onclick="drawFilmRedactor(3)">')
        .html('Редактировать фильм'))));

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
  var selectRoom = $('<select name="room" id="room">')
      .append($('<option value="" disabled">').html('Зал'))
      .append($('<option value="1">').html('1'))
      .append($('<option value="2">').html('2'));

  $.ajax({
    url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/movies",
    type: "GET",
    success: function(result){
      result.forEach((element)=>{
        select.append('<option value="'+element.name+ '">'+element.name+'</option>');
      });

      ReDrawSelect();
    }
  });

  var container = $('<div>').append($('<form class="admin-form">')
      .append($('<div class="group">')
        .append($('<div class="sel">')
          .append(select)))
      .append($('<div class="group">')
        .append($('<div class="sel">')
          .append(selectRoom)))
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
        .append('<div class="file-input">            <label id="click" style="top:40px;">              <i class="material-icons upload" style="position:absolute;font-size: 30px;color: #1a1f23;border: 1px solid black;z-index: 2;  box-shadow: 0 1px 4px rgba(0, 0, 0,0.4);">file_upload</i>              <input id="file_input_file" class="none" type="file" accept=".jpg, .jpeg, .png" name="image">            </label>            <div style="position: absolute;top: -8px;">              <input id="picture" name="movie" required="" readonly="" type="text">              <span class="bar bar-adm"></span>              <label id="label-picture"class="label-text">Постер</label>            </div>          </div>'))
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

function drawRemovingMovie(movie){
  var data={};
  $.ajax({
    url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/movies",
    type: "GET",
    success: function(result){
      var select = $('<div class="sel" style="margin-top:20px; margin-left:40px;">');
      var selectBox = $('<div class="sel__box">');
      var content='';
      var first = true;
      result.forEach((element)=>{
      data[element.name] = element;

        selectBox.append($('<span class="sel__box__options">').html(element.name));
        if(first){
          content = DrawCurrentFilmProperies(element);
          select.append($('<span class="sel__placeholder" data-placeholder="Фильм">'+element.name+'</span>'));
          first = false;
        }
      });
      right.append(select.append(selectBox)).append(content);
      $('.sel').click(function() {
        $(this).toggleClass('active');
      });

      $('.sel__box__options').click(function() {
        var txt = $(this).text();
        var index = $(this).index();
        $('.group').remove();
        $('.content').remove();
        right.append(DrawCurrentFilmProperies(data[txt]));
        $(this).siblings('.sel__box__options').removeClass('selected');
        $(this).addClass('selected');

        var currentSel = $(this).closest('.sel');
        currentSel.children('.sel__placeholder').text(txt);
      });
      console.log(data);
    }
  });

  var right = $('<div class="right">').append('<li class="list-header"><span style="margin:20px;">Редактирование фильмов</div>');

  $('.layout').append(right);
}

function ReDrawSelect(){
    $('.sel').each(function() {
    $(this).children('select').css('display', 'none');
    var current = $(this);
    $(this).find('option').each(function(i) {
      if (i == 0) {
        current.prepend($('<div>', {
          class: current.attr('class').replace(/sel/g, 'sel__box')
        }));

        var placeholder = $(this).text();
        current.prepend($('<span>', {
          class: current.attr('class').replace(/sel/g, 'sel__placeholder'),
          text: placeholder,
          'data-placeholder': placeholder
        }));

        return;
      }

      current.children('div').append($('<span>', {
        class: current.attr('class').replace(/sel/g, 'sel__box__options'),
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

    var currentSel = $(this).closest('.sel');
    currentSel.children('.sel__placeholder').text(txt);
    currentSel.children('select').prop('selectedIndex', index + 1);
  });
}

function DrawCurrentFilmProperies(element){
  var first = true;
  var content;
  var foot;

  for(var key in element)
  {
      if(element[key] == null || typeof(element[key]) == undefined) element[key] = "";
  }

  content = $('<div class="content" style="border:none">')
  .append($('<div style="width:320px; text-align:center;">')
  .html('<img class="poster" src="https://api.backendless.com/F4938450-8412-F432-FF30-7FF933EE1300/9D5C7C66-9B9D-35B7-FF7F-5EB8144C5C00/files/images/'+element.objectId+'.jpg"/>'));

  var container = $('<div>').append($('<form class="admin-form" style="width:unset;">')

      .append($('<div class="group">')
        .append($('<input id="movie-'+element.objectId+'" type="text" name="movie" required value="'+element.name+'">'))
        .append($('<span class="bar bar-adm">'))
        .append($('<label class="label-text">')
          .html('Название')))

      .append($('<div class="group">')
        .append($('<input id="country-'+element.objectId+'" type="text" name="country" required value="'+element.country+'">'))
        .append($('<span class="bar bar-adm">'))
        .append($('<label class="label-text">')
          .html('Страна производства')))

      .append($('<div class="group">')
        .append($('<input id="category-'+element.objectId+'" type="text" name="category" required value="'+element.category+'">'))
        .append($('<span class="bar bar-adm">'))
        .append($('<label class="label-text">')
          .html('Жанр')))

      .append($('<div class="group">')
        .append($('<input id="length-'+element.objectId+'" type="text" name="length" required value="'+element.length+'">'))
        .append($('<span class="bar bar-adm">'))
        .append($('<label class="label-text">')
          .html('Продолжительность')))

      .append($('<div class="group">')
        .append($('<input id="comment-'+element.objectId+'" type="text" name="length" required value="'+element.comment+'">'))
        .append($('<span class="bar bar-adm">'))
        .append($('<label class="label-text">')
          .html('Короткий комментарий'))));

    foot =$('<div class="group">')
      .append($('<textarea id="description-'+element.objectId+'"class="textEditArea" name="description" placeholder="Описание" rows="5" cols="35" >')
        .html(element.description))
      .append($('<div style="height:100px">')
        .append($('<button class="btn btn-admin" style="left:40px;" onclick="deleteMovie(\''+element.objectId+'\')" type="button">')
          .append($('<span>')
            .html('Удалить')))
        .append($('<button class="btn btn-admin" onclick="editMovie(\''+element.objectId+'\')" type="button">')
          .append($('<span>')
            .html('Изменить'))));

    content.append(container);
    content=content.add(foot);

    return content;
}
