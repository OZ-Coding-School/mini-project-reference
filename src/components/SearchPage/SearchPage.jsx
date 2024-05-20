import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../API";
import SearchMovieTile from "../SearchMovieTile/SearchMovieTile";
import styled from "styled-components";

const SearchResultsPage = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1em;
  padding: 1rem 4% 5rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

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
    <SearchResultsPage>
      {movies.length > 0 ? (
        movies.map((movie) => <SearchMovieTile key={movie.id} movie={movie} />)
      ) : (
        <p>No results found for "{query}".</p>
      )}
    </SearchResultsPage>
  );
}
