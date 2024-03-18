# Pokémon Memory Game

## About

Pokémon Memory Game is a React web app developed with Vite. Test your memory skills by clicking
each Pokémon only once. The grid of Pokémon shuffles after every click.

At the start of each game, a set of 30 random Pokémon is chosen from the available pool of 1025.
Sprites and Pokémon names are fetched from [PokéAPI](https://pokeapi.co/) asynchronously.

## Demo

https://pokemon-memory-game.pages.dev/

## Getting Started

To set up the project, follow these steps:

1. Ensure you have Node.js and pnpm installed on your machine.

1. Install the required dependencies using:

   `pnpm install`

1. Start the development server:

   `pnpm run dev`

This will launch the application on your local server. You can access it in your browser at http://localhost:5173 by default.

## Dependencies

The project relies on the following dependencies:

- [normalize.css](https://www.npmjs.com/package/normalize.css)
- [@radix-ui/react-dialog](https://www.npmjs.com/package/@radix-ui/react-dialog)
- [react-loader-spinner](https://www.npmjs.com/package/react-loader-spinner)
