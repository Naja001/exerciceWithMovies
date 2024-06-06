import React, { useEffect, useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const CustomModal = ({ show, handleClose, movieId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [alert, setAlert] = useState(null); // State for the alert message

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    if (movieId) {
      setLoading(true);
      axios
        .get(`https://dummyapi.online/api/movies/${movieId}`)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [movieId]);

  const addToFavorites = () => {
    if (data && !favorites.find((movie) => movie.id === data.id)) {
      const updatedFavorites = [...favorites, data];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setAlert(`${data.movie} has been added to your favorites!`);
      setTimeout(() => setAlert(null), 3000); 
    } else {
      setAlert(`${data.movie} is already in your favorites!`);
      setTimeout(() => setAlert(null), 3000);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No data available</p>;
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{data.movie}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alert && <Alert variant="success">{alert}</Alert>}
        <div>
          <img
            src={`https://dummyapi.online/${data.image}`}
            className="card-img-top"
            alt={data.movie}
          />
          <p className="card-text">Rating: {data.rating}</p>
          <a
            href={data.imdb_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            View on IMDb
          </a>
          <Button onClick={addToFavorites} className="btn btn-primary m-lg-2">
            <FontAwesomeIcon icon={faStar} className="mr-2" />
            Add to favorite
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
