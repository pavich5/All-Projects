import React from 'react';

const CatDetailsCart = ({ catData }) => {
  if (!catData) {
    return null; 
  }

  const { url, id, breeds } = catData;
  const breed = breeds && breeds.length > 0 ? breeds[0] : null;

  return (
    <div className="catDetails">
      <h2>Cat Details</h2>
      <img src={url} alt={`Cat ${id}`} />
      {breed && (
        <>
          <h3>Breed: {breed.name}</h3>
          <p>Description: {breed.description}</p>
          <p>Temperament: {breed.temperament}</p>
          <p>Origin: {breed.origin}</p>
          <p>Life Span: {breed.life_span} years</p>
        </>
      )}
    </div>
  );
};

export default CatDetailsCart;
