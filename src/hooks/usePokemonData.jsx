import { useState, useEffect } from 'react';

const MAX_POKEMON_ID = 1025;

export default function usePokemonData(cardQuantity) {
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [shouldRefetch, setShouldRefetch] = useState(true);

  useEffect(() => {
    if (!shouldRefetch) return;

    async function fetchPokemonList() {
      setIsLoading(true);
      setIsError(false);
      const randomIds = generateRandomIds(cardQuantity);
      const promises = randomIds.map((id) => fetchPokemon(id));

      // display loading blocks for at least 1 second
      setTimeout(async () => {
        try {
          const fetchedPokemon = await Promise.all(promises);
          setPokemon(fetchedPokemon);
        } catch (error) {
          setIsError(true);
          setPokemon([]);
        } finally {
          setIsLoading(false);
          setShouldRefetch(false);
        }
      }, 1000);
    }

    fetchPokemonList();
  }, [cardQuantity, shouldRefetch]);

  // generates a given number of unique IDs from 1 to MAX_POKEMON_ID, inclusive
  function generateRandomIds(count) {
    const ids = [];
    while (ids.length < count) {
      const randomId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
      if (!ids.includes(randomId)) {
        ids.push(randomId);
      }
    }
    return ids;
  }

  // randomize array element positions using Durstenfeld shuffle algorithm
  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  // fetches a Pokemon by ID from PokéAPI, returning its id, name, and sprite
  async function fetchPokemon(id) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      if (!response.ok) {
        throw new Error(`Failed to fetch Pokemon with ID ${id}. Status: ${response.status}`);
      }
      const { species, sprites } = await response.json();
      const name = species.name.charAt(0).toUpperCase() + species.name.slice(1);
      return { id, name, sprite: sprites.front_default };
    } catch (error) {
      console.error('Error fetching Pokemon:', error.message);
      throw error;
    }
  }

  function refetch() {
    setShouldRefetch(true);
  }

  function shuffle() {
    setPokemon(shuffleArray(pokemon));
  }

  return { pokemon, isLoading, isError, refetch, shuffle };
}
