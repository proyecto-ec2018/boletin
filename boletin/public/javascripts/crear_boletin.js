$(function(){
  $('.crear_boletin').click(function(event){
    event.preventDefault();
    
    var elemento = $(this)
    var nombre = elemento.parent().find('#nombre').val();
    var descripcion = elemento.parent().find('#descripcion').val();
    
    // Sacar los valores de los checkboxes desde la tabla 'tabla_contenido'
    var val = $("#tabla_contenido input:checkbox:checked").map(function () {
      return $(this).val();
    }).get();
    
    $.ajax({  
      url:'http://localhost:3000/nuevo-boletin',
      type:'POST',
      data: {
        // Convertir un objeto JS en una cadena de texto JSON. En la funcion de node se hace la operacion contraria, ie, convertir la cadena de
        // texto JSON en un objeto JS
        articulos : JSON.stringify(val),
        nombre : nombre,
        descripcion : descripcion
      },
      success:function(response){
        alert('hola')
      }
    });
  });
});
