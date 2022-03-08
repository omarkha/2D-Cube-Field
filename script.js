
// Global Variables

let realtimeScore = 0;
let scoreList = [];
let blockPositions = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38];
let topScore = 0;

const board = document.querySelector(".game-board");
const arrow = document.querySelector("#arrow");
const body = document.body;


// Functions

const startGame = function(){

}

const moveObstacles = function(){

}

const shiftObstacles = function(){

}

const obstacleEmerge = function(){
    
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
            alert("left")
            break;

        case 39 :
            alert("right");
            break;

        case 32 :
            alert("space");
            break;

    } 
})