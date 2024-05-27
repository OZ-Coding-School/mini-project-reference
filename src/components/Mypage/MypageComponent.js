import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MovieItem from "./MovieItem";
import { useBookmarks } from "../../contexts/BookmarkContext";
import API from "../../API";

const MyPageContainer = styled.div`
  padding: 1rem 4% 5rem;
`;

const BookmarkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1em;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default function MyPageComponent() {
  const { bookmarkedMovies, removeBookmark } = useBookmarks();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const moviePromises = bookmarkedMovies.map((id) =>
        API.get(`/movie/${id}?language=ko-KR`).then((response) => response.data)
      );
      const movies = await Promise.all(moviePromises);
      setMovies(movies);
    };

    fetchMovies();
  }, [bookmarkedMovies]);

  const handleRemoveMovie = (movieId) => {
    removeBookmark(movieId);
    setMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.id !== movieId)
    );
  };

  return (
    <MyPageContainer>
      <h2>북마크한 영화</h2>
      {movies.length === 0 ? (
        <p>북마크한 영화가 없습니다.</p>
      ) : (
        <BookmarkGrid>
          {movies.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              onRemove={handleRemoveMovie}
            />
          ))}
        </BookmarkGrid>
      )}
    </MyPageContainer>
  );
}
