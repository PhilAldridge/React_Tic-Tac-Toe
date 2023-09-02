//const uri = "http://localhost:5050/record";
const uri = "https://react-tic-tac-toe-2xrp.vercel.app/:5050/record";

export async function createGame() {
    const response = await fetch(uri, {
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
  const response = await fetch(uri+`/${codeInput}`, {
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
  const response = await fetch(uri+`/${gameId}`, {
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