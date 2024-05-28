import React, { useRef, useEffect } from "react";
import API from "../../API";
import SearchMovieTile from "../SearchMovieTile/SearchMovieTile";
import styled from "styled-components";

const SearchResultsContainer = styled.div`
  width: 100%;
  transition: transform 0.4s ease-out;
  transform: translateY(0);
`;

const SearchResultsList = styled.div`
  display: grid;
  align-items: flex-start;
  gap: 0 0.65em;
  margin-top: 3rem;
  grid-auto-rows: 0px;
  // overflow-y: hidden;
  grid-template: auto / repeat(5, 1fr);
`;

const SearchResultsEmpty = styled.div`
  color: #ccc;
  padding: 1rem;
`;

export default function SearchResults(props) {
  const [movies, setMovies] = React.useState([]);
  const [results, setResults] = React.useState(false);

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

  useEffect(() => {
    setResults(props.search.length > 0 && movies.length > 0);
  }, [movies, props.search]);

  return (
    <SearchResultsContainer>
      {results ? (
        <SearchResultsList>{movies}</SearchResultsList>
      ) : (
        <SearchResultsEmpty></SearchResultsEmpty>
      )}
    </SearchResultsContainer>
  );
}
