import React from "react";
import { useNavigate } from "react-router-dom";
import "./Movie.scss";

export default function Movie(props) {
  const navigate = useNavigate();
  const year = props.data.release_date.split("-");

  const handleItemClick = () => {
    navigate(`/movie/${props.data.id}`);
  };

  return (
    <div className="section-item" onClick={handleItemClick}>
      <>
        <div className="section-item__img">
          <img
            src={`https://image.tmdb.org/t/p/w400${props.data.poster_path}`}
            alt="Couldn't find image"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src =
                "https://images.unsplash.com/photo-1662675117392-561a414fcefc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
            }}
          />
        </div>
        <div className="">
          <p className="">
            {`${
              props.data.vote_average
            } • ${props.data.vote_count.toLocaleString()} votes • ${
              year[0] || "N/A"
            }`}
          </p>
          <p className="">{props.data.title}</p>
        </div>
      </>
    </div>
  );
}
