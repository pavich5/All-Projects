import React from "react";
import { render } from "@testing-library/react";
import CartPage from "./page";

test("calculates total price correctly", () => {
  const cartItems = [
    {
      id: 1,
      picture: "coffee.jpg",
      details: "Sample Coffee 1",
      price: 5.99,
      type: "Espresso",
    },
    {
      id: 2,
      picture: "coffee2.jpg",
      details: "Sample Coffee 2",
      price: 3.99,
      type: "Cappuccino",
    },
  ];

  // Mock localStorage.getItem
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
      const quantity = 2;
      return sum + cartItem.price * quantity;
    }, 0)
  ).toFixed(2);

  const totalPriceElement = getByTestId("totalPrice");
  expect(totalPriceElement.textContent).toBe(`Total Price: $${expectedTotalPrice}`);
});
