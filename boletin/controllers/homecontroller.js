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
  }
}
