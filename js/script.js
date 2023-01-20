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

    //Get All items in pokemonList
    function getAll() {
        return pokemonList;
    }

    //Add an item to pokemonList
    function add(item) {
        pokemonList.push(item);
    }

    //Only add an item with right data type to pokemonList - from EX 1.5 Bonus Task
    function addV(item) {
        if (typeof item === 'object' && Object.keys(item).includes('name' || 'height' || 'type')) {
            pokemonList.push(item);
        } else {
            return 'Not valid data type';
        }
    }

    //Find a specific item with pokemon's name from pokemonList - from EX 1.5 Bonus Task
    function findPokemon(pokemonName) {
        pokemonList.filter(function (pokemon) {
            console.log(pokemonName);
            return pokemon.name === pokemonName;
        })
    }

    //Create elements and add to HTML
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');

        //Create elements
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        button.innerText = pokemon.name;
        button.classList.add('btn__pokemon-name');

        //Append
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        //Add a event listener to created button
        button.addEventListener('click', showDetails);
    }

    //Show details of a pokemon
    function showDetails(pokemon) {
        console.log(pokemon.target.innerText);
    }

    return { getAll, add, addV, findPokemon, addListItem };
})();



let allPokemons = pokemonRepository.getAll();

//Display all pokemons in index.html
allPokemons.forEach(function (item) {
    pokemonRepository.addListItem(item);
})



/*
//Code used up tp EX 1.5
allPokemons.forEach(function (item, index) {
    if (item.height >= 7) {
        document.write(`<p>${index + 1}. ${item.name} (height: 0.${item.height}m) - Wow, that' big!</p>`)
    } else {
        document.write(`<p>${index + 1}. ${item.name} (height: 0.${item.height}m)</p>`)
    }
})
*/