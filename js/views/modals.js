function showModalInfo(message){
  $('body').append($('<div id="infoModal" style="z-index:100" class="infoModal">')
    .append($('<div class="modal-content">')
      .append('<i id="close" class="material-icons upload" style="right: 5px; top:5px;bottom:unset">close</i>')
        .append($('<p>')
          .html(message))));
  $('#close').click(function(){
    $('#infoModal').remove();
  })
}

function showEditModal(element){
  $('body').append($('<div id="EditModal" style="z-index:100" class="infoModal">')
    .append($('<div class="modal-content">')
      .append($('<textarea id="text-area-editor" style="width: 100%;  max-width: 100%;        min-width: 100%;margin-bottom:30px" autofocus>')
      .html(element.innerText))
      .append('<i id="close" class="material-icons upload" style="left: 20px;">close</i>')
      .append('<i id="accept" class="material-icons upload" style="right: 10px;">check</i>')));
  $('#close').click(function(){
    $('#EditModal').remove();
  });
  $('#accept').click(function(){
    element.innerText = $('#text-area-editor').val();
    $('#EditModal').remove();
  });
}

function showLoginModal(){
  $('body').append($('<div id="LoginModal" style="z-index:100" class="infoModal">')
    .append($('<div class="modal-content" style="max-width: 400px; padding:0px;">')
      .append($('<div id="Content">'))));
    LoginForm(true);
  $('#close').click(function(){
    $('#EditModal').remove();
  });
  $('#accept').click(function(){
    element.innerText = $('#text-area-editor').val();
    $('#EditModal').remove();
  });
}

function LoginForm(login){
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
  $('#form-login > #sign-up').css("background-color","#12005e");
  $('#form-login > #registration').css("background-color","rgb(0, 0, 0, 0.0)");
  var container = $('<form>')
      .append($('<div class="group">')
        .append($('<input class="input-signup" type="text" name="login" required>'))
        .append($('<span class="bar">'))
        .append($('<label class="label-text">')
          .html('Логин')))
      .append($('<div class="group">')
        .append($('<input class="input-signup" type="password" name="password" required>'))
        .append($('<span class="bar">'))
        .append($('<label class="label-text">')
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
        .append($('<label class="label-text">')
          .html('E-mail')))
      .append($('<div class="group">')
        .append($('<input type="text" name="login" required>'))
        .append($('<span class="bar">'))
        .append($('<label class="label-text">')
          .html('Придумайте логин')))
      .append($('<div class="group">')
        .append($('<input type="password" name="password" required>'))
        .append($('<span class="bar">'))
        .append($('<label class="label-text">')
          .html('Придумайте пароль')))
      .append($('<div class="group">')
        .append($('<input type="password" name="password_rep" required>'))
        .append($('<span class="bar">'))
        .append($('<label class="label-text">')
          .html('Повторите пароль')))
      .append($('<button class="btn btn-submit" type="button" onclick="userRegistration(this.form);alert(document.cookie);">')
        .append($('<span>')
          .html('Регистрация')));

  $('#form-login > .container').append(container);
};
