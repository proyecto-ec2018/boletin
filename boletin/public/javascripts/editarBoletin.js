function confirmar_borrar(){
    var respuesta = confirm("Estas seguro de borrar el boletin?");
    return respuesta;
}

function alertaArticulo(){
    var respuesta = confirm("Estas seguro de borrar el articulo?");
    if(respuesta){
      alert("El articulo se ha borrado");
    }
}

function returnData(param)
{
    console.log(param);
}

$(function(){

    // funcion para borrar boletin
    $('.btn_eliminar').click(function(e){
        e.preventDefault();
        if(confirm("Estas seguro de borrar el boletin?"))
        {
          var elemento = $(this);
          var id = elemento.parent().parent().find('#id_boletin').text();
            
        console.log(typeof(id));
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
        } 
    });

    // funcion para editar boletin
    $('.enviarEdicionBoletin').click(function(e){
        e.preventDefault();
        if(confirm("Estas seguro de enviar los cambios?"))
        {
          var elemento = $(this);
          //var id = elemento.parent().parent().parent().parent().attr("id");
          var id = elemento.attr('id');
          var form_id = 'form_' + id;
          var nombre_boletin = elemento.parent().parent().find('#input_name'+id).val();
          var descripcion = elemento.parent().parent().find('#input_text'+id).val();
          

          var arregloDatos = $('#'+form_id);
        
          console.log(arregloDatos  );
          console.log(typeof(id));
          console.log(elemento);
          console.log("este es el nombre " + nombre_boletin);
          console.log(descripcion);
        
          $.post('http://localhost:3000/editar_boletin2', {ID : id, nombre : nombre_boletin, desc : descripcion });
        } 
    });

});


