// Game Instance Classes

//const Phaser = require("phaser"); fuck this

// A.) FILL CODE
import { getHighScore, setHighScore, getUsername} from "/script/main.js";
import {createNewPlayer, getPlayerByName, createNewResult, getLeaderboard, setNewHighScore, setNewAvatar} from "./apiconnect.js";


//for responsive
let e = document.getElementById('gameContainer').getBoundingClientRect();
console.log(e.width)
console.log(e.height)
var sizes = {
    width: e.width,
    height: e.height
}

// create gameScene
let gameScene = new Phaser.Scene('Game');


//set config
let config = {
    type: Phaser.AUTO,
    width: sizes.width,
    height: sizes.height,
    scene: gameScene,
    parent: 'gameContainer',
    //scale to fit the container
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    callbacks: {
        postBoot: function (game) {
          game.canvas.style.width = '100%';
          game.canvas.style.height = '100%';
        }
      },
    backgroundColor: '#FFFFFF' // color of scene background
}

//game variable
let score = 0;
let mode = 0; // 0; normal, 1; magnified, 2; x2, 3; moving, 4; shrink
let tim = 119;
let itemCount = 0;
let fc = 0;
let bugCount = 0;

let antfc = 0;
let beetlefc = 0;
let cockroachfc = 0;
let dragonflyfc = 0;
let fatcfc = 0;
let ladybugfc = 0;

let bugScale = {
    ant : 0.4,
    beetle : 0.04,
    cockroach : 0.04,
    dragonfly : 0.04,
    fatc : 0.04,
    ladybug : 0.04
}


//game function===========================================================
//random spawn
function getRandomX(){
    return Math.floor(Math.random()*sizes.width);
}
function getRandomY(){
    return Math.floor(Math.random()*sizes.height);
}
function getRandomR(){
    return Math.floor(Math.random()*360);
}
function relocate(bug) {
    bug.setPosition(getRandomX(), getRandomY());
    bug.angle = getRandomR();
}

//spawn bug
function spawnBug(){
    let a = Math.floor(Math.random()*6);
    switch (a){
        case 0:
            relocate(gameScene.ant);
            gameScene.ant.visible = true;
            antfc = 0;
            break;
        case 1:
            relocate(gameScene.beetle);
            gameScene.beetle.visible = true;
            beetlefc = 0;
            break;
        case 2:
            relocate(gameScene.cockroach);
            gameScene.cockroach.visible = true;
            cockroachfc = 0;
            break;
        case 3:
            relocate(gameScene.dragonfly);
            gameScene.dragonfly.visible = true;
            dragonflyfc = 0;
            break;
        case 4:
            relocate(gameScene.fatc);
            gameScene.fatc.visible = true;
            fatcfc = 0;
            break;
        case 5:
            relocate(gameScene.ladybug);
            gameScene.ladybug.visible = true;
            ladybugfc = 0;
            break;
        default :
            relocate(gameScene.ant);
            gameScene.ant.visible = true;
            antfc = 0;
    }
    bugCount += 1;

}

//on click event
function clickOnNormalBug(bug){
    score += 100;
    setBugInvisible(bug);
    spawnBug();
}
function clickOnUnnormalBug(bug){
    score += 150;
    setBugInvisible(bug);
    spawnBug();
}
function clickOnBug(bug){
    switch(mode){
        case 0:
            clickOnNormalBug(bug);
            break;
        case 1:
            clickOnNormalBug(bug);
            break;
        case 2:
            clickOnNormalBug(bug);
            score += 100;
            break;
        case 3:
            clickOnUnnormalBug(bug);
            break;
        case 4:
            clickOnUnnormalBug(bug);
            break;
        default:
            clickOnNormalBug(bug);
            mode = 0;
    }
    console.log(bugCount);
}
function clickOnBg(){
    score -= 40;
}
function clickOnMagnify(){
    setItemInvisible();
    mode = 1;
    //perform effect
    gameScene.ant.setScale(bugScale.ant*2);
    gameScene.beetle.setScale(bugScale.beetle*2);
    gameScene.cockroach.setScale(bugScale.cockroach*2);
    gameScene.dragonfly.setScale(bugScale.dragonfly*2);
    gameScene.fatc.setScale(bugScale.fatc*2);
    gameScene.ladybug.setScale(bugScale.ladybug*2);

    //back to normal
    let t = setTimeout(backToNormal, 5000);
}
function clickOnX2(){
    setItemInvisible();
    mode = 2;
    let t = setTimeout(backToNormal, 5000);
}
function clickOnMove(){
    setItemInvisible();
    mode = 3;
    let t = setTimeout(backToNormal, 5000);

}
function clickOnShrink(){
    setItemInvisible();
    mode = 4;
    //perform effect
    gameScene.ant.setScale(bugScale.ant/2);
    gameScene.beetle.setScale(bugScale.beetle/2);
    gameScene.cockroach.setScale(bugScale.cockroach/2);
    gameScene.dragonfly.setScale(bugScale.dragonfly/2);
    gameScene.fatc.setScale(bugScale.fatc/2);
    gameScene.ladybug.setScale(bugScale.ladybug/2);

    //back to normal
    let t = setTimeout(backToNormal, 5000);
}

