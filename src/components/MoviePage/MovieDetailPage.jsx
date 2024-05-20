import React, { useEffect, useState, useRef } from "react";
import API from "../../API";
import { useParams } from "react-router-dom";
import CastTile from "../CastTile/CastTile";
import MovieProvider from "../MovieProvider/MovieProvider";
import Movie from "../Movie/Movie";
import StarRating from "../StarRating/StarRating";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MovieDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MovieMainInfo = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  margin-bottom: -350px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  background-image: ${({ $backdropPath }) =>
    $backdropPath
      ? `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://image.tmdb.org/t/p/original${$backdropPath})`
      : "none"};
  filter: blur(8px) brightness(0.7);
  overflow: hidden;

  @media (max-width: 768px) {
    filter: none;
  }
`;

const MovieContent = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  column-gap: 2em;
  // grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  width: 100%;
  max-width: 65rem;
  border-radius: 10px;
  margin-top: -100px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    margin-top: 0;
    // margin: ${({ theme }) => theme.mobilePadding};
    padding-right: 4rem;
    padding-left: 4rem;
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 576px) {
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }
`;

const MoviePoster = styled.img`
  grid-column-start: 2;
  grid-row-start: 1;
  align-self: start;
  position: relative;
  overflow: hidden;
  display: inline-block;
  width: 22rem;
  border-radius: 4px;
  box-shadow: 0 18px 30px 0 rgba(0, 0, 0, 0.31);
  background-color: rgba(255, 255, 255, 0.13);

  @media (max-width: 768px) {
    display: none;
    width: 100%;
    margin-top: 1em;
    grid-column-start: 1;
  }
`;

const MovieDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #fff;

  h1 {
    font-size: 3rem;
  }
`;

const CastNames = styled.p`
  font-size: 1rem;
  color: white;

  span {
    cursor: pointer;
    color: #7000ff;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const MovieAdditionalInfo = styled.div`
  display: flex;
  max-width: 65rem;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;

  @media (max-width: 992px) {
    padding-right: 4rem;
    padding-left: 4rem;
  }

  @media (max-width: 576px) {
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }
`;

const CastInfo = styled.div`
  flex: 1;
  padding: 2rem 0;

  h2 {
    margin-bottom: 20px;
  }
`;

const WatchProviders = styled.div``;

const SimilarMoviesSection = styled.div`
  max-width: 65rem;
  width: 100%;

  h2 {
    margin-bottom: 20px;
    margin-top: 48px;
  }

  @media (max-width: 992px) {
    padding-right: 4rem;
    padding-left: 4rem;
  }

  @media (max-width: 576px) {
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }
`;

const SimilarMovies = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1em;
  align-items: stretch;
  justify-items: stretch;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MoreDivider = styled.div`
  max-width: 65rem;
  border-bottom: 2px solid #404040;
  box-shadow: none;
  display: flex;
  height: 6em;
  justify-content: center;
  margin: auto;
  position: relative;
  width: 100%;
`;

const ToggleMoreMoviesButton = styled.button`
  max-height: 42px;
  max-width: 42px;
  min-height: 32px;
  min-width: 32px;
  background-color: rgba(42, 42, 42, 0.6);
  border: 1px solid hsla(0, 0%, 100%, 0.5);
  border-width: 2px;
  border-radius: 50%;
  bottom: 0;
  position: absolute;
  transform: translateY(50%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProvidersWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export default function MovieDetailPage() {
  const { id } = useParams(); // URL에서 영화 ID를 추출
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState("");
  const [runtime, setRuntime] = useState("");
  const [cast, setCast] = useState([]);
  const [watchProviders, setWatchProviders] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]); // 비슷한 영화 데이터 저장
  const [backdropPath, setBackdropPath] = useState("");
  const [showMoreMovies, setShowMoreMovies] = useState(false); // 비슷한 영화 더보기 토글 상태

  const additionalInfoRef = useRef(null); // 추가 정보 섹션에 대한 ref 생성

  useEffect(() => {
    API.get(`/movie/${id}?language=ko-KR`).then((response) => {
      setMovie(response.data);
      setGenres(response.data.genres.map((genre) => genre.name).join(", "));
      const runtimeHours = Math.floor(response.data.runtime / 60);
      const runtimeMinutes = response.data.runtime % 60;
      setRuntime(`${runtimeHours}h ${runtimeMinutes}m`);
      setBackdropPath(response.data.backdrop_path); // 백드롭 이미지 경로 설정

      API.get(`/movie/${id}/credits?language=ko-KR`).then((response) => {
        setCast(response.data.cast);
      });

      API.get(`/movie/${id}/watch/providers`).then((response) => {
        const data = response.data.results?.US?.flatrate?.slice(0, 5) || [];
        setWatchProviders(data);
      });

      API.get(`/movie/${id}/similar?language=ko-KR`).then((response) => {
        setSimilarMovies(response.data.results);
      });
    });
  }, [id]);

  const handleToggleMoreMovies = () => {
    setShowMoreMovies((prevShow) => !prevShow);
  };

  const castNames =
    cast
      .slice(0, 5)
      .map((actor) => actor.name)
      .join(", ") + (cast.length > 5 ? "..." : "");

  const scrollToAdditionalInfo = () => {
    additionalInfoRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <MovieDetailContainer>
      <MovieMainInfo $backdropPath={backdropPath} />
      <MovieContent>
        <MovieDetails>
          <h1>{movie.title}</h1>
          <p>별점: {movie.vote_average}</p>
          <p>장르: {genres}</p>
          <p>상영시간: {runtime}</p>
          <p>줄거리: {movie.overview}</p>
          <WatchProviders>
            {watchProviders.length > 0 && (
              <>
                <h2>시청 가능한 플랫폼:</h2>
                <ProvidersWrapper>
                  {watchProviders.map((provider, index) => (
                    <MovieProvider key={index} movieProvider={provider} />
                  ))}
                </ProvidersWrapper>
              </>
            )}
          </WatchProviders>
          <CastNames>
            출연: {castNames}
            {cast.length > 5 && (
              <span onClick={scrollToAdditionalInfo}> 더보기</span>
            )}
          </CastNames>
        </MovieDetails>
        <MoviePoster
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
      </MovieContent>

      <SimilarMoviesSection>
        <h2>비슷한 영화</h2>
        <SimilarMovies>
          {similarMovies
            .slice(0, showMoreMovies ? similarMovies.length : 6)
            .map((movie) => (
              <Movie key={movie.id} data={movie} />
            ))}
        </SimilarMovies>
        {similarMovies.length > 6 && (
          <MoreDivider>
            <ToggleMoreMoviesButton onClick={handleToggleMoreMovies}>
              <FontAwesomeIcon
                icon={showMoreMovies ? faChevronUp : faChevronDown}
              />
            </ToggleMoreMoviesButton>
          </MoreDivider>
        )}
      </SimilarMoviesSection>

      <MovieAdditionalInfo ref={additionalInfoRef}>
        <CastInfo>
          <h2>출연:</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={2}
            slidesPerGroup={2}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              576: { slidesPerView: 2, slidesPerGroup: 2 },
              998: { slidesPerView: 4, slidesPerGroup: 4 },
              1200: { slidesPerView: 5, slidesPerGroup: 5 },
            }}
          >
            {cast.map((actor, index) => (
              <SwiperSlide key={index}>
                <CastTile person={actor} />
              </SwiperSlide>
            ))}
          </Swiper>
        </CastInfo>
      </MovieAdditionalInfo>
    </MovieDetailContainer>
  );
}
