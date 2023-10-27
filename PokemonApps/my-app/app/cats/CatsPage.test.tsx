import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Cats from './page';

async function resolvedComponent(Component: any, props?: any) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: '1',
          url: 'https://cdn2.thecatapi.com/images/7h3.jpg',
          width: 200,
          height: 200,
        },
      ]),
  }) as Promise<Response>
);

test('Cats component fetches and displays cat images', async () => {
  const CatsComponent = await resolvedComponent(Cats, {
    params: {},
    searchParams: {},
  });
  render(<CatsComponent />);

  await waitFor(() => {
    const catImages = screen.getAllByAltText('Cat');
    expect(catImages).not.toHaveLength(0);
  });
});
