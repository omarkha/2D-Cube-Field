
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
let boardObstacles2 = [];
let arrowleft = 0;
let reachedBottom = false;
let secondPatchActivated = true;
let downkey = {
    direction: null,
    down: false
};

let gameStarted = false;
let gameEnded = false;
let reemerging = false;

let pause = true;

class Obstacles {
    constructor(id, top, left){
        this.id = id;
        this.top = top;
        this.left = left;
    }
}

let obstacleObjects = [];
let obstacleObjects2 = [];

const board = document.querySelector('.game-board');
const arrow = document.querySelector('#arrow');
const body = document.body;


// Functions

const runningTime = () =>{
    if(pause === false){
        realtimeScore += 25;
        document.querySelector('#current-score').innerText = `${realtimeScore}`;
    }
        
    
}
 


const startGame = function(moveOb, runningT, arrowMove){
    pause = false;
    setInterval(moveObstacles, 5);
    setInterval(runningTime, runningT);
    const emergenceTimer = setInterval(emergeObstacles, 1000);
    const emergenceTimer2 = setInterval(emergeObstacles, 5000);
    const emergenceTimer3 = setInterval(emergeObstacles, 13000);
    const arrowMovement = setInterval(shiftArrow,arrowMove);
    
}





const clearObstacles = function(obstacle){
    
    if(obstacleObjects.includes(obstacle)){
    obstacle.top = 0;
    document.querySelector("#"+obstacle.id).setAttribute("class","");
    document.querySelector("#"+obstacle.id).style = "position: relative; top: " + obstacle.top + "px;";
    obstacleObjects.splice(obstacleObjects.indexOf(obstacle),1);
    }else{
        obstacle.top = 0;
        document.querySelector("#"+obstacle.id).setAttribute("class","");
        document.querySelector("#"+obstacle.id).style = "position: relative; top: " + obstacle.top + "px;";
        obstacleObjects2.splice(obstacleObjects2.indexOf(obstacle),1);
    }
}
let allowedToEmerge1 = true;
let allowedToEmerge2 = false;

const checkRemerge = function() {
    
    /*
    let lowestPos = 0;

    if((boardObstacles.length === 8 && allowedToEmerge1) || (!allowedToEmerge2 && allowedToEmerge1 && reemerging)){

    let array = obstacleObjects.map(element => {
        return parseInt(element.id.replace('s',''));
    })

    reemerging = true;
    
    
    array.sort();

        lowestPos = array[0];    


    let lowestObst = document.querySelector('#s'+lowestPos).getBoundingClientRect();
    
    let basePoint = document.querySelector('#s99').getBoundingClientRect();
    let isOverlappingBase = basePoint.bottom + basePoint.height < lowestObst.bottom; 
        
        if(isOverlappingBase){
            allowedToEmerge2 = true;
            allowedToEmerge1 = false;
            reemerging = true;
            emergeObstacles();
        }
        
     }else if(!allowedToEmerge1 && allowedToEmerge2 && reemerging){

       
        let array2 = obstacleObjects2.map(element => {
            return parseInt(element.id.replace('s',''));
        })
    
        
        
        array2.sort();
    
        let lowestPos2 = array2[0];
    
    
        let lowestObst2 = document.querySelector('#s'+lowestPos2).getBoundingClientRect();
        
        let basePoint2 = document.querySelector('#s99').getBoundingClientRect();
        
        let isOverlappingBase2 = basePoint2.bottom + basePoint2.height < lowestObst2.bottom; 

            if(isOverlappingBase2){
                
                reemerging = true;
                allowedToEmerge1 = true;
                allowedToEmerge2 = false;
                emergeObstacles();
            }
    }
    */
}

