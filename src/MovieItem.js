// 사용 xx

import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectSelectedGenres } from "./redux/reducers/selectedGenresSlice";
import API from "./API";
import Movie from "./components/Movie/Movie";

const Section = styled.div`
  position: relative;

  .section-list {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    margin: ${({ theme }) => theme.mobilePadding};

    &.popular-list {
      overflow-x: hidden;
      flex-wrap: wrap;
    }
    &.top-rated-list {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .section-item {
    flex: 0 0 auto;
    width: calc((100% / 5));
    overflow: hidden;
    @media (max-width: 1200px) {
      width: calc((100% / 4));
    }
    @media (max-width: 992px) {
      width: calc((100% / 3));
    }
    @media (max-width: 768px) {
      width: calc((100% / 2));
    }
    @media (max-width: 576px) {
      width: 100%;
    }
    &__img {
      width: 100%;
      aspect-ratio: 8 / 12;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    }
  }
`;

const SectionHeader = styled.h1`
  text-align: left;
  padding: 1rem 0;
  margin: 0 4%;
`;

const ScrollButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background-color: #fff;
  padding: 0.5rem;
  border-radius: 5px;
  color: #000;

  &.left {
    left: 2%;
  }
  &.right {
    right: 2%;
  }
`;

const LoadingIndicator = styled.div`
  text-align: center;
`;

export default function MovieItem(props) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const selectedGenres = useSelector(selectSelectedGenres);
  const sliderRef = useRef(null);
  const { name, request } = props;
  const isPopular = name === "인기순";
  const isTopRated = name === "평점순";

  useEffect(() => {
    fetchMovies();
    if (isPopular) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [selectedGenres, request, isPopular]);

  async function fetchMovies() {
    try {
      const response = await API.get(
        `${request}&with_genres=${selectedGenres.toString()}`
      );
      const data = isTopRated
        ? [
            ...response.data.results,
            ...response.data.results,
            ...response.data.results,
          ]
        : response.data.results;
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  async function fetchMoreMovies() {
    try {
      const nextPage = Math.floor(movies.length / 20) + 1;
      const response = await API.get(
        `${request}&page=${nextPage}&with_genres=${selectedGenres.toString()}`
      );
      setMovies((prev) => [...prev, ...response.data.results]);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching more movies:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleScroll() {
    const nearBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    if (nearBottom && !loading) {
      setLoading(true);
      fetchMoreMovies();
    }
  }

  return (
    <Section>
      <SectionHeader>{name}</SectionHeader>
      <ScrollButton
        className="left"
        onClick={() =>
          (sliderRef.current.scrollLeft -= sliderRef.current.clientWidth)
        }
        disabled={!isTopRated}
      ></ScrollButton>
      <div
        ref={sliderRef}
        className={`section-list ${
          isPopular ? "popular-list" : isTopRated ? "top-rated-list" : ""
        }`}
      >
        {movies.map((movie, index) => (
          <Movie key={`${movie.id}_${index}`} data={movie} />
        ))}
      </div>
      <ScrollButton
        className="right"
        onClick={() =>
          (sliderRef.current.scrollLeft += sliderRef.current.clientWidth)
        }
        disabled={!isTopRated}
      ></ScrollButton>
      {isPopular && loading && (
        <LoadingIndicator>Loading more...</LoadingIndicator>
      )}
    </Section>
  );
}
