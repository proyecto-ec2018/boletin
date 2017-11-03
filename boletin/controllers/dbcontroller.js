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

    var boletin ={
      nombre_boletin : req.body.nombre,
      descripcion_boletin : req.body.descripcion,
      creador_boletin : req.user.nombre,
      es_actual : 1
    }

    var config = require('.././database/config')
    var db = mysql.createConnection(config)
    db.connect();
    console.log('connected to database to register a boletin')
    db.query('INSERT INTO boletines SET ?',boletin, function(err,rows,fields){
      if(err) throw err
      if(req.body.checkbox){
        if(req.body.checkbox.length > 0){
          for(i = 0; i < req.body.checkbox.length; i++){
            var queryString = 'UPDATE articulos SET boletin_asoc =' + "'" +boletin.nombre_boletin + "'"+ 'WHERE articulos.id = ' + req.body.checkbox[i]
            db.query(queryString,function(err,rows,fields){
              if(err) throw err

            })
          }
          db.end()
          return res.redirect('/')
        }

      }
    })

  },

  getUploadFile : function(req,res,next){
    res.render('index2');
  },
  postUploadFile : function(req,res,next){
    var form = new formidable.IncomingForm();
    var articulo ={
      estado : 1
    }
    form.parse(req,function(err,fields,files){
      articulo.titulo=fields.titulo
      articulo.descripcion=fields.descripcion
      articulo.autor = req.user.nombre
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
      articulo.nombre_archivo = file.name
      articulo.extension_archivo = path.extname(file.name)
    });
    form.on('file', function (name, file){
      console.log('Uploaded ' + file.name);
    });

    return res.redirect('/')
  }


}
