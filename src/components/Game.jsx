import { useState, useEffect } from 'react';
import { generateRandomIds, fetchPokemon, shuffleArray } from '../utils/pokemonUtils';
import Card from './Card';
import Scoreboard from './Scoreboard';
import '../styles/Game.scss';

const CARD_QUANTITY = 30;

export default function Game() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [clickedPokemon, setClickedPokemon] = useState(new Set());
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

    fetchData();
    resetGame();
  }, [triggerGameReset]);

  function resetGame() {
    setClickedPokemon(new Set());
    setCurrentScore(0);
    setTriggerGameReset(false);
  }

  function updateHighScore(newScore) {
    if (newScore > highScore) {
      setHighScore(newScore);
    }
  }

  function handleCardClick(e) {
    const { id } = e.currentTarget.dataset;

    if (clickedPokemon.has(id)) {
      alert(`You lost the game!`);
      updateHighScore(currentScore);
      setTriggerGameReset(true);
      return;
    }
    if (clickedPokemon.size === CARD_QUANTITY - 1) {
      alert('You won the game!');
      updateHighScore(CARD_QUANTITY);
      setTriggerGameReset(true);
      return;
    }

    setClickedPokemon(new Set([...clickedPokemon, id]));
    setCurrentScore(currentScore + 1);
    // randomise card positions after each click
    setPokemonList(shuffleArray(pokemonList));
    document.activeElement.blur();
  }

  return (
    <>
      <Scoreboard currentScore={currentScore} highScore={highScore}></Scoreboard>
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
