var started = false;
var score, trialsLeft, step, action;
var fruits = ["apple","banana","cherries","grapes","mangos","pear","pineapple"];

$(document).ready(function(){

  $("#startreset").click(function(){
    if(started){
      location.reload();      //Reloads the page
    }else{
      started = true;
      trialsLeft = 3;
      score = 0;
      $("#scoreValue").html(score);

      $("#trialsLeft").show();
      addHearts();

      $("#gameOver").hide();

      $("#startreset").html("Reset Game");    //Changing button text to "reset game"
      startAction();
    }
  });

  $("#fruit1").mouseover(function(){
    score++;
    $("#scoreValue").html(score);
//    document.getElementById('sliceSound').play();   //Javascript version
    $("#sliceSound")[0].play();       //Playing the slicing sound

    //Stop fruit
    clearInterval(action);
    $("#fruit1").hide("explode",500);     //Slicing the fruit animation

    //Sending new fruit
    setTimeout(startAction, 550);
  });


  //Adding hearts to the trials left box
  function addHearts(){
    $("#trialsLeft").empty();
    for(i=0; i<trialsLeft; i++){
      $("#trialsLeft").append('<img src="images/heart.png" class="lifesImage">');
    }
  }

  //Start sending fruits
  function startAction(){
    $("#fruit1").show();
    chooseFruit();
    $("#fruit1").css({'left':Math.round(Math.random()*550),'top':-50});     //Giving the fruits random positions

    step = 1+ Math.round(Math.random()*5);             //Generating a random step to move the fruit by
    action = setInterval(function(){                   //Moving fruit down every 10ms
      $("#fruit1").css('top', $("#fruit1").position().top + step);

      //Checking if fruit is too low
      if($("#fruit1").position().top > $("#fruitsContainer").height()){
        if(trialsLeft>1){
          trialsLeft--;

          $("#fruit1").show();
          chooseFruit();
          $("#fruit1").css({'left':Math.round(Math.random()*550),'top':-50});
          step = 1+ Math.round(Math.random()*5);
          addHearts();  //Adjusting the number of hearts in the trials left box

        }else{  //Game Over
          started = false;
          $("#startreset").html("Start Game");
          $("#gameOver").show();
          $("#gameOver").html("<p>GAME OVER!<p/><p>YOUR SCORE IS "+score+"<p/>");
          $("#trialsLeft").hide();
          stopAction();
        }
      }
    }, 10);
  }

  //Choose a random fruit
  function chooseFruit(){
    $("#fruit1").attr('src', 'images/'+fruits[Math.floor(Math.random()*7)]+'.png');
  }

  //Stop dropping fruits
  function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
  }

});
