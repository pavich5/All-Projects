import React from 'react';
import './Header.css';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">My Logo</div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item"><Link href="/">Home</Link></li>
          <li className="nav-item"><Link href="/pokemons">Pokemons</Link></li>
          <li className="nav-item"><Link href="/cats">Cats</Link></li>
          <li className="nav-item"><Link href="#">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
