const searchBtn = document.getElementById("search-button");
const inputArea = document.getElementById("search-input");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const pokemonContainer = document.getElementById("pokemon-container");

const pokemonListUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
let pokemonList = [];


const fetchData = async () => {
  try {
    const res = await fetch(pokemonListUrl);
    const data = await res.json();
    pokemonList = data.results;
    console.log(pokemonList)
  } catch (err) {
    console.log(err);
  }
};
fetchData();


const searchPokemon = (array) => {
  const searchValue = inputArea.value.toLowerCase();
  if(searchValue === "" ) {
    alert("Pokemon not found");
  }
  else{
    const pokemon = array.find((pokemon) => pokemon.name === searchValue || pokemon.id === Number(searchValue));
    if(pokemon){
    showPokemon(pokemon);
    pokemonContainer.areaDisabled = false;
    }
  else{
    alert("Pokemon not found");
    }
  }
}
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const showPokemon = async (data) => {
  const { name, id, url} = data;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const { name, id, height, weight, types , stats} = data;

    pokemonContainer.innerHTML = `
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="pokemon image"/>
      <p>Pokemon Name: ${capitalizeFirstLetter(name)}</p>
      <p>Pokemon ID: ${id}</p>
      <p>Pokemon Height: ${height}</p>
      <p>Pokemon Weight: ${weight}</p>
      <p>Pokemon Types: ${types.map(typeInfo => typeInfo.type.name.toUpperCase()).join(', ')}</p>
    `;
    document.getElementById("hp").innerText = stats.find(stat => stat.stat.name === 'hp').base_stat;
    document.getElementById("attack").innerText = stats.find(stat => stat.stat.name === 'attack').base_stat;
    document.getElementById("defense").innerText = stats.find(stat => stat.stat.name === 'defense').base_stat;
    document.getElementById("special-attack").innerText = stats.find(stat => stat.stat.name === 'special-attack').base_stat;
    document.getElementById("special-defense").innerText = stats.find(stat => stat.stat.name === 'special-defense').base_stat;
    document.getElementById("speed").innerText = stats.find(stat => stat.stat.name === 'speed').base_stat;

  } catch (err) {
    console.log(err);
  }
}
searchBtn.addEventListener("click", () => {
  searchPokemon(pokemonList);
});
inputArea.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchPokemon(pokemonList);
  }
});
