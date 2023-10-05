"use client"
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import coffeData from "../../data/coffees.json";
import { Coffee } from "../page";
import "./ProductDetails.css";

const Page = () => {
  const { id: exerciseID } = useParams();
  const [product, setProduct] = useState<Coffee | undefined>();
  const [cartItems, setCartItems] = useState<Coffee[]>([]);
  const [isClicked,setIsClicked] = useState(false)
  useEffect(() => {
    const prod = coffeData.find(
      (coffee: Coffee) => coffee.id === Number(exerciseID)
    );
    setProduct(prod);
    const items = localStorage.getItem("cart");
    if (items) {
      setCartItems(JSON.parse(items));
    }
  }, [exerciseID]);

  const addToCart = () => {
    if (product) {
      const updatedProduct = {
        ...product,
        isInCart: true
      };
      const isAlreadyInCart = cartItems.some((item) => item.id === updatedProduct.id);
      if (!isAlreadyInCart) {
        setCartItems((prevCart) => [...prevCart, updatedProduct]);
        localStorage.setItem("cart", JSON.stringify([...cartItems, updatedProduct]));
      }
    }
    setIsClicked(true)
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
              <button disabled={product.isInCart && isClicked} onClick={addToCart}>Add to cart</button>
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
