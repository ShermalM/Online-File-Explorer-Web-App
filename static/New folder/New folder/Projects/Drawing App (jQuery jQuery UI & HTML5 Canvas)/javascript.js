$(document).ready(function(){

   var paint = false;
   var paint_erase = "paint";
   var canvas = document.getElementById('paint');
   var context = canvas.getContext('2d');
   var container = $('#container');
   var mouse = {x:0,y:0};

   if(localStorage.getItem("imgCanvas") != null){
     var img = new Image();
     img.onload = function(){
       context.drawImage(img, 0,0);
     }
     img.src = localStorage.getItem("imgCanvas");
   }

   //Setting initial drawing parameters
   context.lineWidth = 3;
   context.lineJoin = "round";
   context.lineCap = "round";

   container.mousedown(function(e){         //e for Event
     paint = true;
     context.beginPath();
     mouse.x = e.pageX - this.offsetLeft;
     mouse.y = e.pageY - this.offsetTop;
     context.moveTo(mouse.x, mouse.y);
   });

   container.mousemove(function(e){
     mouse.x = e.pageX - this.offsetLeft;
     mouse.y = e.pageY - this.offsetTop;
     if(paint){
       if(paint_erase == "paint"){
         //get colour input
         context.strokeStyle = $("#paintColour").val();
       } else{
         //white colour to erase
         context.strokeStyle = "white";
       }
       context.lineTo(mouse.x, mouse.y);
       context.stroke();
     }
   });

   container.mouseup(function(){
     paint = false;
   });

   container.mouseleave(function(){
     paint = false;
   });

   $("#erase").click(function(){
     if(paint_erase == "paint"){
       paint_erase = "erase";
     } else{
       paint_erase = "paint";
     }
     $(this).toggleClass("eraseMode");
   });

   $("#reset").click(function(){
     context.clearRect(0,0, canvas.width, canvas.height);
     paint_erase = "paint";
     $("#erase").removeClass("eraseMode");
   });

   $("#save").click(function(){
     if(typeof(localStorage) != null){
       localStorage.setItem("imgCanvas", canvas.toDataURL());
     } else{
       window.alert("Your browser does not support local storage!");
     }
   });


   //Changing colour input
   $("#paintColour").change(function(){
     $("#circle").css("background-color", $(this).val());
   });

   //Changing linewidth using slider
   $("#slider").slider({
     min: 3,
     max: 30,
     slide: function(event, ui){
       $("#circle").height(ui.value);
       $("#circle").width(ui.value);
       context.lineWidth = ui.value;
     }
   });

});
