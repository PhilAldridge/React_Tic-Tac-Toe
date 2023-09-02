export default function NetworkMenu({ setStatus }) {
  return (
    <div>
      <h2>Host or Join an online game: </h2>
      <button
        className="menuButton"
        onClick={() => {
          setStatus("hostMenu");
        }}
      >
        Host game
      </button>
      <button
        className="menuButton"
        onClick={() => {
          setStatus("joinMenu");
        }}
      >
        Join game
      </button>
    </div>
  );
}