//function to get back to normal mode
function backToNormal(){
    mode = 0;
    gameScene.ant.setScale(bugScale.ant);
    gameScene.beetle.setScale(bugScale.beetle);
    gameScene.cockroach.setScale(bugScale.cockroach);
    gameScene.dragonfly.setScale(bugScale.dragonfly);
    gameScene.fatc.setScale(bugScale.fatc);
    gameScene.ladybug.setScale(bugScale.ladybug);

}

//set the score
function setScore(){
    gameScene.scoreTxt.setText(`Score : ${score}`);
}

//set the timer
function setTimer(){
    gameScene.timerTxt.setText(`Time : ${tim}`);
    tim -= 1;
}

//set all item invisible
function setItemInvisible(){
    gameScene.bigItem.visible = false;
    gameScene.x2Item.visible = false;
    gameScene.moveItem.visible = false;
    gameScene.shrinkItem.visible = false;
}

//relocate item
function relocateItem(it){
    it.setPosition(getRandomX(), getRandomY());
}
//spawn one item
function spawnItem(){
    let n = Math.floor(Math.random()*4);
    switch(n){
        case 0:
            relocateItem(gameScene.bigItem);
            gameScene.bigItem.visible = true;
            setInvisible(gameScene.bigItem);
            break;
        case 1:
            relocateItem(gameScene.x2Item);
            gameScene.x2Item.visible = true;
            setInvisible(gameScene.x2Item);
            break;
        case 2:
            relocateItem(gameScene.moveItem);
            gameScene.moveItem.visible = true;
            setInvisible(gameScene.moveItem);
            break;
        case 3:
            relocateItem(gameScene.shrinkItem);
            gameScene.shrinkItem.visible = true;
            setInvisible(gameScene.shrinkItem);
            break;
        default:
            relocateItem(gameScene.bigItem);
            gameScene.bigItem.visible = true;
            setInvisible(gameScene.bigItem);
    }
}
//show item for an interval of time
function setInvisible(it){
    let t = 5000;
    if (tim<35) t = 3500;
    if (tim<70) t = 4000;
    setTimeout(() => {
        it.visible = false;
    }, t);
    itemCount -= 1;
}

//set bug invisible
function setBugInvisible(bug){
    bug.visible = false;
    bugCount -= 1 ;
    switch(bug){
        case gameScene.ant:
            antfc = 0;
            break;
        case gameScene.beetle:
            beetlefc = 0;
            break;
        case gameScene.cockroach:
            cockroachfc = 0;
            break;
        case gameScene.dragonfly:
            dragonflyfc = 0;
            break;
        case gameScene.fatc:
            fatcfc = 0;
            break;
        case gameScene.ladybug:
            ladybugfc = 0;
            break;
        default:
            break;
    }
}

function setAllBugInvisible(){
    gameScene.ant.visible = false;
    gameScene.beetle.visible = false;
    gameScene.cockroach.visible = false;
    gameScene.dragonfly.visible = false;
    gameScene.fatc.visible = false;
    gameScene.ladybug.visible = false;
}

//check if the bug near edge
function checkBugNearEdge(bug){
    if (bug.x < 10 || bug.x > sizes.width - 10 || bug.y < 10 || bug.y > sizes.height - 10){
        relocate(bug);
    }
}

//gameOver
async function gameOver(){
    // If new high score is achieved, save it do the database
    // Then for any cases, add game results
    const endGame = score;
    console.log("Game ended !");
    if (endGame > getHighScore()){
        await setNewHighScore(getUsername(), endGame);
        await setHighScore(endGame);
    }
    window.location.href = "game.html";


    
}




// Phaser==============================================================================

function preload() {
    //plain background for miss click
    this.load.image('bg', 'images/assets/transparent.png');

    //items
    this.load.image('mysBox', 'images/assets/MysteryBox.png');

    //bugs
    this.load.image('ant', 'images/insects/ant.png');
    this.load.image('beetle', 'images/insects/beetle.png');
    this.load.image('cockroach', 'images/insects/cockroach.png');
    this.load.image('dragonfly', 'images/insects/dragonfly.png');
    this.load.image('fatc', 'images/insects/fatcockroach.png');
    this.load.image('ladybug', 'images/insects/ladybug.png');
}

