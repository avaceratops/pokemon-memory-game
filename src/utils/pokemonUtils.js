const MAX_POKEMON_ID = 1025;

export async function fetchPokemon(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon with ID ${id}. Status: ${response.status}`);
    }
    const { species, sprites } = await response.json();
    return { id, name: species.name, sprite: sprites.front_default };
  } catch (error) {
    console.error('Error fetching Pokemon:', error.message);
    throw error;
  }
}

export function generateRandomIds(count) {
  const ids = [];
  while (ids.length < count) {
    const randomId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
    if (!ids.includes(randomId)) {
      ids.push(randomId);
    }
  }
  return ids;
}

/* randomize array element positions using Durstenfeld shuffle algorithm */
export function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}