import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const Button = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: ${({ $isBookmarked }) => ($isBookmarked ? "red" : "white")};

  &:hover {
    color: ${({ $isBookmarked }) => ($isBookmarked ? "darkred" : "lightgray")};
  }
`;

const BookmarkButton = ({ movieId, onBookmarkChange = () => {} }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarkedMovies =
      JSON.parse(localStorage.getItem("bookmarkedMovies")) || [];
    setIsBookmarked(bookmarkedMovies.includes(movieId));
  }, [movieId]);

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    const bookmarkedMovies =
      JSON.parse(localStorage.getItem("bookmarkedMovies")) || [];

    if (bookmarkedMovies.includes(movieId)) {
      const updatedBookmarks = bookmarkedMovies.filter((id) => id !== movieId);
      localStorage.setItem(
        "bookmarkedMovies",
        JSON.stringify(updatedBookmarks)
      );
      setIsBookmarked(false);
      onBookmarkChange(movieId, false);
    } else {
      bookmarkedMovies.push(movieId);
      localStorage.setItem(
        "bookmarkedMovies",
        JSON.stringify(bookmarkedMovies)
      );
      setIsBookmarked(true);
      onBookmarkChange(movieId, true);
    }
  };

  return (
    <Button onClick={handleBookmarkClick} $isBookmarked={isBookmarked}>
      <FontAwesomeIcon icon={isBookmarked ? solidHeart : regularHeart} />
    </Button>
  );
};

export default BookmarkButton;
