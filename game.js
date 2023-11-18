var userclickedpattern=[];
var gamepattern=[];
var buttoncolours=["red","blue","green","yellow"];
var started=false;
var level=0;
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level "+level);
        nextSequence();
        started=true;
    }
});
$(".btn").click(function(){
      var userchoosencolour=$(this).attr("id");
      userclickedpattern.push(userchoosencolour);
      playsound(userchoosencolour);
      animatepress(userchoosencolour);
      checkAnswer(userclickedpattern.length-1);
      
});
function checkAnswer(currentLevel) {

    if (gamepattern[currentLevel] === userclickedpattern[currentLevel]) {
      if (userclickedpattern.length === gamepattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playsound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function nextSequence(){
    userclickedpattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomnumber=Math.floor(Math.random()*4);
    var randomchoosencolour=buttoncolours[randomnumber];
    gamepattern.push(randomchoosencolour);
    $("#"+randomchoosencolour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomchoosencolour);
}
function playsound(name){
    var sound="sounds/"+name+".mp3";
    var audio= new Audio(sound);
    audio.play();
}
function animatepress(name){
       $("#"+name).addClass("pressed");
       setTimeout(function(){
        $("#"+name).removeClass("pressed");
       },100);
}
function startover(){
    level=0;
    gamepattern=[];
    started=false;
}