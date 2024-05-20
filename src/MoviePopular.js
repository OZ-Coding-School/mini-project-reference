import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectSelectedGenres } from "./redux/reducers/selectedGenresSlice";
import API from "./API";
import Movie from "./components/Movie/Movie";

const Section = styled.div`
  position: relative;
`;

const SectionHeader = styled.h1`
  text-align: left;
  font-size: 1.667rem;
  font-weight: 700;
  padding: 1rem 0;

  @media (max-width: 992px) {
    font-size: 1.333rem;
  }
`;

const SectionList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1em;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 5rem;
  margin: 0 auto;

  @media (max-width: 576px) {
    max-width: 3.5rem;
  }
`;

export default function MoviePopular({ request }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const selectedGenres = useSelector(selectSelectedGenres);

  useEffect(() => {
    setMovies([]);
    setPage(1);
    fetchMovies(1);
  }, [selectedGenres, request]);

  async function fetchMovies(pageToFetch) {
    try {
      setLoading(true);
      const response = await API.get(
        `${request}&page=${pageToFetch}&with_genres=${selectedGenres.toString()}`
      );
      setMovies((prev) => [...prev, ...response.data.results]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleScroll() {
    const nearBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    if (nearBottom && !loading) {
      fetchMovies(page + 1);
      setPage((prev) => prev + 1);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, loading]);

  return (
    <Section>
      <SectionHeader>인기순</SectionHeader>
      <SectionList>
        {movies.map((movie, index) => (
          <Movie key={`${movie.id}_${index}`} data={movie} />
        ))}
      </SectionList>
      {loading && (
        <LoadingIndicator>
          <img src={"/images/spinner.gif"} alt="로딩중" />
        </LoadingIndicator>
      )}
    </Section>
  );
}
