import Game from './Game';
import '../styles/App.scss';

function App() {
  return (
    <main>
      <h1 className="title">Pokémon Memory Game</h1>
      <p className="desc">
        Click on each Pokémon to gain points, being careful not to click the same one twice. Catch
        &apos;em all without repeating!
      </p>
      <Game></Game>
    </main>
  );
}

export default App;
