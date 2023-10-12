import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import OrdersPage from './page';

// Mock a user with the desired properties
const mockUser = {
  primaryEmailAddress: {
    emailAddress: 'test@example.com',
  },
};

jest.mock("@clerk/nextjs", () => ({
  useUser: () => mockUser,
}));

// Mock the global fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        id: 1,
        useremail: 'test@example.com',
        products: [
          {
            id: 1,
            name: 'Coffee 1',
            price: 5.99,
          },
          {
            id: 2,
            name: 'Coffee 2',
            price: 4.99,
          },
        ],
      }),
  })
);

test('renders Orders Page', () => {
  render(<OrdersPage />);
  const titleElement = screen.getByText('Orders Page');
  expect(titleElement).toBeInTheDocument();
});

test('displays "Select an order to view details." when no order is selected', () => {
  render(<OrdersPage />);
  const noOrderText = screen.getByText('Select an order to view details.');
  expect(noOrderText).toBeInTheDocument();
});

test('displays order details when an order is selected', async () => {
  const {findByText} = render(<OrdersPage />);

  const order = screen.findByText('Coffee 1');
  expect(order).toBeInTheDocument();
});
