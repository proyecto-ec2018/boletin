var mysql = require('mysql')
module.exports = {
  //Funciones del controlador
  
  index : function(req,res, next){
    var config = require('.././database/config')
    var db = mysql.createConnection(config)

    db.connect();
    
    var articulos_copia = [];
    var cantidad_articulos;
    db.query('SELECT * FROM articulos ORDER BY id DESC',function(err,rows,fields){
      if(err) throw err
      
      for(var i = 0 ; i < rows.length ; i++){
        articulos_copia[i] = rows[i];
      }
      
      cantidad_articulos = rows.length;
    })
    
    var boletines_copia = [];
    var cantidad_boletines;
    db.query('SELECT * FROM boletines ORDER BY id_boletin DESC',function(err,rows,fields){
      if(err) throw err
      
      for(var i = 0 ; i < rows.length ; i++){
        boletines_copia[i] = rows[i];
      }
      
      cantidad_boletines = rows.length;

     
      res.render('index',{
      message:req.flash('envio_propuesta'),
      message:req.flash('creacion_boletin'),
      title: 'Boletín',

      isAuthenticated : req.isAuthenticated(),
      user: req.user,

      articulos_copia : articulos_copia,
      cantidad_articulos : cantidad_articulos,
      boletines_copia : boletines_copia,
      cantidad_boletines : cantidad_boletines
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
  
  
  getUploadFile : function(req, res, next){
    if(req.isAuthenticated()){
      res.render('index2',{title : 'Enviar propuesta',
        isAuthenticated : req.isAuthenticated(),
        user : req.user,
        //tipo : req.user.tipo
      })
    }else{
      res.redirect('/');
    }
    
  },
  

  nuevoBoletin : function(req,res,next){
    var config = require('.././database/config')
    var db = mysql.createConnection(config)
    db.connect();
    
    var articulos_copia = []
    db.query('SELECT * FROM articulos', function(err, rows, fields){
      if(err) throw err
      
      for(var i = 0 ; i < rows.length ; i++){
        articulos_copia[i] = rows[i];
      }
      db.end();
      
      if(req.isAuthenticated() && req.user.tipo >=3){
        res.render('nuevo_boletin2',{title: 'Nuevo boletín',
          isAuthenticated : req.isAuthenticated(),
          user: req.user,
          articulos_copia : articulos_copia
        })
      }else{
        res.redirect('/');
      }
      
    })
  },

  editarBoletin : function(req, res, next)
  {
    var config = require('../database/config')
    var db = mysql.createConnection(config)
    db.connect()

    var boletines = null;

    var articulos = null;
    var peticion = db.query('SELECT * FROM articulos',function(err,rows,fields){
      if(err) throw err;
      articulos = rows;
    });
    
    var sql = db.query('SELECT * FROM boletines', function(err,rows,fields){
      if (err) throw err;

      boletines = rows;
      db.end();

      if(req.isAuthenticated() && req.user.tipo >= 3)
      {
        res.render('editar_boletin',
          {
            message:req.flash('edicion_articulo'),
            title: 'Editar boletin',
            isAuthenticated : req.isAuthenticated(),
            user : req.user,
            tipo : req.user.tipo,
            boletines : boletines,
            articulos : articulos
          }
        );
      }
    }); // fin db.query()

  }, // fin editarBoletin


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
  },
  
  getActualizarArticulo : function(req, res, next){
    console.log('asd aa')
    res.render('asd')
  },
  
  postActualizarArticulo : function(req, res, next){
    console.log('asd')
    
    var config = require('../database/config')
    var db = mysql.createConnection(config)
    db.connect()
    
    var titulo_b = req.body.titulo;
    var descripcion_b = req.body.descripcion;
    var id_b = req.body.identificador;
    
    console.log(req.body.id)
  },
  
  
}
