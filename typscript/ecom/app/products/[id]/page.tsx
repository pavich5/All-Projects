"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import coffeeData from '../../data/coffees.json'
import { Coffee } from "../page";
import "./ProductDetails.css";

const Page = () => {
  const { id: productID } = useParams();
  const [cartItems, setCartItems] = useState<Coffee[]>([]);
  const coffeeData = localStorage.getItem("allCoffee");
  const storedCoffeeData = coffeeData ? JSON.parse(coffeeData) : [];
  const [allCoffee, setAllCoffee] = useState<Coffee[]>(storedCoffeeData);
  const productToDisplay = allCoffee.find((coffee: Coffee) => coffee.id === Number(productID));
  const [product, setProduct] = useState<Coffee | undefined>(productToDisplay);

  useEffect(() => {
    const items = localStorage.getItem("cart");
    if (items) {
      setCartItems(JSON.parse(items));
    }
  }, [productID, coffeeData]);

  const addToCart = () => {
    if (product) {
      const updatedProduct = {
        ...product,
        isInCart: true,
      };
      const isAlreadyInCart = cartItems.some(
        (item) => item.id === updatedProduct.id
      );
      if (!isAlreadyInCart) {
        setCartItems((prevCart) => [...prevCart, updatedProduct]);
        localStorage.setItem("cart",JSON.stringify([...cartItems, updatedProduct]));
      }
    }
  };

  return (
    <div className="product">
      {product ? (
        <>
          <div className="product-image">
            <img src={product.picture} alt={`Coffee ${product.id}`} />
          </div>
          <div className="product-info">
            <h1 data-testid="product-title">{product.type}</h1>
            <p>{product.details}</p>
            <p>Price: ${product.price}</p>
            <div>
              <button
                disabled={product.isInCart}
                data-testid="add-to-cart-button"
                style={{
                  backgroundColor: product.isInCart
                    ? "rgb(131, 131, 131)"
                    : "rgb(255, 135, 135)",
                }}
                onClick={addToCart}
              >
                Add to cart
              </button>
              <button>Add to favorite</button>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Page;
