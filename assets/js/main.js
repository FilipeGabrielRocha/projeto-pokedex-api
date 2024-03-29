const loadMoreButton = document.getElementById('loadMore')
const pokemonList = document.getElementById('pokemonList')
const limit = 9
let offset = 0

function capitalizarPrimeiraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <a href="assets/pages/statistics.html?id=${pokemon.number}">
            <li class="pokemon card-pokemon">
                <span class="number">#${pokemon.number.toFixed(0).padStart(3, '0')}</span>
                <span class="name">${capitalizarPrimeiraLetra(pokemon.name)} (shiny)</span>
        
                <div class="detail">
                    <ol id="type" class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src=${pokemon.photo} alt="${pokemon.name} (shiny)">
                </div>
            </li>
        </a>
        `).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItems(offset, limit)


loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemonItems(offset, limit)
})