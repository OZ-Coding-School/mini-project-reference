import { useState, useEffect } from "react";
import API from "../API";

export default function useFetchBookmarkedMovies(bookmarkedMovieIds) {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

  useEffect(() => {
    const fetchBookmarkedMovies = async () => {
      const moviePromises = bookmarkedMovieIds.map((id) =>
        API.get(`/movie/${id}?language=ko-KR`).then((response) => response.data)
      );

      const movies = await Promise.all(moviePromises);
      setBookmarkedMovies(movies);
    };

    if (bookmarkedMovieIds.length > 0) {
      fetchBookmarkedMovies();
    } else {
      setBookmarkedMovies([]);
    }
  }, [bookmarkedMovieIds]);

  return bookmarkedMovies;
}
