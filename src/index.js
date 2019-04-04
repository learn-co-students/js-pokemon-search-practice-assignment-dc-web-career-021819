document.addEventListener('DOMContentLoaded', () => {
  // console.log(POKEMON)
  //YOUR CODE HERE

  renderPokemons();
  const form = document.querySelector('form#pokemon-search-form');
  form.addEventListener('keyup', () => {
    let input = form.querySelector('input').value;
    renderPokemons(input)
  });
})

function getPokemonContainer(){
  return document.querySelector('#pokemon-container');
}

function createPokemonCard(pokemon){
  const card = getPokemonContainer().appendChild(document.createElement('div'));
  card.classList.add('pokemon-card');
  const frame = card.appendChild(document.createElement('div'));
  frame.classList.add('pokemon-frame');
  const hName = frame.appendChild(document.createElement('h1'));
  hName.classList.add('center-text');
  hName.innerText = pokemon['name'];
  const imgDiv = frame.appendChild(document.createElement('div'));
  imgDiv.classList.add('pokemon-image');
  const pokemonImg = imgDiv.appendChild(document.createElement('img'));
  pokemonImg.dataset.id = pokemon['id'];
  pokemonImg.dataset.action = "flip";
  pokemonImg.classList.add('toggle-sprite');
  pokemonImg.src = pokemon['sprites']['front'];
  pokemonImg.addEventListener('click', flipSprite)
}

function flipSprite(event){
  if (event.target.src.includes("back")){
    event.target.src = POKEMON[findPokemonIndex(event)]['sprites']['front'];
  } else {
    event.target.src = POKEMON[findPokemonIndex(event)]['sprites']['back'];
  };
}

function findPokemonIndex(event){
  return POKEMON.findIndex((el) => {return el['id'] === parseInt(event.target.dataset.id)})
}

function searchPokemon(input){
  return POKEMON.filter((pokemon) => {return pokemon['name'].includes(input)})
}

function noMatching(){
  getPokemonContainer().appendChild(document.createElement('p'));
  const newDiv = getPokemonContainer().appendChild(document.createElement('center'));
  newDiv.innerText = "There are no Pokémon here"
  getPokemonContainer().appendChild(document.createElement('p'));
}

function renderPokemons(input = ""){
  getPokemonContainer().innerHTML = "";
  if (searchPokemon(input).length === 0){
    noMatching()
  }else{
    searchPokemon(input).forEach((el) => createPokemonCard(el));
  }
}
