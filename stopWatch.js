$(function(){
// set variables
    var mode = 0;
    var timeCounter = 0;
    var lapCounter = 0;
    var action;
    var lapNumber = 0;
    var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;
    
// on app load show start and lap buttons
    hideShowButtons("#startButton", "#lapButton");
// click on startButton
    $("#startButton").click(function(){
        mode = 1;
        hideShowButtons("#stopButton", "#lapButton");
        startAction();
    });
// click on stopButton
    $("#stopButton").click(function(){
       hideShowButtons("#resumeButton", "#resetButton");
        clearInterval(action);
    });
//click on resumeButton
    $("#resumeButton").click(function(){
        hideShowButtons("#stopButton", "#lapButton");
        startAction();
    });
// click on resetButton
    $("#resetButton").click(function(){
        location.reload();
    });
//click on lapButton
    $("#lapButton").click(function(){
        if(mode){
            clearInterval(action);
            lapCounter = 0;
            addLap();
            startAction();
        }
    });    
    
// functions   
// show only two buttons  
    function hideShowButtons(x, y){
        $(".control").hide();
        $(x).show();
        $(y).show();
    }
// start counters
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
        },10)
    }
//updateTime converts counters into min/sec/centi
    function updateTime(){
        timeMinutes = Math.floor(timeCounter/6000);
        timeSeconds = Math.floor((timeCounter%6000)/100);
        timeCentiseconds = (timeCounter%6000)%100;
        $("#timeMin").text(format(timeMinutes));
        $("#timeSec").text(format(timeSeconds));
        $("#timeCenti").text(format(timeCentiseconds));
        lapMinutes = Math.floor(timeCounter/6000);
        lapSeconds = Math.floor((timeCounter%6000)/100);
        lapCentiseconds = (timeCounter%6000)%100;
        $("#lapMin").text(format(lapMinutes));
        $("#lapSec").text(format(lapSeconds));
        $("#lapCenti").text(format(lapCentiseconds));
    }
// formating numbers
    function format(number){
        if(number<10){
            return '0'+number;
        }else{
            return number;
        }
    }
// print lap details in lapbox
    function addLap(){
        lapNumber++;
        var myLapDetails =
            '<div class="lap">'+
                '<div class="lapTimeTitle">'+
                    'Lap'+ lapNumber +
                '</div>'+
                '<div class="lapTime">'+
                    '<span>'+ format(lapMinutes)+ '</span>'+
                    ':<span>'+ format(lapSeconds)+ '</span>'+
                    ':<span>'+ format(lapCentiseconds)+ '</span>'+
                '</div>'+
            '</div>';
        $(myLapDetails).prependTo("#laps");
    }
})