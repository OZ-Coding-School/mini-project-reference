import React from "react";
import MovieItem from "./MovieItem";
import styled from "styled-components";
import MovieRated from "./MovieRated";
import MoviePopular from "./MoviePopular";

const MovieListContainer = styled.div`
  // background-color: #000;
  // color: #fff;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  padding-right: 4rem;
  padding-left: 4rem;
  overflow: hidden;

  @media (max-width: 576px) {
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }
`;

export const MovieList = () => {
  return (
    <MovieListContainer>
      <MovieRated
        request={`/discover/movie?language=ko-KO&include_adult=false&sort_by=vote_count.desc`}
      />
      <MoviePopular
        request={`/discover/movie?language=ko-KO&include_adult=false&sort_by=popularity.desc`}
      />

      {/* <MovieItem
        name="Upcoming"
        request={`/discover/movie?language=ko-KO&include_adult=false&primary_release_year=2024`}
      /> */}
    </MovieListContainer>
  );
};
