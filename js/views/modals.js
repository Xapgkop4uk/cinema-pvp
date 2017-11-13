function showModalInfo(message){
  $('body').append($('<div id="infoModal" class="infoModal">')
    .append($('<div class="modal-content">')
      .append($('<a class="close">')
        .html('&times'))
        .append($('<p>')
          .html(message))));
  $('.close').click(function(){
    $('#infoModal').remove();
  })
}
