var mysql = require('mysql')
var md5 = require('md5')
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
  }


}
