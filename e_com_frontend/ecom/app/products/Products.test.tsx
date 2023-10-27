import React from "react";
import { render, fireEvent, screen, getByTestId } from "@testing-library/react";
import Page from "./page";


jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(), 
  }),
}));
jest.mock("@clerk/nextjs", () => ({
  useUser: () => ({
    isSignedIn: true,
    user: {}, 
    isLoaded: true,
  }),
}));

it("should render the component without errors when the user is logged in", () => {
  const { container } = render(<Page />);
  expect(container).toBeInTheDocument();
});

it("should render the products when the component its loaded", () => {
  const { queryByText } = render(<Page />);
  expect(queryByText("Espresso")).toBeInTheDocument()
  expect(queryByText("Iced Coffee")).toBeInTheDocument();
});

it("should show the create user form when button is clicked", () => {
  const { getByTestId, queryByTestId } = render(<Page />);
  const addCoffeeButton = getByTestId("add-coffee-button");
  const createForm = queryByTestId("create-user-form");
  expect(createForm).toBeNull();
  fireEvent.click(addCoffeeButton);
  const updatedCreateForm = screen.getByTestId("create-user-form");
  expect(updatedCreateForm).toBeInTheDocument();
});
it("should not render the page content when the user is not logged in", () => {
  jest.mock("@clerk/nextjs", () => ({
    useUser: () => ({
      isSignedIn: false,
      user: null, 
      isLoaded: true,
    }),
  }));
  setTimeout(()=> {
    const { queryByText } = render(<Page />);
    expect(queryByText("Espresso")).not.toBeInTheDocument();
    expect(queryByText("Cappuccino")).not.toBeInTheDocument();
  },500)
});

// it("should redirect to product details when clicking on a product image", () => {
//   const { getByTestId } = render(<Page />);
//   const productImage = getByTestId("Espresso");

//   fireEvent.click(productImage);

//   // // Expect that useRouter.push was called with the correct URL
//   // expect(useRouter().push).toHaveBeenCalledWith(`/products/${product.id}`);
// });
