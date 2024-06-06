import MovieList from "../components/MovieList";


export default function Movies() {

  

  return (
    <>
      <h1>Movies</h1>

      <div className="container">
        <div className="row">
          <MovieList />
          
        </div>
      </div>
    </>
  );
}
