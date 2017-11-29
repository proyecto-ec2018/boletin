var express = require('express');
var router = express.Router();
var passport = require('passport')
var controllers = require('.././controllers')
var AuthMiddleware = require('../middleware/auth')
var bodyParser = require('body-parser')

/* GET home page. */
router.get('/', controllers.homecontroller.index)
router.post('/', controllers.homecontroller.postFavorito)

router.get('/guia_autores', controllers.homecontroller.mostrarGuia)
router.get('/registro', controllers.homecontroller.showSignUpForm)
router.post('/newuser',controllers.dbcontroller.postRegistrarUsuario)
router.get('/login',controllers.dbcontroller.getSignIn)
//router.get('/loginfr', controllers.dbcontroller.getLoginFromRegister)
router.post('/auth-login',passport.authenticate('local',{
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}))

router.post('/download',controllers.dbcontroller.plantillaDOC)
//router.post('/descargar_plantilla_latex',controllers.dbcontroller.plantillaLATEX)

router.get('/auth-logout',AuthMiddleware.isLogged, controllers.homecontroller.logout)
router.get('/userNotAvailable', controllers.dbcontroller.verifyUserName)

router.get('/nuevo-boletin',AuthMiddleware.isLogged, controllers.homecontroller.nuevoBoletin)
router.post('/nuevo-boletin', AuthMiddleware.isLogged, controllers.dbcontroller.postPublicarBoletin)

router.get('/eliminar_boletin',AuthMiddleware.isLogged, controllers.homecontroller.eliminarBoletin)

router.get('/editar_boletin',AuthMiddleware.isLogged, controllers.homecontroller.editarBoletin)

router.post('/editar_boletin2',AuthMiddleware.isLogged, controllers.dbcontroller.postEditarBoletin)

router.post('/editar_articulo',AuthMiddleware.isLogged, controllers.dbcontroller.postEditarArticulo)
router.post('/eliminar_articulo',AuthMiddleware.isLogged, controllers.dbcontroller.postEliminarArticulo)

router.post('/eliminar_boletin',AuthMiddleware.isLogged, controllers.dbcontroller.eliminarBoletin)

router.get('/upload-files',controllers.homecontroller.getUploadFile)
router.post('/upload-files',controllers.dbcontroller.postUploadFile)

router.get('/a_a', controllers.homecontroller.getActualizarArticulo);
router.post('/a_a', controllers.homecontroller.postActualizarArticulo);

module.exports = router;
