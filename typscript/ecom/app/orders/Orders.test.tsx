import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OrdersPage from './page';
import axios from 'axios';

// Mock user with desired properties
const mockUser = {
  primaryEmailAddress: {
    emailAddress: 'test@example.com',
  },
};

jest.mock('@clerk/nextjs', () => ({
  useUser: () => mockUser,
}));
jest.mock('axios');

describe('OrdersPage', () => {
  it('renders Orders Page', () => {
    render(<OrdersPage />);
    const titleElement = screen.getByText('Orders Page');
    expect(titleElement).toBeInTheDocument();
  });

  it('displays "Select an order to view details." when no order is selected', () => {
    render(<OrdersPage />);
    const noOrderText = screen.getByText('Select an order to view details.');
    expect(noOrderText).toBeInTheDocument();
  });

  test('displays order details when an order is selected', async () => {
    const mockOrder = {
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
    };
  
    require('axios').get.mockResolvedValue({ data: { allOrders: [mockOrder] } });
    render(<OrdersPage />);
    await waitFor(() => screen.getByText('Order List'));
  
    const orderItem = screen.getByText('Order 1');
    fireEvent.click(orderItem);
  
    await waitFor(() => {
      expect(screen.getByText('User Email: test@example.com')).toBeInTheDocument();
      expect(screen.getByText('Product ID: 1')).toBeInTheDocument();
      expect(screen.getByText('Name: Coffee 1')).toBeInTheDocument();
      expect(screen.getByText('Price: 5.99')).toBeInTheDocument();
    });
});

});
