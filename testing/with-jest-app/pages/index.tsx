import React, { useEffect, useState } from "react";
import "./PlanetPages.css";

interface Planet {
  name: string;
  climate: string;
  population: string;
  isInFavorite?: boolean;
}

const PlanetPages: React.FC = () => {
  const SWAPI_URL = "https://swapi.dev/api/planets";
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [favoritePlanets, setFavoritePlanets] = useState<Planet[]>([]);
  const [showFavoritePlanets, setShowFavoritePlanets] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch(SWAPI_URL);
      const data = await response.json();
      setPlanets(data.results);
      console.log(loading);
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchAnotherPage = async (pageNumber: number) => {
    try {
      setLoading(true);
      setPlanets([]);
      const response = await fetch(SWAPI_URL + `?page=${pageNumber}`);
      const data = await response.json();
      setPlanets(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const onSelectPlanet = (planetIndex: number) => {
    setSelectedPlanet(planets[planetIndex]);
  };

  const addPlanetToFavorite = (planet: Planet) => {
    if (
      !favoritePlanets.some(
        (favoritePlanet) => favoritePlanet.name === planet.name
      )
    ) {
      setSelectedPlanet((prev) =>
        prev ? { ...prev, isInFavorite: true } : prev
      );

      setFavoritePlanets((prev: Planet[]) => [
        ...prev,
        { ...planet, isInFavorite: true },
      ]);
    }
  };

  const removeFromFavorite = (planet: Planet) => {
    setFavoritePlanets((prevFavorites: Planet[]) =>
      prevFavorites.filter(
        (favoritePlanet) => favoritePlanet.name !== planet.name
      )
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="PlanetPages">
      <div className="landing-page">
        <h1>Welcome to the Star Wars Planet Viewer</h1>
        <p>Explore the galaxy and discover exciting planets!</p>
      </div>
      {loading && <div className="loading" data-testid="loading"></div>}
      {showFavoritePlanets ? (
        <div>
          {favoritePlanets.length === 0 && <h1>You don't have favorites</h1>}
          {favoritePlanets.map((planet: Planet) => (
            <div className="favorite-planet">
              <h1 key={planet.name}>{planet.name}</h1>
              <button onClick={() => removeFromFavorite(planet)}>Remove</button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="planets">
            {planets.map((planet: Planet, index: number) => (
              <div
                onClick={() => {
                  onSelectPlanet(index);
                }}
                className={`planet ${planet.name === selectedPlanet?.name ? "planet-selected" : ""}`}
                key={index}
              >
                {planet.name}
              </div>
            ))}
          </div>
          {selectedPlanet && (
            <div className="selected-planet-details">
              <h2>Selected Planet: {selectedPlanet.name}</h2>
              <p>Climate: {selectedPlanet.climate}</p>
              <p>Population: {selectedPlanet.population.slice(0, 2)}</p>
              <button
                onClick={() => addPlanetToFavorite(selectedPlanet)}
                disabled={selectedPlanet.isInFavorite}
              >
                Add To Favorite
              </button>
            </div>
          )}
        </div>
      )}

      {currentPage > 1 && !showFavoritePlanets && (
        <button
          onClick={() => {
            setCurrentPage(currentPage - 1);
            fetchAnotherPage(currentPage - 1);
          }}
        >
          Previous
        </button>
      )}
      {currentPage < 6 && !showFavoritePlanets && (
        <button
          onClick={() => {
            setCurrentPage(currentPage + 1);
            fetchAnotherPage(currentPage + 1);
          }}
        >
          Next
        </button>
      )}

      <div className="showFavoriteButton">
        <button
          onClick={() => {
            setShowFavoritePlanets(!showFavoritePlanets);
          }}
        >
          {showFavoritePlanets ? "Show All Planets" : "Show Favorite Planets"}
        </button>
      </div>
    </div>
  );
};

export default PlanetPages;
