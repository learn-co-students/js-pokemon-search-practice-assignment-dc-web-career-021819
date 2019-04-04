document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('#pokemon-search-form')
  let inputField = document.querySelector('#pokemon-search-input')
  let pokemonContainer = document.querySelector('#pokemon-container')
  document.querySelector('center').style.visibility = "hidden"
  POKEMON.forEach(pokemon => addPokemonToPage(pokemon))

  inputField.addEventListener('keyup', parseInput)
  document.addEventListener('click', clickHandler)

  function parseInput(){
    let input = inputField.value
      searchPokemon(input)
  }

  function searchPokemon(input){
    selectedPokemon = POKEMON.filter(pokemon => pokemon.name.includes(input))
    if (selectedPokemon.length){
      clearPokemon()
      document.querySelector('center').style.visibility = "hidden"
      selectedPokemon.forEach(pokemon => addPokemonToPage(pokemon))
    } else {
      clearPokemon()
      document.querySelector('center').style.visibility = "visible"
    }
  }

  function addPokemonToPage(pokemon){
    let card = document.createElement('div')
    card.className = "pokemon-card"
    pokemonContainer.appendChild(card)

    let frame = document.createElement('div')
    frame.className = "pokemon-frame"
    card.appendChild(frame)

    let nameElement = document.createElement('h1')
    nameElement.className = "center-text"
    nameElement.innerText = pokemon.name.toUpperCase()
    frame.appendChild(nameElement)

    let imageDiv = document.createElement('div')
    imageDiv.className = "pokemon-image"
    frame.appendChild(imageDiv)

    let image = document.createElement('img')
    image.dataset.id = pokemon.id
    image.dataset.action = "flip"
    image.className = "toggle-sprite"
    image.src = pokemon.sprites.front
    imageDiv.appendChild(image)
  }

  function clickHandler(e){
    if (e.target.className === "toggle-sprite") {
      flipSprite(e.target)
    }
  }

  function clearPokemon(){
    document.querySelectorAll(".pokemon-card").forEach(e => e.parentNode.removeChild(e));
  }

  function flipSprite(image){
    // find pokemon
    pokemon = POKEMON.find(p => p.id === parseInt(image.dataset.id))
    // flip if facing forward
    if (image.dataset.action === "flip"){
      image.src = pokemon.sprites.back
      image.dataset.action = "revert"
    } else {
      image.src = pokemon.sprites.front
      image.dataset.action = "flip"
    }
  }
})
