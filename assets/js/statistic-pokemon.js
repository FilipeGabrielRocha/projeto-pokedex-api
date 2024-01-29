const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');
const pokemonDetailsElement = document.getElementById('pokemonDetails');

if (pokemonId) {
    pokeApi.getPokemonDetailById(pokemonId).then(displayPokemonDetails);
} else {
    console.error("ID do Pokémon não fornecido.");
}

function selectTab(tab) {
    const tabSelected = document.querySelector('.tab.selected')
    tabSelected.classList.remove('selected')

    tab.classList.add('selected')
}

function showTabInformation(tab){
    const informationSelected = document.querySelector('.information.selected')
    informationSelected.classList.remove('selected')

    const elementIdTabInformation = `information-${tab.id}`

    const informationToBeShown = document.getElementById(elementIdTabInformation)
    informationToBeShown.classList.add('selected')
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
            <header>
                <nav>
                    <ul class="list-statistic">
                        <li class="tab selected" id="about">Sobre</li>
                        <li class="tab" id="base-stats">Status Base</li>
                        <li class="tab" id="evolution">Evoluções</li>
                        <li class="tab" id="moves">Movimentos</li>
                    </ul>
                </nav>
            </header>
            <article class="informations">
                <div class="information selected"  id="information-about">
                    <ul class="list-information">
                        <li>
                            <p>Altura:</p>
                            <p>${(pokemon.height / 10).toFixed(2)} m</p>
                        </li>
                        <li>
                            <p>Peso:</p>
                            <p>${(pokemon.weight / 10).toFixed(2)} kg</p>
                        </li>
                        </li>
                        <li class="abilities">
                            <p>Habilidades:</p>
                            <p>${pokemon.abilities.join(', ')}</p>
                        </li>
                    </ul>
                </div>
                <div class="information container_base_stats" id="information-base-stats">
                    <div class="stats_name">
                        <ul class="list_stats_name">
                            ${pokemon.stats_name.map((stat_name) => `<li>${stat_name}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="stats_value">
                        <ul class="list_stats_value">
                        ${pokemon.stats_value.map((stat_value) => `<li>${stat_value}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                <div class="information" id="information-evolution">
                    <ul class="list-information">
                        <li>EVOLUTION</li>
                    </ul>
                </div>
                <div class="information" id="information-moves">
                    <ul class="list-information">
                        <li>MOVES</li>
                    </ul>
                </div>
            </article>
        </section>
                `

    pokemonDetailsElement.innerHTML = newHtmlStatistic;

    const tabs = document.querySelectorAll('.tab')
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            if (tab.classList.contains('selected')){
                return
            }

            selectTab(tab)

            showTabInformation(tab)
        })
    })
}
