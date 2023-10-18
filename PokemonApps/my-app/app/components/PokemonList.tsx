import Link from 'next/link';
import React from 'react';
import PokemonCard from './PokemonCart';

const PokemonList = (data:any) => {

  return (
    <div className="pokemonList">
    {data.results?.map((pokemon:any) => {
      const urlParts = pokemon.url.split('/');
      const id = urlParts[urlParts.length - 2];
      return (
        <div key={pokemon.name} className="pokemon">
          <Link href={`/pokemons/${id}`}>
              <PokemonCard
                id={id}
                name={pokemon.name}
              />
          </Link>
        </div>
      );
    })}
  </div>
)};

export default PokemonList;
