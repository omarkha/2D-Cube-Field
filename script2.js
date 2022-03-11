
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

}


const firstpageplaySound = new PlaySound("sounds/firstpageplay.mp3",false);


document.querySelector(".gotoplaypage").addEventListener('click', function(){
    firstpageplaySound.play();
    setTimeout(() => location.href = 'game.html', 376);
});