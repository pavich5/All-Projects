"use client";
import { useEffect } from "react";
import styles from "./page.module.css";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import './page.css'
import Link from "next/link";
export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-up", { scroll: false });
    }
  }, []);

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    <>
      <div className="landing-page">
        <div className="overlay"></div>
        <div className="header">
          <h1>Welcome to Brew Haven Coffee Store</h1>
          <p>Indulge in the finest coffee experience</p>
          <Link href={"/products"}>Explore Our Menu</Link>
        </div>
      </div>
      <div className="features">
        <div className="feature-icon">☕️</div>
        <div className="feature-title">Premium Coffee Blends</div>
        <div className="feature-description">
          Discover a curated selection of premium coffee blends from around the
          world.
        </div>
        <div className="feature-icon">🌱</div>
        <div className="feature-title">Sustainably Sourced</div>
        <div className="feature-description">
          We're committed to supporting ethical and sustainable coffee farming
          practices.
        </div>
        <div className="feature-icon">🥐</div>
        <div className="feature-title">Delicious Pastries</div>
        <div className="feature-description">
          Pair your coffee with a variety of freshly baked pastries and treats.
        </div>
      </div>
    </>

    // <div className="homePage">
    //   <h1> Hello, {user.firstName} welcome to Clerk</h1>
    //   <UserButton afterSignOutUrl="/" />
    // </div>
  );
}
