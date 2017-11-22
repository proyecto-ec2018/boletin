var config= require('.././database/config')

var userid = req.body.userName;
var postid = req.body.selectedarticles;

module.exports={
  postFavorite : function(req,res,next){
    var postid=req.body.id
    var userName=req.body.userName
    var config = require('.././database/config')
    var db = mysql.createConnection(config)
    db.connect();
    db.query("SELECT COUNT(*) AS articulos FROM favoritos WHERE id_articulo="postid" and userName="userid",function(err,rows,fields){
      db.query("INSERT INTO favoritos(id_articulo,userName) values("postid","userName")"
    })
  }
}
