const listpoke = document.querySelectorAll('.liste-poke')

let allPoke = [];
let tableauFin = [];

function fetchApi () {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
        data.results.forEach((element) => {
            fetchPokemonComplet(element)
        });
    })
}
fetchApi()

function fetchPokemonComplet (element) {
    let fullPoke = {}; //initialisation d'un objet vide afin de le remplir avec de nouvelles données
    let pokeUrl = element.url;
    let pokeName = element.name;

    fetch(pokeUrl)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
        fullPoke.pic = data.sprites.front_default;
        fullPoke.type = data.types[0].type.name;
        fullPoke.id = data.id;
    })

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeName}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
        fullPoke.name = data.names[4].name;
        allPoke.push(fullPoke)
    })
    console.log(allPoke)
}