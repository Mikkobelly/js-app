let pokemonList = [];

pokemonList = [
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

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height >= 7) {
        document.write(`<p>${i + 1}. ${pokemonList[i].name} (height: 0.${pokemonList[i].height}m) - Wow, that' big!</p>`)
    } else {
        document.write(`<p>${i + 1}. ${pokemonList[i].name} (height: 0.${pokemonList[i].height}m)`)
    }
}