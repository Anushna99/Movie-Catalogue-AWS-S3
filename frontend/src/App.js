import { useEffect, useState } from "react";
import MovieForm from "./MovieForm";
import MovieList from "./MovieList";
import axios from "axios";

function App() {

  const [movieData, setMovieData] = useState([]); // State to hold movie data

  useEffect(() => {
    // Make an API request to fetch movies
    axios.get('http://localhost:5000/api/movies')
      .then((response) => {
        setMovieData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const addMovie = (newMovie) => {
    setMovieData([...movieData, newMovie]); // Add the new movie to the list
  };


  return (
    <>
      <MovieForm onMovieSubmit={addMovie} />
      <MovieList movies={movieData} />
    </>
  );
}

export default App;
