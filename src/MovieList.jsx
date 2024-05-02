import React from "react";
import MovieItem from "./MovieItem";

export const MovieList = () => {
  return (
    <div className="movie-list-container">
      <MovieItem
        name="별점순"
        request={`/discover/movie?language=ko-KO&include_adult=false&sort_by=vote_count.desc`}
      />
      <MovieItem
        name="인기순"
        request={`/discover/movie?language=ko-KO&include_adult=false&sort_by=popularity.desc`}
      />

      {/* <MovieItem
        name="Upcoming"
        request={`/discover/movie?language=ko-KO&include_adult=false&primary_release_year=2024`}
      /> */}
    </div>
  );
};
