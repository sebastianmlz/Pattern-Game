
const buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
let userClickedPattern = [];
var started = false;
var level = 0;

function nextSquence(){
    var randomNumber = Math.floor(Math.random() * 4) ;
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    //console.log(gamePattern);
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    animatePress(randomChosenColour);
    playSounds(randomChosenColour);
    level++;
    $("#level-title").text("level "+ level);
}

function playSounds(name){
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSquence();
                userClickedPattern = [];
            }, 1000);
        }
        
    }else{
        console.log("wrong");
        playSounds("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any key to Restart");
        userClickedPattern = [];
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

$(document).on("keypress",function(){
    if(started == false){
        nextSquence();
        started = true;
    } 
})

$(".btn").on("click",function(event){
    var name = event.target.id;
    animatePress(name);
    playSounds(name);
    // nextSquence();
})

$(".btn").on("click",function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length-1)
    //console.log(userClickedPattern.length-1);
})





