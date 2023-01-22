let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


    //Get All items in pokemonList
    function getAll() {
        return pokemonList;
    };

    //Add an item to pokemonList
    function add(item) {
        if (typeof item === 'object' && 'name' in item) {
            pokemonList.push(item);
        } else {
            console.log('Not valid item');
        }
    };

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
            showDetails(pokemon);
        });
    };


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
            });
    };

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
                item.abilities = details.abilities;
            })
            .then(function () {
                hideLoadingMessage();
            })
            .catch(function (e) {
                console.error(e);
                hideLoadingMessage();
            });
    };

    //Show modal (details of a pokemon)
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    };

    //Show message while loading
    function showLoadingMessage() {
        let message = document.querySelector('.loading-message');
        message.classList.remove('hide-element');
    };

    //Hide loading message
    function hideLoadingMessage() {
        let message = document.querySelector('.loading-message');
        message.classList.add('hide-element');
    };


    //Modal functionaily
    let modalContainer = document.querySelector('#modal-container');
    let modal = document.createElement('div');

    function showModal(pokemon) {
        modalContainer.innerHTML = '';
        modal.innerHTML = '';
        let { name, imageUrl, height, types, abilities } = pokemon;

        //Create elements in modal
        modal.classList.add('modal');

        let closeButtonBox = document.createElement('div');
        closeButtonBox.classList.add('modal-close-box');

        let closeButton = document.createElement('img');
        closeButton.classList.add('modal-close');
        closeButton.src = 'img/icon-close-menu.svg';
        closeButton.addEventListener('click', hideModal);

        let pokemonName = document.createElement('h2');
        pokemonName.classList.add('pokemon__name');
        pokemonName.innerText = name;

        let pokemonImg = document.createElement('img');
        pokemonImg.classList.add('pokemon__img');
        pokemonImg.src = imageUrl;
        pokemonImg.alt = `${name} image`;

        let pokemonDetails = document.createElement('div');
        pokemonDetails.classList.add('pokemon__details');

        let pokemonHeight = document.createElement('p');
        pokemonHeight.classList.add('pokemon__height');
        pokemonHeight.innerText = `height: 0.${height}m`;

        let pokemonTypeList = document.createElement('ul');
        pokemonTypeList.classList.add('pokemon__types');
        pokemonTypeList.innerText = 'types: ';

        for (type of types) {
            let pokemonTypeItem = document.createElement('li');
            pokemonTypeItem.innerText = `"${type.type.name}"`;
            pokemonTypeList.append(pokemonTypeItem);
        }

        let pokemonAbilityList = document.createElement('ul');
        pokemonAbilityList.classList.add('pokemon__abilities');
        pokemonAbilityList.innerText = 'abilities: ';

        let pokemonAbilityItem = document.createElement('li');
        for (ability of abilities) {
            pokemonAbilityItem.innerText = `"${ability.ability.name}"`;
            pokemonAbilityList.append(pokemonAbilityItem);
        }

        //Append elements
        closeButtonBox.append(closeButton);
        pokemonDetails.append(pokemonHeight, pokemonTypeList, pokemonAbilityList);
        modal.append(closeButtonBox, pokemonName, pokemonImg, pokemonDetails);
        modalContainer.append(modal);

        modalContainer.classList.add('is-visible');
        modal.classList.add('is-visible');
    };

    function hideModal() {
        modalContainer.classList.remove('is-visible');
        modal.classList.remove('is-visible');
    };

    window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            hideModal();
        }
    });

    window.addEventListener('click', function (e) {
        if (e.target === modalContainer) {
            hideModal();
        }
    });


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

