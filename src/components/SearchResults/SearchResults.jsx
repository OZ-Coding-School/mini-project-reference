import React, { useRef, useEffect } from "react";
import API from "../../API";
import SearchMovieTile from "../SearchMovieTile/SearchMovieTile";
import "./SearchResults.scss";

export default function SearchResults(props) {
  const [movies, setMovies] = React.useState([]);
  const [results, setResults] = React.useState(false);
  const resultsRef = useRef(null); // Ref for the results container

  // Load search results from the API
  useEffect(() => {
    if (props.search.length === 0) return;
    API.get(
      `/search/movie?language=ko-KO&include_adult=false&query=${props.search}`
    ).then((response) => {
      const fetchedMovies = response.data.results.slice(0, 5);
      setMovies(
        fetchedMovies.map((movie, i) => {
          if (movie.release_date === undefined) return null;
          return <SearchMovieTile movie={movie} key={movie.id} />;
        })
      );
    });
  }, [props.search]);

  // Update display based on results
  useEffect(() => {
    setResults(props.search.length > 0 && movies.length > 0);
  }, [movies, props.search]);

  // Detect clicks outside the results container to hide it
  useEffect(() => {
    function handleClickOutside(event) {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setResults(false); // Hide results
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [resultsRef]);

  return (
    <div className="search-results-container" ref={resultsRef}>
      {results ? (
        <div className="search-results-list">{movies}</div>
      ) : (
        <p className="search-results-empty">Nothing found</p>
      )}
    </div>
  );
}
