
$(function(){
  // funcion para borrar boletin

  $('#tbl_boletines #btn_eliminar').click(function(e){
    e.preventDefault();
    var elemento = $(this);
    var id = elemento.parent().parent().find('#id_boletin').text();;

    $.ajax({
      url : 'http://localhost:3000/eliminar_boletin',
      method : 'post',
      data : {id : id},
      success : function(res){
        if(res.res){

          // accesa al tr y lo elimina
          elemento.parent().parent().remove();
        }
      }
    });
  });
});