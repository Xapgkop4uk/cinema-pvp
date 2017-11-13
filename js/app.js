var APP_ID = 'F4938450-8412-F432-FF30-7FF933EE1300';
var API_KEY = '9D5C7C66-9B9D-35B7-FF7F-5EB8144C5C00';
var COOKIE_LIVE = 1000000;

Backendless.serverURL = 'https://api.backendless.com';
Backendless.initApp(APP_ID, API_KEY);

function userRegistration(form){

    var user ={
      email:form.email.value,
      login:form.login.value,
      password:form.password.value
    };

    var request = $.ajax({
      url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/users/register",
      contentType:"application/json",
      type: "POST",
      dataType: "json",
      data: JSON.stringify(user),
      beforeSend: function(xhr){
        xhr.setRequestHeader('user-token', getCookie('userId'))
      },
      success: function(d){
        setCookie('username', d.login, COOKIE_LIVE);
        setCookie('userId', d.objectId, COOKIE_LIVE);
        console.log(d);
        drawMainPage();
      }
    });
};

function userLogin(form){

  var user ={
    login:form.login.value,
    password:form.password.value
  };

  var request = $.ajax({
    url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/users/login",
    contentType:"application/json",
    type: "POST",
    dataType: "json",
    data: JSON.stringify(user),
    success: function(d){
      setCookie('username', d.login, COOKIE_LIVE);
      setCookie('userId', d.objectId, COOKIE_LIVE);
      console.log(document.cookie);
      drawMainPage();
    }
  });
};

function userLogout(){

  var request = $.ajax({
    url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/users/logout",
    type: "GET",
    dataType: "json",
    beforeSend: function(xhr){
      xhr.setRequestHeader('user-token', getCookie('userId'));
    },
    success: function(d){
      deleteCookie('username');
      deleteCookie('userId');
      console.log(d);
      drawMainPage();
    }
  });

};

function addSession(form){

  var date = Date.parse(form.date.value+" "+form.time.value);
  console.log(date);
  if(isNaN(date)){
    showModalInfo('Неверные параметры даты или времени.<br/>Используйте следующий формат "13/11/17 11:00".');
    return;
  }

  var json ={
    movie:form.movie.value,
    time:date,
    price:form.price.value
  };

  $.ajax({
    url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/session",
    contentType:"application/json",
    type: "POST",
    dataType: "json",
    data: JSON.stringify(json),
    success: function(d){
      console.log(d);
      showModalInfo("Сеанс успешно добавлен на сервер!");
    }
  });
};

function deleteSession(objectId){
  $.ajax({
    url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/session/"+objectId,
    type: "DELETE",
    success: function(d){
      console.log(d);
      showModalInfo("Сеанс успешно удален!");
      $('#'+objectId).remove();
    }
  });
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
};

function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
}
