
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

let pause = true;

class Obstacles {
    constructor(id, top, left){
        this.id = id;
        this.top = top;
        this.left = left;
    }
}

let obstacleObjects = [];

const board = document.querySelector('.game-board');
const arrow = document.querySelector('#arrow');
const body = document.body;


// Functions

const gameRotation = function(){
   for(let i=0 ; i < 8 ; i++){
        setTimeout(emergeObstacles(), 236);
        
   }
        
}

const clearObstacles = function(obstacle){
    obstacle.top = 0;
    document.querySelector("#"+obstacle.id).setAttribute("class","");
    document.querySelector("#"+obstacle.id).style = "position: relative; top: " + obstacle.top + "px;";
    obstacleObjects.splice(obstacleObjects.indexOf(obstacle),1);
}

const checkForReemerging = () => {

    let lowestPos = null;
    let obstacle = null;
    obstacleObjects.sort();
    alert(obstacleObjects);
    obstacleObjects.forEach(element => {
        obstacle = document.querySelector("#" + element.id);

        const isInHoriztonalBoundsBase =
        board.left < obstacle.left + obstacle.width && board.left + board.width > obstacle.left;
        const isInVerticalBoundsBase =
        board.bottom < obstacle.top + obstacle.height && board.bottom + board.height > obstacle.top;
        const isOverlappingBoard = isInHoriztonalBoundsBoard && isInVerticalBoundsBoard;


    })

    

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
        }
        
        if(isOverlappingBoard){
            clearObstacles(element);
        }
    });



}

const startGame = function(){
    pause = false;
    gameRotation();
    setInterval(moveObstacles, 23);
}

const moveObstacles = function(){
    
        let obj = null;
        obstacleObjects.forEach(element => {
            element.top++;
            obj = document.querySelector("#"+element.id).getBoundingClientRect();
            element = 
            document.querySelector("#"+element.id).style = "position: relative; top: " + element.top + "px;"; 
        });
        checkCollision();
}

const shiftObstacles = function(){
    


    if(downkey.direction === 'right' && downkey.down){
            arrowleft += 8;
            document.querySelector("#arrow").style = "position: relative; left: " + arrowleft + "px; transition:left 0.15s ease-out;"; 
            
    }else if(downkey.direction === 'left' && downkey.down){
            arrowleft -= 8;
            document.querySelector("#arrow").style = "position: relative; left: " + arrowleft + "px; transition:left 0.15s ease-out;"; 
             }
    

    
}

const emergeObstacles = function(){


    while(boardObstacles.length < 8){
        let posID = availablePositions[Math.ceil(Math.random() * availablePositions.length) -1];
        if(boardObstacles.includes(posID)){
            console.log("includes " + posID);
        }else{
            const newObstacle = new Obstacles(posID,0,0);
            boardObstacles.push(newObstacle.id);
            obstacleObjects.push(newObstacle);
            console.log("adding "+newObstacle.id);
            document.querySelector("#"+newObstacle.id).setAttribute("class","obstacle");
        }
        
    }
    



    /* the below code does the following:
    constant x hold the value of a random number between 0 and the length of the
    avaialable positions array.
    if the array includes the position that was randomized then the board will recieve
    an obstacle in that position; then the position is temporarily removed from the array as a possible spot.
    

    
    if(availablePositions.includes(availablePositions[x])){
        const newObstacle = new Obstacles(availablePositions[x],0,0);
        obstacleObjects.push(newObstacle);
        boardObstacles.push(availablePositions[x]);
        document.querySelector('.game-board').children[x].setAttribute("class","obstacle");
        availablePositions.splice(availablePositions.indexOf(availablePositions[x]),1);
    }
    */
}

const pauseGame = function(){

}

const gameOver = function(){

}

// Event Listeners

addEventListener('keydown', (e) => {
    // left arrow key
    switch(e.keyCode){
        case 37 :
            downkey.direction = 'left';
            downkey.down = true;
            shiftObstacles();
            break;

        case 39 :
            downkey.direction = 'right';
            downkey.down = true;
            shiftObstacles();
            break;

        case 32 :
            if(pause === true){
                pause = false;
                startGame();
            }else{
                pause = true;
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