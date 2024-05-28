import React from "react";
import styled from "styled-components";
import { showMovie } from "../../redux/reducers/movieModalSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const TileContent = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const TileImage = styled.div`
  width: 100%;
  border-radius: 4px;
  aspect-ratio: 8 / 11;
  overflow: hidden;

  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const TileDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.45em 0 0 0.05em;
`;

const MovieTitle = styled.p`
  font-size: 1.0625rem;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-inline-box;
  max-width: 100%;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  // color: #dededeb2;

  @media (max-width: 992px) {
    font-size: 0.9rem;
  }
`;

const RatingYear = styled.div`
  display: flex;
  align-items: center;
  color: #ffd700;
`;

const RatingText = styled.p`
  font-size: 0.75rem; /* 12px */
  color: #666;
`;

const OverviewText = styled.p`
  font-size: 0.75rem; /* 12px */
  color: #aaa;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;

export default function SearchMovieTile(props) {
  const navigate = useNavigate();
  const { title, poster_path, id } = props.movie;

  if (!poster_path) {
    return null;
  }

  // const year = props.movie.release_date.split("-");
  // const dispatch = useDispatch();

  return (
    <TileContent onClick={() => navigate(`/movie/${id}`)}>
      <TileImage>
        <Image
          src={`https://image.tmdb.org/t/p/w400${poster_path}`}
          alt={`${title} poster`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src =
              "https://images.unsplash.com/photo-1662675117392-561a414fcefc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
          }}
        />
      </TileImage>
      <TileDetails>
        <MovieTitle>{title}</MovieTitle>
      </TileDetails>
    </TileContent>
  );
}
{
  /* <RatingYear>
            <RatingText>{`${
              props.movie.vote_average
            } • ${props.movie.vote_count.toLocaleString()} votes • ${
              year[0] || "N/A"
            }`}</RatingText>
          </RatingYear>
          <OverviewText>{props.movie.overview}</OverviewText> */
}
