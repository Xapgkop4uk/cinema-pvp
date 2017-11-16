function drawAdminProfile(){

  $('body').empty();
  $('body').css("background-image","unset");
  $('body').css("background-color","#2f343a");

  var nav = $('<ul class="header2">').html('<li class="header2_left"><span class="header2_admin">Admin</span></li>    <li style><span class="header2_panel">Панель</span></li>    <li style="margin-top:15px;"class="dropdown">      <button class="dropbtn">Выбрать категорию<span class="header2_select__arrow"/></button>      <div class="dropdown-content">        <a href="#" onclick="drawFilmRedactor()">Редактировать фильмы</a>        <a href="#">Управлять бронированием</a>        <a href="#">Пользователи</a>   <a href="#">Статистика</a>     </div>    </li> <li class="header2_right"><button type="button" class="btn adminMenuButton">Выход</button></li>');
var layout = $('<div class="layout">').append($('<div class="content">').append($('<h2>').html('Краткий отчет об ошибках')));

    $('body').append(nav).append(layout);
};

function drawAdminNav(title){
  $('body > ul > li.dropdown > button').text(title).append('<span class="header2_select__arrow"/>');
}
