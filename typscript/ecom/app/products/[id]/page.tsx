"use client"
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Coffee } from "../page";
import "./ProductDetails.css";

const Page = () => {
  const { id: productID } = useParams();
  const [cartItems, setCartItems] = useState<Coffee[]>([]);
  const [coffeeData, setCoffeeData] = useState<Coffee[]>([]);
  const product = coffeeData.find((coffee: Coffee) => coffee.id === Number(productID));
  const isLoading = coffeeData.length === 0;

  useEffect(() => {
    const items = localStorage.getItem("cart");
    if (items) {
      setCartItems(JSON.parse(items));
    }
  }, [productID]);

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
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/api/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCoffeeData(data.allProducts);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="product">
      {isLoading ? (
        <p>Loading...</p>
      ) : product ? (
        <>
          <div className="product-image">
            <img src={product.image} alt={`Coffee ${product.id}`} />
          </div>
          <div className="product-info">
            <h1 data-testid="product-title">{product.flavor}</h1>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <div>
              <button
                data-testid="add-to-cart-button"
                onClick={addToCart}
              >
                Add to cart
              </button>
              <button>Add to favorite</button>
            </div>
          </div>
        </>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default Page;
