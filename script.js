
// Global Variables

let realtimeScore = 0;
let scoreList = [];
let availablePositions = ['s1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12','s13',
's14','s15','s16','s17','s18','s19','s20','s21','s22','s23','s24','s25','s26','s27','s28','s29',
's30','s31','s32','s33','s34','s35','s36','s37','s38','s39','s40','s41','s42','s43','s44','s45','s46'
,'s47','s48','s49','s50','s51','s52','s53','s54','s55','s56','s57','s58','s59','s60','s61','s62','s63'
,'s64','s65','s66','s67','s68','s69','s70','s71','s72','s73','s74','s75','s76','s77','s78','s79'];
let topScore = 0;
let boardObstacles = [];
let arrowLeft = 0;
let downkey = {
    direction: null,
    down: false
};

let night = true;

let difficulty = 'Easy';

let gameStarted = false;
let gameEnded = false;
let gameReset = false;

let pause = true;

const message = document.querySelector('#msg');

let obstacleObjects = [];

const board = document.querySelector(".game-board");
const arrow = document.querySelector(".arrow");
const body = document.body;

let obstacleMovement;
let timeMovement;
let emergenceTimer;
let emergenceTimer2;
let emergenceTimer3;

let arrowMovement;

let firstScoreRecorded = false;
let topScoreSurpassRecorded = false;

// class for obstacles

class Obstacles {
    constructor(id, top, left){
        this.id = id;
        this.top = top;
        this.left = left;
    }
}

// A class that makes Sound Objects

class PlaySound{

    constructor(src,loop){

    this.sound = document.createElement('audio');

    if(loop === true){

        this.sound.setAttribute("loop",true);

     }
    
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);

    }
    play = () => {
        this.sound.play();
    }
    pause = () => {
        this.sound.pause();
    }
    setVolume = (vlm) => {
        this.sound.volume = vlm;
    }

}

// Sound Objects

const gamethemeSound = new PlaySound("sounds/musictrack1.mp3",true);
const gameoverSound = new PlaySound("sounds/gameover-2.mp3",false);
const collisionSound = new PlaySound("sounds/collision-3.mp3",false);
const topscoreSound = new PlaySound("sounds/topscore.mp3",false);
const topscoreSurpassedSound = new PlaySound("sounds/topscoresurpassed-2.mp3",false);
const exitSound = new PlaySound("sounds/exitsound.mp3",false);
const buttonClickResetSound = new PlaySound("sounds/buttonclick.mp3",false);
const buttonClickEasySound = new PlaySound("sounds/buttonclick.mp3",false);
const buttonClickMediumSound = new PlaySound("sounds/buttonclick.mp3",false);
const buttonClickHardSound = new PlaySound("sounds/buttonclick.mp3",false);
const buttonClickDaySound = new PlaySound("sounds/buttonclick.mp3",false);
const buttonClickNightSound = new PlaySound("sounds/buttonclick.mp3",false);

// Sound Objects for First Page

const firstpageplaySound = new PlaySound("sounds/firstpageplay.mp3",false);
const hoverplaySound = new PlaySound("sounds/hoverplay.mp3",false);

// Functions

const resetGame = function(){

    // sets the id to current-score element to null

    document.querySelector('.current-score').setAttribute("id",null);
    topScoreSurpassRecorded = false;
    // sets all the obstacles to a class of null. So that obstacles are all turned to empty blocks

    availablePositions.forEach(element => {

        document.querySelector("#"+element).setAttribute('class',null);

    })

    // empty the lists

    obstacleObjects = [];
    boardObstacles = [];

    // clearing the intervals

        clearInterval(obstacleMovement);
        clearInterval(arrowMovement);
        clearInterval(timeMovement);
        clearInterval(emergenceTimer);
        clearInterval(emergenceTimer2);
        clearInterval(emergenceTimer3);
    

    gameEnded = false;
    gameStarted = false;
    realtimeScore = 0;
    message.innerText = `Game has been reset`;

    gameReset = true;
}

