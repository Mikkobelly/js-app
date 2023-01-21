let pokemonRepository = (function () {
    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


    //Get All items in pokemonList
    function getAll() {
        return pokemonList;
    }

    //Add an item to pokemonList
    function add(item) {
        if (typeof item === 'object' && 'name' in item) {
            pokemonList.push(item);
        } else {
            console.log('Not valid item');
        }
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
        button.addEventListener('click', function (event) {
            showDetails(pokemon)
        });
    }

    //Show details of a pokemon
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon)
        })
    }

    //Load all pokemons from main API
    function loadList() {
        showLoadingMessage();

        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };

                    add(pokemon);
                })
            })
            .then(function () {
                hideLoadingMessage();
            })
            .catch(function (e) {
                console.error(e);
                hideLoadingMessage();
            })
    }

    //Load details of each pokemon
    function loadDetails(item) {
        showLoadingMessage();

        let url = item.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types;
            })
            .then(function () {
                hideLoadingMessage();
            })
            .catch(function (e) {
                console.error(e);
                hideLoadingMessage();
            })
    }

    //Show message while loading
    function showLoadingMessage() {
        let message = document.querySelector('.loading-message');
        message.classList.remove('hide-element');
    }

    //Hide loading message
    function hideLoadingMessage() {
        let message = document.querySelector('.loading-message');
        message.classList.add('hide-element');
    }

    return { getAll, add, addListItem, loadList, loadDetails, showLoadingMessage, hideLoadingMessage };
})();


pokemonRepository.loadList()
    .then(function () {
        pokemonRepository.getAll().forEach(function (item) {
            pokemonRepository.addListItem(item);
        })
    })
    .catch(function (e) {
        console.error(e);
    })

