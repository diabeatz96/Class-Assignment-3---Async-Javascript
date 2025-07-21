//
// script.js - Async JavaScript Pokedex Assignment
// ----------------------------------------------
// Handles all JavaScript logic for the Pokedex assignment.
//

// --- DOM Elements ---
const input = document.getElementById('pokemonInput');
const searchBtn = document.getElementById('searchBtn');
const displaySection = document.getElementById('displaySection');

/**
 * Async function to fetch Pokémon data from the PokeAPI.
 * Uses async/await for clarity and error handling.
 * @param {string|number} nameOrId - Pokémon name or ID
 * @returns {Promise<Object>} Pokémon data object
 */
async function fetchPokemon(nameOrId) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`);
    if (!response.ok) throw new Error('Pokémon not found');
    const data = await response.json();
    console.log('Raw data fetched:', data); // For educational purposes
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Renders Pokémon info in the display section.
 * @param {Object} pokemon - Pokémon data object
 */
function renderPokemon(pokemon) {
  // Get main sprite and fallback if not available
  const sprite = pokemon.sprites.front_default || pokemon.sprites.other['official-artwork'].front_default || '';
  // Get abilities and types
  const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');
  const types = pokemon.types.map(t => t.type.name).join(', ');
  displaySection.innerHTML = `
    <img class="pokemon-img" src="${sprite}" alt="${pokemon.name}">
    <div class="pokemon-info">
      <strong>Name:</strong> ${pokemon.name}<br>
      <strong>ID:</strong> ${pokemon.id}<br>
      <strong>Type(s):</strong> ${types}<br>
      <strong>Abilities:</strong> ${abilities}
    </div>
  `;
}

/**
 * Renders an error message in the display section.
 * @param {string} message - Error message to display
 */
function renderError(message) {
  displaySection.innerHTML = `<div class="error-message">${message}</div>`;
}

// --- Event Listener for Search Button ---
searchBtn.addEventListener('click', async () => {
  const query = input.value.trim();
  if (!query) {
    renderError('Please enter a Pokémon name or ID.');
    return;
  }
  displaySection.innerHTML = '<span style="color:#888;">Loading...</span>';
  try {
    const pokemon = await fetchPokemon(query);
    renderPokemon(pokemon);
  } catch (error) {
    renderError('Pokémon not found or network error.');
  }
});

// --- Allow Enter key to trigger search ---
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});
