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
        if(confirm("Estas seguro de enviar los cambios?")){
          var elemento = $(this);
          //var id = elemento.parent().parent().parent().parent().attr("id");
          var id = elemento.attr('id');
          var form_id = 'form_' + id;
          var nombre_boletin = elemento.parent().parent().find('#input_name'+id).val();
          var descripcion = elemento.parent().parent().find('#input_text'+id).val();


          var arregloDatos = $('#'+form_id);
          $.ajax({  
            url:'http://localhost:3000/editar_boletin2',
            type:'POST',
            data: {
              ID : id,
              nombre : nombre_boletin,
              desc : descripcion
            },
            success:function(response){
              window.location.replace("http://localhost:3000/editar_boletin");
            }
          });
          //console.log(arregloDatos  );
          //console.log(typeof(id));
          //console.log(elemento);
          //console.log("este es el nombre " + nombre_boletin);
          //console.log(descripcion);

          //$.post('http://localhost:3000/editar_boletin2', {ID : id, nombre : nombre_boletin, desc : descripcion });
        }else{
          console.log('cancelar');
        }
      
    });

    // funcion para editar articulo
    $('.editar_articulo').click(function(e){
        e.preventDefault();
        if(confirm("Estas seguro de enviar los cambios del articulo?"))
        {
          var elemento = $(this);
          var id_articulo = elemento.attr('id');

          var nombre = elemento.parent().parent().find('#input_name_'+'articulo'+id_articulo).val();
          var descripcion = elemento.parent().parent().find('#input_text_'+'articulo'+id_articulo).val();
          
          $.ajax({  
            url:'http://localhost:3000/editar_articulo',
            type:'POST',
            data: {
              ID : id_articulo,
              nombre : nombre,
              descripcion : descripcion
            },
            success:function(response){
              window.location.replace("http://localhost:3000/editar_boletin");
            }
          });
          
          //console.log(nombre);
          //console.log(descripcion);
        }else{
          console.log('cancelar');
        }
    });


    // funcion para editar articulo
    $('.agregarArticulo').click(function(e){
        e.preventDefault();
        if(confirm("Estás seguro de enviar los cambios del articulo?"))
        {
          var elemento = $(this);
          var id_articulo = elemento.attr('id');
          var id_boletin = elemento.parent().attr('id');

          console.log(id_articulo)
          console.log(id_boletin)
          //$.post('http://localhost:3000/agregar_articulo',{id_articulo : id_articulo, id_boletin : id_boletin});
          $.ajax({  
            url:'http://localhost:3000/agregar_articulo',
            type:'POST',
            data: {
              id_articulo : id_articulo,
              id_boletin : id_boletin
            },
            success:function(response){
              window.location.replace("http://localhost:3000/editar_boletin");
            }
          });
        }else{
          //window.location.replace("http://localhost:3000/editar_boletin");
          console.log('cancelar');
        }

        // para "redireccionar" a la misma pagina, pero ya actualizada
        //window.location.replace("http://localhost:3000/editar_boletin");
    });

    $('.eliminar_articulo').click(function(e){
      e.preventDefault();
      if(confirm("Estás seguro eliminar el artículo?")){
        var elemento = $(this);
        var id_articulo = elemento.attr('id');
        
        $.ajax({  
          url:'http://localhost:3000/eliminar_articulo',
          type:'POST',
          data: {
            ID : id_articulo
          },
          success:function(response){
            window.location.replace("http://localhost:3000/editar_boletin");
          }
        });
        
      }else{
        //window.location.replace("http://localhost:3000/editar_boletin");
        console.log('cancelar');
      }
    });
  
    $('.desvincular_articulo').click(function(e){
      e.preventDefault();
      if(confirm("Estás de desvincular el artículo del boletín?")){
        var elemento = $(this);
        var id_articulo = elemento.attr('id');

        $.ajax({  
          url:'http://localhost:3000/desvincular_articulo',
          type:'POST',
          data: {
            ID : id_articulo
          },
          success:function(response){
            window.location.replace("http://localhost:3000/editar_boletin");
          }
        });
      }else{
        //window.location.replace("http://localhost:3000/editar_boletin");
        console.log('cancelar');
      }
    });
});
