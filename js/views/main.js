function drawMainPage(){
  var panel = $('<div class="preview">');
  $('body').empty();
  $.ajax({
    url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/movies",
    type: "GET",
    success: function(result){
      result.forEach((element)=>{
      });
    }
  });
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
  panel.append('<ul class="panel-ul" style="width:300px; height:500px;"><li class="panel-li"><img src="src/images/2.jpg" class="panel-img" style="width:280px; heigth:380px; padding:10px;"></li><li class="panel-li"><button type="button" class="panel-btn">О фильме</button></li><li class="panel-li"><button type="button" class="panel-btn">Сеансы</button></li>')

  $('body').append(page).append(panel);

};




function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
