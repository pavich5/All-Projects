"use client";
import React, { useEffect, useState } from "react";
import { Coffee } from "../products/page";
import "./cardPage.css";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Coffee[]>([
    localStorage.getItem("cart"),
    
  ]);
  const [itemQuantities, setItemQuantities] = useState<{[key: number]: number;}>({});
  const {user} = useUser()

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cart");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

    const removeFromCart = (product: Coffee) => {
    const updatedCartItems = cartItems.filter(
      (cartItem: Coffee) => cartItem.id !== product.id
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const updateQuantity = (product: Coffee, quantity: number) => {
    const updatedQuantities = { ...itemQuantities, [product.id]: quantity };
    setItemQuantities(updatedQuantities);
  };

  const calcTotalPrice = () => {
    const totalPrice = cartItems.reduce((sum, cartItem) => {
      const quantity = itemQuantities[cartItem.id] || 1;
      return sum + cartItem.price * quantity;
    }, 0);
    return totalPrice.toFixed(2);
  };

  const addOrder = () => {
    const orderDetails = {
      products: cartItems,
      useremail: user?.primaryEmailAddress?.emailAddress,
    };
    const postOrder = async () => {
      try {
        const response = await axios.post("http://localhost:4000/api/orders", orderDetails);
        console.log("Order added successfully:", response.data);
      } catch (error) {
        console.error("Error adding order:", error);
      }
    };
    setCartItems([]);
    localStorage.setItem("cart", JSON.stringify([]));
    postOrder();
  };

  return (
    <div className="cartPage">
      <h1>Shopping Cart</h1>
      {cartItems.map((cartItem: Coffee) => (
        <div key={cartItem.id} className="cartItem">
          <img src={cartItem.image} alt={cartItem.flavor} />
          <div className="cartItemBody">
          <h2>{cartItem.flavor}</h2>
          <p>{cartItem.description}</p>
          <p className="price">${cartItem.price.toFixed(2)}</p>
          <input
            type="number"
            value={itemQuantities[cartItem.id] || 1}
            onChange={(e) => updateQuantity(cartItem, parseInt(e.target.value))}
          />
          </div>
        
        <div className="cartItemFooter">
        <p>
            Total Item Price: $
            {(cartItem.price * (itemQuantities[cartItem.id] || 1)).toFixed(2)}
          </p>
          <button data-testid="Remove" onClick={() => removeFromCart(cartItem)}>Remove</button>

        </div>
     
        </div>
      ))}
      <div className="totalPrice" data-testid={`totalPrice`}>
        <p>Total Price: ${calcTotalPrice()}</p>
        <button onClick={()=> addOrder()}>Purchase</button>
      </div>
    </div>
  );
};

export default CartPage;
