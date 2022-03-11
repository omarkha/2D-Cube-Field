# **2D-Cube-Field**

This is the first of four projects for General Assembly's UX/UI Design immersive.

<br>

![cubefield](https://api.web.gamepix.com/assets/img/600/340/banner/cubefield.png)

<br>

### **Game Idea**

My plan is to create a 2D version of the game Cube Field. The way I'm going to create the game is to set up a board for the game with the assistance of CSS Grid. Then I'm going to have an arrow in the bottom center of the board. As obstacles move towards the arrow coming from the top, the player can hit the left and right arrow keyboard keys to move the arrow away from 
the obstacles. Because if the arrow hits an obstacle, the game is over. 

**Obstacle Blocks** will show in random spots from the **top first couple layers.**

a random number of blocks appear every set amount of time.

there will be easy, medium and hard levels.

The game can be **paused** by the hit of the **spacebar.**

A realtime score will be displayed within the page to show the player their progress.

A log-list of scores will also be displayed on the page to show the player their past performances.

another functionality would be that *the longer the arrow key is held down, the more movement is achieved.*

<br>

## ***Coding Plan***

<br>

### **Setting Up**

I first plan to set up the HTML boilerplate and fill it with the necessary elements. A div for the game board. A child div for the arrow. Then I'm going to style it up with CSS. The board is going to be divided into equal horizontal and vertical blocks with the use of CSS Grid. Afterwards, I'll add the score-log div on the right side of the screen. Then after the board and score-log is finished we move on to JavaScript...

<br>

### **Javascript**

An array of available positions new blocks can occupy corresponding to the top first couple of layers of the game board.

setTimeout function that moves the blocks down towards the arrow every few milliseconds. 

Every set amount of seconds new blocks are introduced at the top. By creating new Obstacle-Block elements using the DOM functions.

Using the Math.random and other math functions, blocks will be placed in the available block positions in the availableSpots array.

A keyboard eventlisener will be added to listen to the hit of the spacebar. At which point the game will be paused. The blocks will hold their place. As it is hit a second time the game resumes.

Another keyboard listener will listen to the left and right arrow keys. If the left arrow key is pressed the arrow position will shift to the right. as

blocks disapear after hitting the bottom of the board, new blocks are added to compensate.

A timer runs that logs the time that has passed from the time the game started to the time it ended. The timer is paused at the hit of the spacebar.

When the game is over the score is logged into the array that keeps score of previous scores, and a new score is added and displayed.

a top score is calculated and displayed.

a night and a day mode added.

as a music theme is repeated when game is started, the volume of the music can be adjusted using a slider. When game is paused so is the game.

<br>

### **Additional Notes**

This is only the blueprint that I'm going to look at while crafting the game. The final product may look different.

[Trello Plan](https://trello.com/b/3R0jwurd/project-1-2d-cube-field)

### Backup Idea: **Brick Out**

I have not deviated too much from the original plan other than deciding it would be best to have easy, medium and hard mode for time sake. Also added sound effects, music track, advanced stylization, volume slider for music, added new font from Google Fonts, intigrated an exist button and a reset button. 