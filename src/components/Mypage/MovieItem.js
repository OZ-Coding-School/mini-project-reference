import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useBookmarks } from "../../contexts/BookmarkContext";

const ItemContainer = styled.div`
  position: relative;
  cursor: pointer;
  width: 100%;
  max-width: 200px;
`;

const ItemImg = styled.div`
  width: 100%;
  aspect-ratio: 8 / 12;
  overflow: hidden;
  border-radius: 4px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 50%;
  color: #ff6b6b;
  cursor: pointer;
  font-size: 1.2rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: #ff4b4b;
  }
`;

const ItemTitle = styled.div`
  padding: 0.45rem 0 0 0.05rem;
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

  @media (max-width: 992px) {
    font-size: 0.9rem;
  }
`;

const MovieItem = ({ movie, onRemove }) => {
  const { removeBookmark } = useBookmarks();

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    removeBookmark(movie.id);
    onRemove(movie.id);
  };

  return (
    <ItemContainer>
      <ItemImg>
        <img
          src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
          alt="Couldn't find image"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src =
              "https://images.unsplash.com/photo-1662675117392-561a414fcefc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
          }}
        />
        <RemoveButton onClick={handleRemoveClick}>
          <FontAwesomeIcon icon={faTrash} />
        </RemoveButton>
      </ItemImg>
      <ItemTitle>
        <ItemInfo>{movie.title}</ItemInfo>
      </ItemTitle>
    </ItemContainer>
  );
};

export default MovieItem;
