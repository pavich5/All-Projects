import React from "react";
import "./Pokemons.css";
import PokemonList from "../components/PokemonList";

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

const Pokemons = async () => {
  const data = await getPokemonsData(offset);
  return (
    <div className="pokemonContainer">
      <PokemonList data={data} />
      {/* <ButtonsWrapper /> */}
    </div>
  );
};

export default Pokemons;




// const ButtonsWrapper = () => {
//   const handleNextClick = () => {
//     offset += 20;
//     getPokemonsData(offset);
//   };

//   const handlePrevClick = () => {
//     offset -= 20;
//     getPokemonsData(offset);
//   };
//   return (
//     <div>
//       <button onClick={handlePrevClick}>Previous Page</button>
//       <button onClick={handleNextClick}>Next Page</button>;
//     </div>
//   );
// };
