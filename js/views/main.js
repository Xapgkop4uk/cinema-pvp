function drawMainPage(){
  $('body').empty();
  var page = $('<ul class="header1 header">').append('<li class="header2_left"><span class="header2_admin" onclick="drawMainPage()" style="cursor:pointer">Кинотеатр</span></li>    <li><button type="button"');
  var loginMenu = $('<div id="menu-login">');

  if(getCookie('username') == undefined){
    loginMenu = loginMenu.append($('<span class="span-menu" onclick="showLoginModal()">').html('Вход'));
  }

  else{
    loginMenu = loginMenu.append($('<span class="span-menu" onclick="drawAdminProfile()">')
        .html(getCookie('username'))
      .add($('<span class="span-menu" onclick="userLogout()">')
        .html('Выход')));
  }
  page.append(loginMenu);

  $('body').append(page);
};



function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
