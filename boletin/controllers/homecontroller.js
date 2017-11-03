var mysql = require('mysql')
module.exports = {
  //Funciones del controlador
  index : function(req,res, next){
    var config = require('.././database/config')
    var db = mysql.createConnection(config)
    db.connect();
    db.query('SELECT * FROM boletines', function(err,rows,fields){
      if(err) throw err
      titulo = []
      articulos = [[]]
      for(i = 0 ; i < rows.length ; i++){
        titulo[i] = rows[i].nombre_boletin
        var queryString = 'SELECT * FROM articulos WHERE boletin_asoc = ' + "'" + titulo[i]+ "'"
        db.query(queryString,function(err,rows,fields){
          for(j=0 ; j < rows.length ; j++){
            articulos[i,j] = rows[j].titulo
          }
        })
      }
      res.render('index',{title: 'Boletin',
        isAuthenticated : req.isAuthenticated(),
        user: req.user,
        tipo : req.tipo,
        titulos : titulo,
        articulo: articulos
      })
    })

  },
  showSignUpForm : function(req,res,next){
    res.render('registro',{title: ' Registro',
      notAvailable : req.flash('userNotAvailable')})
  },

  logout : function(req,res,next){
    req.logout()
    res.redirect('/')
  },

  mostrarGuia : function(req, res, next){
    res.render('templates/guia_autores',{title : 'Boletin - Guia de autores',
      isAuthenticated : req.isAuthenticated(),
      user: req.user
    });
  },

  nuevoBoletin : function(req,res,next){
    var config = require('.././database/config')
    var db = mysql.createConnection(config)
    db.connect();
    var sql = db.query('SELECT titulo, autor FROM articulos', function(err,rows,fields){
      if (err) throw err
      titulo =[]
      autor = []
      for(i=0; i < rows.length;i++){
        titulo[i] = rows[i].titulo
        autor[i] = rows[i].autor
      }
      var articulos = {
        titulos : titulo,
        autores : autor
      }
      db.end()
      if(req.isAuthenticated() && req.user.tipo >=3){
        res.render('nuevo_boletin2',{title: 'Nuevo boletin',
          isAuthenticated : req.isAuthenticated(),
          user: req.user,
          tipo : req.user.tipo,
          titulos : articulos.titulos,
          autores : articulos.autores
        })
      }else{
        res.redirect('/');
      }
    })
  },

  eliminarBoletin : function(req, res, next){
    if(req.isAuthenticated() && req.user.tipo >= 3){
      res.render('eliminar_boletin',{title : 'Boletin - eliminar boletin',
        isAuthenticated : req.isAuthenticated(),
        user : req.user,
        tipo : req.user.tipo
      })
    }else{
      res.redirect('/');
    }
  }

  /*eliminarBoletin : function(req,res,next){
    res.render('eliminar_boletin',{title : 'Boletin - Eliminar boletin',
      isAuthenticated : req.isAuthenticated(),
      user: req.user,
      tipo : req.user.tipo
    });
  }*/
}
