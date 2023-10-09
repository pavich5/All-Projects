import React from "react";
import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import Header from "./Header";


jest.mock("@clerk/nextjs", () => ({
  UserButton: () => ({
    displayName: "Antonio",
  }),
}));

describe("renders the logo", () => {
  it("renders the logo", () => {
    render(<Header />);
    const logo = screen.getByText("Brew Haven");
    expect(logo).toBeInTheDocument();
  });
  it("renders the Home", () => {
    render(<Header />);
    const home = screen.getByText("Home");
    expect(home).toBeInTheDocument();
  });
  it("renders the Cart", () => {
    render(<Header />);
    const Cart = screen.getByText("Cart");
    expect(Cart).toBeInTheDocument();
  });
  it("updates the input value correctly",  () => {
    render(<Header />);
    const inputElement = screen.getByPlaceholderText("Search for your coffee");
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: 'capp' } })
    const coffeItem = screen.getByTestId("coffee-item-2" || "coffee-item-7");
    expect(coffeItem).toBeInTheDocument();
  });
});
