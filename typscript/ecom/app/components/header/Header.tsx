import { UserButton } from "@clerk/nextjs";
import './header.css'
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className="logo">
      <Link href={"/"}>
          Brew Haven
          </Link></div>
      <nav>
        <ul>
          <Link href={"/"}>
          <li>Home</li>
          </Link>
          <Link href={"/cart"}>
          <li>Cart</li>
          </Link>
          <li>
            <UserButton afterSignOutUrl="/" />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
