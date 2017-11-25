// Server
var app= require('express')();
var http= require('http').Server(app);

app.get('./', function(req, res){
  res.sendFile('descarga.html');
})

app.get('/download', function(req, res){
  res.download(__dirname +'/folder_descarga/archivo.txt','archivo.txt'); //folder donde se tengan los archivos
  // Cambiar a la direccion donde estara la plantilla
})
http.listen(3000, function(){
  console.log('listening to *3000')
})
