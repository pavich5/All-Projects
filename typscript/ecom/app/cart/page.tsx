"use client"
import React, { useEffect, useState } from 'react';
import { Coffee } from '../products/page';
import './cardPage.css'
const CartPage = () => {
  const [cartItems, setCartItems] = useState<Coffee[]>([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cart');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const removeFromCart = (product: Coffee) => {
    const updatedCartItems = cartItems.filter((cartItem: Coffee) => cartItem.id !== product.id);   
    setCartItems(updatedCartItems);
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };
  
  
  return (
    <div className="cartPage">
      <h1>Shopping Cart</h1>
      {cartItems.map((cartItem: Coffee) => (
        <div key={cartItem.id} className="cartItem">
          <img src={cartItem.picture} alt={cartItem.type} />
          <h2>{cartItem.type}</h2>
          <p>{cartItem.details}</p>
          <p className="price">${cartItem.price.toFixed(2)}</p>
          <button onClick={()=> removeFromCart(cartItem)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default CartPage;
