export default function Header({ resetApp, welcome = false }) {
  return (
    <h1 className="header">
      <span className="headerText">Ultimate Tic-Tac-Toe</span>
      {!welcome && BackButton({ resetApp })}
    </h1>
  );
}

function BackButton({ resetApp }) {
  return (
    <button className="resetButton" onClick={() => resetApp()}>
      Home
    </button>
  );
}
