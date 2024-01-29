const pokeApi = {}

function convertPokeApiDetailPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    const types = pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    const stats_name = pokemon.stats_name = pokeDetail.stats.map((statSlot) => statSlot.stat.name)
    const stats_value = pokemon.stats_value = pokeDetail.stats.map((statValueSlot) => statValueSlot.base_stat)
    const abilities = pokemon.abilities = pokeDetail.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name)
    const moves = pokemon.moves = pokeDetail.moves.map((movesSlot) => movesSlot.move.name)
    
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.type = type
    pokemon.types = types
    pokemon.photo = pokeDetail.sprites.other.showdown.front_shiny
    // pokemon.photo = pokeDetail.sprites.versions['generation-v']['black-white']['animated'].front_shiny
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    pokemon.stats_name = stats_name
    pokemon.stats_value = stats_value
    pokemon.abilities = abilities
    pokemon.moves = moves
    
    console.log("Nova classe pokemon", pokemon);

    
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailPokemon)
    
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonDetailById = (pokemonId) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;

    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailPokemon);
}