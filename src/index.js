document.addEventListener('DOMContentLoaded', () => {
  console.log(POKEMON)

  //returns a function to create basic elements
  function createElementFunction (tagName) {
    //returns a function that will return an element
    return function(className){
      let element = document.createElement(tagName);
      element.className = className;
      return element
    }
  }

  function createImgElement(frontImgUrl, backImgUrl, id_number) {
    let img = document.createElement("img")
    img.className = "toggle-sprite";
    img.src = frontImgUrl;
    img.dataset.id = id_number;
    img.action = "flip";
    img.dataset.status = "front";
    img.dataset.front = frontImgUrl;
    img.dataset.back = backImgUrl;
    return img;
  }

  function getPokemonContainer(){
    return document.getElementById('pokemon-container');
  }

  //create functions for creating div and h1 elements
  let createDivElement = createElementFunction('div');
  let createH1Element  = createElementFunction('h1');

  function getAllVisiblePokemonCards(){
    let pokemonCards = document.getElementsByClassName("pokemon-card");
    return Array.from(pokemonCards).filter(pokemonCard => pokemonCard.style.display === "block");
  }

  function getAllPokemonCards(){
    return document.getElementsByClassName("pokemon-card");
  }

  function displayPokemonCards(pokemonCards){
    Array.from(getAllPokemonCards()).forEach(pokemonCard => pokemonCard.style.display = "none")
    pokemonCards.forEach(pokemonCard => pokemonCard.style.display = "block")
  }

  function createAndAttachPokemonCard(pokemon){
    //create elements
    let pokemonContainer = getPokemonContainer();
    let pokemonCardElement  = createDivElement("pokemon-card");
    pokemonCardElement.id = pokemon.name;
    let pokemonFrameElement = createDivElement("pokemon-frame");
    let pokemonImageDiv      = createDivElement("pokemon-image");
    let pokemonNameElement  = createH1Element("center-text");
    pokemonNameElement.innerHTML = pokemon.name;
    let pokemonImgElement = createImgElement(pokemon.sprites.front, pokemon.sprites.back, pokemon.id)
    //attach elments
    pokemonImageDiv.appendChild(pokemonImgElement);
    pokemonFrameElement.appendChild(pokemonImageDiv);
    pokemonFrameElement.appendChild(pokemonNameElement);
    pokemonCardElement.appendChild(pokemonFrameElement);

    pokemonCardElement.addEventListener('click', pokemonFlipEventHandler);

    pokemonContainer.appendChild(pokemonCardElement);
  }
  POKEMON.forEach(createAndAttachPokemonCard);

  let searchBar = document.getElementById("pokemon-search-input");
  searchBar.addEventListener('keyup', searchBarHandler);

  function searchBarHandler(event){
    let input = searchBar.value;
    let searchResults = Array.from(getAllPokemonCards()).filter(pokemon => pokemon.id.startsWith(input));
    //search through all pokemon card nodes, check if name attribute of child is
    //the write thing (use Array.from())
    displayPokemonCards(searchResults);
  }

  function pokemonFlipEventHandler(event){
    let img = event.target;
    if(img.dataset.status === "front"){
      img.dataset.status = "back";
      img.src = img.dataset.back;
    }
    else {
      img.dataset.status = "front";
      img.src = img.dataset.front;
    }
  }


})
