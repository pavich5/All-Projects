import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Header from "./Header";
import fetchMock from "jest-fetch-mock";

jest.mock("@clerk/nextjs", () => ({
  UserButton: ({}) => <div></div>,
}));

beforeEach(() => {
  fetchMock.enableMocks();
});

afterEach(() => {
  fetchMock.resetMocks();
});

describe("Header Component", () => {
  it("renders the logo", () => {
    render(<Header />);
    const logo = screen.getByText("Brew Haven");
    expect(logo).toBeInTheDocument();
  });

  it("renders the Home link", () => {
    render(<Header />);
    const homeLink = screen.getByText("Home");
    expect(homeLink).toBeInTheDocument();
  });

  it("renders the Cart link", () => {
    render(<Header />);
    const cartLink = screen.getByText("Cart");
    expect(cartLink).toBeInTheDocument();
  });

  it("updates the input value correctly and shows coffee items", async () => {
    render(<Header />);
    const inputElement = screen.getByPlaceholderText("Search for your coffee");
    fireEvent.change(inputElement, { target: { value: "Cappuccino" } });
    fetchMock.mockResponseOnce(
      JSON.stringify([
        { id: 1, flavor: "Cappuccino", image: "cappuccino.jpg" },
        { id: 2, flavor: "Coffee", image: "coffee.jpg" },
      ])
    );
    waitFor(
      async () => {
        const coffeeItem = await screen.findByText("Cappuccino");
        expect(coffeeItem).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
