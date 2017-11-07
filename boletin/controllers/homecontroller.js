var mysql = require('mysql')
module.exports = {
  //Funciones del controlador
  index : function(req,res, next){
    var config = require('.././database/config')
    var db = mysql.createConnection(config)

    db.connect();
    db.query('SELECT * FROM boletines ORDER BY `id_boletin` DESC', function(err,rows,fields){
      if(err) throw err
      titulo = []
      articulos = []
      iteraciones = rows.length
      queryString=[]
      tamañoBoletines=[]
      aux=0
      cont=0
      sumatorias=[]
      suma=0
      sumatorias[0]=0
      for(i=0; i < iteraciones ; i++) sumatorias[i]=0
      //la variable numArticulos es auxiliar al momento de indexar el arreglo
      //articulos[]
      numArticulos = 0
      //Se obtienen los titulos de los boletines publicados
      for(i = 0 ; i < iteraciones ; i++) titulo[i] = rows[i].nombre_boletin
      //Se obtienen los titulos de los articulos de los boletines
      if(iteraciones>0){
        for( i = 0 ; i < iteraciones ; i++ ){
          queryString[i] = 'SELECT * FROM articulos WHERE boletin_asoc = ' + "'" + titulo[i] +"'"
          db.query(queryString[i], function(err,rows,fields){

            for(j=0 ; j < rows.length; j++) {
              articulos[j+suma] = rows[j].titulo
            }
            for(j = 0 ; j < aux ; j++) sumatorias[aux]+=numArticulos
            numArticulos = rows.length
            tamañoBoletines[aux] = numArticulos
            suma+=numArticulos

            aux++
            cont++

            if(aux==iteraciones){
              col=['#collapseOne','#collapseTwo','#collapseThree','#collapseFour']
              res.render('index',{title: 'Boletin',
                isAuthenticated : req.isAuthenticated(),
                user: req.user,
                tipo : req.tipo,
                titulos : titulo,
                articulo: articulos,
                tamaños : tamañoBoletines,
                sumas : sumatorias,
                col : col
              })
            }
          })
        }
      }else{
        titulos=[]
        articulos=[]
        col=['#collapseOne','#collapseTwo','#collapseThree','#collapseFour']
        tamañoBoletines=[]
        sumatorias=[]
        res.render('index',{title: 'Boletin',
          isAuthenticated : req.isAuthenticated(),
          user: req.user,
          tipo : req.tipo,
          titulos : titulo,
          articulo: articulos,
          tamaños : tamañoBoletines,
          sumas : sumatorias,
          col : col
        })
      }
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

  editarBoletin : function(req, res, next)
  {
    var config = require('../database/config')
    var db = mysql.createConnection(config)
    db.connect()

    var boletines = null;

    var sql = db.query('SELECT * FROM boletines', function(err,rows,fields){
      if (err) throw err;

      boletines = rows;
      db.end();

      if(req.isAuthenticated() && req.user.tipo >= 3)
      {
        res.render('editar_boletin',
                  {
                    title: 'Editar boletin',
                    isAuthenticated : req.isAuthenticated(),
                    user : req.user,
                    tipo : req.user.tipo,
                    boletines : boletines
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
  }

  /*eliminarBoletin : function(req,res,next){
    res.render('eliminar_boletin',{title : 'Boletin - Eliminar boletin',
      isAuthenticated : req.isAuthenticated(),
      user: req.user,
      tipo : req.user.tipo
    });
  }*/
}
