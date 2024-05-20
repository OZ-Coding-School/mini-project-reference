import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SectionItem = styled.div`
  cursor: pointer;
`;
const ItemImg = styled.div`
  width: 100%;
  aspect-ratio: 8 / 12;
  overflow: hidden;
  border-radius: 4px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const ItemTitle = styled.div`
  padding: 0.45rem 0 0 0.05rem;

  @media (max-width: 992px) {
  }
`;

const ItemInfo = styled.p`
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

export default function Movie(props) {
  const navigate = useNavigate();
  const year = props.data.release_date.split("-");

  const handleItemClick = () => {
    navigate(`/movie/${props.data.id}`);
  };

  return (
    <SectionItem onClick={handleItemClick}>
      <ItemImg>
        <img
          src={`https://image.tmdb.org/t/p/w400${props.data.poster_path}`}
          alt="Couldn't find image"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src =
              "https://images.unsplash.com/photo-1662675117392-561a414fcefc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
          }}
        />
      </ItemImg>
      <ItemTitle>
        {/* <p className="">
          평점 : {`${props.data.vote_average}`}
           {`${
              props.data.vote_average
            } • ${props.data.vote_count.toLocaleString()} votes • ${
              year[0] || "N/A"
            }`} 
        </p> */}

        <ItemInfo>{props.data.title}</ItemInfo>
      </ItemTitle>
    </SectionItem>
  );
}
