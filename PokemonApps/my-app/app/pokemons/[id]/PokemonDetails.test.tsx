import React from 'react';
import { render} from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from './page';
import PokemonDetailsCart from 'app/components/PokemonDetailsCart';

async function resolvedComponent(Component, props) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        abilities: [
          { ability: { name: 'chlorophyll' } },
          { ability: { name: 'overgrow' } }
        ],
      }),
  }) as Promise<Response>
);

test('PokemonDetailsCart component renders with mock data', async () => {
    const PokemonDetailsComponent = await resolvedComponent(Page, {
        params: { id: 1},
        searchParams: {},
      });
      render(<PokemonDetailsComponent />);

        const mockData = {
          name: 'bulbasaur',
          height: 7,
          weight: 69,
          abilities: [
            { ability: { name: 'chlorophyll' } },
            { ability: { name: 'overgrow' } },
          ],
     };
      
        render(<PokemonDetailsCart pokemonData={mockData} />);
      });
