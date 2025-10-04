// Game Instance Classes
// A.) FILL CODE





function setScoreDisplay(score){
    document.getElementById("score-label").innerHTML = "Score: " + score;
}

function setTimeDisplay(time){
    document.getElementById("time-label").innerHTML = "Time: " + time;
}

function addImageToGrid(imgsrc, width, height, x, y){

    // x, y must be an integer in [1,8]

    const newImage = document.createElement('img');
    newImage.src = imgsrc;
    newImage.alt = "";
    newImage.classList.add('absolute');
    newImage.classList.add('x-' + x);
    newImage.classList.add('y-' + y);
    newImage.classList.add('width-' + width);
    newImage.classList.add('height-' + height);




    const container = document.getElementById('game');
    container.appendChild(newImage);
}


function randomBug(){
    const bugNames = ["Ant", "Beetle", "Cockroach", "Dragonfly", "FatCockroach", "Ladybug"];
    const bugType = Math.floor(Math.random() * 6);
    const posX = Math.floor(Math.random() * 8) + 1;
    const posY = Math.floor(Math.random() * 8) + 1;
    console.log(bugNames[bugType] + " at (" + posX + ", " + posY + ")")
}



export function startGame(){
    console.log("Game started");
    setScoreDisplay(0);
    setTimeDisplay(120);
    addImageToGrid("images/insects/dragonfly.png", 16, 16, 1, 1)
    addImageToGrid("images/insects/ant.png", 5, 5, 5, 5)
    addImageToGrid("images/insects/ant.png", 5, 5, 8, 8)
    randomBug();
    randomBug();
    randomBug();
}


export function endGame(score){
    // If new high score is achieved, save it do the database
    // Then for any cases, add game results
}

