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
    pokemonId = pokemonId.padStart(3, "0");

    let pokemonHeight = (pokemon.height/10).toFixed(1);
    let pokemonWeight = (pokemon.weight/10).toFixed(1);

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `<p class="pokemon-id-back">#${pokemonId}</p>
                    <div class="pokemon-image">
                        <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
                    </div>
                    <audio class="pokemon-sound" src="${pokemon.cries.latest}" type="audio/ogg"> </audio>
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
                            <p class="stat">${pokemonHeight}m</p>
                            <p class="stat">${pokemonWeight}kg</p>
                        </div>
                    </div>`;
    pokemonList.append(div);
}

buttonsHeader.forEach(button => button.addEventListener("click", (event) => {
    const idButton = event.currentTarget.id;

    pokemonList.innerHTML = ""

    fetchSequentially(idButton)
}))

pokemonList.addEventListener("click", (event) => {
    if (event.target.closest(".pokemon-image")) {
        const pokemonCard = event.target.closest(".pokemon");
        const audioElement = pokemonCard.querySelector(".pokemon-sound");

        if(audioElement) {
            audioElement.play();
        }
    }
})