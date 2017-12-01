function showModalInfo(message){
  $('body').append($('<div id="infoModal" style="z-index:100" class="infoModal">')
    .append($('<div class="modal-content" style="color:black;">')
      .append('<i id="close" class="material-icons upload" style="right: 5px; top:5px;bottom:unset">close</i>')
        .append($('<p>')
          .html(message))));
  $('#close').click(function(){
    $('#infoModal').remove();
  })
}

function showLoginInfo(message){
  $('body').append($('<div id="infoModal" style="z-index:100" class="infoModal">')
    .append($('<div class="info-login-modal-content">')
      .append('<i id="close" class="material-icons upload" style="right: 5px; top:5px;bottom:unset;color:white;">close</i>')
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

function showCardInput(price, id){
  $('body').append($('<div id="CardModal" style="z-index:100" class="CardModal" style="color:black;">')
    .append($('<div class="CardModal-content">')
      .append('<i id="close" class="material-icons upload" style="right: 5px; top:5px;bottom:unset;color:rgb(100,118,127);border:unset; box-shadow:unset;">close</i>')
        .append($('<p class="card-header">')
          .html('Оплата'))));
  $('.CardModal-content').append($('<div>').append($('<form class="card-form">')
      .append($('<div style="display:inline-flex">')
        .append($('<img src="src/images/maestro.png">'))
        .append($('<img src="src/images/mastercard.png">'))
        .append($('<img src="src/images/sberbank.png">'))
        .append($('<img src="src/images/visa.png">')))
      .append($('<div class="group" style="display:grid;margin-bottom:10px;">')
        .append($('<span class="price" style="text-align: center;font-size:30px;">')
        .html(price+'.00 &#8381;')))
    .append($('<div class="group">')
      .append($('<input type="text" class="card-input" name="NameOnCard" required>'))
      .append($('<span class="bar bar-card">'))
      .append($('<label class="label-text">')
        .html('Имя на карте')))
    .append($('<div class="group">')
      .append($('<input type="text" class="card-input" name="number" required>'))
      .append($('<span class="bar bar-card">'))
      .append($('<label class="label-text">')
        .html('Номер карты')))
      .append($('<div style="display:inline-flex">').append($('<div class="group">')
        .append($('<input type="text" class="card-input" name="date" style="width:60px" required>'))
        .append($('<span class="bar bar-card" style="width:65px;">'))
        .append($('<label class="label-text">')
          .html('MM/YY'))).append($('<div class="group" style="margin-left:20px;">')
        .append($('<input type="text" class="card-input" name="NameOnCard" style="width:120px" required>'))
        .append($('<span class="bar bar-card" style="width:125px;">'))
        .append($('<label class="label-text">')
        .html('CVC/CVV'))))
      .append($('<button class="btn btn-admin" onclick="  $(\'#CardModal\').remove(); buyTickets(\''+id+'\')" type="button" style="margin:auto; display:block; position:unset;">')
        .append($('<span>')
          .html('Купить')))));

  $('#close').click(function(){
    $('#CardModal').remove();
  });
}

function showLoginModal(){
  $('body').append($('<div id="LoginModal" style="z-index:100" class="infoModal">')
    .append($('<div class="modal-content" style="max-width: 400px; padding:0px;">')
      .append($('<div id="Content">'))));
    LoginForm(true);


  $('.modal-content').click(function(e){
    e.stopPropagation();
  });

  $('#LoginModal').on('click', function (e) {
    $('#LoginModal').remove();
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
  $('#form-login > #sign-up').css("background"," linear-gradient(to right bottom, rgba(105, 5, 1, 0.8), rgba(0, 0, 0, 0)");
  $('#form-login > #registration').css("background","unset");
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
      .append($('<button class="panel-btn" type="button" onclick="userLogin(this.form)">')
        .append($('<span>')
          .html('Войти')));
  $('#form-login > .container').append(container);
};

function userRegistrationForm(){

  $('#form-login > .container').empty();
  $('#form-login > #registration').css("background"," linear-gradient(to left bottom, rgba(105, 5, 1, 0.8), rgba(0, 0, 0, 0)");
  $('#form-login > #sign-up').css("background","unset");
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
      .append($('<button class="panel-btn" type="button" onclick="userRegistration(this.form);alert(document.cookie);">')
        .append($('<span>')
          .html('Регистрация')));

  $('#form-login > .container').append(container);
};
