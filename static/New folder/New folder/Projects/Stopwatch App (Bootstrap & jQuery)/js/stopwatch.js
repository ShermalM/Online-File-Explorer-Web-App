$(document).ready(function(){
  var mode = false;
  var timeCounter = 0;
  var lapCounter = 0;
  var lapNumber = 0;      //Number of laps done
  var action;             //Variable for setInterval
  var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;

  hideshowButtons("#startButton","#lapButton");

  $("#startButton").click(function(){
    mode = true;
    hideshowButtons("#stopButton","#lapButton");
    startAction();
  });

$("#stopButton").click(function(){
  hideshowButtons("#resumeButton", "#resetButton");
  clearInterval(action);
});

$("#resumeButton").click(function(){
  hideshowButtons("#stopButton","#lapButton");
  startAction();
});

$("#resetButton").click(function(){
  location.reload();
});

$("#lapButton").click(function(){
  if(mode){
    clearInterval(action);
    lapNumber++;
    lapCounter = 0;
    addLap();
    startAction();
  }
});

//Functions

//Hiding and showing the different control buttons based on the mode
function hideshowButtons(id1, id2){
    $(".control").hide();
    $(id1).show();
    $(id2).show();
}

//Starts the counter
function startAction(){
  action = setInterval(function(){
    timeCounter++;
    if(timeCounter == 100*60*100){
      timeCounter = 0;
    }
    lapCounter++;
    if(lapCounter == 100*60*100){
      lapCounter = 0;
    }
    updateTime();
  }, 10);
}

//Converts counters to minutes, seconds, and centiseconds
function updateTime(){
  //1min = 60 * 100 centiseconds = 6000 centiseconds
  timeMinutes = Math.floor(timeCounter/6000);
  //1sec = 100 centiseconds
  timeSeconds = Math.floor((timeCounter%6000)/100);
  timeCentiseconds = (timeCounter%6000)%100;

  $("#timeminute").text(format(timeMinutes));
  $("#timesecond").text(format(timeSeconds));
  $("#timecentisecond").text(format(timeCentiseconds));


  //1min = 60 * 100 centiseconds = 6000 centiseconds
  lapMinutes = Math.floor(lapCounter/6000);
  //1sec = 100 centiseconds
  lapSeconds = Math.floor((lapCounter%6000)/100);
  lapCentiseconds = (lapCounter%6000)%100;

  $("#lapminute").text(format(lapMinutes));
  $("#lapsecond").text(format(lapSeconds));
  $("#lapcentisecond").text(format(lapCentiseconds));
}

//format numbers
function format(number){
  if(number < 10)
    return '0'+number;
  else
    return number;
}

// Print the lap details inside the lap box
function addLap(){
  var myLapDetails =
  '<div class="lap">'+
    '<div class="laptimetitle">'+
      'Lap '+ lapNumber +
    '</div>'+
    '<div class="laptime">'+
      '<span>'+ format(lapMinutes) + '</span>:'+
      '<span>'+ format(lapSeconds) + '</span>:'+
      '<span>'+ format(lapCentiseconds) + '</span>'+
    '</div>'+
  '</div>';
  $(myLapDetails).prependTo("#laps");
}

});
