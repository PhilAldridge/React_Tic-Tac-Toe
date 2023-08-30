export async function createGame() {
    const response = await fetch("http://localhost:5050/record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: "",
      })
      .catch(error => {
        window.alert(error);
        return;
      });

    const records = await response.json();
    return records;
}

export async function connectToGame(codeInput){
  const response = await fetch(`http://localhost:5050/record/${codeInput}`, {
    method: "PATCH",
    body: JSON.stringify({id:codeInput}),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  //const records = await response.json();
  //return records;
  return await response.json();
}

export async function updateGameState(newState, lastMove, gameId){
  const response = await fetch(`http://localhost:5050/record/${gameId}`, {
    method: "PATCH",
    body: JSON.stringify({id:gameId, newState: newState, lastMove: lastMove}),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  //const records = await response.json();
  //return records;
  return await response.json();
}