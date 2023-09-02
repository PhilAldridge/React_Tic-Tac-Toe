import {createGame} from '../dbComms';

export default function HostMenu({gameId, changeGameId, setStatus, networkChange }) {

  async function onMount() {
    const result = await createGame();
    changeGameId(result.insertedId);
    
  }
  if(gameId===""){
    onMount();
  } else if(networkChange &&
    networkChange.documentKey._id === gameId &&
    networkChange.fullDocument.connected){
    setStatus("networkGame");
  }

  return (
    <div>
      <h2>Host Game:</h2>
      <p>
        Join code: <input readOnly value={gameId} />
      </p>
      <p>
        or <button className="resetButton" onClick={()=>navigator.clipboard.writeText("https://react-tic-tac-toe-2xrp.vercel.app/?gameId="+gameId)}>copy game link</button>
      </p>
      <p>Note: The host always plays as X</p>
      <p style={{ color: "red", fontSize: "0.7rem" }}>
        Waiting for other player to join
      </p>
    </div>
  );
}
