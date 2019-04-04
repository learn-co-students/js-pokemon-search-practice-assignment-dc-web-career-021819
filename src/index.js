document.addEventListener('DOMContentLoaded', () => {
  // Remove No pokemon here message
  document.querySelector("center").parentNode.removeChild(document.querySelector("center"))
  document.querySelectorAll("p").forEach((element)=>{
    element.parentNode.removeChild(element)
  })

  // Get pokemon Container to put cards in
  var pokemonContainer = document.getElementById('pokemon-container')
  POKEMON.forEach((pokemon) => {
    // Create Pokemon Card
    var pokemonCard = document.createElement("div")
    pokemonCard.className = "pokemon-card"
    pokemonCard.innerHTML = `<div class="pokemon-frame">
        <h1 class="center-text">${pokemon["name"]}</h1>
        <div class="pokemon-image">
          <img data-id="${pokemon["id"]}" data-action="flip" class="toggle-sprite" src="${pokemon["sprites"]["front"]}">
        </div>
      </div>`
      // Add pokemon card to container
    pokemonContainer.appendChild(pokemonCard)
  })
  htmlPage = document.querySelector("html").innerHTML
  // filter pokemon displayed
  searchBar = document.getElementById("pokemon-search-input")
  searchBar.addEventListener("keyup", event => {
    var searchWord = POKEMON.filter(pokemon => {
      return pokemon["name"].includes(searchBar.value.toLowerCase())
    })
    //clear page
    pokemonContainer.innerHTML = ""
    // recreate page
    searchWord.forEach((pokemon) => {
      // Create Pokemon Card
      var pokemonCard = document.createElement("div")
      pokemonCard.className = "pokemon-card"
      pokemonCard.innerHTML = `<div class="pokemon-frame">
          <h1 class="center-text">${pokemon["name"]}</h1>
          <div class="pokemon-image">
            <img data-id="${pokemon["id"]}" data-action="flip" class="toggle-sprite" src="${pokemon["sprites"]["front"]}">
          </div>
        </div>`
        // Add pokemon card to container
      pokemonContainer.appendChild(pokemonCard)
    })
    if (searchWord.length === 0) {
      pokemonContainer.innerHTML = "<p><center>There are no Pokémon here</center></p>"
    }
  })
  // Setup flip listener
  document.addEventListener("click", event => {
    if (event.target.className === "toggle-sprite") {
      if (event.target.getAttribute("data-action") === "flip"){
        event.target.src = POKEMON.find(element => element["id"] == event.target.getAttribute("data-id"))["sprites"]["back"]
        event.target.setAttribute("data-action", "flipped")
      }
      else {
        event.target.src = POKEMON.find(element => element["id"] == event.target.getAttribute("data-id"))["sprites"]["front"]
        event.target.setAttribute("data-action", "flip")
      }
    }
    if (event.target.className === "center-text") {
      var pokemon = POKEMON.find(element => element["name"] == event.target.innerText)
      document.querySelector("html").innerHTML = `<div class="pokemon-frame">
          <h1 class="center-text">${pokemon["name"]}</h1>
          <div class="pokemon-image">
            <img data-id="${pokemon["id"]}" data-action="flip" class="toggle-sprite" src="${pokemon["sprites"]["front"]}">
          </div>
          <p>
          ${pokemon["abilities"]}
          <br>
          ${pokemon["types"]}
          </p>
        </div>
        <button type="button" id="button">Go Back</button>`
    }
    if (event.target.id === "button") {
      document.querySelector("html").innerHTML = htmlPage

      var pokemonContainer = document.getElementById('pokemon-container')
      searchBar = document.getElementById("pokemon-search-input")
      searchBar.addEventListener("keyup", event => {
        var searchWord = POKEMON.filter(pokemon => {
          return pokemon["name"].includes(searchBar.value.toLowerCase())
        })
        //clear page
        pokemonContainer.innerHTML = ""
        // recreate page
        searchWord.forEach((pokemon) => {
          // Create Pokemon Card
          var pokemonCard = document.createElement("div")
          pokemonCard.className = "pokemon-card"
          pokemonCard.innerHTML = `<div class="pokemon-frame">
              <h1 class="center-text">${pokemon["name"]}</h1>
              <div class="pokemon-image">
                <img data-id="${pokemon["id"]}" data-action="flip" class="toggle-sprite" src="${pokemon["sprites"]["front"]}">
              </div>
            </div>`
            // Add pokemon card to container
          pokemonContainer.appendChild(pokemonCard)
        })
        if (searchWord.length === 0) {
          pokemonContainer.innerHTML = "<p><center>There are no Pokémon here</center></p>"
        }
      })
    }
  })
})
