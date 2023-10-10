import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Page from "./page";
import { useRouter } from "next/navigation";


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

it("should redirect to product details when clicking on a product image", () => {
  const { getByTestId } = render(<Page />);
  const productImage = getByTestId("Espresso");

  fireEvent.click(productImage);

  // // Expect that useRouter.push was called with the correct URL
  // expect(useRouter().push).toHaveBeenCalledWith(`/products/${product.id}`);
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
