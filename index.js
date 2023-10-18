let buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;


function animatePress(currentColor){
    $(`.${currentColor}`).addClass('pressed');
    setTimeout(function() {
        $(`.${currentColor}`).removeClass('pressed');
    }, 100);

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;

}

function gameOver(){
    playSound('wrong');
    $('h1').text('Game over, Press Any Key To Restart');
    $('body').addClass('game-over');
    setTimeout(function(){
        $('body').removeClass('game-over');
    }, 100);
    startOver();
}
 
function playSound(name){
    let audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
}

function checkAnswer(currentLevel){
    console.log(currentLevel);
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(()=>{
                nextSequence();
            },1000);
        }
    }else{
        gameOver();      
    }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $('h1').text(`Level ${level}`);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}
$('.btn').on('click', function(){
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
   

})

$(document).on('keypress', function(){
    if(!started){
        $('h1').text(`Level ${level}`);
        nextSequence();
        started = true;
    }
    
})