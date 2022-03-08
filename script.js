
// Global Variables

let realtimeScore = 0;
let scoreList = [];
let availablePositions = ['s1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12','s13',
's14','s15','s16','s17','s18','s19','s20','s21','s22','s23','s24','s25','s26','s27','s28','s29',
's30','s31','s32','s33','s34','s35','s36','s37','s38','s39'];
let topScore = 0;
let boardObstacles = [];

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

const checkCollision = function(){

    let rect = document.querySelector('#arrow').getBoundingClientRect();
    let x = null;

    obstacleObjects.forEach(element => {

        x = document.querySelector('#'+element.id).getBoundingClientRect();
        
        if(x.top == rect.top){
            alert("collision");
        }
        
    });

}

const startGame = function(){
    pause = false;
    gameRotation();
    setInterval(moveObstacles, 23);
}

const moveObstacles = function(){
    
    
        obstacleObjects.forEach(element => {
            element.top++;
            document.querySelector("#"+element.id).style = "position: relative; top: " + element.top + "px;"; 
        });
        checkCollision();
}

const shiftObstacles = function(){

}

const emergeObstacles = function(){


    while(boardObstacles.length < 13){
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
            collision();
            break;

        case 39 :
            alert("right");
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