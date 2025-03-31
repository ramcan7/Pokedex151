const pokemonList = document.querySelector("#pokemonList");
const buttonsHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

// Page starts in see-all pokemon
fetchSequentially("see-all")

async function fetchSequentially(filterType) {
    for (let i = 1; i <= 151; i++) {
        await fetchPokemon(i, filterType);
    }    
}

async function fetchPokemon(id, filterType) {
    const response = await fetch(URL + id);
    const data = await response.json();
    if(filterType === "see-all"){
        showPokemon(data);
    }
    else {
        const types = data.types.map(type => type.type.name)
        if(types.includes(filterType)) {
            showPokemon(data);
        }
    }
}

function showPokemon(pokemon) {
    let types = pokemon.types.map((type) => `<p class="${type.type.name} type">${type.type.name}</p>`);
    types = types.join('');

    let pokemonId = pokemon.id.toString();
    pokemonId = pokemonId.padStart(3, "0")

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `<p class="pokemon-id-back">#${pokemonId}</p>
                    <div class="pokemon-image">
                        <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
                    </div>
                    <div class="pokemon-info">
                        <div class="name-container">
                            <p class="pokemon-id">
                                #${pokemonId}
                            </p>
                            <h2 class="pokemon-name">
                                ${pokemon.name}
                            </h2>
                        </div>
                        <div class="pokemon-types">
                            ${types}
                        </div>
                        <div class="pokemon-stats">
                            <p class="stat">${pokemon.height}m</p>
                            <p class="stat">${pokemon.weight}kg</p>
                        </div>
                    </div>`;
    pokemonList.append(div);
}

buttonsHeader.forEach(button => button.addEventListener("click", (event) => {
    const idButton = event.currentTarget.id;

    pokemonList.innerHTML = ""

    fetchSequentially(idButton)
}))