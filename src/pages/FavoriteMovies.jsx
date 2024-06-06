
import React, { useState, useEffect } from 'react';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
  
    useEffect(() => {
      // Load favorites from local storage
      const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
      if (storedFavorites) {
        setFavorites(storedFavorites);
      }
    }, []);
    console.log(favorites)
  
    return (
      <div className='container'>
        <h2>Favorites</h2>
        <div className="row">
          {favorites.map(favorite => (
            <div key={favorite.id} className="col-md-4 col-sm-12 mb-4">
              <div className="card">
                <img src={favorite.image} className="card-img-top" alt={favorite.movie} />
                <div className="card-body">
                  <h5 className="card-title">{favorite.movie}</h5>
                  <p className="card-text">Rating: {favorite.rating}</p>
                  <a href={favorite.imdb_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">View on IMDb</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
export default Favorites