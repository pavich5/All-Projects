"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import coffeData from "../../data/coffees.json";
import { Coffee } from "../page";
import "./ProductDetails.css";
const page = () => {
  const { id: exerciseID } = useParams();
  const [product, setProduct] = useState<Coffee>();
  useEffect(() => {
    const prod = coffeData.find(
      (coffee: Coffee) => coffee.id === Number(exerciseID)
    );
    setProduct(prod);
  }, []);
  return (
    <div className="product">
      <div className="product-image">
        <img src={product?.picture} alt={`Coffee ${product?.id}`} />
      </div>
      <div className="product-info">
        <h1>{product?.type}</h1>
        <p>{product?.details}</p>
        <p>Price: ${product?.price}</p>
        <div>
        <button>Add to card</button>
        <button>Add to favorite</button>
      </div>
      </div>
     
    </div>
  );
};

export default page;
