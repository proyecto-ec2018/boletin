var mysql = require('mysql')
var md5 = require('md5')
module.exports = {
  //controlador de la base de datos
  //El siguiente metodo se encarga de registrar al usuario.
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
    var sql2 = db.query('SELECT * FROM usuarios WHERE username = ?')
    var sql = db.query('INSERT INTO usuarios SET ?', usuario ,function(err){
  			if (err) throw err
  			console.log("1 record inserted")
        db.end()
  	})
    req.flash('afterSignUp','Gracias por registrarte. Inicia sesion para continuar')
    return res.redirect('/login')
  },

  getSignIn : function(req,res,next){
    return res.render('login',{ message: req.flash('afterSignUp'), authmessage : req.flash('authmessage')})
  }

/*  getSignIn : function(req,res,next){
    //req.flash('info','Gracias por registrarte. Inicia sesion para continuar')
    res.render('login')
  }
*/
  //El siguiente metodo se encarga de iniciar Sesion
/*  postIniciarSesion : function(req,res,next){
    var usuario ={
      userName : req.body.username,
      password : req.body.password
    }
    usuario.password = md5(usuario.password)
    var config = require('.././database/config')
    var db = mysql.createConnection(config)
    db.connect();
    console.log('connected to database')

  }
  */
}
