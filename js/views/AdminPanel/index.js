function drawAdminProfile(){

  $('body').empty();
  $('html').css("background-image","unset");
  $('body').css("background-image","unset");

  var nav = $('<ul class="header2 ul-menu">').html('<li class="header2_left li-menu"><span class="header2_admin">Admin</span></li>    <li class="li-menu"><span class="header2_panel">Панель</span></li>    <li style="margin-top:15px;"class="dropdown">      <button class="dropbtn">Выбрать категорию<span class="header2_select__arrow"/></button>      <div class="dropdown-content">        <a href="#" onclick="drawFilmRedactor()">Редактировать фильмы</a>        <a href="#">Управлять бронированием</a>        <a href="#">Пользователи</a>   <a href="#">Статистика</a>     </div>    </li> <li class="header2_right li-menu"><button type="button" class="btn adminMenuButton">Выход</button></li>');
var layout = $('<div class="layout">').append($('<div class="content">').append($('<h2>').html('Краткий отчет об ошибках')));

    $('body').append(nav).append(layout);
};

function drawAdminNav(title){
  $('body > ul > li.dropdown > button').text(title).append('<span class="header2_select__arrow"/>');
}
