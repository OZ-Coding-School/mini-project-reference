import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectSelectedGenres } from "./redux/reducers/selectedGenresSlice";
import API from "./API";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import TopRatedMovie from "./components/Movie/TopRatedMovie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Section = styled.div`
  position: relative;
  padding-top: 1.333rem;
  padding-bottom: 1.333rem;
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

const SectionPopular = styled.div`
  margin: -4rem -1.333rem -1.5rem;
  padding: 4rem 1.333rem 2.5rem;
  overflow: visible;
`;

const CustomSwiper = styled(Swiper)`
  position: relative;
  overflow: visible;

  .swiper-wrapper {
    align-items: stretch;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto !important;
  }

  .swiper-pagination {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 21;
  }

  .swiper-pagination-fraction {
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    padding: 0 0.5rem;
    border-radius: 2rem;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 1.2rem;
    cursor: pointer;
  }

  .swiper-pagination-current,
  .swiper-pagination-total {
    margin: 0 2px;
  }

  .swiper-pagination-current {
    font-weight: bold;
  }

  .swiper-pagination-total {
    opacity: 0.7;
  }

  &:hover .navigation-button {
    opacity: 1;
  }
`;

const NavigationButton = styled.div`
  // background: hsla(0, 0%, 8%, 0.5);
  background: radial-gradient(
    106.25% 50% at 106.25% 50%,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.6) 52.6%,
    rgba(0, 0, 0, 0) 100%
  );
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 3.5rem;
  height: 100%;
  z-index: 20;
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 1.5rem;

  &.prev {
    left: -4rem;
  }

  &.next {
    right: -4rem;
  }

  @media (max-width: 576px) {
    width: 2rem;

    &.prev {
      left: -2rem;
    }

    &.next {
      right: -2rem;
    }
  }
`;

export default function MovieRated({ request }) {
  const [movies, setMovies] = useState([]);
  const selectedGenres = useSelector(selectSelectedGenres);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);

  useEffect(() => {
    fetchMovies();
  }, [selectedGenres, request]);

  const fetchMovies = async () => {
    try {
      const response = await API.get(
        `${request}&with_genres=${selectedGenres.toString()}`
      );
      const topTwentyMovies = response.data.results.slice(0, 20);
      setMovies(topTwentyMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <Section>
      <SectionHeader>평점순 TOP 20</SectionHeader>
      <SectionPopular>
        <CustomSwiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{
            el: paginationRef.current,
            clickable: true,
            type: "fraction",
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.params.pagination.el = paginationRef.current;
          }}
          spaceBetween={10}
          slidesPerView={3}
          slidesPerGroup={3}
          breakpoints={{
            576: { slidesPerView: 3, slidesPerGroup: 3 },
            992: { slidesPerView: 3, slidesPerGroup: 3 },
            1200: { slidesPerView: 4, slidesPerGroup: 4 },
            2000: { slidesPerView: 5, slidesPerGroup: 5 },
          }}
        >
          {movies.map((movie, index) => (
            <SwiperSlide key={`${movie.id}_${index}`}>
              <TopRatedMovie data={movie} rank={index + 1} />
            </SwiperSlide>
          ))}

          <NavigationButton ref={prevRef} className="prev navigation-button">
            <FontAwesomeIcon icon={faChevronLeft} />
          </NavigationButton>
          <NavigationButton ref={nextRef} className="next navigation-button">
            <FontAwesomeIcon icon={faChevronRight} />
          </NavigationButton>
        </CustomSwiper>
      </SectionPopular>

      <div ref={paginationRef} className="swiper-pagination"></div>
    </Section>
  );
}
