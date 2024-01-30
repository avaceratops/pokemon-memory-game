export default function Scoreboard({ currentScore, highScore }) {
  return (
    <section className="scoreboard">
      <p className="scoreboard__current">Current Score: {currentScore}</p>
      <p className="scoreboard__high">High Score: {highScore}</p>
    </section>
  );
}
