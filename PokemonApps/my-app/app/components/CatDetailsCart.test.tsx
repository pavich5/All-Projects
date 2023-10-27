import React from "react";
import { render, screen } from "@testing-library/react";
import CatDetailsCart from "./CatDetailsCart";
import "@testing-library/jest-dom";


describe("CatDetailsCart Component", () => {
  const mockCatData = {
    id: "1",
    url: "https://example.com/cat.jpg",
    breeds: [
      {
        name: "Test Breed",
        description: "A test breed of cat",
        temperament: "Calm and friendly",
        origin: "Test Origin",
        life_span: "12",
      },
    ],
  };
  it("should render cat details correctly", () => {
    render(<CatDetailsCart catData={mockCatData} />);
    expect(screen.getByText("Cat Details")).toBeInTheDocument();

    const catImage = screen.getByAltText("Cat 1");
    expect(catImage).toBeInTheDocument();
    expect(catImage).toHaveAttribute("src", "https://example.com/cat.jpg");

    expect(screen.getByText("Breed:")).toBeInTheDocument();
    expect(screen.getByText("Test Breed")).toBeInTheDocument();
    expect(screen.getByText("Description:")).toBeInTheDocument();
    expect(screen.getByText("A test breed of cat")).toBeInTheDocument();
    expect(screen.getByText("Temperament:")).toBeInTheDocument();
    expect(screen.getByText("Calm and friendly")).toBeInTheDocument();
    expect(screen.getByText("Origin:")).toBeInTheDocument();
    expect(screen.getByText("Test Origin")).toBeInTheDocument();
    expect(screen.getByText("Life Span:")).toBeInTheDocument();
    expect(screen.getByText("12 years")).toBeInTheDocument();
  });

  it("should handle missing breed data", () => {
    const catDataWithoutBreed = {
      id: "2",
      url: "https://example.com/cat2.jpg",
      breeds: [],
    };

    render(<CatDetailsCart catData={catDataWithoutBreed} />);

    expect(screen.getByText("Cat Details")).toBeInTheDocument();
    const catImage = screen.getByAltText("Cat 2");
    expect(catImage).toBeInTheDocument();
    expect(catImage).toHaveAttribute("src", "https://example.com/cat2.jpg");

    expect(screen.queryByText("Breed:")).toBeNull();
  });
});
