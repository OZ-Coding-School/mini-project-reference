import React, { useEffect, useState, useRef } from "react";
import API from "./API";
import Movie from "./components/Movie/Movie";
import { useSelector } from "react-redux";
import { selectSelectedGenres } from "./redux/reducers/selectedGenresSlice";
import "./MovieItem.scss";

export default function MovieItem(props) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const selectedGenres = useSelector(selectSelectedGenres);
  const sliderRef = useRef(null);

  const isPopular = props.name === "인기순";
  const isTopRated = props.name === "별점순";

  // 데이터를 불러오는 함수
  const fetchMovies = () => {
    API.get(`${props.request}&with_genres=${selectedGenres.toString()}`)
      .then((response) => {
        const fetchedMovies = response.data.results;
        console.log(response.data);

        if (isTopRated) {
          // Top Rated에는 데이터를 3배 복제하여 좌우 스크롤을 위한 충분한 데이터를 제공
          setMovies([...fetchedMovies, ...fetchedMovies, ...fetchedMovies]);
        } else {
          setMovies(fetchedMovies);
        }
      })
      .catch((error) => console.error("Error fetching movies:", error));
  };

  useEffect(() => {
    fetchMovies();
  }, [selectedGenres, props.request]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        isPopular &&
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loading
      ) {
        setLoading(true);
        API.get(
          `${props.request}&page=${
            Math.floor(movies.length / 20) + 1
          }&with_genres=${selectedGenres.toString()}`
        )
          .then((response) => {
            setMovies((prev) => [...prev, ...response.data.results]);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching more movies:", error);
            setLoading(false);
          });
      }
    };

    if (isPopular) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [movies.length, selectedGenres, props.request, loading, isPopular]);

  const scrollLeft = () => {
    if (isTopRated && sliderRef.current) {
      sliderRef.current.scrollLeft -= sliderRef.current.clientWidth;
    }
  };

  const scrollRight = () => {
    if (isTopRated && sliderRef.current) {
      sliderRef.current.scrollLeft += sliderRef.current.clientWidth;
    }
  };

  const listClassNames = `section__list ${isPopular ? "popular-list" : ""} ${
    isTopRated ? "top-rated-list" : ""
  }`;

  return (
    <div className="section">
      <div className="section__header">
        <p>{props.name}</p>
      </div>
      {isTopRated && (
        <button onClick={scrollLeft} className="scroll-button left">
          {"<"}
        </button>
      )}
      <div ref={sliderRef} className={listClassNames}>
        {movies.map((movie, index) => (
          <Movie key={`${movie.id}_${index}`} data={movie} />
        ))}
      </div>
      {isTopRated && (
        <button onClick={scrollRight} className="scroll-button right">
          {">"}
        </button>
      )}
      {isPopular && loading && (
        <div className="loading-indicator">Loading more...</div>
      )}
    </div>
  );
}
