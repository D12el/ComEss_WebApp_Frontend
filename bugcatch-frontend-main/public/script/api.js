import { BACKEND_URL } from "./config.js"
/** @typedef {import("./config.js").Player} Player*/
/**
 * @param {*} player 
 */
export async function createPlayer(player){
    await fetch(`${BACKEND_URL}/player`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(player),
      });
    }
export async function getPlayerSortByScore(){
  try {
    const response = await fetch(`${BACKEND_URL}/player`);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const players = await response.json();
    return players;  
  } catch (error) {
    console.error('Error fetching data:', error);
    }
}