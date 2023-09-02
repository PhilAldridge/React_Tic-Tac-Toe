import { useState, useEffect } from "react";
import Rules from "./rules.js";
import Header from "./header";
import BigBoard from "./bigBoard";
import WelcomeMenu from "./menus/welcomeMenu.js";
import AiMenu from "./menus/aiMenu.js";
import NetworkMenu from "./menus/networkMenu.js";
import HostMenu from "./menus/hostMenu.js";
import JoinMenu from "./menus/joinMenu.js";
import * as Realm from 'realm-web'

// Create the Realm Application
const app = new Realm.App({id: "tictactoeapp-bckwb"});

export default function App() {
  const [robot, setRobot] = useState(2);
  const [status, setStatus] = useState("welcomeMenu");
  const [playerIsX, setPlayerIsX] = useState(true);
  const [gameId, setGameId] = useState("");
  const [networkChange, setNetworkChange] = useState(null);

  useEffect(()=>{
    const  login = async () => {
        // Authenticate anonymously
        
        try {
          await  app.logIn(Realm.Credentials.anonymous());
        } catch(error) {
          console.log(error)
        }
        
        // Connect to the database
        const  mongodb = app.currentUser.mongoClient("mongodb-atlas");
        const  collection = mongodb.db("games").collection("games");
        
        
        // Everytime a change happens in the stream, add it to the list of events
        try{
          for  await (const  change  of  collection.watch()) {
            console.log(change)
            if(change.operationType==="update") setNetworkChange(change);
          }
        } catch(error) {
          console.log(error);
        }

      }
      login(); 

      const getRequest = (window.location.search);
      if(getRequest !== ""){
        startNetworkGame(getRequest.slice(-5));
      }

  },[]);

  function resetApp() {
    setStatus("welcomeMenu");
    setGameId("");
  }

  function statusUpdate(newStatus) {
    setStatus(newStatus);
  }

  function togglePlayerisX() {
    setPlayerIsX(!playerIsX);
  }

  function newGameId(newId){
    setGameId(newId);
    setPlayerIsX(true);
  }

  function robotMenuClick(robotLevel) {
    setRobot(robotLevel);
    setStatus("aiGame");
  }

  function startNetworkGame(gameId){
    setGameId(gameId);
    setPlayerIsX(false);
    setStatus("networkGame");
  }

  let children = [];
  switch (status) {
    case "welcomeMenu":
      children.push(<WelcomeMenu setStatus={statusUpdate} />);
      break;
    case "aiMenu":
      children.push(
        <AiMenu
          togglePlayerisX={togglePlayerisX}
          playerIsX={playerIsX}
          robotMenuClick={robotMenuClick}
        />
      );
      break;
    case "networkMenu":
      children.push(<NetworkMenu setStatus={statusUpdate} />);
      break;
    case "hostMenu":
      children.push(
        <HostMenu gameId={gameId} changeGameId={newGameId} setStatus={statusUpdate} networkChange={networkChange}/>
      );
      break;
    case "joinMenu":
      children.push(<JoinMenu startNetworkGame={startNetworkGame}/>);
      break;
    default:
      children.push(
        <BigBoard
          robot={robot}
          appStatus={status}
          playerIsX={playerIsX}
          gameId={gameId}
          networkChange={networkChange}
        />
      );
      break;
  }
  return (
    <div id="container">
      <Header resetApp={resetApp} welcome={status === "welcomeMenu"} />
      {children}
      <Rules />
    </div>
  );
}
