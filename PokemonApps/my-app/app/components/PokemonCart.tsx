import React from 'react';
import { Interface } from 'readline';


interface PokemonCard {
  name: string;
  id: number;
}

const PokemonCard = (data: PokemonCard) => {
  return (
    <h3>
      {data.name}
    </h3>
  );
};

export default PokemonCard;
