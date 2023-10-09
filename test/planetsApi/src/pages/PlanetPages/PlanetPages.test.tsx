import React from "react";
import {render, screen } from "@testing-library/react";
import PlanetPages from "./PlanetPages";



  it("renders the logo", () => {
    render(<PlanetPages />);
    const logo = screen.getByText("Brew Haven");
    expect(logo).toBeInTheDocument();
  });
