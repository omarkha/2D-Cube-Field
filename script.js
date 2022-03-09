
// Global Variables

let realtimeScore = 0;
let scoreList = [];
let availablePositions = ['s1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12','s13',
's14','s15','s16','s17','s18','s19','s20','s21','s22','s23','s24','s25','s26','s27','s28','s29',
's30','s31','s32','s33','s34','s35','s36','s37','s38','s39','s40','s41','s42','s43','s44','s45','s46'
,'s47','s48','s49','s50','s51','s52','s53','s54','s55','s56','s57','s58','s59','s60','s61','s62','s63'
,'s64','s65','s66','s67','s68','s69','s70','s71','s72','s73','s74','s75','s76','s77','s78','s79','s80'
,'s81','s82','s83','s84','s85','s86','s87','s88','s89','s90','s91','s92'];
let topScore = 0;
let boardObstacles = [];
let arrowleft = 0;
let downkey = {
    direction: null,
    down: false
};

let gameStarted = false;
let gameEnded = false;
let reemerging = false;

let pause = true;

const message = document.querySelector('#msg');

class Obstacles {
    constructor(id, top, left){
        this.id = id;
        this.top = top;
        this.left = left;
    }
}

let obstacleObjects = [];
let obstacleObjects2 = [];


let level = 0;

const board = document.querySelector('.game-board');
const arrow = document.querySelector('#arrow');
const body = document.body;



// Functions

const restartGame = function(){
    obstacleObjects.forEach(element => {
       clearObstacles(element);
    });
    gameEnded = false;
    clearInterval(obstacleModement);
    clearInterval(arrowMovement);
    clearInterval(obstacleModementBoost);
    clearInterval(arrowMovementBoost);
    clearInterval(timeMovement);
    clearInterval(emergenceTimer);
    clearInterval(emergenceTimer2);
    startGame(24,24,1);
    level = 1;
    message.innerText = "Level "+level+" : Game Started!";
}

const logScore = function(){
    const newScore = document.createElement('li');
    newScore.innerText = realtimeScore;
    const list = document.querySelector('#scorelist');
    list.appendChild(newScore);
    document.querySelector('#top-score').innerText = topScore;
    scoreList.push(realtimeScore);
}

const boostMode = (arrowM) => {
    message.innerText = `Level ${level} : Started!`
    obstacleModementBoost = setInterval(moveObstacles, 5);
    arrowMovementBoost = setInterval(shiftArrow, 5);
    
}

const runningTime = () =>{
    if(pause === false){
        realtimeScore += 25;
        document.querySelector('#current-score').innerText = `${realtimeScore}`;
    }
    
    if(realtimeScore === 500 || realtimeScore === 10000 ||
         realtimeScore === 20000){
        message.innerText = "Get Ready for Next Level"
        setTimeout(() => {
            level += 1;
            board.setAttribute("id","game-board-level-change")
            boostMode()
            
        }, 3000);;
        if(realtimeScore === 7000 || realtimeScore === 15000 ||realtimeScore === 140000 ){
            board.setAttribute("id","x")
        }
    }

}

let obstacleModementBoost;
let arrowMovementBoost;

let obstacleModement;
let timeMovement;
let emergenceTimer;
let emergenceTimer2;
let arrowMovement;


const startGame = function(moveOb, runningT, arrowMove){
    board.setAttribute("id","game-board-start");
    pause = false;
    level = 1;
     obstacleModement = setInterval(moveObstacles, 5);
     timeMovement = setInterval(runningTime, runningT);
     emergenceTimer = setInterval(emergeObstacles, 3000);
     emergenceTimer2 = setInterval(emergeObstacles, 8000);
     arrowMovement = setInterval(shiftArrow,arrowMove);
    message.innerText = "Level 1 : Started!";
}





const clearObstacles = function(obstacle){
    
    obstacle.top = 0;
    document.querySelector("#"+obstacle.id).setAttribute("class","");
    document.querySelector("#"+obstacle.id).style = "position: relative; top: " + obstacle.top + "px;";
    obstacleObjects.splice(obstacleObjects.indexOf(obstacle),1);

}


const emergeObstacles = function(){



                    
                // set time out here for a pause between displays

                    
                if(!pause && !gameEnded){
                    const randomNum = Math.ceil(Math.random() * 3);
                    for(let x=0;x<randomNum;x++){
                    let randColor = "obs-"+Math.ceil(Math.random() * 3);
                    let posID = availablePositions[Math.ceil(Math.random() * availablePositions.length) -1];
                    let newObstacle = new Obstacles(posID,0,0);
                    boardObstacles.push(newObstacle.id);
                    obstacleObjects.push(newObstacle);
                    console.log("adding "+newObstacle.id);
                    document.querySelector("#"+newObstacle.id).setAttribute("class","obstacle "+randColor);
                }

                }
                
}
       

const pauseGame = function(bool){
    pause = bool;
}

const gameOver = function(){
    gameEnded = true;
    scoreList.forEach(element => {
        if(element > topScore){
            topScore = element;
        }
    });
    logScore();
}

const checkCollision = function(objCollidedWith){

    let arrow = document.querySelector('#arrow').getBoundingClientRect();
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
            alert("collision");
            pause = true;
            gameOver();
        }
        
        if(isOverlappingBoard){
            clearObstacles(element);
        }
    });
}

const moveObstacles = function(){
        
        let obj = null;
        if(pause === false){
        obstacleObjects.forEach(element => {
            element.top++;
            obj = document.querySelector("#"+element.id).getBoundingClientRect();
            element = 
            document.querySelector("#"+element.id).style = "position: relative; top: " + element.top + "px;";
            
        });
        checkCollision();
        }
}

const shiftArrow = function(){
    
    let x = 1;

    let arrow = document.querySelector("#arrow").getBoundingClientRect();
    let board = document.querySelector('.game-board').getBoundingClientRect();

    
    if(board.left <= arrow.left && board.right >= arrow.right){

    if(downkey.direction === 'right' && downkey.down){
        if(board.right <= arrow.right+1){
            arrowleft -= x;
            document.querySelector("#arrow").style = "position: relative; left: " + arrowleft + "px;"; 
        }else{
            arrowleft += x;
            document.querySelector("#arrow").style = "position: relative; left: " + arrowleft + "px;"; 
        }
            
            
    }else if(downkey.direction === 'left' && downkey.down){
        if(board.left > arrow.left - 1){
            arrowleft += x;
            document.querySelector("#arrow").style = "position: relative; left: " + arrowleft + "px; "; 
        }else{
            arrowleft -= x;
            document.querySelector("#arrow").style = "position: relative; left: " + arrowleft + "px; "; 
        }
            
     }
    
    }
    
}




const moveArrow = (int) => {

    const interval = setInterval(shiftArrow,int);
    
}




// Event Listeners

addEventListener('keydown', (e) => {
    // left arrow key
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
            if(pause === true && gameStarted === true){
                pauseGame(false);
            }else if(pause === false && gameStarted === true){
                pauseGame(true);

            }else if(gameStarted === false){
                startGame(24,24,1);
                gameStarted = true;
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

            break;

        case 39 :
            downkey.direction = null;
            downkey.down = false;
            
            break;

        default :
            break;
        }
})

document.querySelector("#restart").addEventListener('click', () => {
    restartGame();
});


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