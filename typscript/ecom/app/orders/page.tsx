"use client";
import { Coffee } from "app/products/page";
import React, { useEffect, useState } from "react";
import './Orders.css';
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface Order {
  id: number;
  useremail: string;
  products: Coffee[];
}

const OrdersPage = () => {
const router = useRouter(); 
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { user,isSignedIn } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  if(!isSignedIn){
    router.push('/sign-up')
  }
  useEffect(()  => {
    const fetchAllOrders = async () => {
        try {
          if (userEmail) {
            const response = await axios.get("http://localhost:4000/api/orders", {
              params: {
                useremail: userEmail,
              },
            });
            setOrders(response.data.allOrders);
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };    
    fetchAllOrders();
  },[userEmail])

  const fetchOrderDetails = async (orderId: number) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/orders/${orderId}`
      );
      const data = await response.json();
      setSelectedOrder(data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const handleOrderClick = (orderId: number) => {
    setSelectedOrder(null);
    fetchOrderDetails(orderId);
  };
  

  return (
    <div className="orders-page">
      <h1>Orders Page</h1>
      <div className="order-list">
        <h2>Order List</h2>
        <ul>
          {orders.map((order: Order) => (
            <li
              key={order.id}
              onClick={() => handleOrderClick(order.id)}
              className="order-item"
            >
              Order {order.id}
            </li>
          ))}
        </ul>
      </div>
      <div className="selected-order-details">
        <h2>Selected Order Details</h2>
        {selectedOrder ? (
          <div>
            <p>Order ID: {selectedOrder.id}</p>
            <p>User Email: {selectedOrder.useremail}</p>
            <p>Products:</p>
            <ul className="products-list">
              {selectedOrder.products.map((product: Coffee, index: number) => (
                <li key={index} className="product-item">
                  <p>Product ID: {product.id}</p>
                  <p>Name: {product.name}</p>
                  <p>Price: {product.price}</p>
                </li>
              ))}
              <p>Total:{selectedOrder.products.reduce((acc, sum) => acc + sum.price, 0)}$</p>
            </ul>
          </div>
        ) : (
          <p>Select an order to view details.</p>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
