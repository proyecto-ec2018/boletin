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

    var creador_boletin = req.user.nombre;
    var es_actual = 1;

    var nombre_boletin = req.body.nombre;
    var descripcion_boletin = req.body.descripcion;


    // En esta parte se toma una cadena de texto JSON y se convierte en un objeto JS, despues cada entrada se parsea a entero
    var indices = JSON.parse(req.body.articulos);
    var indices_articulos = []
    for(var i = 0 ; i < indices.length ; i++){
      indices_articulos[i] = parseInt(indices[i])
      //console.log(indices_articulos[i])
    }

    var boletin = {
      nombre_boletin : nombre_boletin,
      descripcion_boletin : descripcion_boletin,
      creador_boletin : creador_boletin,
      es_actual : es_actual
    }

    var config = require('.././database/config')
    var db = mysql.createConnection(config)
    db.connect();

    var indice_actual;
    db.query('SELECT * FROM boletines ORDER BY id_boletin DESC',function(err,rows,fields){
      if(rows.length > 0){
        indice_actual = rows[0].id_boletin + 1;
      }else{
        db.query('ALTER TABLE boletines AUTO_INCREMENT = 1')
        indice_actual = 1;
      }

      for(var i = 0 ; i < indices_articulos.length ; i++){
        db.query('UPDATE articulos SET boletin_asoc = "' + indice_actual + '" WHERE id = ' + indices_articulos[i],function(err,rows,fields){
          if(err) throw err;
        })
      }

      db.query('INSERT INTO boletines SET ?',boletin,function(err,rows,fields){
        if(err) throw err;

        req.flash('creacion_boletin','Se ha creado el boletín correctamente')
        res.redirect('/')
      });

    });
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

  postModificarUsuarios : function(req,res,next){

    var tipoUsuario = req.body.tipoChecado;
    var id = req.body.id;

    var config = require('.././database/config')
    var db = mysql.createConnection(config)
    db.connect();

    console.log('connected to database to edit usuarios')
    console.log('tipoUsuario = ' + tipoUsuario)
    console.log('id = ' + id)

    var respuesta = {res: false};
    var query = 'UPDATE usuarios SET tipo = "' + tipoUsuario + '" WHERE id = ' + id;
    db.query(query, function(err,result){
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

  postAgregarArticulo : function(req, res, next){

    var config = require('.././database/config')
    var db = mysql.createConnection(config)
    db.connect();

    var respuesta = {res: false};

    console.log('ID del articulo : ' + req.body.id_articulo);
    console.log('Nuevo nombre : ' + req.id_boletin);

    var query = 'UPDATE articulos SET boletin_asoc = "' + req.body.id_boletin + '" WHERE id = ' + req.body.id_articulo;
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
      articulo.autor = '' + req.user.id

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
      //file.path = path.normalize(__dirname + '/..') + '/uploads/' + file.name;
      file.path = path.normalize(/*__dirname*/'public') + '/uploads/' + file.name;
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

            db.query('UPDATE articulos SET boletin_asoc = 0 WHERE boletin_asoc = ' + id,function(err,rows,fields){
              if(err) throw err
            })

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

  eliminarUsuario : function(req,res,next){
        var id = req.body.id;
        var config = require('../database/config');
        var db = mysql.createConnection(config);
        db.connect();

        var respuesta = {res: false};

        db.query('DELETE FROM usuarios WHERE id = ' + id, function(err,rows,fields){

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

    db.query('DELETE FROM articulos WHERE id = ' + id,function(err,rows, fields){
      if(err) throw err;
      
      db.query('DELETE FROM favoritos WHERE id_articulo = ' + id,function(err,rows, fields){
        if(err) throw err;
      })
      
      db.end();
    })
    
    
    req.flash('edicion_articulo','Se ha actualizado el articulo');
    res.redirect('/')
  },
  
  postDesvincularArticulo : function(req, res, next){
    var id = req.body.ID;
    
    var config = require('.././database/config')
    var db = mysql.createConnection(config)
    db.connect();
    
    db.query('UPDATE articulos SET boletin_asoc = 0 WHERE id = ' + id, function(err,rows,fields){
      if(err) throw err;
      
      db.end();
    });
    
    req.flash('edicion_articulo','Se ha actualizado el articulo');
    res.redirect('/')
  },

  plantillaDOC : function(req,res){
    /*var direccion = path.normalize(__dirname + '/../public/download/plantillaDOC.pdf')
    res.download(direccion,'plantillaDOC.pdf');*/
    res.download('https://www.irs.gov/pub/irs-pdf/fw4.pdf')
    console.log('descargado plantilla')
  },

  postDescargarDocumentoDocx : function(req, res, next){
    //res.download('https://www.irs.gov/pub/irs-pdf/fw4.pdf')
    res.download(__dirname + '/../public/download/plantilla.docx')
    //console.log('descargado plantilla')
  },

  postDescargarDocumentoTex : function(req, res, next){
    //res.download('https://www.irs.gov/pub/irs-pdf/fw4.pdf')
    res.download(__dirname + '/../public/download/plantilla.tex')
    //console.log('descargado plantilla')
  }

}
