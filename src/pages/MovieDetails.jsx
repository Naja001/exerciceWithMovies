import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function MovieDetail() {
  const { id } = useParams();
  console.log(id);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get(`https://dummyapi.online/api/movies/${id}`)
      .then((response) => {
        console.log("Response data:", response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No data available</p>;
  }
  const addToFavorites = () => {
    if (!favorites.find(movie => movie.id === data.id)) {
      const updatedFavorites = [...favorites, data];
      setFavorites(prevFavorites => {
        const newFavorites = [...prevFavorites, data];
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        return newFavorites;
      });
    }
  };
  
  

  return (
    <div className="card" style={{ width: "26rem" }}>
      <img
        src={`https://dummyapi.online/${data.image}`}
        className="card-img-top"
        alt={data.movie}
      />
      <div className="card-body">
        <h5 className="card-title">{data.movie}</h5>
        <p className="card-text">Rating: {data.rating}</p>

        <a
          href={data.imdb_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          View on IMDb
        </a>
        <Link
          to="/favorites"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          onClick={addToFavorites}
        >
          <FontAwesomeIcon icon={faStar} className="mr-2" />
          Add to favorite
        </Link>
      </div>
    </div>
  );
}
