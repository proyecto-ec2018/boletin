module.exports = {
  //Funciones del controlador
  index : function(req,res, next){
    res.render('index',{title: 'Boletin'})
  },
  showSignUpForm : function(req,res,next){
    res.render('registro',{title: ' Registro'})

  }
}
