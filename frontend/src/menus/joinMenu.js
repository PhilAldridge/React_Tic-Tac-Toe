import { useCallback, useEffect, useState } from "react";
import { connectToGame } from "../dbComms";

const getRequest = window.location.search.slice(-5);

export default function JoinMenu({ startNetworkGame }) {
  const [codeInput, setCodeInput] = useState(getRequest);
  const [joinClicked, setJoinClicked] = useState(null);
  
  useEffect(()=>{
    if(getRequest!=="") {
      handleJoinClick();
    }
  },[]);

  function handleInputChange(e) {
    setCodeInput(e.target.value);
  }

  const handleJoinClick = useCallback(() => {
    
    setJoinClicked("looking");
    const result = connectToGame(codeInput);
      result.then(data => {
        if(data.modifiedCount>0){
          startNetworkGame(codeInput)
        } else {
          setJoinClicked("missing");
        }
        
      });

  },[codeInput]);
  

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
