"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import coffeData from "../data/coffees.json";
import "./products.css";
import Link from "next/link";

export interface Coffee {
  id: number;
  picture: string;
  details: string;
  price: number;
  type: string;
  isInCart?: boolean;
}

const Page = () => {
  const [allCoffee, setAllCoffee] = useState<Coffee[]>([]);
  const [filteredCoffee, setFilteredCoffee] = useState<Coffee[]>([]);
  const [cartItems, setCartItems] = useState<Coffee[]>([]);
  const router = useRouter();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-up");
    } else {
      setAllCoffee(coffeData);
      setFilteredCoffee(coffeData);
    }
    const items = localStorage.getItem("cart");
    if (items) {
      setCartItems(JSON.parse(items));
    }
  }, [isSignedIn]);

  const filterCoffee = (type: string) => {
    const filteredData: Coffee[] = allCoffee.filter(
      (coffee: Coffee) => coffee.type === type
    );
    const updatedFilteredData = filteredData.map((coffee) => {
      const isInCart = cartItems.some((cartItem) => cartItem.id === coffee.id);
      return { ...coffee, isInCart };
    });

    setFilteredCoffee(updatedFilteredData);
  };

  const resetFilter = () => {
    const updatedAllCoffee = allCoffee.map((coffee) => {
      const isInCart = cartItems.some((cartItem) => cartItem.id === coffee.id);
      return { ...coffee, isInCart };
    });
    setFilteredCoffee(updatedAllCoffee);
  };

  const addToCart = (product: Coffee) => {
    const updatedCartItems = [...cartItems, product];
    const updatedFilteredCoffee = filteredCoffee.map((coffee) => {
      if (coffee.id === product.id) {
        return { ...coffee, isInCart: true };
      }
      return coffee;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    setFilteredCoffee(updatedFilteredCoffee);
  };


  return (
    <>
      <div className="coffeeFilters">
        <ul>
          <li onClick={() => filterCoffee("Espresso")}>Espresso</li>
          <li onClick={() => filterCoffee("Cappuccino")}>Cappuccino</li>
          <li onClick={() => filterCoffee("Iced Coffee")}>Iced Coffee</li>
          <li onClick={() => filterCoffee("Americano")}>Americano</li>
          <li onClick={() => filterCoffee("Decaf Coffee")}>Decaf Coffee</li>
          <li onClick={resetFilter}>Show All</li>
        </ul>
      </div>
      <div className="productsPage">
        {filteredCoffee.map((coffee: Coffee) => (
          <div className="coffee" key={coffee.id}>
            <Link href={`/products/${coffee.id}`}>
              <img src={coffee.picture} alt={coffee.type} />
            </Link>
            <h3>{coffee.type}</h3>
            <p>{coffee.details}</p>
            <p className="price">${coffee.price.toFixed(2)}</p>
            <button
              disabled={coffee.isInCart}
              onClick={() => addToCart(coffee)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
