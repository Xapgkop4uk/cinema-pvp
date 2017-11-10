function drawMainPage(){
  var page = $('<nav>')
  .append($('<div id="menu">')
    .append($('<span class="span-menu">')
      .html('Фильмы'))
    .append($('<span class="span-menu">')
      .html('Билеты')))
  var loginMenu = $('<div id="menu-login">');

  if(getCookie('username') == undefined){
    loginMenu = loginMenu.append($('<span class="span-menu" onclick="LoginForm(true)">').html('Вход'));
  }

  else{
    loginMenu = loginMenu.append($('<span class="span-menu" onclick="drawAdminProfile()">')
        .html(getCookie('username'))
      .add($('<span class="span-menu" onclick="userLogout()">')
        .html('Выход')));
  }
  page.append(loginMenu);

  $('body').append(page).append($('<div id="Content">'));
};

function LoginForm(login){
  $('#Content').empty();

  //header
  var mainElement = $('<div id="form-login">')
    .append($('<div id="sign-up" onclick="userSignUpForm()">')
      .append($('<span class="span-select-login">')
        .html('Вход')))
    .append($('<div id="registration" onclick="userRegistrationForm()">')
      .append($('<span class="span-select-registration">')
        .html('Регистрация')));

  //content of sign-up
  var container = $('<div class="container">');

  $('#Content').append(mainElement.append(container));
  if(login) userSignUpForm();
  else      userRegistrationForm();
}
function userSignUpForm(){
  $('#form-login > .container').empty();
  $('#form-login > #sign-up').css("background-color","rgb(34, 92, 90, 0.8)");
  $('#form-login > #registration').css("background-color","rgb(0, 0, 0, 0.0)");
  var container = $('<form>')
      .append($('<div class="group">')
        .append($('<input type="text" name="login" required>'))
        .append($('<span class="bar">'))
        .append($('<label>')
          .html('Логин')))
      .append($('<div class="group">')
        .append($('<input type="password" name="password" required>'))
        .append($('<span class="bar">'))
        .append($('<label>')
          .html('Пароль')))
      .append($('<button class="btn btn-submit" type="button" onclick="userLogin(this.form)">')
        .append($('<span>')
          .html('Войти')));
  $('#form-login > .container').append(container);
};

function userRegistrationForm(){

  $('#form-login > .container').empty();
  $('#form-login > #registration').css("background-color","rgb(34, 92, 90, 0.8)");
  $('#form-login > #sign-up').css("background-color","rgb(0, 0, 0, 0)");
  var container = $('<form>')
      .append($('<div class="group">')
        .append($('<input type="text" name="email" required>'))
        .append($('<span class="bar">'))
        .append($('<label>')
          .html('E-mail')))
      .append($('<div class="group">')
        .append($('<input type="text" name="login" required>'))
        .append($('<span class="bar">'))
        .append($('<label>')
          .html('Придумайте логин')))
      .append($('<div class="group">')
        .append($('<input type="password" name="password" required>'))
        .append($('<span class="bar">'))
        .append($('<label>')
          .html('Придумайте пароль')))
      .append($('<div class="group">')
        .append($('<input type="password" name="password_rep" required>'))
        .append($('<span class="bar">'))
        .append($('<label>')
          .html('Повторите пароль')))
      .append($('<button class="btn btn-submit" type="button" onclick="userRegistration(this.form);alert(document.cookie);">')
        .append($('<span>')
          .html('Регистрация')));

  $('#form-login > .container').append(container);
};

function drawAdminProfile(){

  $('body').empty();

  var nav = $('<div class="header2">')
    .append($('<div class="header2_cell header2_left">')
      .append($('<span class="header2_admin">')
        .html('Admin'))
      .append($('<span class="header2_panel">')
        .html('Панель')))
    .append($('<div class="header2_cell header2_middle">')
      .append($('<select class="header2_select">')
        .append($('<option class="selectOption">')
          .html('Редактирование фильмотеки'))
        .append($('<option class="selectOption">')
          .html('Управление бронированием'))
        .append($('<option class="selectOption">')
          .html('Просмотр активности пользователей'))
        .append($('<option class="selectOption">')
          .html('Статистика'))))
    .append($('<div class="header2_cell header2_right">')
      .append($('<span class="header2_logout">')
        .html('Выход')));

    $('body').append(nav);
};
