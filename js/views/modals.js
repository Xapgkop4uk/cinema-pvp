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

function showEditModal(element){
  $('body').append($('<div id="EditModal" class="infoModal">')
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
