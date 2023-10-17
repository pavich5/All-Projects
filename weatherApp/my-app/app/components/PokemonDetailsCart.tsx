import React from 'react';
import './PokemonDetailsCart.css';

const PokemonDetailsCart = ({ pokemonData }) => {
  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  const { name, height, weight, abilities, sprites, stats } = pokemonData;

  return (
    <div className="PokemonDetails">
      <h1 className="pokemon-name">{name}</h1>
      <img className="pokemon-image" src={sprites.front_default} alt={name} />
      <div className="pokemon-stats">
        <p>Height: {height / 10} m</p>
        <p>Weight: {weight / 10} kg</p>
        <div className="pokemon-abilities">
          <h2>Abilities:</h2>
          <ul>
            {abilities.map((ability) => (
              <li key={ability.ability.name}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
        <div className="pokemon-stats">
          <h2>Stats:</h2>
          <ul>
            {stats.map((stat) => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailsCart;
