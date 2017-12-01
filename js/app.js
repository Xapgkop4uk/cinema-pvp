var APP_ID = 'F4938450-8412-F432-FF30-7FF933EE1300';
var API_KEY = '9D5C7C66-9B9D-35B7-FF7F-5EB8144C5C00';
var COOKIE_LIVE = 1000000;
var Message;

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
        setCookie('user-token', d['user-token'], COOKIE_LIVE);
        setCookie('user-admin', d.admin, COOKIE_LIVE);
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
      setCookie('user-token',d['user-token'], COOKIE_LIVE);
      setCookie('user-admin', d.admin, COOKIE_LIVE);
      console.log(document.cookie);
      drawMainPage();
    },
    error: function(d){
      console.log(d.responseJSON);
      showLoginInfo(d.responseJSON.message);
    }

  });
};

function userLogout(){

  var request = $.ajax({
    url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/users/logout",
    type: "GET",
    beforeSend: function(xhr){
      xhr.setRequestHeader('user-token', getCookie('user-token'));
    },
    success: function(d){
      deleteCookie('username');
      deleteCookie('userId');
      deleteCookie('user-token');
      deleteCookie('userId');
      console.log(d);
      drawMainPage();
    }
  });

};

function addSession(form){
  var dateArray = form.date.value.split(',');
  var timeArray = form.time.value.split(',');

  Message ='';

  dateArray.forEach((day)=>{
    timeArray.forEach((time)=>{
      var date = Date.parse(day+" "+time);
      console.log(form.movie.value);
      if(isNaN(date)){
        showModalInfo('Неверные параметры даты или времени.<br/>Используйте следующий формат "Месяц{2}/День{2}/Год{2} 11:00".');
        return;
      }
      var json ={
        movie:form.movie.value,
        room:form.room.value,
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
          console.log("Сеанс '"+json.movie+" "+day+" "+time+"' успешно добавлен на сервер!");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          Message = ("Status: " + textStatus+".Error: " + errorThrown);
        }
      });
    });
  });
  drawAddingSession();
};

function deleteSession(objectId){
  if(objectId){
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
  else{
    $.ajax({
      url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/bulk/session?where=price>1",
      type: "DELETE",
      success: function(d){
        console.log(d);
        showModalInfo("Сеансы успешно удалены!");
      }
    });
  }
}

function addMovie(form){
  var image = form.image;
  var formData = new FormData();
  formData.append('section', 'general');
  formData.append('action', 'previewImg');
  formData.append('image', image.files[0]);

  var movie={
    name: form.name.value,
    mark: '10.00',
    views:0,
    marks:0,
    comment:form.comment.value,
    about:""
  }

  $.ajax({
    url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/movies",
    contentType:"application/json",
    type: "POST",
    dataType: "json",
    data: JSON.stringify(movie),
    success: function(result){
      $.ajax({
        url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/files/images/"+result.objectId+".jpg?overwrite=true",
        contentType:false,
        processData: false,
        type: "POST",
        data: formData,
        success: function(result){
                  showModalInfo('Фильм успешно добавлен в медиатеку');
              }
       });
     }
 });
}

function deleteMovie(id){
  $.ajax({
    url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/movies/"+id,
    type: "DELETE",
    success: function(d){
      $.ajax({
        url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/files/images/"+id+".jpg",
        type: "DELETE"
      });

      $.ajax({
        url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/bulk/comments?where=movie%3D'"+id+"'",
        type: "DELETE"
      });

      showModalInfo("Фильм успешно удален!");
      drawRemovingMovie();
    }
  });
}

function editMovie(id){
  var movie ={
    name:$('#movie-'+id)[0].value,
    country:$('#country-'+id)[0].value,
    category:$('#category-'+id)[0].value,
    length:$('#length-'+id)[0].value,
    comment:$('#comment-'+id)[0].value,
    description:$('#description-'+id)[0].value
  }

  $.ajax({
    url:"https://api.backendless.com/"+APP_ID+"/"+API_KEY+"/data/movies/"+id,
    contentType:"application/json",
    type: "PUT",
    dataType: "json",
    data: JSON.stringify(movie),
    success: function(result){
      showModalInfo("Данные успешно обновлены!");
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

function getMonth(number){
  months = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря'];
  return months[number];
}
