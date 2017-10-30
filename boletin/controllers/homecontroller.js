module.exports = {
  //Funciones del controlador
  index : function(req,res, next){
    res.render('index',{title: 'Boletin',
      isAuthenticated : req.isAuthenticated(),
      user: req.user
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
<<<<<<< HEAD
  
  mostrarGuia : function(req, res, next){
    res.render('templates/guia_autores');
=======

  nuevoBoletin : function(req,res,next){
    res.render('nuevo_boletin',{title: 'Nuevo boletin',
      isAuthenticated : req.isAuthenticated(),
      user: req.user
    })
>>>>>>> d5dd7ae06505d0cd88e01b888a87f3745ab69bfd
  }
}
