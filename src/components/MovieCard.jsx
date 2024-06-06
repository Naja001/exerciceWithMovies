// src/MovieCard.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ id, movie, image, imdb_url, onOpenModal }) {
  //provjera da li su props prenjeti kako treba
  console.log("MovieCard props:", { id, movie, image, imdb_url, onOpenModal }); 

  return (
    <div className="card" style={{ width: '100%', height: '25rem' }}>
     {/* <img src={`https://dummyapi.online/${image}`} className="card-img-top" alt={movie} /> */}
     <img src={"https://www.kindpng.com/picc/m/18-189751_movie-placeholder-hd-png-download.png"} className="card-img-top" alt={movie} />
      <div className="card-body">
        <h5 className="card-title">{movie}</h5>
        <p className="card-text">
          <a href={imdb_url} target="_blank" rel="noopener noreferrer">
            IMDb
          </a>
        </p>
       
        <button onClick={() => onOpenModal(id)} className="btn btn-primary" >
          See movie detail
        </button>
      </div>
    </div>
  );
}
