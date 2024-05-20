import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SectionItem = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%; /* Ensure SectionItem takes full height */
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const ItemImg = styled.div`
  width: 75%;
  flex-grow: 1;
  aspect-ratio: 8 / 12;
  overflow: hidden;
  border-radius: 4px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  @media (max-width: 576px) {
    width: 70%;
  }
`;

const ItemTitle = styled.div`
  padding: 0.5rem 0 1.5rem;
  font-size: 1.2rem;
  width: 100%;
  text-align: center;
`;

const Rank = styled.div`
  width: 25%;
  font-size: 4rem;
  align-self: flex-end;

  @media (max-width: 576px) {
    width: 30%;
    font-size: 1.8rem;
  }
`;

export default function TopRatedMovie({ data, rank }) {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/movie/${data.id}`);
  };

  return (
    <SectionItem onClick={handleItemClick}>
      <ContentContainer>
        <Rank>{rank}</Rank>
        <ItemImg>
          <img
            src={`https://image.tmdb.org/t/p/w400${data.poster_path}`}
            alt={`${data.title} poster`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src =
                "https://images.unsplash.com/photo-1662675117392-561a414fcefc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
            }}
          />
        </ItemImg>
      </ContentContainer>
      {/* <ItemTitle>{data.title}</ItemTitle> */}
    </SectionItem>
  );
}
