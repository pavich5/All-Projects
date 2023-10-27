import React from 'react';

const CatDetailsCart = ({ catData }) => {

  const { url, id, breeds } = catData;
  const breed = breeds && breeds.length > 0 ? breeds[0] : null;

  return (
    <div className="catDetails">
      <h2>Cat Details</h2>
      <div className="catDetailsContainer">
        <div className="imageContainer">
          <img src={url} alt={`Cat ${id}`} />
        </div>
        {breed && (
          <div className="statsContainer">
            <table>
              <tbody>
                <tr>
                  <td>Breed:</td>
                  <td>{breed.name}</td>
                </tr>
                <tr>
                  <td>Description:</td>
                  <td>{breed.description}</td>
                </tr>
                <tr>
                  <td>Temperament:</td>
                  <td>{breed.temperament}</td>
                </tr>
                <tr>
                  <td>Origin:</td>
                  <td>{breed.origin}</td>
                </tr>
                <tr>
                  <td>Life Span:</td>
                  <td>{breed.life_span} years</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatDetailsCart;
