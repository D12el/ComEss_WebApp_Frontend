export async function createNewPlayer(name, avatarId){
    await fetch(`http://127.0.0.1:3222/players/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({playerId: 1, name: name, avatarId: avatarId, highestScore: 0}),
    });
}

export async function getPlayerByName(name){
    const results = await fetch(`http://127.0.0.1:3222/players`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: name}),
      }).then(r => (r.json()));
    return results;
}

export async function createNewResult(playerId, score){
  await fetch(`http://127.0.0.1:3222/gameresults/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({gameId: 1, playerId: playerId, score: score, time: Date.now()}),
  });
}

export async function getLeaderboard(){
  let players = await fetch(`http://127.0.0.1:3222/players/leaderboard`).then((r) => r.json());
  return players
}

export async function setNewHighScore(name, newHigh){
      await fetch(`http://127.0.0.1:3222/players/sethigh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name: name, newHigh: newHigh}),
  });
}

export async function setNewAvatar(name, avatarId){
  await fetch(`http://127.0.0.1:3222/players/setavatar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name: name, avatarId: avatarId}),
  });
}