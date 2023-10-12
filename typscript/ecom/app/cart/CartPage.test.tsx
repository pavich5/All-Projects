import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import CartPage from "./page";

test("calculates total price correctly", () => {
  const cartItems = [
    {
      id: 1,
      image: "coffee.jpg",
      description: "Sample Coffee 1",
      price: 5.99,
      flavor: "Espresso",
    },
    {
      id: 2,
      image: "coffee2.jpg",
      description: "Sample Coffee 2",
      price: 3.99,
      flavor: "Cappuccino",
    },
  ];

  const localStorageMock = {
    getItem: jest.fn().mockReturnValue(JSON.stringify(cartItems)),
  };

  // Mock localStorage
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
    writable: true,
  });

  const { getByTestId } = render(<CartPage />);

  const expectedTotalPrice = (
    cartItems.reduce((sum, cartItem) => {
      const quantity = 1; // Quantity is set to 1 for each item in the cart
      return sum + cartItem.price * quantity;
    }, 0)
  ).toFixed(2);

  const totalPriceElement = getByTestId("totalPrice");
  expect(totalPriceElement.textContent).toBe(`Total Price: $${expectedTotalPrice}`);
});

test("removes a product from the cart when 'Remove' button is clicked", async () => {
  const cartItems = [
    {
      id: 1,
      image: "coffee.jpg",
      description: "Sample Coffee 1",
      price: 5.99,
      flavor: "Espresso",
    },
    {
      id: 2,
      image: "coffee2.jpg",
      description: "Sample Coffee 2",
      price: 3.99,
      flavor: "Cappuccino",
    },
  ];

  const localStorageMock = {
    getItem: jest.fn().mockReturnValue(JSON.stringify(cartItems)),
    setItem: jest.fn(),
  };

  // Mock localStorage
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
    writable: true,
  });

  const { getAllByTestId, queryByText } = render(<CartPage />);

  expect(queryByText("Espresso")).toBeInTheDocument();
  expect(queryByText("Cappuccino")).toBeInTheDocument();

  const removeButtons = getAllByTestId("Remove");
  fireEvent.click(removeButtons[0]);

  await waitFor(() => {
    expect(queryByText("Espresso")).toBeNull();
    expect(queryByText("Cappuccino")).toBeInTheDocument(); 
  });
});
