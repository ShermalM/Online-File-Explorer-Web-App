var started = false;
var score,action,timeRemaining,correctAnswer, correctPosition;

document.getElementById('startreset').onclick = function(){
  if(!started){       //We now start the game
    started = true;
    score = 0;
    timeRemaining = 60;
    document.getElementById('scoreValue').innerHTML = score;
    showElement("timeRemaining");   //Making the time remaining div visible now
    document.getElementById('startreset').innerHTML = "Reset Game";
    hideElement("gameOver");
    startCountdown();

    //Generate a question and multiple answers
    generateQA();

  }else{            //Resetting the game
    location.reload(); //Reload page
  }
}

//Clicking on an answer box
for(i=1;i<5;i++){
  document.getElementById('box'+i).onclick = function(){
    if(started){        //Checking if we started the game
      if(this.innerHTML == correctAnswer){
        score++;
        document.getElementById('scoreValue').innerHTML = score;
        hideElement("wrong");
        showElement("correct");
        setTimeout(function(){
          hideElement("correct");
        },1000);

        //Generate new Q&A
        generateQA();
      }
      else{
        hideElement("correct");
        showElement("wrong");
        setTimeout(function(){
          hideElement("wrong");
        },1000);
      }
    }
  }
}


function startCountdown(){
  action = setInterval(function(){
    timeRemaining--;
    document.getElementById('timeRemainingValue').innerHTML = timeRemaining+"s";
    if(timeRemaining == 0){      //Game Over
      clearInterval(action);          //Stops the countdown
      showElement("gameOver");        //Making the GAME OVER div visible now
      document.getElementById("gameOver").innerHTML = "<p>GAME OVER!</p><p>Your score is "+ score +"</p>";
      hideElement("timeRemaining");        //Making the time remaining div disappear again
      hideElement("correct");
      hideElement("wrong");
      started = false;
      document.getElementById('startreset').innerHTML = "Start Game";
    }
  },1000);
}

function hideElement(id){
  document.getElementById(id).style.display = "none";
}

function showElement(id){
  document.getElementById(id).style.display = "block";
}

function generateQA(){
  var x = Math.round(Math.random()*9)+1;
  var y = Math.round(Math.random()*9)+1;
  correctAnswer = x*y;

  document.getElementById('questionBox').innerHTML = x +"x"+ y;
  correctPosition = Math.round(Math.random()*3)+1;
  document.getElementById("box"+correctPosition).innerHTML = correctAnswer;   //Filled one box with the correct answer

  //Filling other boxes with wrong answers
  var wrongAnswer;
  var answers = [correctAnswer];

  for(i=1;i<5;i++){
    if(i != correctPosition){
      do{
        wrongAnswer = (Math.round(Math.random()*9)+1) * (Math.round(Math.random()*9)+1);
      } while(answers.indexOf(wrongAnswer) > -1)                      //Just incase wrongAnswer has been generated before
      document.getElementById('box'+i).innerHTML = wrongAnswer;
      answers.push(wrongAnswer);
    }
  }
}
