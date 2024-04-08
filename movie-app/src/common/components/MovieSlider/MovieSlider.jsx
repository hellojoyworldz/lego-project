import React from "react";
import Carousel from "react-multi-carousel";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieSlider.style.css";

const MovieSlider = ({ title, movies, responsive }) => {
  return (
    <>
      <h3>{title}</h3>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}>
        {movies?.map((movie, idx) => (
          <MovieCard key={idx} movie={movie} />
        ))}
      </Carousel>
    </>
  );
};

export default MovieSlider;
