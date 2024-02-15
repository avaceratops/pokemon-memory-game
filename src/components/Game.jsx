import { useState } from 'react';
import { Blocks } from 'react-loader-spinner';
import usePokemonData from '../hooks/usePokemonData';
import Card from './Card';
import RestartDialog from './RestartDialog';
import Scoreboard from './Scoreboard';
import '../styles/Game.scss';

const CARD_QUANTITY = 30;

export default function Game() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clickedPokemon, setClickedPokemon] = useState(new Set());
  const [gameOutcome, setGameOutcome] = useState(null);

  const { pokemon, isLoading, isError, refetch, shuffle } = usePokemonData(CARD_QUANTITY);

  function updateHighScore(newScore) {
    if (newScore > highScore) {
      setHighScore(newScore);
    }
  }

  function handleCardClick(e) {
    const { id, name } = e.currentTarget.dataset;

    if (clickedPokemon.has(id)) {
      updateHighScore(currentScore);
      setGameOutcome(`You clicked ${name} twice. Try to beat your high score!`);
      return;
    }
    if (clickedPokemon.size === CARD_QUANTITY - 1) {
      updateHighScore(CARD_QUANTITY);
      setGameOutcome(`Congratulations, you managed to catch 'em all!`);
      return;
    }

    setClickedPokemon(new Set([...clickedPokemon, id]));
    setCurrentScore(currentScore + 1);
    shuffle();
    document.activeElement.blur();
  }

  function handleCloseDialog() {
    refetch();
    setClickedPokemon(new Set());
    setCurrentScore(0);
    setGameOutcome(null);
  }

  if (isError) {
    return <p className="error-message">Unable to obtain Pokémon data. Try refreshing the page.</p>;
  }

  if (isLoading) {
    return (
      <Blocks
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        visible={true}
      />
    );
  }

  return (
    <>
      <RestartDialog gameOutcome={gameOutcome} closeDialog={handleCloseDialog}></RestartDialog>
      <Scoreboard currentScore={currentScore} highScore={highScore}></Scoreboard>
      <section className="pokemon-grid">
        {pokemon.map((p) => (
          <Card
            key={p.id}
            id={p.id}
            name={p.name}
            sprite={p.sprite}
            onClick={handleCardClick}
          ></Card>
        ))}
      </section>
    </>
  );
}
