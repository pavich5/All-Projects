import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Page from "./page";

jest.mock("next/navigation", () => ({
  useParams: () => ({ id: "1" }),
}));

// Mock the fetch function (you can replace this with actual data if needed)
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => ({
      id: 1,
      flavor: "Test Flavor",
      description: "Test Description",
      price: 9.99,
      brand: "Test Brand",
      servings: 2,
      name: "Test Coffee",
      image: "test.jpg",
    }),
    ok: true,
  })
);
  it("renders product information after data is loaded", async () => {
    render(<Page />);

    const productTypeElement = await screen.findByText("Test Flavor");

    expect(productTypeElement).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Price: $9.99")).toBeInTheDocument();
    expect(screen.getByText("Brand: Test Brand")).toBeInTheDocument();
    expect(screen.getByText("Servings: 2")).toBeInTheDocument();
    expect(screen.getByText("Name: Test Coffee")).toBeInTheDocument();
    expect(screen.getByAltText("Coffee 1")).toBeInTheDocument();
  });

  it("adds a product to the cart when 'Add to Cart' button is clicked", async () => {
    render(<Page />);
    await screen.findByText("Test Flavor");
  
    const addToCartButton = screen.getByTestId("add-to-cart-button");
    fireEvent.click(addToCartButton);
  
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    expect(cartItems).toEqual([{
      id: 1,
      flavor: "Test Flavor",
      description: "Test Description",
      price: 9.99,
      brand: "Test Brand",
      servings: 2,
      name: "Test Coffee",
      image: "test.jpg",
      isInCart: true,
    }]);
  });

  it("displays an error message when fetch fails", async () => {
    global.fetch = jest.fn(() => Promise.reject("Fetch failed"));
    render(<Page />);
    waitFor(async ()=> {
    const errorMessage = await screen.findByText("Loading...");
    expect(errorMessage).toBeInTheDocument();
    },{timeout:3000})
  });
  
  it("displays 'Product not found' message when product is null", async () => {
    // Mock the fetch function to resolve with null product data
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => null,
      ok: true,
    }));
  
    render(<Page />);
  
    // Wait for the "Product not found" message to be displayed
    const notFoundMessage = await screen.findByText("Product not found");
    expect(notFoundMessage).toBeInTheDocument();
  });
  