import React from "react";
import { render, screen } from "@testing-library/react";
import PokemonDetailsCart from "./PokemonDetailsCart";
import "@testing-library/jest-dom";


describe("PokemonDetailsCart Component", () => {
  const mockPokemonData = {
    name: "Pikachu",
    height: 50,
    weight: 60,
    abilities: [
      { ability: { name: "Static" } },
      { ability: { name: "Lightning Rod" } },
    ],
    sprites: {
      front_default: "pikachu-front.jpg",
      back_default: "pikachu-back.jpg",
      front_shiny: "pikachu-front-shiny.jpg",
      back_shiny: "pikachu-back-shiny.jpg",
    },
    stats: [
      { stat: { name: "HP" }, base_stat: 35 },
      { stat: { name: "Attack" }, base_stat: 55 },
      { stat: { name: "Defense" }, base_stat: 40 },
    ],
    moves: [
      { move: { name: "Thunderbolt" } },
      { move: { name: "Quick Attack" } },
      { move: { name: "Iron Tail" } },
    ],
  };

  it("should render Pokemon details correctly", () => {
    render(<PokemonDetailsCart pokemonData={mockPokemonData} />);

    expect(screen.getByText("Pikachu")).toBeInTheDocument();

    const pokemonImages = screen.getAllByRole("img");
    expect(pokemonImages).toHaveLength(4);
    pokemonImages.forEach((image, index) => {
      expect(image).toHaveAttribute("alt", `Pikachu-${index}`);
    });

    expect(screen.getByText("Height (m)")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Weight (kg)")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();

    expect(screen.getByText("Abilities")).toBeInTheDocument();
    expect(screen.getByText("Static")).toBeInTheDocument();
    expect(screen.getByText("Lightning Rod")).toBeInTheDocument();

    expect(screen.getByText("Stats")).toBeInTheDocument();
    expect(screen.getByText("HP")).toBeInTheDocument();
    expect(screen.getByText("Attack")).toBeInTheDocument();
    expect(screen.getByText("Defense")).toBeInTheDocument();

    expect(screen.getByText("Moves")).toBeInTheDocument();
    expect(screen.getByText("Thunderbolt")).toBeInTheDocument();
    expect(screen.getByText("Quick Attack")).toBeInTheDocument();
    expect(screen.getByText("Iron Tail")).toBeInTheDocument();
  });

  it("should render loading text when no data is provided", () => {
    render(<PokemonDetailsCart pokemonData={null} />);

    // Check if the loading text is displayed
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
