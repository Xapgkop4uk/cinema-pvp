function drawAdminProfile(){

  $('body').empty();
  $('html').css("background-image","unset");
  $('body').css("background-image","unset");

  var nav = $('<ul class="header2 ul-menu">')
    .append($('<li class="header2_left li-menu">')
      .append($('<span class="header2_admin">')
        .html('Admin')))
    .append($('<li class="li-menu">')
      .append($('<span class="header2_panel">')
        .html('Панель')))
    .append($('<li style="margin-top:15px;"class="dropdown">')
      .append($('<button class="dropbtn">')
        .html('Выбрать категорию')
        .append($('<span class="header2_select__arrow">')))
      .append($('<div class="dropdown-content">')
        .append($('<a onclick="drawFilmRedactor()">')
          .html('Редактировать фильмы'))
        .append($('<a onclick="drawSessionRedactor()">')
          .html('Управлять бронированием'))
        .append($('<a onclick="drawFilmRedactor()">')
          .html('Пользователи'))
        .append($('<a onclick="drawFilmRedactor()">')
          .html('Статистика'))))
    .append($('<div id="menu-login">')
      .append($('<button type="button" class="btn adminMenuButton" onclick="drawMainPage();">')
        .html('Выход')));

  var layout = $('<div class="layout">')
    .append($('<div class="content">')
      .append($('<h2>')
        .html('Краткий отчет об ошибках')));

  $('body').append(nav).append(layout);
};

function drawAdminNav(title){
  $('body > ul > li.dropdown > button').text(title).append('<span class="header2_select__arrow"/>');
}
