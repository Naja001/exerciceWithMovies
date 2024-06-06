// src/MovieList.js
import axios from 'axios';
import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import CustomModal from './CustomModal';

export default function MovieList() {
  const [data, setData] = useState([]);
  const [displayCount, setDisplayCount] = useState(6); // Initial number of movies to display
  const [showModal, setShowModal] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    axios.get('https://dummyapi.online/api/movies')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const loadMoreMovies = () => {
    setDisplayCount(prevCount => prevCount + 6);
  };

  const handleOpenModal = (id) => {
    setSelectedMovieId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovieId(null);
  };

 

  return (
    <div className="container mt-4">
      {data.length > 0 ? (
        <>
          <div className="row">
            {data.slice(0, displayCount).map(item => (
              <div key={item.id} className="col-md-4 col-sm-12 mb-4">
                <MovieCard
                  id={item.id}
                  movie={item.movie}
                  image={item.image}
                  imdb_url={item.imdb_url}
                  onOpenModal={handleOpenModal} // Pass the function here
                />
              </div>
            ))}
          </div>
          {displayCount < data.length && (
            <div className="text-center">
              <button className="btn btn-primary" onClick={loadMoreMovies}>Load More</button>
            </div>
          )}
          {selectedMovieId && (
            <CustomModal show={showModal} handleClose={handleCloseModal} movieId={selectedMovieId} />
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
