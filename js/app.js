var APP_ID = 'F4938450-8412-F432-FF30-7FF933EE1300';
var API_KEY = '0F451544-AEB6-6493-FFEA-731A9DDDA700';

Backendless.serverURL = 'https://api.backendless.com';
Backendless.initApp(APP_ID, API_KEY);

function userRegistration(form){
    var name = form.name.value;
    var surname = form.surname.value;
    var login = form.login.value;
    var password = form.password.value;

    var menuId = $("ul.nav").first().attr("id");
    var request = $.ajax({
      url: "script.php",
      type: "POST",
      data: {id : menuId},
      dataType: "html"
    });

    request.done(function(msg) {
      $("#log").html( msg );
    });

    request.fail(function(jqXHR, textStatus) {
      alert( "Request failed: " + textStatus );
    });


});

    var request = new XMLHttpRequest();
    request.setRequestHeader('Content-Type','application/json');

    request.onreadystatechange = function(){

    }

    alert(name+" "+surname+" "+login+" "+ password);
}
