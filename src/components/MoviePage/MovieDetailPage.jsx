import React, { useEffect, useState } from "react";
import API from "../../API";
import { useParams } from "react-router-dom";
import CastTile from "../CastTile/CastTile";
import MovieProvider from "../MovieProvider/MovieProvider";
import Movie from "../Movie/Movie";
import "./MovieDetailPage.scss";
import StarRating from "../StarRating/StarRating";

export default function MovieDetailPage() {
  const { id } = useParams(); // URL에서 영화 ID를 추출
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState("");
  const [runtime, setRuntime] = useState("");
  const [cast, setCast] = useState([]);
  const [watchProviders, setWatchProviders] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]); // 비슷한 영화 데이터 저장

  useEffect(() => {
    API.get(`/movie/${id}?language=ko-KR`).then((response) => {
      setMovie(response.data);
      setGenres(response.data.genres.map((genre) => genre.name).join(", "));
      const runtimeHours = Math.floor(response.data.runtime / 60);
      const runtimeMinutes = response.data.runtime % 60;
      setRuntime(`${runtimeHours}h ${runtimeMinutes}m`);

      API.get(`/movie/${id}/credits?language=ko-KR`).then((response) => {
        // setCast(response.data.cast);
        const topFiveCast = response.data.cast.slice(0, 5);
        setCast(topFiveCast);
      });

      API.get(`/movie/${id}/watch/providers?language=ko-KR`).then(
        (response) => {
          const data = response.data.results.KO?.flatrate?.slice(0, 5) || [];
          setWatchProviders(data);
        }
      );

      API.get(`/movie/${id}/similar?language=ko-KR`).then((response) => {
        setSimilarMovies(response.data.results);
      });
    });
  }, [id]);

  return (
    <div className="movie-detail-container">
      <div className="movie-main-info">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
        <div className="movie-details">
          <h1>{movie.title}</h1>
          <p className="rating">별점: {movie.vote_average}</p>
          <p className="genres">장르: {genres}</p>
          <p className="runtime">상영시간: {runtime}</p>
          <p className="overview">줄거리: {movie.overview}</p>
        </div>
      </div>
      <div className="movie-additional-info">
        <div className="cast-info">
          <strong>출연진:</strong>
          <div className="cast-list">
            {cast.map((actor, index) => (
              <CastTile key={index} person={actor} />
            ))}
          </div>
        </div>
        <div className="watch-providers">
          <strong>시청 가능한 플랫폼:</strong>
          {watchProviders.map((provider, index) => (
            <MovieProvider key={index} movieProvider={provider} />
          ))}
        </div>
      </div>
      <div className="similar-movies-section">
        <h2>비슷한 영화</h2>
        <div className="similar-movies">
          {similarMovies.map((movie) => (
            <Movie key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
