var LocalStrategy = require('passport-local').Strategy
var mysql = require('mysql')
var md5 = require('md5')
module.exports = function(passport){

  passport.serializeUser(function(user,done){
    done(null,user);
  })

  passport.deserializeUser(function(obj,done){
    done(null,obj)
  })
  passport.use(new LocalStrategy({
    passReqToCallback : true
  },function(req, username,password,done){
    var config = require('.././database/config')
    var db = mysql.createConnection(config)
    db.connect();
    console.log('connected to database to login')
    var sql = db.query('SELECT * FROM usuarios WHERE username = ?', username ,function(err,rows,fields){
  			if (err) throw err
        db.end()
        if(rows.length > 0 ){
          var user = rows[0]
          if(md5(password) == user.password){
            return done(null,{
              nombre : user.userName,
              password : user.password
            })
          }
        }
        return done(null,false,req.flash('authmessage','Username o contrasena incorrectos'))
  	})
  }))

}
