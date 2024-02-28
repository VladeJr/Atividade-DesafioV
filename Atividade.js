const fs = require('fs'); 

fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  .then(response => response.json())
  .then(body => {
    const pokemonUrls = body.results.map(pokemon => pokemon.url);
    return Promise.all(pokemonUrls.map(url => fetch(url).then(resp => resp.json())));
  })
  .then(pokemonDetails => {
    const mappedPokemonDetails = pokemonDetails.map(pokemon => ({
      name: pokemon.name,
      types: pokemon.types.map(typeInfo => typeInfo.type.name),
      weight: pokemon.weight,
      height: pokemon.height,
      dexNumber: pokemon.id,
      sprite: pokemon.sprites.front_default
    }));
    return mappedPokemonDetails;
  })
  .then(mappedPokemonDetails => {
    fs.writeFileSync('pokemonDetails.json', JSON.stringify(mappedPokemonDetails, null, 2), 'utf8');
    console.log('Detalhes dos Pokémon salvos em pokemonDetails.json');
  })
  .catch(error => {
    console.error('Erro ao buscar detalhes dos Pokémon:', error);
  });
