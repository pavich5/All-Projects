import CatDetailsCart from 'app/components/CatDetailsCart';
import React from 'react'
import './catDetails.css'

async function getSingleCat(id: number) {
    const res = await fetch(`https://api.thecatapi.com/v1/images/${id}`);
    const data = await res.json();
    return data;
  }

  
  export default async function Page({params: { id },}: {params: { id: number }}) {
    const catData = await getSingleCat(id)
    return (
        <CatDetailsCart catData={catData} />
    )
  }