const emergeObstacles = function(){



                    
                // set time out here for a pause between displays

                    
                if(!pause && !gameEnded){

                    for(let x=0;x<2;x++){
                    let randColor = "obs-"+Math.ceil(Math.random() * 3);
                    let posID = availablePositions[Math.ceil(Math.random() * availablePositions.length) -1];
                    let newObstacle = new Obstacles(posID,0,0);
                    boardObstacles.push(newObstacle.id);
                    obstacleObjects.push(newObstacle);
                    console.log("adding "+newObstacle.id);
                    document.querySelector("#"+newObstacle.id).setAttribute("class","obstacle "+randColor);
                }

                }
                
    /*
            if(allowedToEmerge1 && !allowedToEmerge2){
                if(boardObstacles.length === 0 || (boardObstacles.length > 0 && reemerging)){
                    for(let x=0;x<8;x++){

                    
                    let randColor = "obs-"+Math.ceil(Math.random() * 3);
                    let posID = availablePositions[Math.ceil(Math.random() * availablePositions.length) -1];

                if(!boardObstacles.includes(posID)){
                    if(boardObstacles.length === 8 && reemerging){
                        x=8;
                        allowedToEmerge2 = true;
                        allowedToEmerge1 = false;
                        reemerging = true;
                        console.log("oB1 emergefunction");
                        console.log(`allowedToEmerge1 = ${allowedToEmerge1} and allowedToEmerge2 = ${allowedToEmerge2}`);
                }else{
                    const newObstacle = new Obstacles(posID,0,0);
                // set time out here for a pause between displays
                    boardObstacles.push(newObstacle.id);
                    obstacleObjects.push(newObstacle);
                    console.log("adding "+newObstacle.id);
                    document.querySelector("#"+newObstacle.id).setAttribute("class","obstacle "+randColor);
                    }
                }
            }
                
                
            }
            }else if(allowedToEmerge2 && !allowedToEmerge1 && reemerging){
                
                if(boardObstacles2.length === 0 || (boardObstacles2.length > 0 && reemerging)){
                for(let x=0;x<8;x++){

                
                 randColor = "obs-"+Math.ceil(Math.random() * 3);
                 posID = availablePositions[Math.ceil(Math.random() * availablePositions.length) -1];

                if(!boardObstacles2.includes(posID)){
                    if(boardObstacles2.length === 8){
                        x=8;
                        allowedToEmerge1 = true;
                        allowedToEmerge2 = false;
                        reemerging = true;
                        console.log("oB2 emergefunction");
                        console.log(`allowedToEmerge1 = ${allowedToEmerge1} and allowedToEmerge2 = ${allowedToEmerge2}`);
                }else{
                    const newObstacle2 = new Obstacles(posID,0,0);
                boardObstacles2.push(newObstacle2.id);
                obstacleObjects2.push(newObstacle2);
                console.log("adding "+newObstacle2.id);
                document.querySelector("#"+newObstacle2.id).setAttribute("class","obstacle "+randColor);
                }
                
            }
            
                
            }
            }

          }
            
        
        */
}
       

const pauseGame = function(bool){
    pause = bool;
}

const gameOver = function(){
    scoreList.push(realtimeScore);
    gameEnded = true;
    scoreList.forEach(element => {
        if(element > topScore){
            topScore = element;
        }
    });
    document.querySelector('#top-score').innerText = topScore;

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
    obstacleObjects2.forEach(element => {
        
        let obstacle2 = document.querySelector('#'+element.id).getBoundingClientRect();


       
       const isInHoriztonalBounds =
            arrow.left < obstacle2.left + obstacle2.width && arrow.left + arrow.width > obstacle2.left;
        const isInVerticalBounds =
            arrow.top < obstacle2.top + obstacle2.height && arrow.top + arrow.height > obstacle2.top;
        const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
       
        const isInHoriztonalBoundsBoard =
        board.left < obstacle2.left + obstacle2.width && board.left + board.width > obstacle2.left;
        const isInVerticalBoundsBoard =
        board.bottom < obstacle2.top + obstacle2.height && board.bottom + board.height > obstacle2.top;
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
            document.querySelector("#arrow").style = "position: relative; left: " + arrowleft + "px; "; 
        }else{
            arrowleft += 1;
            document.querySelector("#arrow").style = "position: relative; left: " + arrowleft + "px; "; 
        }
            
            
    }else if(downkey.direction === 'left' && downkey.down){
        if(board.left > arrow.left - 1){
            arrowleft += 1;
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
                startGame(10,25,1);
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
            clearInterval();
            break;

        case 39 :
            downkey.direction = null;
            downkey.down = false;
            clearInterval();
            break;

        default :
            break;
        }
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