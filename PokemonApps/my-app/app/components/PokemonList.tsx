import Link from 'next/link';
import React from 'react';
import PokemonCard from './PokemonCart';
import { Button, Popconfirm } from 'antd';

const PokemonList = ({data}) => {

  return (
    <div className="pokemonList">
    {data.results?.map((pokemon:any) => {
      const urlParts = pokemon.url.split('/');
      const id = urlParts[urlParts.length - 2];
      return (
        <div key={pokemon.name} className="pokemon">
          <Link href={`/pokemons/${id}`}>
          <Popconfirm
    title="Delete the task"
    description="Are you sure to delete this task?"
    okText="Yes"
    cancelText="No"
  >
              <PokemonCard
                id={id}
                name={pokemon.name}
              />
                </Popconfirm>

          </Link>
        </div>
      );
    })}
  </div>
)};

export default PokemonList;
