"use client";
import { UserButton } from "@clerk/nextjs";
import './header.css';
import coffeeDataJson from "../../data/coffees.json"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Coffee } from "app/products/page";

const Header = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Coffee[]>([]); 
  const [coffeeData,setCoffeeData] = useState<Coffee[]>([])

  useEffect(() => {
    if (searchValue) {
      const filteredCoffees = coffeeData.filter((coffee: Coffee) =>
        coffee.type.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filteredCoffees);
    } else {
      setFilteredData([]);
    }
    const coffeeDataLocal = localStorage.getItem('allCoffee');
    if(coffeeDataLocal){
      setCoffeeData(JSON.parse(coffeeDataLocal))
    } else {
      setCoffeeData(coffeeDataJson)
    }
  }, [searchValue]);

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
            <Link href={`/products/${coffee.id}`}>
            <div className="coffee-search" key={coffee.id} onClick={()=> setFilteredData([])} data-testid={`coffee-item-${coffee.id}`}>
              <img src={coffee.picture} alt="" />
              <h3>{coffee.type}</h3>
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
