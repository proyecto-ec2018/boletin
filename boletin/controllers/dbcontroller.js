var mysql = require('mysql')
var md5 = require('md5')
var formidable = require('formidable')
var path = require('path')
module.exports = {
  /* En este archivo se definen las funciones que involucren acceder a
    la base de datos.
  */

  /*
      postRegistrarUsuario: Esta es la funcion que registra a un nuevo usuario.
      El metodo showSignUpForm() redirige a esta pagina para, a partir del
      metodo POST de http, ingresar los valores del form que ingresa el usuario.
      En caso de ser exitoso el registro, redirige a '/login'. Sino,
      se redirige a '/userNotAvailable'
  */
  postRegistrarUsuario : function(req,res,next){
    console.log(req.body)
    var usuario= {
      userName : req.body.usrName,
      email : req.body.email,
      password : req.body.usrPass
    }
    usuario.password = md5(usuario.password)
    var config = require('.././database/config')
    var db = mysql.createConnection(config)
    db.connect();
    console.log('connected to database to register')
    var sql = db.query('SELECT * FROM usuarios WHERE username = ?', usuario.userName ,function(err,rows,fields){
      if (err) throw err
      if(rows.length > 0 ){
        req.flash('userNotAvailable','Este usuario no esta disponible. Intenta uno nuevo.')
        return res.redirect('/userNotAvailable')
      }else{
        db.query('INSERT INTO usuarios SET ?', usuario, function(err){
          if(err) throw err
          db.end()
        })
        req.flash('afterSignUp','Gracias por registrarte. Inicia sesion para continuar')
        return res.redirect('/login')
      }
    })
  },

  getSignIn : function(req,res,next){
    return res.render('login',{ message: req.flash('afterSignUp'), authmessage : req.flash('authmessage')})
  },

  verifyUserName : function(req,res,next){
    return res.render('registro', { userNotAvailable: req.flash('userNotAvailable')})
  },

  postPublicarBoletin : function(req,res,next){

    var nombre_boletin = req.body.nombre;
    var descripcion_boletin = req.body.descripcion;
    var articulos = [];
    var asd = req.body.asd;
    
    articulos = req.body.articulos;
    
    var creador_boletin = req.user.nombre;
    var es_actual = 1;
    
    /*console.log(nombre_boletin);
    console.log(descripcion_boletin);
    console.log(creador_boletin);
    
    console.log(asd);
    console.log(articulos[0]);*/
  },

  postEditarBoletin : function(req,res,next){

    var nombre = req.body.nombre;
    var descripcion_boletin = req.body.desc;
    var id = req.body.ID;

    var config = require('.././database/config')
    var db = mysql.createConnection(config)
    db.connect();

    console.log('connected to database to edit a boletin')

    var respuesta = {res: false};
    var query = 'UPDATE boletines SET nombre_boletin = "' + nombre + '", descripcion_boletin = "' + descripcion_boletin + '" WHERE id_boletin = ' + id;
    db.query(query, function(err,result){
      //db.query('UPDATE boletines SET nombre_boletin = "Juancho" WHERE id_boletin = "61"', function(err,rows,fields){
        if(err)
        {
            throw err;
            respuesta.res = false;
        } 
            db.end();
            console.log(result.affectedRows + " record(s) updated");
            respuesta.res = true;

            res.json(respuesta);
        
    });

  },
  
  postEditarArticulo : function(req, res, next){
    
    var config = require('.././database/config')
    var db = mysql.createConnection(config)
    db.connect();
    
    var respuesta = {res: false};
    
    console.log('ID del articulo : ' + req.body.ID);
    console.log('Nuevo nombre : ' + req.body.nombre);
    console.log('Nueva descripcion : ' + req.body.descripcion);
    
    var query = 'UPDATE articulos SET titulo = "' + req.body.nombre + '", descripcion = "' + req.body.descripcion + '" WHERE id = ' + req.body.ID;
    db.query(query,function(err,result){
      if(err){
        throw err;
        respuesta.res = false;
      }
      db.end();
      console.log(result.affectedRows + " record(s) updated");
      respuesta.res = true;
      
      //res.json(respuesta);
      
    });
    
    req.flash('edicion_articulo','Se ha actualizado el articulo');
    res.redirect('/')
  },
  
  postUploadFile : function(req,res,next){
    var form = new formidable.IncomingForm();
    
    var articulo ={
      estado : 1,
      titulo : '',
      descripcion: '',
      autor : '',
      nombre_archivo : '',
      extension_archivo : ''
    }
    
    form.parse(req,function(err,fields,files){
      articulo.autor = req.user.nombre
      
      articulo.titulo=fields.titulo
      articulo.descripcion=fields.descripcion
      
      var config = require('.././database/config')
      var db = mysql.createConnection(config)
      db.connect();
      db.query('INSERT INTO articulos SET ?',articulo, function(err,rows,fields){
        if(err) throw err
        db.end()
      })
    });
    
    form.on('fileBegin', function (name, file){
      file.path = path.normalize(__dirname + '/..') + '/uploads/' + file.name;
      //file.path = path.normalize(__dirname + '') + '/uploads/' + file.name;
      articulo.nombre_archivo = file.name
      articulo.extension_archivo = path.extname(file.name)
    });
    form.on('file', function (name, file){
      console.log('Uploaded ' + file.name);
    });

    req.flash('envio_propuesta','Se ha enviado la propuesta correctamente')
    return res.redirect('/')
  },

  eliminarBoletin : function(req,res,next){
        var id = req.body.id;

        var config = require('../database/config');

        var db = mysql.createConnection(config);
        db.connect();

        var respuesta = {res: false};

        db.query('DELETE FROM boletines WHERE id_boletin = ' + id, function(err,rows,fields){
            if(err)
            {
                throw err;
                respuesta = {res: false}
            } 

            db.end();

            respuesta.res = true;

            res.json(respuesta);
        });
  },
  
  postEliminarArticulo : function(req, res, next){
    var id = req.body.ID;
    
    var config = require('.././database/config')
    var db = mysql.createConnection(config)
    db.connect();
    
    db.query('DELETE FROM articulos WHERE id = ' + id, function(err, rows, fields){
      if(err) throw err;
      
      db.end();
    });
    
  },

}
