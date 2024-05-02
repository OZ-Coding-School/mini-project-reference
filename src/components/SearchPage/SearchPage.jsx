import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../API";
import SearchMovieTile from "../SearchMovieTile/SearchMovieTile";

export default function SearchPage() {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (query) {
      API.get(`/search/movie?language=ko-KO&include_adult=false&query=${query}`)
        .then((response) => {
          setMovies(response.data.results);
        })
        .catch((error) => console.error("Error fetching movies:", error));
    }
  }, [query]);

  return (
    <div className="search-results-page">
      {movies.length > 0 ? (
        movies.map((movie) => <SearchMovieTile key={movie.id} movie={movie} />)
      ) : (
        <p>No results found for "{query}".</p>
      )}
    </div>
  );
}
