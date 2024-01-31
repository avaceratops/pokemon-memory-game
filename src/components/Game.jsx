import { useState, useEffect } from 'react';
import { Blocks } from 'react-loader-spinner';
import { generateRandomIds, fetchPokemon, shuffleArray } from '../utils/pokemonUtils';
import Card from './Card';
import RestartDialog from './RestartDialog';
import Scoreboard from './Scoreboard';
import '../styles/Game.scss';

const CARD_QUANTITY = 30;

export default function Game() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [clickedPokemon, setClickedPokemon] = useState(new Set());
  const [gameOutcome, setGameOutcome] = useState(null);
  const [triggerGameReset, setTriggerGameReset] = useState(true);

  useEffect(() => {
    if (!triggerGameReset) return;

    const fetchData = async () => {
      try {
        const randomIds = generateRandomIds(CARD_QUANTITY);
        const promises = randomIds.map((id) => fetchPokemon(id));
        const fetchedPokemon = await Promise.all(promises);
        setPokemonList(fetchedPokemon);
      } catch (error) {
        setFetchError('Unable to obtain Pokémon data. Try refreshing the page.');
      }
    };

    resetGame();
    fetchData();
  }, [triggerGameReset]);

  function resetGame() {
    setClickedPokemon(new Set());
    setCurrentScore(0);
    setGameOutcome(null);
    setPokemonList([]);
    setTriggerGameReset(false);
  }

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
    // randomise card positions after each click
    setPokemonList(shuffleArray(pokemonList));
    document.activeElement.blur();
  }

  function handleCloseDialog() {
    setTriggerGameReset(true);
  }

  return (
    <>
      <RestartDialog gameOutcome={gameOutcome} closeDialog={handleCloseDialog}></RestartDialog>
      <Scoreboard currentScore={currentScore} highScore={highScore}></Scoreboard>
      <Blocks
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        visible={!fetchError && pokemonList.length === 0}
      />
      {fetchError && <p className="error-message">{fetchError}</p>}
      <section className="pokemon-grid">
        {pokemonList.map((pokemon) => (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            sprite={pokemon.sprite}
            onClick={handleCardClick}
          ></Card>
        ))}
      </section>
    </>
  );
}