function create() {
    //set the transparent background---------------------------------------------------
    this.bg = this.add.sprite(0, 0, 'bg');
    this.bg.setPosition(this.sys.game.config.width/2, this.sys.game.config.height/2);
    this.bg.setScale(5);

    //set interactive
    this.bg.setInteractive();
    this.bg.on('pointerdown', function(){
        console.log('bg clicked');
        clickOnBg();
        setScore();
    });
    

    //set the bug-----------------------------------------------------------------------
    this.ant = this.add.sprite(getRandomX(), getRandomY(), 'ant');
    this.ant.setScale(bugScale.ant);
    this.ant.angle = getRandomR();

    this.beetle = this.add.sprite(getRandomX(), getRandomY(), 'beetle');
    this.beetle.setScale(bugScale.beetle);
    this.beetle.angle = getRandomR();

    this.cockroach = this.add.sprite(getRandomX(), getRandomY(), 'cockroach');
    this.cockroach.setScale(bugScale.cockroach);
    this.cockroach.angle = getRandomR();

    this.dragonfly = this.add.sprite(getRandomX(), getRandomY(), 'dragonfly');
    this.dragonfly.setScale(bugScale.dragonfly);
    this.dragonfly.angle = getRandomR();

    this.fatc = this.add.sprite(getRandomX(), getRandomY(), 'fatc');
    this.fatc.setScale(bugScale.fatc);
    this.fatc.angle = getRandomR();

    this.ladybug = this.add.sprite(getRandomX(), getRandomY(), 'ladybug');
    this.ladybug.setScale(bugScale.ladybug);
    this.ladybug.angle = getRandomR();


    //set interactive
    this.ant.setInteractive();
    this.ant.on('pointerdown', function(){
        console.log('ant clicked');
        clickOnBug(gameScene.ant);
        setScore();
    })

    this.beetle.setInteractive();
    this.beetle.on('pointerdown', function(){
        console.log('beetle clicked');
        clickOnBug(gameScene.beetle);
        setScore();
    })

    this.cockroach.setInteractive();
    this.cockroach.on('pointerdown', function(){
        console.log('cockroach clicked');
        clickOnBug(gameScene.cockroach);
        setScore();
    })

    this.dragonfly.setInteractive();
    this.dragonfly.on('pointerdown', function(){
        console.log('dragonfly clicked');
        clickOnBug(gameScene.dragonfly);
        setScore();
    })

    this.fatc.setInteractive();
    this.fatc.on('pointerdown', function(){
        console.log('fatcockroach clicked');
        clickOnBug(gameScene.fatc);
        setScore();
    })

    this.ladybug.setInteractive();
    this.ladybug.on('pointerdown', function(){
        console.log('ladybug clicked');
        clickOnBug(gameScene.ladybug);
        setScore();
    })

    //set the score text----------------------------------------------------------------
    this.scoreTxt = this.add.text(0.03*sizes.width, 10, 'Score : 0', {
        font: `${sizes.height*0.05}px Arial`,
        fill: '#000000'
    });


    //set the timer of the game---------------------------------------------------------
    this.timerTxt = this.add.text(0.03*sizes.width, 50, `Time : 120`, {
        font: `${sizes.height*0.05}px Arial`,
        fill: '#000000'
    });


    //set the item----------------------------------------------------------------------
    //big bug
    this.bigItem = this.add.sprite(getRandomX(), getRandomY(), 'mysBox');
    this.bigItem.setScale(0.05);

    //set big bug interactive
    this.bigItem.setInteractive();
    this.bigItem.on('pointerdown', function(){
        clickOnMagnify();
    });

    //X2
    this.x2Item = this.add.sprite(getRandomX(), getRandomY(), 'mysBox');
    this.x2Item.setScale(0.05);

    //set X2 interactive
    this.x2Item.setInteractive();
    this.x2Item.on('pointerdown', function(){
        clickOnX2();
    });

    //move
    this.moveItem = this.add.sprite(getRandomX(), getRandomY(), 'mysBox');
    this.moveItem.setScale(0.05);

    //set move interactive
    this.moveItem.setInteractive();
    this.moveItem.on('pointerdown', function(){
        clickOnMove();
    });

    //shrink
    this.shrinkItem = this.add.sprite(getRandomX(), getRandomY(), 'mysBox');
    this.shrinkItem.setScale(0.05);

    //set shrink interactive
    this.shrinkItem.setInteractive();
    this.shrinkItem.on('pointerdown', function(){
        clickOnShrink();
    });

    //
    setItemInvisible();
    setAllBugInvisible();
    spawnBug();
    spawnBug();

}



