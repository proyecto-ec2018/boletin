var mysql = require('mysql')
module.exports = {
  //Funciones del controlador

  index : function(req,res, next){
    var config = require('.././database/config')
    var db = mysql.createConnection(config)

    db.connect();

    var articulos_copia = [];
    var cantidad_articulos;
    db.query('SELECT * FROM articulos',function(err,rows,fields){
      if(err) throw err;

      for(var i = 0 ; i < rows.length ; i++){
        articulos_copia[i] = rows[i]
      }
      cantidad_articulos = rows.length;
    })

    var favoritos_copia = [];
    var cantidad_favoritos;
    db.query('SELECT id_articulo, count(*) as COUNT FROM favoritos GROUP BY id_articulo ORDER BY COUNT(*) DESC',function(err,rows,fields){
      if(err) throw err;

      for(var i = 0 ; i < rows.length ; i++){
        favoritos_copia[i] = rows[i];
      }
      cantidad_favoritos = rows.length;
    })

    var art_fav=[]
    var usuario
    if(req.user) usuario = req.user.id
    var cantidad_fav_user
    var queryString = "SELECT id_articulo FROM favoritos WHERE id_usuario = " + usuario
    //boletin_asoc = "' + indice_actual + '" WHERE id = '
    if(req.user){
      db.query(queryString,function(err,rows,fields){
        if(err) throw err;
        for(var i = 0 ; i < rows.length ; i++){
          art_fav[i] = rows[i];
        }
        cantidad_fav_user = rows.length;
      })
    }


    var boletines_copia = [];
    var cantidad_boletines;
    var articulos_buenos = [];

    db.query('SELECT * FROM boletines ORDER BY id_boletin DESC',function(err,rows,fields){
      if(err) throw err

      for(var i = 0 ; i < rows.length ; i++){
        boletines_copia[i] = rows[i];
      }

      cantidad_boletines = rows.length;
      var articulos_favoritos
      for(i=0; i < cantidad_articulos ; i++){
        for(j=0 ; j < cantidad_fav_user;j++){
          if(art_fav[j].id_articulo==articulos_copia[i].id){
            articulos_copia[i].esFavorito=true;
            break;
          }else{
            articulos_copia[i].esFavorito=false;
          }
        }
      }
      res.render('index',{
        message:req.flash('envio_propuesta'),
        message:req.flash('creacion_boletin'),
        title: 'Boletín',

        isAuthenticated : req.isAuthenticated(),
        user: req.user,

        articulos_copia : articulos_copia,
        cantidad_articulos : cantidad_articulos,
        boletines_copia : boletines_copia,
        cantidad_boletines : cantidad_boletines,
        favoritos_copia : favoritos_copia,
        cantidad_favoritos : cantidad_favoritos,
        art_fav : art_fav,
        cantidad_fav_user : cantidad_fav_user
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
    var articulosLibres = null;
    var peticion = db.query('SELECT * FROM articulos',function(err,rows,fields){
      if(err) throw err;
      articulos = rows;
    });

    var peticion = db.query('SELECT * FROM articulos WHERE boletin_asoc=0',function(err,rows,fields){
      if(err) throw err;
      articulosLibres = rows;
    });

    console.log(articulosLibres);

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
            articulos : articulos,
            articulosLibres: articulosLibres
          }
        );
      }
    }); // fin db.query()

  }, // fin editarBoletin

  modificarUsuarios : function(req, res, next)
  {
    var config = require('../database/config')
    var db = mysql.createConnection(config)
    db.connect()

    var usuarios = null;

    var sql = db.query('SELECT * FROM usuarios', function(err,rows,fields)
    {
      if (err) throw err;

      usuarios = rows;
      db.end();

      if(req.isAuthenticated() && req.user.tipo >= 3)
      {
        res.render('modificar_usuarios',
          {
            message:req.flash('edicion_articulo'),
            title: 'Manejo de usuarios',
            isAuthenticated : req.isAuthenticated(),
            user : req.user,
            tipo : req.user.tipo,
            usuarios : usuarios
          }
        );
      }
    }); // fin db.query()

  }, // fin modificarUsuarios


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

  descargarDocumentoDocx : function(req, res, next){
    //console.log('asd');
    res.redirect('/');
  },

  descargarDocumentoTex : function(req, res, next){
    //console.log('asd');
    res.redirect('/');
  },

  postFavorito : function(req,res,next){
    var config = require('.././database/config')
    var db = mysql.createConnection(config)
    db.connect();

    var id_usuario = req.user.id
    var id_articulo = req.body.id
    var favorito = {
      id_usuario : id_usuario,
      id_articulo : id_articulo
    }
    if(req.body.borrar=="true"){
      db.query('DELETE FROM favoritos WHERE id_articulo =' + id_articulo, function(err,rows,fields){
        if(err) throw err
        db.end()
        return res.redirect("/")
      })
    }else{
      db.query('INSERT INTO favoritos SET ?', favorito, function(err,rows,fields){
        if(err) throw err
        db.end()
        return res.redirect("/")
      })
    }
  },

    getMiPerfil : function(req,res,next){
      res.render('editar_perfil')
    }




}