// this function updates the score

const logScore = function(){

    const newScore = document.createElement('li');

    newScore.innerText = realtimeScore;

    scoreList.push(realtimeScore);

    const list = document.querySelector('#scorelist');

    if(realtimeScore > 100){
        list.appendChild(newScore);
    }
    
    firstScoreRecorded = true;
    
    scoreList.push(realtimeScore);

    scoreList.forEach(element => {
        if(element > topScore){
            topScore = element;
            setTimeout(topscoreSound.play,1620);
        }
    });

    document.querySelector('#top-score').innerText = topScore;

}

// this function, if the game paused and the game has not ended, adds 25 to realtimeScore and updates
// the score element

const runningTime = () =>{

    if(pause === false && !gameEnded){

        realtimeScore += 25;

        document.querySelector(".current-score").innerText = `${realtimeScore}`;

    }

}

/*

time runs. arrowleft not changing. intervention.

if downkey.down record movement. if after a few millisconds arrowleft not changing.

then see which key is down and immediately move towards direction.

*/


// not sure if this is good practice, but I have those variables close to their associated function
// to decrease confusion

let counterArrow = 3;
let counterObstacle = 3;
let speedVar = 1;


const startGame = function(){

    gameStarted = true;
    gameEnded = false;
    gameReset = false;
    if(night){
        board.setAttribute("id","game-board-start");
        setTimeout( () => board.setAttribute("id",null), 500);
    }else{
        board.setAttribute("id","game-board-start-day");
        setTimeout( () => board.setAttribute("id","game-board-day"), 500);
    }
    
    gamethemeSound.play();

    pause = false;

     emergenceTimer = setInterval(emergeObstacles, 1000);
     emergenceTimer2 = setInterval(emergeObstacles, 8000);
     emergenceTimer3 = setInterval(emergeObstacles, 21000);
     timeMovement = setInterval(runningTime, 24);
     
    message.innerText = `Game Started: ${difficulty}`;

    let arrowRunner = function() {
        setTimeout(shiftArrow, -20);
    }
    arrowMovement = setInterval(arrowRunner, 0);
    
    let obstacleRunner = function() {
        setTimeout(moveObstacles, counterObstacle);
    }
    obstacleMovement = setInterval(obstacleRunner, 0);

}


const clearObstacles = function(obstacle){
    
    obstacle.top = 0;
    document.querySelector("#"+obstacle.id).setAttribute("class",null);
    document.querySelector("#"+obstacle.id).style = "position: relative; top: " + obstacle.top + "px;";
    obstacleObjects.splice(obstacleObjects.indexOf(obstacle),1);
    boardObstacles.splice(obstacle.id, 1);

}

// as it's name indicates, this function emerges new obstacles on the board in an algorithmic fassion


const emergeObstacles = function(){

    let randColor;
    if(!pause && !gameEnded){
        const randomNum = Math.ceil((Math.random() * 5) + 2);
                    
        for(let x=0;x<randomNum;x++){

            if(night){
                randColor = "obs-"+Math.ceil(Math.random() * 3);
            }else{
                randColor = "obsd-"+Math.ceil(Math.random() * 3);
            }
                        
            let posID = availablePositions[Math.ceil(Math.random() * availablePositions.length) -1];
                        
            let newObstacle = new Obstacles(posID,0,0);

            if(!boardObstacles.includes(newObstacle.id)){
                boardObstacles.push(newObstacle.id);
                obstacleObjects.push(newObstacle);
                console.log("adding "+newObstacle.id);
                document.querySelector("#"+newObstacle.id).setAttribute("class","obstacle "+randColor);
            }

        }

    }
                
}
       

