const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');
const pokemonDetailsElement = document.getElementById('pokemonDetails');

if (pokemonId) {
    pokeApi.getPokemonDetailById(pokemonId).then(displayPokemonDetails);
} else {
    console.error("ID do Pokémon não fornecido.");
}

function displayPokemonDetails(pokemon) {

    const newHtmlStatistic = `
        <section class="content-statistic ${pokemon.type}">
            <a href="../../index.html">
                <i class="fa-solid fa-arrow-left-long btn-arrow"></i>
            </a>
            <button class="btn-voltar-pokeStatistic" type="button">
                <a href="../../index.html">Voltar</a>
            </button>
            <header class="header-statistic">
                <div class="container-name-type">
                    <h2 class="name-pokemon">${pokemon.name} (shiny)</h2>
                    <ol id="type" class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>
                <p class="number">#${pokemon.number.toFixed(0).padStart(3, '0')}</p>
            </header>
            <img class="photo-pokemon" src=${pokemon.photo} alt="${pokemon.name} (shiny)">
        </section>
        <section class="statistic-pokemon">
        </section>
    `

    pokemonDetailsElement.innerHTML = newHtmlStatistic;
}
