import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Page from "./page";

const localStorageMock = (function () {
  let store = {};
  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

jest.mock("next/navigation", () => ({
  useParams: () => ({ id: "1" }),
}));


it('renders loading message initially', () => {
    render(<Page />);
    const loadingElement = screen.getByText('Loading...');
    expect(loadingElement).toBeInTheDocument();
  });

it("renders product information after data is loaded", async () => {
  const product = [
    {
      id: 1,
      type: "Test Coffee",
      details: "Test details",
      price: 5.99,
      picture: "test.jpg",
    },
  ];
  window.localStorage.setItem("allCoffee", JSON.stringify(product));
  window.localStorage.setItem("allCoffee", JSON.stringify(product));
  render(<Page />);
  const productData = window.localStorage.getItem("allCoffee");
  expect(JSON.parse(productData)).toEqual(product);
  const productTypeElement = screen.getByText("Test Coffee");
  expect(productTypeElement).toBeVisible();
});

it('adds a product to cart when "Add to cart" button is clicked', async () => {
    const product = {
      id: 1,
      type: 'Test Coffee',
      details: 'Test details',
      price: 5.99,
      picture: 'test.jpg',
      isInCart: true,
    };
    const productToAdd = {
      id: 1,
      type: "Test Coffee",
      details: "Test details",
      price: 5.99,
      picture: "test.jpg",
      isInCart: true, // Ensure isInCart is set to true
    };
    window.localStorage.setItem('allCoffee', JSON.stringify([product]));
    window.localStorage.setItem('cart', JSON.stringify([]));
    render(<Page />);
    
    // Wait for the product information to be loaded
    await waitFor(() => {
      const productTypeElement = screen.getByText('Test Coffee');
      expect(productTypeElement).toBeInTheDocument();
    });
  
    const addToCartButton = screen.getByText('Add to cart');
    fireEvent.click(addToCartButton);
  
    window.localStorage.setItem('cart', JSON.stringify([productToAdd]));
    const cardItems = JSON.parse(window.localStorage.getItem('cart'));
  
    expect(cardItems).toEqual([productToAdd]);
  });
  
  
