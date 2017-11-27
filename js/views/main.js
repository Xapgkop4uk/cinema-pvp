function drawMainPage(){
  var panel = $('<div class="preview">');
  var scroller = $('<section class="center slider">');
  $('body').empty();
  $.ajax({
    url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/movies",
    type: "GET",
    success: function(result){
      result.forEach((element)=>{
        scroller.append($('<div>')
          .append($('<ul class="panel-ul">')
            .append($('<li class="panel-li" style="height:300px">')
              .append($('<img src="https://api.backendless.com/F4938450-8412-F432-FF30-7FF933EE1300/9D5C7C66-9B9D-35B7-FF7F-5EB8144C5C00/files/images/'+element.objectId+'.jpg" class="panel-img">')))
            .append($('<li class="panel-li">')
              .append($('<h2 class="panel-header">')
                .html(element.name)))
            .append($('<li class="panel-li">')
              .append($('<p class="panel-comment">')
                .html(element.comment)))
            .append($('<li class="panel-li">')
              .append($('<button type="button" onclick="aboutFilm(\''+element.obkectId+'\')" class="panel-btn panel-btn-about">')
                .html('Фильм')))
            .append($('<li class="panel-li">')
              .append($('<button type="button" onclick="drawSessionsSelection(\''+element.name+'\')" class="panel-btn panel-btn-session">')
                .html('Сеансы')))));
      });
      $('body').append(scroller);

      $(".center").slick({
        infinite: true,
        centerMode: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow:'<button type="button" class="panel-arrow panel-prev-btn"><i class="material-icons">&#xE314;</i></button>',
        nextArrow:'<button type="button" class="panel-arrow panel-next-btn"><i class="material-icons">&#xE315;</i></button>'
      });

      $(".panel-arrow").click((context)=>{
         $('.panel-next-btn').css('display','none');
         $('.panel-prev-btn').css('display','none');

        setTimeout(()=> {
           $('.panel-next-btn').css('display','unset');
           $('.panel-prev-btn').css('display','unset');
         }, 500);
      })
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
  $('body').append(page);

};


function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
