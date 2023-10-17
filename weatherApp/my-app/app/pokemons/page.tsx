import React from "react";
import "./Pokemons.css";
import PokemonCard from "../components/PokemonCart";
import Link from "next/link";
import PokemonList from "../components/PokemonList";

const offset = 20;
async function getPokemonsData() {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?${offset}=60&limit=20`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return data;
}


const weather = async () => {
  const data = await getPokemonsData();
  return (
    <div className="pokemonContainer">
    <PokemonList data={data} />
    <button>Next</button>
    <button>Previous</button>
  </div>
  );
};


export default weather;
