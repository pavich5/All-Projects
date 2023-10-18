import PokemonDetailsCart from '@/app/components/PokemonDetailsCart';
import React from 'react'


async function getSinglePokemon(id: number) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    return data;
  }

  export default async function Page({params: { id },}: {params: { id: number }}) {
    const pokemonData = await getSinglePokemon(id)
    return (
      <PokemonDetailsCart pokemonData={pokemonData} />
    )
  }
