import Link from 'next/link';
import './landingPage.css';

export default function Home() {
  return (
    <div className="landing-container">
      <div className="background-image">
        <div className="content">
          <h1 className="heading">Welcome to the Pokémon Universe</h1>
          <p>Discover a world filled with Pokémon adventures, battles, and mysteries.</p>
          <p>Join us on an epic journey to become a Pokémon Master!</p>
          <Link href="/pokemons">
            <button className="landing-button">Explore Pokémon</button>
          </Link>
          <h3>Or if you love cats</h3>
          <Link href="/cats">
            <button className="landing-button">Explore Funny Cats</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
