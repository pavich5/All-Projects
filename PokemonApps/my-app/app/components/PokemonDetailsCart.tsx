import React from "react";
import "./PokemonDetailsCart.css";

const PokemonDetailsCart = ({ pokemonData }) => {
  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  const { name, height, weight, abilities, sprites, stats, moves } = pokemonData;
  const imageUrls = [
    sprites.front_default,
    sprites.back_default,
    sprites.front_shiny,
    sprites.back_shiny,
  ];

  const limitedMoves = moves.slice(0, 5);
  return (
    <div className="PokemonDetails">
      <h1 className="pokemon-name">{name}</h1>
      <div className="pokemon-images">
        {imageUrls.map((imageUrl, index) => (
          <img
            key={index}
            className="pokemon-image"
            src={imageUrl}
            alt={`${name}-${index}`}
          />
        ))}
      </div>
      <table className="pokemon-table">
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Height (m)</td>
            <td>{height / 10}</td>
          </tr>
          <tr>
            <td>Weight (kg)</td>
            <td>{weight / 10}</td>
          </tr>
          <tr>
            <td>Abilities</td>
            <td>
              <ul>
                {abilities.map((ability:any) => ( 
                  <li key={ability.ability.name}>{ability?.ability.name}</li>
                ))}
              </ul>
            </td>
          </tr>
          <tr>
            <td>Stats</td>
            <td>
              <table className="stats-table">
                <thead>
                  <tr>
                    <th>Stat Name</th>
                    <th>Base Stat</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map((stat:any) => (
                    <tr key={stat.stat.name}>
                      <td>{stat.stat.name}</td>
                      <td>{stat.base_stat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>Moves</td>
            <td>
              <ul>
                {limitedMoves.map((move: any) => (
                  <li key={move.move.name}>{move.move.name}</li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PokemonDetailsCart;
