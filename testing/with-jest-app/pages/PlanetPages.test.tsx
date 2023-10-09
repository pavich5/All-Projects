import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PlanetPages from "./index";

test("renders welcome message", () => {
  render(<PlanetPages />);
  const welcomeMessage = screen.getByText(
    "Welcome to the Star Wars Planet Viewer"
  );
  expect(welcomeMessage).toBeInTheDocument();
});

test("renders loading when loading state is true", () => {
  render(<PlanetPages />);
  setTimeout(() => {
    const loadingElement = screen.getByTestId("loading");
    expect(loadingElement).toBeInTheDocument();
  }, 1000);
});

test("allows selecting a planet", async () => {
  render(<PlanetPages />);

  setTimeout(async () => {
    await screen.findByText("Tatooine");

    const planet1Element = screen.getByText("Tatooine");
    fireEvent.click(planet1Element);

    const selectedPlanetElement = await screen.findByText(
      "Selected Planet: Tatooine"
    );
    expect(selectedPlanetElement).toBeInTheDocument();
  }, 1000);
});

test("renders planets when loading state is false", async () => {
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: () =>
      Promise.resolve({
        results: [
          { name: "Tatooine", climate: "Arid", population: "200000" },
          { name: "Alderaan", climate: "Temperate", population: "2000000000" },
        ],
      }),
  });

  render(<PlanetPages />);

  setTimeout(async () => {
    const tatooineElement = await screen.findByText("Tatooine");
    const alderaanElement = await screen.findByText("Alderaan");
    expect(tatooineElement).toBeInTheDocument();
    expect(alderaanElement).toBeInTheDocument();
  }, 1000);
});

test("adds a planet to favorites", async () => {
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: () =>
      Promise.resolve({
        results: [{ name: "Tatooine", climate: "Arid", population: "200000" }],
      }),
  });

  render(<PlanetPages />);

  setTimeout(async () => {
    const planet1Element = await screen.findByText("Tatooine");
    fireEvent.click(planet1Element);

    const addToFavoriteButton = await screen.findByText("Add To Favorite");
    fireEvent.click(addToFavoriteButton);

    // Check if the planet is displayed in the favorites
    const favoritePlanetElement = await screen.findByText("Tatooine");
    expect(favoritePlanetElement).toBeInTheDocument();
  }, 1000);
});

test("removes a planet from favorites", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({
        results: [{ name: "Tatooine", climate: "Arid", population: "200000" }],
      }),
    });
  
    render(<PlanetPages />);
    
    setTimeout(async () => {
      const planet1Element = await screen.findByText("Tatooine");
      fireEvent.click(planet1Element);
  
      const addToFavoriteButton = await screen.findByText("Add To Favorite");
      fireEvent.click(addToFavoriteButton);
  
      const removeButton = await screen.findByText("Remove");
      fireEvent.click(removeButton);
  
      const removedPlanetElement = screen.queryByText("Tatooine");
      expect(removedPlanetElement).toBeNull();
    }, 1000);
  });
  
