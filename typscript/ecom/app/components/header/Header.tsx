"use client";
import { UserButton } from "@clerk/nextjs";
import './header.css';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Coffee } from "app/products/page";

const Header = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Coffee[]>([]);
  const [dataBaseCoffee, setDataBaseCoffee] = useState<Coffee[]>([]);

  useEffect(() => {
    if (searchValue) {
      const filteredCoffees = dataBaseCoffee?.filter((coffee: Coffee) =>
        coffee.flavor.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filteredCoffees);
    } else {
      setFilteredData([]);
    }
  }, [searchValue, dataBaseCoffee]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/api/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDataBaseCoffee(data.allProducts);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <header>
      <div className="logo">
        <Link href={"/"}>
          Brew Haven
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href={"/"}>
              Home
            </Link>
          </li>
          <li>
            <Link href={"/cart"}>
              Cart
            </Link>
          </li>
          <input type="text" placeholder="Search for your coffee" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          <div className="coffee-list">
            {filteredData.map((coffee: Coffee) => (
              <Link href={`/products/${coffee.id}`} key={coffee.id}>
                <div className="coffee-search" onClick={() => setFilteredData([])} data-testid={`coffee-item-${coffee.id}`}>
                  <img src={coffee.image} alt="" />
                  <h3>{coffee.flavor}</h3>
                </div>
              </Link>
            ))}
          </div>
          <li>
            <UserButton afterSignOutUrl="/" />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
