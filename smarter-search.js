//
// smarter-search.js - Smarter Pokedex Search with Suggestions
// ----------------------------------------------------------
//
const input = document.getElementById('pokemonInput');
const searchBtn = document.getElementById('searchBtn');
const displaySection = document.getElementById('displaySection');
const suggestionsBox = document.getElementById('suggestions');

let allPokemon = [];

// Fetch all Pokémon names and IDs once for suggestions
async function fetchAllPokemon() {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1300');
    const data = await res.json();
    allPokemon = data.results.map((p, i) => ({ name: p.name, id: i + 1 }));
  } catch (e) {
    allPokemon = [];
  }
}
fetchAllPokemon();

// Show suggestions as user types
input.addEventListener('input', () => {
  const query = input.value.trim().toLowerCase();
  if (!query || allPokemon.length === 0) {
    suggestionsBox.style.display = 'none';
    return;
  }
  const matches = allPokemon.filter(p => p.name.includes(query)).slice(0, 10);
  if (matches.length === 0) {
    suggestionsBox.style.display = 'none';
    return;
  }
  suggestionsBox.innerHTML = matches.map(p => `<div class="suggestion-item" data-name="${p.name}">${p.name} (ID: ${p.id})</div>`).join('');
  suggestionsBox.style.display = 'block';
});

// Click suggestion to fill input and search
suggestionsBox.addEventListener('click', (e) => {
  if (e.target.classList.contains('suggestion-item')) {
    input.value = e.target.getAttribute('data-name');
    suggestionsBox.style.display = 'none';
    searchBtn.click();
  }
});

document.addEventListener('click', (e) => {
  if (!suggestionsBox.contains(e.target) && e.target !== input) {
    suggestionsBox.style.display = 'none';
  }
});

// Fetch and display Pokémon details (same as before)
async function fetchPokemon(nameOrId) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`);
    if (!response.ok) throw new Error('Pokémon not found');
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

function renderPokemon(pokemon) {
  const sprite = pokemon.sprites.front_default || pokemon.sprites.other['official-artwork'].front_default || '';
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

function renderError(message) {
  displaySection.innerHTML = `<div class="error-message">${message}</div>`;
}

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

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});
