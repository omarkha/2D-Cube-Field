
// Global Variables

let realtimeScore = 0;
let scoreList = [];
let availablePositions = ['s1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12','s13',
's14','s15','s16','s17','s18','s19','s20','s21','s22','s23','s24','s25','s26','s27','s28','s29',
's30','s31','s32','s33','s34','s35','s36','s37','s38','s39'];
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

const emergeObstacles = function(){


    /* the below code does the following:
    constant x hold the value of a random number between 0 and the length of the
    avaialable positions array.
    if the array includes the position that was randomized then the board will recieve
    an obstacle in that position; then the position is temporarily removed from the array as a possible spot.
    */

    const x = Math.ceil(Math.random() * availablePositions.length) -1;
    console.log(x);
    if(availablePositions.includes(availablePositions[x])){
        board.children[x].setAttribute("class","obstacle");
        choices.splice(availablePositions.indexOf(availablePositions[x]),1);
    }
    
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
            emergeObstacles();
            alert("space");
            break;

    } 
})