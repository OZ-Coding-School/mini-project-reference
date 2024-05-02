import React from "react";
import { showMovie } from "../../redux/reducers/movieModalSlice";
import { useDispatch } from "react-redux";
import "./SearchMovieTile.scss";
import { useNavigate } from "react-router-dom";

export default function SearchMovieTile(props) {
  const navigate = useNavigate();
  const year = props.movie.release_date.split("-");
  const dispatch = useDispatch();

  return (
    <div
      className="search-movie-tile"
      onClick={() => navigate(`/movie/${props.movie.id}`)}
    >
      <div className="tile-content">
        <img
          className="tile-image"
          src={`https://image.tmdb.org/t/p/w400${props.movie.poster_path}`}
          alt="Couldn't find image"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src =
              "https://images.unsplash.com/photo-1662675117392-561a414fcefc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
          }}
        />
        <div className="tile-details">
          <p className="movie-title">{props.movie.title}</p>
          <div className="rating-year">
            <p className="rating-text">{`${
              props.movie.vote_average
            } • ${props.movie.vote_count.toLocaleString()} votes • ${
              year[0] || "N/A"
            }`}</p>
          </div>
          <p className="overview-text">{props.movie.overview}</p>
        </div>
      </div>
    </div>
  );
}
