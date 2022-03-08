
// Global Variables

let realtimeScore = 0;
let scoreList = [];
let blockPositions = [];
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