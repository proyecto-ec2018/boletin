function validar(form){
  var pass1 = $("#pass1").val();
  var pass2 = $("#pass2").val();
  if(pass1.length <=6 || pass2 <=6 || pass1.length != pass2.length  ){
    var element= document.getElementById("state");
    element.style.color = "red";
    $("#state").attr("class", "glyphicon glyphicon-alert pull-right");
    $("#but-registro").attr("class","btn btn-default disabled" );
    document.getElementById("but-registro").setAttribute("style", "cursor:default");
    document.getElementById("but-registro").setAttribute("disabled", "disabled");
  }else if(pass1 == pass2){
    var element= document.getElementById("state");
    element.style.color = "green";
    $("#state").attr("class", "glyphicon glyphicon-ok-sign pull-right");
    $("#but-registro").attr("class","btn btn-primary");
    document.getElementById("but-registro").removeAttribute("disabled")
  }
}
