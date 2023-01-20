let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: 'Bulbasaur',
            height: 7,
            types: ['grass', 'poison']
        },
        {
            name: 'Charmander',
            height: 6,
            type: ['fire']
        },
        {
            name: 'Squirtle',
            height: 5,
            type: ['water']
        },
        {
            name: 'Caterpie',
            height: 3,
            type: ['bug']
        }
    ];

    function getAll() {
        return pokemonList;
    }

    function add(item) {
        pokemonList.push(item);
    }

    function addV(item) {
        if (typeof item === 'object' && Object.keys(item) === ['name', 'height', 'type']) {
            pokemonList.push(item);
        } else {
            return 'Not valid data type';
        }
    }

    function findPokemon(pokemonName) {
        pokemonList.filter(function (pokemon) {
            return pokemon.name === pokemonName;
        })
    }

    return { getAll, add, addV, findPokemon };
})();


let allPokemons = pokemonRepository.getAll();

allPokemons.forEach(function (item, index) {
    if (item.height >= 7) {
        document.write(`<p>${index + 1}. ${item.name} (height: 0.${item.height}m) - Wow, that' big!</p>`)
    } else {
        document.write(`<p>${index + 1}. ${item.name} (height: 0.${item.height}m)</p>`)
    }
})