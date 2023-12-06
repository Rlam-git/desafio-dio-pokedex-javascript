

const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0

function showDetailsPokemon(pokemonName){
    var modal = document.getElementById(`myModal-${pokemonName}`)
    var span = document.getElementById(`close-${pokemonName}`)
    span.onclick = function() {modal.style.display = "none"};
    modal.style.display = "block";
}

function convertPokemonToLi(pokemon) {
    console.log(pokemon.stats);
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <div class="show">
                <button type="button" onclick="showDetailsPokemon('${pokemon.name}')">Show</button>
            <div> 
                <div id="myModal-${pokemon.name}" class="modal">
                    <div class="modal-content ${pokemon.type}">                              
                                <div class="modal-header">
                                    <span class="return" id="close-${pokemon.name}">&#129144;</span>
                                    <span class="span-name">${pokemon.name}</span>
                                    <span class="span-number">${pokemon.number}</span>
                                    <ul class="types">
                                       ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                                    </ul>
                                </div>
                                <div class="img">
                                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                                </div>
                                <div class="modal-body">
                                    <h3>Status</h3>                         
                                    <table>
                                      ${pokemon.stats.map((stat) => 
                                        `<tr>
                                           <th class="colum-title">${stat.stat.name}</th> 
                                           <td>${stat.base_stat}</td>
                                           <td><progress value="${stat.base_stat}" max="200"></progress></td>                         
                                         </tr>`).join('')}
                                    </table>
                                </div>
                </div>
            </div>           
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})