function update() {
    //for moving item
    checkBugNearEdge(gameScene.ant);
    checkBugNearEdge(gameScene.beetle);
    checkBugNearEdge(gameScene.cockroach);
    checkBugNearEdge(gameScene.dragonfly);
    checkBugNearEdge(gameScene.fatc);
    checkBugNearEdge(gameScene.ladybug);

    let speed = 2;
    if (mode === 3){
        gameScene.ant.setPosition(gameScene.ant.x + (Math.cos((gameScene.ant.angle-90)*Math.PI/180)*speed), gameScene.ant.y + (Math.sin((gameScene.ant.angle-90)*Math.PI/180)*speed))
        gameScene.beetle.setPosition(gameScene.beetle.x + (Math.cos((gameScene.beetle.angle-90)*Math.PI/180)*speed), gameScene.beetle.y + (Math.sin((gameScene.beetle.angle-90)*Math.PI/180)*speed))
        gameScene.cockroach.setPosition(gameScene.cockroach.x + (Math.cos((gameScene.cockroach.angle-90)*Math.PI/180)*speed), gameScene.cockroach.y + (Math.sin((gameScene.cockroach.angle-90)*Math.PI/180)*speed))
        gameScene.dragonfly.setPosition(gameScene.dragonfly.x + (Math.cos((gameScene.dragonfly.angle-90)*Math.PI/180)*speed), gameScene.dragonfly.y + (Math.sin((gameScene.dragonfly.angle-90)*Math.PI/180)*speed))
        gameScene.fatc.setPosition(gameScene.fatc.x + (Math.cos((gameScene.fatc.angle-90)*Math.PI/180)*speed), gameScene.fatc.y + (Math.sin((gameScene.fatc.angle-90)*Math.PI/180)*speed))
        gameScene.ladybug.setPosition(gameScene.ladybug.x + (Math.cos((gameScene.ladybug.angle-90)*Math.PI/180)*speed), gameScene.ladybug.y + (Math.sin((gameScene.ladybug.angle-90)*Math.PI/180)*speed))
    
    }
    
    //for spawn item
    if (tim < 110 && mode === 0){
        fc += 1;
        if (fc > 180){
            fc = 0;
            if (itemCount < 3){
                itemCount += 1;
                spawnItem();
            }
        }
    }

    //higher score, bug stay less time
    if (mode !== 3){
        let bc = 0;
        let t = 300;
        if (score > 8000) t = 60;
        else if (score > 7000) t = 90;
        else if (score > 6000) t = 120;
        else if (score > 5000) t = 150;
        else if (score > 4000) t = 180;
        else if (score > 3000) t = 210;
        else if (score > 2000) t = 240;
        else if (score > 1000) t = 270;

        if (gameScene.ant.visible){
            antfc += 1;
            if (antfc > t){
                setBugInvisible(gameScene.ant);
                spawnBug();
            }
            bc += 1;
        }
        if (gameScene.beetle.visible){
            beetlefc += 1;
            if (beetlefc > t){
                setBugInvisible(gameScene.beetle);
                spawnBug();
            }
            bc += 1;
        }
        if (gameScene.cockroach.visible){
            cockroachfc += 1;
            if (cockroachfc > t){
                setBugInvisible(gameScene.cockroach);
                spawnBug();
            }
            bc += 1;
        }
        if (gameScene.dragonfly.visible){
            dragonflyfc += 1;
            if (dragonflyfc > t){
                setBugInvisible(gameScene.dragonfly);
                spawnBug();
            }
            bc += 1;
        }
        if (gameScene.fatc.visible){
            fatcfc += 1;
            if (fatcfc > t){
                setBugInvisible(gameScene.fatc);
                spawnBug();
            }
            bc += 1;
        }
        if (gameScene.ladybug.visible){
            ladybugfc += 1;
            if (ladybugfc > t){
                setBugInvisible(gameScene.ladybug);
                spawnBug();
            }
            bc += 1;
        }

        bugCount = bc;
    }
    if (bugCount < 2) spawnBug();

}


//binding function to gameScene
gameScene.preload = preload;
gameScene.create = create;
gameScene.update = update;



//create game
let game = new Phaser.Game(config);

//make timer countdown
let gameTimer = setInterval(setTimer, 1000);

//game countdown to end
let gameTimeEnd = setTimeout(gameOver, 120 * 1000);
