import { useState } from "react";
import { connectToGame } from "../dbComms";

export default function JoinMenu({ startNetworkGame }) {
  const [codeInput, setCodeInput] = useState("");
  const [joinClicked, setJoinClicked] = useState(null);

  function handleInputChange(e) {
    setCodeInput(e.target.value);
  }

  //todo handle joinclicked
  function handleJoinClick() {
    setJoinClicked("looking");
    //find game
    //if game found
    //startNetworkGame
    const result = connectToGame(codeInput);
      result.then(data => {
        if(data.modifiedCount>0){
          startNetworkGame(codeInput)
        } else {
          setJoinClicked("missing");
        }
        
      });

  }

  

  /*useEffect(()=>{
    if(joinClicked === "looking"){
      
    }
  }, [joinClicked]);*/

  return (
    <div>
      <h2>Join Game:</h2>
      <p>
        Join code: <input value={codeInput} onChange={handleInputChange} />
      </p>
      <button
        className="menuButton"
        disabled={codeInput.length !== 5 || joinClicked==="looking"}
        onClick={handleJoinClick}
      >
        Join
      </button>
      {joinClicked === "missing" && <p>Could not find a game with this name. Try again.</p>}
    </div>
  );
}
