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
        let pokemonList = $('.pokemon-list');

        //Create elements
        let listItem = $('<li></li>');
        listItem.append($(document.createTextNode(pokemon.name)));
        listItem.addClass('btn__pokemon-name list-group-item list-group-item-action');
        listItem.attr('data-toggle', 'modal');
        listItem.attr('data-target', '#modal');

        //Append
        pokemonList.append(listItem);

        //Add a event listener to created button
        listItem.on('click', (e) => {
            showDetails(pokemon);
        })
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



    //Show details of a pokemon
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    };

    //Show message while loading
    function showLoadingMessage() {
        let message = $('.loading-message');
        message.removeClass('hide-element');
    };

    //Hide loading message
    function hideLoadingMessage() {
        let message = $('.loading-message');
        message.addClass('hide-element');
    };



    //Show modal
    function showModal(pokemon) {
        let { name, imageUrl, height, types, abilities } = pokemon;

        //Clear existing content in modal
        let pokemonName = $('.modal-title');
        pokemonName.empty();
        pokemonName.addClass('pokemon__name');

        let pokemonDetails = $('.modal-body');
        pokemonDetails.empty();
        pokemonDetails.addClass('pokemon__details');

        //Create elements / add contents to the exisiting elements
        pokemonName.append(document.createTextNode(`${name}`));

        let pokemonImg = $(`<img src="${imageUrl}" alt="${name} image">`);
        pokemonImg.addClass('pokemon__img');

        let pokemonImgBox = $('<div></div>');
        pokemonImgBox.addClass('pokemon__img-box');

        let pokemonHeight = $(`<p>height: 0.${height}m</p>`);
        pokemonHeight.addClass('pokemon__height');

        let pokemonTypeList = $('<ul>types: </ul>');
        pokemonTypeList.addClass('pokemon__types');

        for (type of types) {
            let pokemonTypeItem = $(`<li>"${type.type.name}"</li>`);
            pokemonTypeList.append(pokemonTypeItem);
        }

        let pokemonAbilityList = $(`<ul>abilities: </ul>`);
        pokemonAbilityList.addClass('pokemon__abilities');


        for (ability of abilities) {
            let pokemonAbilityItem = $(`<li>"${ability.ability.name}"</li>`);
            pokemonAbilityList.append(pokemonAbilityItem);
        }

        //Append elements
        pokemonImgBox.append(pokemonImg);
        pokemonDetails.append(pokemonImgBox, pokemonHeight, pokemonTypeList, pokemonAbilityList);
    };



    return { getAll, add, addListItem, loadList, loadDetails };
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

