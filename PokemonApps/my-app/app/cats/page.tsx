import React from "react";
import Link from "next/link";
import "./Cats.css";

async function getCatsData() {
  const res = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=10`
  );
  const data = await res.json();  
  return data;
}
const Cats = async (props: any) => {
  console.log(props);
  
  const catData = await getCatsData();
  return (
    <>
      <div>
        <h1>Cats</h1>
        <div className="cat-images">
          {catData.map((cat:any) => (
            <Link key={cat.id} href={`/cats/${cat.id}`}>
            <img
              key={cat.id}
              src={cat.url}
              alt={`Cat`}
              width={cat.width}
              height={cat.height}
            />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cats;
