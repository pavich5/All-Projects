import React from "react";
import "./Pokemons.css";
import PokemonList from "../components/PokemonList";
import Link from "next/link";

let offset = 10;
async function getPokemonsData(offset: number) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return data;
}
const LIMIT = 10;
const Pokemons = async ({ searchParams: { page = 1 } }) => {
  const data = await getPokemonsData(page * LIMIT);
  return (
    <>
      <div className="pokemonContainer">
        <PokemonList data={data} />
      </div>
      <div className="buttons">
        {parseInt(page) > 1 && (
          <Link href={"?page=" + (parseInt(page) - 1)}>PREVIOUS</Link>
        )}
        <Link href={"?page=" + (parseInt(page) + 1)}>NEXT</Link>
      </div>
    </>
  );
};

export default Pokemons;
