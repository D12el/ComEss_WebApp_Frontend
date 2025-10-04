
import {createNewPlayer, getPlayerByName, createNewResult, getLeaderboard, setNewHighScore, setNewAvatar} from "./apiconnect.js";

// document.addEventListener("DOMContentLoaded", () => {
//     fetchAndDrawLeaderboard()
// });

// Fields

let currentActiveDiv;

// Username & Avatar getter-setters

export function getUsername(){
    var name = sessionStorage.getItem('username');
    return name;
}

export function setUsername(name){
    sessionStorage.setItem('username', name);
}

export function getAvatarId(){
    var avatarId = sessionStorage.getItem('avatarId');
    return avatarId;
}

export function setAvatarId(id){
    sessionStorage.setItem('avatarId', id);
}

export function getHighScore(){
    var score = sessionStorage.getItem('highScore');
    return score;
}
export function setHighScore(score){
    sessionStorage.setItem('highScore', score);
}

export function getCurrentAvatarImg(){
    console.log(getAvatarId());
    return "images/avatars/" + getAvatarId()+ ".png";
}

// index.html handlers

export async function handlePlayClick(){
    let username = document.getElementById("username-input").value;
    username = username.trim()
    if (username == ""){
        alert("Please enter your username");
    }
    else {
        setUsername(username);

        const player = await getPlayerByName(username);
        if (player.length == 0){
            // New player
            await createNewPlayer(username, getAvatarId())
            setHighScore(0);
        }
        else {
            // Old player
            await setNewAvatar(username, getAvatarId());
            setHighScore(player[0].highestScore)
        }
        window.location.href = "game.html";

    }
    
    
}


export function initSelectedAvatar(){
    if (getAvatarId()){
    currentActiveDiv = document.getElementById("avatar-" + getAvatarId());
    }
    else {
    currentActiveDiv = document.getElementById("avatar-1");
    }
    handleDivClick(currentActiveDiv);
}


export function handleDivClick(ClickedDiv){
    const avatarId = (ClickedDiv.id).slice(7);
    console.log(avatarId)
    setAvatarId(avatarId);
    if(currentActiveDiv !== null){
        // currentActiveDiv.style.backgroundColor = '';
        currentActiveDiv.classList.remove("opacity-100");
        currentActiveDiv.classList.add("opacity-25");
    }
    currentActiveDiv = ClickedDiv;
    // currentActiveDiv.style.backgroundColor = 'red';
    currentActiveDiv.classList.remove("opacity-25");
    currentActiveDiv.classList.add("opacity-100");
}

export async function fetchAndDrawLeaderboard(){
    console.log("fetch")
    const players = await getLeaderboard()
    console.log(players)
    drawLeaderBoard(players)
}
/**@param {Player[]} players */
function drawLeaderBoard(players){
    // Get the current path
    const path = document.location.pathname; // or window.location.pathname

    // Split the path by '/'
    const pathParts = path.split('/');

    // Get the last part of the path, which should be the filename
    const filename = pathParts[pathParts.length - 1];
    if(filename == "game.html"){
       let topPlayerName = document.querySelectorAll(".top-player-name")
       let topPlayerScore = document.querySelectorAll(".top-player-score")
       for(let i = 0;i<6;i++){
        topPlayerName[i].textContent = players[i%3].name
        topPlayerScore[i].textContent = players[i%3].highestScore
       }
    }else{
        let leaderBoard = document.getElementById("leaderboard-container")
        players.forEach(player=>{
            //create container for top player
            let box = document.createElement("div")
            box.classList.add("flex",    "flex-row",    "gap-3",    "width-full",    "items-center",    "height-20",    "background-gray",    "rounded-bg",    "padding-all-2")
            //create rank container
            let rankBox = document.createElement("div")
            rankBox.classList.add("flex",    "height-16",    "width-16",  "full-rounded-bg",    "items-center",    "justify-center")
            let n = players.indexOf(player)+1;
            let textColor = "text-white";
            switch (n) {
                case 1:
                    rankBox.classList.add("background-gold");
                    break;
                case 2:
                    rankBox.classList.add("background-silver");
                    break;
                case 3:
                    rankBox.classList.add("background-bronze");
                    break;
                default:
                    rankBox.classList.add("background-crystal")
                    textColor = "text-black";
                    break;
            }
            //create rank number
            let rankNumber = document.createElement("p")
            rankNumber.classList.add("weight-700", "text-xxl", textColor)
            rankNumber.textContent = n
            //merge with rank box
            rankBox.appendChild(rankNumber)
            //create info box
            let infoBox = document.createElement("div")
            infoBox.classList.add("flex","flex-col")
            //create top player name text
            let playerName = document.createElement("p")
            playerName.classList.add("text-lg","weight-500")
            playerName.textContent = player.name
            //create top plater score text
            let playerScore = document.createElement("p")
            playerScore.classList.add("text-sm","weight-300")
            playerScore.textContent = player.highestScore
            //merge with infoBox
            infoBox.appendChild(playerName)
            infoBox.appendChild(playerScore)
            //merge all to box
            box.appendChild(rankBox)
            box.appendChild(infoBox)
            //merge to leaderboard-container
            leaderBoard.appendChild(box)
        })
        

    }
}




