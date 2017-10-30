var express = require('express');
var router = express.Router();
var passport = require('passport')
var controllers = require('.././controllers')
var AuthMiddleware = require('../middleware/auth')

/* GET home page. */
router.get('/', controllers.homecontroller.index)
router.get('/registro', controllers.homecontroller.showSignUpForm)
router.post('/newuser',controllers.dbcontroller.postRegistrarUsuario)
router.get('/login',controllers.dbcontroller.getSignIn)
//router.get('/loginfr', controllers.dbcontroller.getLoginFromRegister)
router.post('/auth-login',passport.authenticate('local',{
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}))

router.get('/auth-logout',AuthMiddleware.isLogged, controllers.homecontroller.logout)
router.get('/userNotAvailable', controllers.dbcontroller.verifyUserName)
router.get('/nuevo-boletin',AuthMiddleware.isLogged, controllers.homecontroller.nuevoBoletin)
module.exports = router;