const checkTopScoreSurpassed = () => {
    if(realtimeScore > topScore && firstScoreRecorded && !topScoreSurpassRecorded){
        topScoreSurpassRecorded = true;
        topscoreSurpassedSound.play();
        message.innerText = "Congrats! Top Score Surpassed!";
        document.querySelector(".current-score").setAttribute("id","current-score-surpassed");
        setTimeout(() => {message.innerText = `Game Started: ${difficulty}`;}, 5000);
    }
}


const pauseGame = function(bool){
    pause = bool;
}

const gameOver = function(){
    gamethemeSound.pause();
    gameEnded = true;
    logScore();

    message.innerText = "Game Over!";
}


const checkCollision = function(objCollidedWith){

    let arrow = document.querySelector('.arrow').getBoundingClientRect();
    let board = document.querySelector('.game-board').getBoundingClientRect();

    obstacleObjects.forEach(element => {
        
        let obstacle = document.querySelector('#'+element.id).getBoundingClientRect();


       
       const isInHoriztonalBounds =
            arrow.left < obstacle.left + obstacle.width && arrow.left + arrow.width > obstacle.left;
        const isInVerticalBounds =
            arrow.top < obstacle.top + obstacle.height && arrow.top + arrow.height > obstacle.top;
        const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
       
        const isInHoriztonalBoundsBoard =
        board.left < obstacle.left + obstacle.width && board.left + board.width > obstacle.left;
        const isInVerticalBoundsBoard =
        board.bottom < obstacle.top + obstacle.height && board.bottom + board.height > obstacle.top;
        const isOverlappingBoard = isInHoriztonalBoundsBoard && isInVerticalBoundsBoard;
        
        if(isOverlapping){
            pause = true;
            collisionSound.play();
            setTimeout(gameoverSound.play,380);
            gameOver();
        }
        
        if(isOverlappingBoard && !gameEnded){
            clearObstacles(element);
        }
    });
}

const moveObstacles = function(){
        
        let obj = null;
        if(pause === false && !gameEnded){
        obstacleObjects.forEach(element => {
            element.top += speedVar;
            element = 
            document.querySelector("#"+element.id).style = "position: relative; top: " + element.top + "px;";
            
        });
        checkCollision();
        checkTopScoreSurpassed();
        }
}

const shiftArrow = function(){
    let x;
    if(document.querySelector('.hard').getAttribute("id") === 'mode-pressed'){
        x = 2;
    }else{
        x = 1;
    }
    

    let arrow = document.querySelector(".arrow").getBoundingClientRect();
    let board = document.querySelector('.game-board').getBoundingClientRect();

    
    if(board.left <= arrow.left && board.right >= arrow.right){

    if(downkey.direction === 'right'&& downkey.down){
        if(board.right <= arrow.right+1){
            arrowLeft -= x;
            console.log(`right ${arrowLeft}`);
            document.querySelector(".arrow").style = "position: relative; left: " + arrowLeft + "px; ";
         
        }else{
            arrowLeft += x;
            console.log(`left ${arrowLeft}`);
            document.querySelector(".arrow").style = "position: relative; left: " + arrowLeft + "px; ";
 
        }
            
            
    }else if(downkey.direction === 'left' && downkey.down){
        if(board.left > arrow.left - 1){
            arrowLeft += x;
            console.log(`left ${arrowLeft}`);
            document.querySelector(".arrow").style = "position: relative; left: " + arrowLeft + "px; "; 
       
        }else{
            arrowLeft -= x;
            console.log(`right ${arrowLeft}`);
            document.querySelector(".arrow").style = "position: relative; left: " + arrowLeft + "px; "; 
    
        }
            
     }

    }
    
}


// Event Listeners

