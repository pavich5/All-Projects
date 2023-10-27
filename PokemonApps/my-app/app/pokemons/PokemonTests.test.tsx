import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Pokemons from "./page";
import '@testing-library/jest-dom'

async function resolvedComponent(Component, props) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}

global.fetch = jest.fn(
  () =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          count: 1292,
          next: "https://pokeapi.co/api/v2/pokemon?offset=10&limit=10",
          previous: null,
          results: [
            {
              name: "bulbasaur",
              url: "https://pokeapi.co/api/v2/pokemon/1/",
            },
            {
              name: "venusaur",
              url: "https://pokeapi.co/api/v2/pokemon/3/",
            },
          ],
        }),
    }) as Promise<Response>
);

test("PokemonsComponent renders without errors", async () => {
    const PokemonsComponent = await resolvedComponent(Pokemons, {
      params: {},
      searchParams: { page: 1 },
    });
    render(<PokemonsComponent />);
    await waitFor(() => {
    const dragon = screen.getByText("bulbasaur");
    const button = screen.getByText("NEXT");
    expect(button).toBeInTheDocument();
    expect(dragon).toBeInTheDocument();
    });
  });