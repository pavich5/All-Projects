"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Coffee } from "../page";
import "./ProductDetails.css";

const Page = () => {
  const { id: exerciseID } = useParams();
  const [product, setProduct] = useState<Coffee | undefined>(undefined);
  const [cartItems, setCartItems] = useState<Coffee[]>([]);
  const [isClicked, setIsClicked] = useState(false);
  const [coffeeData, setCoffeeData] = useState<Coffee[]>([]);
useEffect(() => {
  const data = localStorage.getItem("allCoffee");
  if (data) {
    setCoffeeData(JSON.parse(data));
  }
}, []);

useEffect(() => {
  const prod = coffeeData.find(
    (coffee: Coffee) => coffee.id === Number(exerciseID)
  );
  setProduct(prod);
  const items = localStorage.getItem("cart");
  if (items) {
    setCartItems(JSON.parse(items));
  }
}, [exerciseID, coffeeData]);

useEffect(() => {
  if (product) {
    const updatedProduct = {
      ...product,
      isInCart: cartItems.some((item) => item.id === product.id),
    };
    setProduct(updatedProduct);
  }
}, []);
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
        localStorage.setItem(
          "cart",
          JSON.stringify([...cartItems, updatedProduct])
        );
      }
    }
    setIsClicked(true);
  };

  return (
    <div className="product">
      {product ? (
        <>
          <div className="product-image">
            <img src={product.picture} alt={`Coffee ${product.id}`} />
          </div>
          <div className="product-info">
            <h1>{product.type}</h1>
            <p>{product.details}</p>
            <p>Price: ${product.price}</p>
            <div>
              <button
                disabled={product.isInCart}
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
