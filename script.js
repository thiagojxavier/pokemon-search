const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const pokemonWeight = document.getElementById('weight');
const pokemonHeight = document.getElementById('height');
const pokemonTypes = document.getElementById('types');
const pokemonImg = document.getElementById('img-pokemon');
const pokemonHp = document.getElementById('hp');
const pokemonAttack = document.getElementById('attack');
const pokemonDefense = document.getElementById('defense');
const pokemonSpecialAttack = document.getElementById('special-attack');
const pokemonSpecialDefense = document.getElementById('special-defense');
const pokemonSpeed = document.getElementById('speed');

const searchPokemon = async () => {
    pokemonTypes.innerHTML = ""
    const valueInput = searchInput.value.toLowerCase();

    if(valueInput === "") {
        return
    }

    const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${valueInput}`;

    try {
        const pokemonsData = await fetch(url);
        const dataJSON = await pokemonsData.json();

        const getType = getNestedProperty(dataJSON['types'], 'type','name')
        const dataImg = dataJSON['sprites'];

        pokemonName.textContent = accessDataProperty(dataJSON, 'name');
        pokemonId.textContent = `#${accessDataProperty(dataJSON, 'id')}`;
        pokemonWeight.textContent = `weight: ${accessDataProperty(dataJSON, 'weight')}`;
        pokemonHeight.textContent = `height: ${accessDataProperty(dataJSON, 'height')}`;
        pokemonImg.innerHTML = `<img id="sprite" src="${accessDataProperty(dataImg, 'front_default')}">
        <img class="img-secundary" src="${accessDataProperty(dataImg, 'back_default')}">`;
        getType.forEach((type) => {
            pokemonTypes.innerHTML += `<span class="${type}">${type}<span>`;
        })

        pokemonHp.textContent = dataJSON['stats'][0]['base_stat'];
        pokemonAttack.textContent = dataJSON['stats'][1]['base_stat'];
        pokemonDefense.textContent = dataJSON['stats'][2]['base_stat'];
        pokemonSpecialAttack.textContent = dataJSON['stats'][3]['base_stat'];
        pokemonSpecialDefense.textContent = dataJSON['stats'][4]['base_stat'];
        pokemonSpeed.textContent = dataJSON['stats'][5]['base_stat'];

    } catch {
        alert("Pokémon not found");
    }
}

const accessDataProperty = (data, prop) => {
    return `${data[prop]}`
}

const getNestedProperty = (data, propertyRequired1, propertyRequired2) => {
    const properties = [];

    for(let item of data) {
        properties.push(item[propertyRequired1][propertyRequired2])
    }

    return properties
}

searchButton.addEventListener('click', searchPokemon);
searchInput.focus();
// trocar botão para submit, e corrigir erro de undefined quando pesquisado pokémon 999