addEventListener('keydown', (e) => {

            
           
        switch(e.keyCode){
        case 37 :
           

                downkey.direction = 'left';
                downkey.down = true;
                
            break;

        case 39 :
            
                downkey.direction = 'right';
                downkey.down = true;
                
            
            
            break;
            case 32 :
                if(pause === true && gameStarted === true && !gameEnded){
                    pauseGame(false);
                    gamethemeSound.play();
                }else if(pause === false && gameStarted === true && !gameEnded){
                    pauseGame(true);
                    gamethemeSound.pause();
                }
                
            break;
        case 13 :
            if((!gameEnded && !gameStarted) || gameReset){
                startGame();
            }
            break;
        default:
            break;
    } 
})

addEventListener('keyup', (e) => {
        switch(e.keyCode){
            case 37 :
            downkey.direction = null;
            downkey.down = false;
            lastKeyPressed = 'left';
            
            break;

        case 39 :
            downkey.direction = null;
            downkey.down = false;
            lastKeyPressed = 'right';
            
            break;
        default :
            break;
        }
})

document.querySelector("#reset").addEventListener('click', function(){
    resetGame();
    buttonClickResetSound.play();
});

document.querySelector(".easy").addEventListener('click',function(){
    speedVar = 1;
    difficulty = "Easy";
    if(gameEnded && !gameStarted){
        message.innerText = `Game set to  ${difficulty}`;
    }else{
        message.innerText = `Game Started:  ${difficulty}`;
    }
    this.setAttribute("id","mode-pressed");
    document.querySelector(".medium").setAttribute("id",null);
    document.querySelector(".hard").setAttribute("id",null);
    buttonClickEasySound.play();
});
document.querySelector(".medium").addEventListener('click',function(){
    speedVar = 1.5;
    difficulty = "Medium";
    if(gameEnded && !gameStarted){
        message.innerText = `Game set to  ${difficulty}`;
    }else{
        message.innerText = `Game Started:  ${difficulty}`;
    }
    document.querySelector(".easy").setAttribute("id",null);
    document.querySelector(".hard").setAttribute("id",null);
    this.setAttribute("id","mode-pressed");
    buttonClickMediumSound.play();
    document.querySelector(".game-board").focus();
});
document.querySelector(".hard").addEventListener('click',function(){
    speedVar = 2.5;
    difficulty = "Hard";
    if(gameEnded && !gameStarted){
        message.innerText = `Game set to  ${difficulty}`;
    }else{
        message.innerText = `Game Started:  ${difficulty}`;
    }
    document.querySelector(".easy").setAttribute("id",null);
    document.querySelector(".medium").setAttribute("id",null);
    this.setAttribute("id","mode-pressed");
    buttonClickHardSound.play();
});

document.querySelector(".day").addEventListener('click',function(){
    night = false;
    board.setAttribute("id","game-board-day");
    this.setAttribute("id","mode-pressed");
    arrow.setAttribute("id","arrow-day");
    document.querySelector(".night").setAttribute("id",null);
    document.querySelector('.game-title').innerText = "2D CubeField: Day Mode"
    buttonClickDaySound.play();
});
document.querySelector(".night").addEventListener('click',function(){
    night = true;
    board.setAttribute("id",null);
    this.setAttribute("id","mode-pressed");
    arrow.setAttribute("id","arrow-night");
    document.querySelector(".day").setAttribute("id",null);
    document.querySelector('.game-title').innerText = "2D CubeField: Night Mode"
    buttonClickNightSound.play();
});

document.querySelector("#exit-page").addEventListener('click', function(){
    exitSound.play();
    setTimeout(() => {location.href = 'index.html'},376)
});

document.querySelector(".slider").addEventListener('change', function(e){
    gamethemeSound.setVolume(e.currentTarget.value / 100);
})
/*

https://stackoverflow.com/questions/9768291/check-collision-between-certain-divs

I used some code snippit from this source:

// a & b are HTMLElements
function overlaps(a, b) {
  const rect1 = a.getBoundingClientRect();
  const rect2 = b.getBoundingClientRect();
  const isInHoriztonalBounds =
    rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
  const isInVerticalBounds =
    rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
  const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
  return isOverlapping;
}

*/